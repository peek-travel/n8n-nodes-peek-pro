import type {
	IHookFunctions,
	IWebhookFunctions,
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError, NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { PEEK_PRO_BASE_URL, DEFAULT_HEADERS } from '../../constants/peekPro.constants';
import { verifySignature } from './verifySignature';

async function deleteRemoteWebhook(this: IHookFunctions, webhookId: unknown): Promise<void> {
	await this.helpers.httpRequestWithAuthentication.call(this, 'peekProApi', {
		method: 'DELETE',
		url: `${PEEK_PRO_BASE_URL}/webhooks/${webhookId}`,
		headers: DEFAULT_HEADERS,
		json: true,
	});
}

function clearStoredWebhook(webhookData: IDataObject): void {
	delete webhookData.webhookId;
	delete webhookData.webhookSecret;
}

function isNotFound(error: { httpCode?: unknown; statusCode?: unknown; response?: { status?: unknown } }): boolean {
	const status = error?.httpCode ?? error?.statusCode ?? error?.response?.status;
	return String(status) === '404';
}

export class PeekProTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Peek Pro Trigger',
		name: 'peekProTrigger',
		icon: { light: 'file:peekPro.svg', dark: 'file:peekPro.dark.svg' },
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"] || "No event selected"}}',
		description: 'Starts the workflow when Peek Pro event occur (e.g., new bookings)',
		defaults: {
			name: 'Peek Pro Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'peekProApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				options: [
					{
						name: 'On Any Booking Change',
						value: 'booking.updated',
						description: 'Trigger when a booking is created or updated',
					},
					{
						name: 'On Booking Cancelled',
						value: 'booking.cancelled',
						description: 'Trigger when a booking is cancelled',
					},
					{
						name: 'On Booking Checked In',
						value: 'booking.checked_in',
						description: 'Trigger when a booking is checked in',
					},
					{
						name: 'On Booking Created',
						value: 'booking.created',
						description: 'Trigger when a new booking is created',
					},
					{
						name: 'On Booking Rescheduled',
						value: 'booking.rescheduled',
						description: 'Trigger when a booking is rescheduled',
					},
					{
						name: 'On Data Push From Focus App',
						value: 'focus.data',
						description: 'Trigger when Peek Pro Focus app pushes data to n8n app',
					},
					{
						name: 'On Data Push From Peek Pro Backend',
						value: 'backend.data',
						description: 'Trigger when Peek Pro Focus app pushes data to n8n app',
					},
					{
						name: 'On Waiver Signed',
						value: 'waiver.signed',
						description: 'Trigger when a waiver is signed by a guest',
					},
				],
				default: 'booking.created',
				required: true,
				description: 'The event that should trigger the workflow',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId === undefined) {
					return false;
				}

				// A webhook with no stored signing secret is removed, so that create() registers it again.
				if (typeof webhookData.webhookSecret !== 'string' || webhookData.webhookSecret === '') {
					try {
						await deleteRemoteWebhook.call(this, webhookData.webhookId);
					} catch (error) {
						if (!isNotFound(error)) {
							// Keep the stored ID, so that the next activation can try the delete again.
							throw new NodeOperationError(
								this.getNode(),
								`Failed to remove the webhook that has no signing secret: ${error.message}. Activate the workflow again.`,
							);
						}
					}
					clearStoredWebhook(webhookData);
					return false;
				}

				try {
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'peekProApi',
						{
							method: 'GET',
							url: `${PEEK_PRO_BASE_URL}/webhooks/${webhookData.webhookId}`,
							headers: DEFAULT_HEADERS,
							json: true,
						},
					);

					// Check if webhook still exists and is active
					return response && response.active === true;
				} catch (error) {
					if (!isNotFound(error)) {
						// Keep the stored ID and secret: the webhook can still exist.
						throw new NodeOperationError(
							this.getNode(),
							`Failed to look up the webhook: ${error.message}`,
						);
					}
					// The webhook does not exist: clean up the stored ID and secret
					this.logger?.debug(`Webhook ${webhookData.webhookId} not found`);
					clearStoredWebhook(webhookData);
					return false;
				}
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				// `event` is read as string[] and wrapped again in `eventTypes: [event]` below.
				// This is intentional: the Peek Pro /webhooks endpoint expects a nested array
				// shape here. Do not "fix" the type cast or unwrap the array — verified working.
				const event = this.getNodeParameter('event') as string[];

				// Validate webhook URL
				if (webhookUrl.includes('//localhost') || webhookUrl.includes('//127.0.0.1')) {
					throw new NodeOperationError(
						this.getNode(),
						'The webhook cannot work with localhost URLs. Please use a public URL that Peek Pro can reach.',
					);
				}

				// Prepare webhook subscription payload
				const body: IDataObject = {
					url: webhookUrl,
					eventTypes: [event],
					active: true,
					description: `n8n workflow webhook for event: ${event}`,
				};

				let responseData;
				try {
					responseData = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'peekProApi',
						{
							method: 'POST',
							body,
							url: `${PEEK_PRO_BASE_URL}/webhooks`,
							headers: DEFAULT_HEADERS,
							json: true,
						},
					);
				} catch (error) {
					// Handle specific error cases
					if (error.httpCode === 409) {
						throw new NodeOperationError(
							this.getNode(),
							'A webhook with this URL already exists. Please use a different webhook URL or delete the existing webhook.',
							{ level: 'warning' },
						);
					}

					throw new NodeOperationError(
						this.getNode(),
						`Failed to create webhook: ${error.message}`,
						{ level: 'warning' },
					);
				}

				// Validate response
				if (!responseData?.id) {
					throw new NodeApiError(this.getNode(), responseData as JsonObject, {
						message: 'Webhook creation response did not contain the expected webhook ID.',
					});
				}

				if (typeof responseData.secret !== 'string' || responseData.secret === '') {
					// Remove the webhook that was just registered, so that the next activation does not get a 409.
					try {
						await deleteRemoteWebhook.call(this, responseData.id);
					} catch (error) {
						this.logger?.warn(`Failed to remove webhook ${responseData.id}: ${error.message}`);
					}
					throw new NodeApiError(this.getNode(), responseData as JsonObject, {
						message: 'Webhook creation response did not contain a signing secret.',
					});
				}

				// Store webhook ID and signing secret for future reference
				webhookData.webhookId = responseData.id as string;
				webhookData.webhookSecret = responseData.secret;
				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId !== undefined) {
					try {
						await deleteRemoteWebhook.call(this, webhookData.webhookId);
					} catch (error) {
						// Log error but don't fail - webhook might already be deleted
						this.logger?.warn(`Failed to delete webhook: ${error.message}`);
						return false;
					}

					// Clean up stored webhook ID and secret
					clearStoredWebhook(webhookData);
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const bodyData = this.getBodyData();
		const headerData = this.getHeaderData();
		const queryData = this.getQueryData();
		const httpMethod = req.method?.toUpperCase() || 'POST';

		// Handle GET requests (webhook verification)
		if (httpMethod === 'GET') {
			// Some webhook systems send verification challenges via GET
			if (queryData && typeof queryData === 'object' && 'challenge' in queryData) {
				return {
					webhookResponse: queryData.challenge as string,
				};
			}

			// Health check response
			return {
				webhookResponse: JSON.stringify({
					status: 'healthy',
					message: 'Peek Pro webhook endpoint is active',
					timestamp: new Date().toISOString(),
				}),
			};
		}

		// Handle POST requests (actual webhook event)
		if (httpMethod === 'POST') {
			const webhookData = this.getWorkflowStaticData('node');
			const verification = verifySignature({
				secret: webhookData.webhookSecret,
				rawBody: req.rawBody,
				headers: headerData as Record<string, unknown>,
				nowSeconds: Math.floor(Date.now() / 1000),
			});

			if (!verification.valid) {
				const res = this.getResponseObject();
				this.logger?.debug(`Peek Pro Trigger rejected a request: ${verification.reason}`);
				res.status(401).json({ error: 'Unauthorized' });
				return { noWebhookResponse: true };
			}

			// Validate that we have data
			if (!bodyData || (typeof bodyData === 'object' && Object.keys(bodyData).length === 0)) {
				return { webhookResponse: 'OK' };
			}

			// Prepare return data
			const returnData: IDataObject[] = [];
			const eventData: IDataObject = {
				event: bodyData,
				headers: headerData,
				query: queryData,
				timestamp: new Date().toISOString(),
			};

			returnData.push(eventData);

			return {
				workflowData: [this.helpers.returnJsonArray(returnData)],
			};
		}

		// Unsupported method
		return {
			webhookResponse: JSON.stringify({
				error: 'Method not allowed',
				message: `HTTP method ${httpMethod} is not supported`,
				supportedMethods: ['GET', 'POST'],
			}),
		};
	}
}
