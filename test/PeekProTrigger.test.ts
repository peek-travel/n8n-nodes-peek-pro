import { describe, expect, it, vi } from 'vitest';
import type { IDataObject, IHookFunctions, IWebhookFunctions } from 'n8n-workflow';
import { PeekProTrigger } from '../nodes/PeekProTrigger/PeekProTrigger.node';
import {
	SIGNATURE_HEADER,
	SIGNATURE_TOLERANCE_SECONDS,
	TIMESTAMP_HEADER,
	computeSignature,
} from '../nodes/PeekProTrigger/verifySignature';

const SECRET = 'workflow-secret';
let bodyCounter = 0;

function uniqueBody(): { raw: Buffer; parsed: IDataObject } {
	bodyCounter += 1;
	const parsed = { bookingId: `b-${bodyCounter}`, status: 'confirmed' };
	return { raw: Buffer.from(JSON.stringify(parsed)), parsed };
}

function signed(raw: Buffer, timestamp = Math.floor(Date.now() / 1000), secret = SECRET) {
	return {
		'content-type': 'application/json',
		[TIMESTAMP_HEADER]: String(timestamp),
		[SIGNATURE_HEADER]: computeSignature(secret, String(timestamp), raw),
	};
}

interface WebhookCall {
	headers: Record<string, unknown>;
	raw?: Buffer;
	parsed: IDataObject;
	staticData?: IDataObject;
	method?: string;
}

function webhookContext(call: WebhookCall) {
	const res = { status: vi.fn(), json: vi.fn() };
	res.status.mockReturnValue(res);
	const staticData = call.staticData ?? {
		webhookId: 'wh-1',
		webhookSecret: SECRET,
	};
	const logger = { debug: vi.fn(), warn: vi.fn() };
	const ctx = {
		logger,
		getRequestObject: () => ({
			method: call.method ?? 'POST',
			rawBody: call.raw,
		}),
		getBodyData: () => call.parsed,
		getHeaderData: () => call.headers,
		getQueryData: () => ({}),
		getWorkflowStaticData: () => staticData,
		getResponseObject: () => res,
		helpers: {
			returnJsonArray: (items: IDataObject[]) => items.map((json) => ({ json })),
		},
	};
	return { ctx: ctx as unknown as IWebhookFunctions, res, logger };
}

async function run(call: WebhookCall) {
	const { ctx, res, logger } = webhookContext(call);
	const result = await new PeekProTrigger().webhook.call(ctx);
	return { result, res, logger };
}

function expectRejected(outcome: Awaited<ReturnType<typeof run>>, reason: string) {
	expect(outcome.result).toEqual({ noWebhookResponse: true });
	expect(outcome.result.workflowData).toBeUndefined();
	expect(outcome.res.status).toHaveBeenCalledWith(401);
	expect(outcome.res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
	expect(outcome.logger.debug).toHaveBeenCalledWith(expect.stringContaining(reason));
}

describe('PeekProTrigger.webhook', () => {
	it('starts the workflow for a valid signature', async () => {
		const { raw, parsed } = uniqueBody();
		const headers = signed(raw);
		const { result, res } = await run({ headers, raw, parsed });

		expect(res.status).not.toHaveBeenCalled();
		expect(result.workflowData).toHaveLength(1);
		const item = result.workflowData![0][0].json;
		expect(item.event).toEqual(parsed);
		expect(item.headers).toEqual(headers);
		expect(item.query).toEqual({});
		expect(typeof item.timestamp).toBe('string');
	});

	it('returns 401 for a missing signature', async () => {
		const { raw, parsed } = uniqueBody();
		const headers = {
			[TIMESTAMP_HEADER]: String(Math.floor(Date.now() / 1000)),
		};
		expectRejected(await run({ headers, raw, parsed }), 'missing_signature');
	});

	it('returns 401 for a missing signature and an empty body', async () => {
		expectRejected(
			await run({ headers: {}, raw: Buffer.from('{}'), parsed: {} }),
			'missing_signature',
		);
	});

	it('returns 401 for a wrong signature', async () => {
		const { raw, parsed } = uniqueBody();
		const headers = signed(raw, undefined, 'other-secret');
		expectRejected(await run({ headers, raw, parsed }), 'invalid_signature');
	});

	it('returns 401 for a stale timestamp', async () => {
		const { raw, parsed } = uniqueBody();
		const old = Math.floor(Date.now() / 1000) - SIGNATURE_TOLERANCE_SECONDS - 60;
		expectRejected(await run({ headers: signed(raw, old), raw, parsed }), 'stale_timestamp');
	});

	it('returns 401 for a replayed request', async () => {
		const { raw, parsed } = uniqueBody();
		const headers = signed(raw);
		const first = await run({ headers, raw, parsed });
		expect(first.result.workflowData).toHaveLength(1);
		expectRejected(await run({ headers, raw, parsed }), 'replayed_signature');
	});

	it('returns 401 when no secret is stored', async () => {
		const { raw, parsed } = uniqueBody();
		const staticData = { webhookId: 'wh-1' };
		expectRejected(await run({ headers: signed(raw), raw, parsed, staticData }), 'missing_secret');
	});

	it('returns 401 when the raw body is not available', async () => {
		const { raw, parsed } = uniqueBody();
		expectRejected(await run({ headers: signed(raw), parsed }), 'missing_body');
	});

	it('answers a GET health check with no signature', async () => {
		const { result, res } = await run({
			headers: {},
			parsed: {},
			method: 'GET',
		});
		expect(res.status).not.toHaveBeenCalled();
		expect(result.workflowData).toBeUndefined();
		expect(JSON.parse(result.webhookResponse as string).status).toBe('healthy');
	});
});

function httpError(status: number, message: string) {
	return Object.assign(new Error(message), { httpCode: String(status) });
}

function hookContext(staticData: IDataObject, request: (opts: IDataObject) => unknown) {
	const httpRequestWithAuthentication = vi.fn(async (_cred: string, opts: IDataObject) =>
		request(opts),
	);
	const ctx = {
		getWorkflowStaticData: () => staticData,
		getNodeWebhookUrl: () => 'https://n8n.example.com/webhook/abc/webhook',
		getNodeParameter: () => 'booking.created',
		getNode: () => ({
			name: 'Peek Pro Trigger',
			type: 'peekProTrigger',
			typeVersion: 1,
		}),
		logger: { warn: vi.fn(), debug: vi.fn() },
		helpers: {
			httpRequestWithAuthentication: {
				call: (_this: unknown, cred: string, opts: IDataObject) =>
					httpRequestWithAuthentication(cred, opts),
			},
		},
	};
	return {
		ctx: ctx as unknown as IHookFunctions,
		httpRequestWithAuthentication,
	};
}

describe('PeekProTrigger webhook lifecycle', () => {
	const methods = new PeekProTrigger().webhookMethods.default;

	it('create() stores the webhook id and the signing secret', async () => {
		const staticData: IDataObject = {};
		const { ctx } = hookContext(staticData, () => ({
			id: 'wh-9',
			secret: 's3cret',
		}));
		await expect(methods.create.call(ctx)).resolves.toBe(true);
		expect(staticData).toEqual({ webhookId: 'wh-9', webhookSecret: 's3cret' });
	});

	it('create() fails and removes the new webhook when the response has no signing secret', async () => {
		const staticData: IDataObject = {};
		const { ctx, httpRequestWithAuthentication } = hookContext(staticData, (opts) =>
			opts.method === 'POST' ? { id: 'wh-9' } : {},
		);
		await expect(methods.create.call(ctx)).rejects.toThrow(/signing secret/);
		expect(httpRequestWithAuthentication).toHaveBeenCalledWith(
			'peekProApi',
			expect.objectContaining({
				method: 'DELETE',
				url: expect.stringMatching(/\/webhooks\/wh-9$/),
			}),
		);
		expect(staticData).toEqual({});
	});

	it('checkExists() removes a webhook that has no stored secret', async () => {
		const staticData: IDataObject = { webhookId: 'wh-old' };
		const { ctx, httpRequestWithAuthentication } = hookContext(staticData, () => ({}));
		await expect(methods.checkExists.call(ctx)).resolves.toBe(false);
		expect(httpRequestWithAuthentication).toHaveBeenCalledWith(
			'peekProApi',
			expect.objectContaining({
				method: 'DELETE',
				url: expect.stringMatching(/\/webhooks\/wh-old$/),
			}),
		);
		expect(staticData).toEqual({});
	});

	it('checkExists() clears a webhook with no stored secret that is already gone', async () => {
		const staticData: IDataObject = { webhookId: 'wh-old' };
		const { ctx } = hookContext(staticData, () => {
			throw httpError(404, 'not found');
		});
		await expect(methods.checkExists.call(ctx)).resolves.toBe(false);
		expect(staticData).toEqual({});
	});

	it('checkExists() keeps the id when it cannot remove a webhook with no stored secret', async () => {
		const staticData: IDataObject = { webhookId: 'wh-old' };
		const { ctx } = hookContext(staticData, () => {
			throw httpError(503, 'unavailable');
		});
		await expect(methods.checkExists.call(ctx)).rejects.toThrow(/no signing secret/);
		expect(staticData).toEqual({ webhookId: 'wh-old' });
	});

	it('checkExists() keeps a webhook that has a stored secret and is active', async () => {
		const staticData: IDataObject = {
			webhookId: 'wh-1',
			webhookSecret: SECRET,
		};
		const { ctx, httpRequestWithAuthentication } = hookContext(staticData, () => ({
			active: true,
		}));
		await expect(methods.checkExists.call(ctx)).resolves.toBe(true);
		expect(httpRequestWithAuthentication).toHaveBeenCalledWith(
			'peekProApi',
			expect.objectContaining({ method: 'GET' }),
		);
		expect(staticData).toEqual({ webhookId: 'wh-1', webhookSecret: SECRET });
	});

	it('checkExists() clears the id and the secret when the webhook is not found', async () => {
		const staticData: IDataObject = {
			webhookId: 'wh-1',
			webhookSecret: SECRET,
		};
		const { ctx } = hookContext(staticData, () => {
			throw httpError(404, 'not found');
		});
		await expect(methods.checkExists.call(ctx)).resolves.toBe(false);
		expect(staticData).toEqual({});
	});

	it('checkExists() keeps the id and the secret when the lookup fails for another reason', async () => {
		const staticData: IDataObject = {
			webhookId: 'wh-1',
			webhookSecret: SECRET,
		};
		const { ctx } = hookContext(staticData, () => {
			throw httpError(503, 'unavailable');
		});
		await expect(methods.checkExists.call(ctx)).rejects.toThrow(/look up/);
		expect(staticData).toEqual({ webhookId: 'wh-1', webhookSecret: SECRET });
	});

	it('delete() clears the id and the secret', async () => {
		const staticData: IDataObject = {
			webhookId: 'wh-1',
			webhookSecret: SECRET,
		};
		const { ctx } = hookContext(staticData, () => ({}));
		await expect(methods.delete.call(ctx)).resolves.toBe(true);
		expect(staticData).toEqual({});
	});
});
