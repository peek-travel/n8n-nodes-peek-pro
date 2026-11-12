import { describe, expect, it } from 'vitest';
import {
	SeenSignatures,
	SIGNATURE_HEADER,
	SIGNATURE_TOLERANCE_SECONDS,
	TIMESTAMP_HEADER,
	computeSignature,
	verifySignature,
} from '../nodes/PeekProTrigger/verifySignature';

const SECRET = 'test-secret';
const NOW = 1_800_000_000;
const BODY = Buffer.from('{"bookingId":"b-1"}');

function signedHeaders(timestamp = NOW, body = BODY, secret = SECRET) {
	return {
		[TIMESTAMP_HEADER]: String(timestamp),
		[SIGNATURE_HEADER]: computeSignature(secret, String(timestamp), body),
	};
}

function check(overrides: Partial<Parameters<typeof verifySignature>[0]> = {}) {
	return verifySignature({
		secret: SECRET,
		rawBody: BODY,
		headers: signedHeaders(),
		nowSeconds: NOW,
		seen: new SeenSignatures(),
		...overrides,
	});
}

describe('verifySignature', () => {
	it('accepts a valid signature', () => {
		expect(check()).toEqual({ valid: true });
	});

	it('accepts a header value given as an array', () => {
		const h = signedHeaders();
		expect(
			check({ headers: { [TIMESTAMP_HEADER]: [h[TIMESTAMP_HEADER]], [SIGNATURE_HEADER]: [h[SIGNATURE_HEADER]] } }),
		).toEqual({ valid: true });
	});

	it('rejects a missing signature header', () => {
		expect(check({ headers: { [TIMESTAMP_HEADER]: String(NOW) } })).toEqual({
			valid: false,
			reason: 'missing_signature',
		});
	});

	it('rejects a missing timestamp header', () => {
		const h = signedHeaders();
		expect(check({ headers: { [SIGNATURE_HEADER]: h[SIGNATURE_HEADER] } })).toEqual({
			valid: false,
			reason: 'missing_timestamp',
		});
	});

	it('rejects a timestamp that is not a number', () => {
		expect(check({ headers: { ...signedHeaders(), [TIMESTAMP_HEADER]: 'abc' } })).toEqual({
			valid: false,
			reason: 'invalid_timestamp',
		});
	});

	it('rejects a signature made with a different secret', () => {
		expect(check({ headers: signedHeaders(NOW, BODY, 'other-secret') })).toEqual({
			valid: false,
			reason: 'invalid_signature',
		});
	});

	it('rejects a signature for a different body', () => {
		expect(check({ rawBody: Buffer.from('{"bookingId":"b-2"}') })).toEqual({
			valid: false,
			reason: 'invalid_signature',
		});
	});

	it('rejects a signature with a different length', () => {
		expect(check({ headers: { ...signedHeaders(), [SIGNATURE_HEADER]: 'v1=abc' } })).toEqual({
			valid: false,
			reason: 'invalid_signature',
		});
	});

	it('rejects a timestamp older than the tolerance window', () => {
		const old = NOW - SIGNATURE_TOLERANCE_SECONDS - 1;
		expect(check({ headers: signedHeaders(old) })).toEqual({ valid: false, reason: 'stale_timestamp' });
	});

	it('rejects a timestamp too far in the future', () => {
		const future = NOW + SIGNATURE_TOLERANCE_SECONDS + 1;
		expect(check({ headers: signedHeaders(future) })).toEqual({ valid: false, reason: 'stale_timestamp' });
	});

	it('accepts a timestamp at the edge of the tolerance window', () => {
		const edge = NOW - SIGNATURE_TOLERANCE_SECONDS;
		expect(check({ headers: signedHeaders(edge) })).toEqual({ valid: true });
	});

	it('rejects the same signed request a second time', () => {
		const seen = new SeenSignatures();
		expect(check({ seen })).toEqual({ valid: true });
		expect(check({ seen })).toEqual({ valid: false, reason: 'replayed_signature' });
	});

	it('rejects a request when no secret is stored', () => {
		expect(check({ secret: undefined })).toEqual({ valid: false, reason: 'missing_secret' });
		expect(check({ secret: '' })).toEqual({ valid: false, reason: 'missing_secret' });
	});

	it('rejects a request with no raw body', () => {
		expect(check({ rawBody: undefined })).toEqual({ valid: false, reason: 'missing_body' });
		expect(check({ rawBody: '{"a":1}' })).toEqual({ valid: false, reason: 'missing_body' });
	});
});

describe('SeenSignatures', () => {
	it('removes expired entries', () => {
		const seen = new SeenSignatures();
		expect(seen.add('a', 100, 50)).toBe(true);
		expect(seen.add('a', 200, 150)).toBe(true);
		expect(seen.size).toBe(1);
	});

	it('keeps the size at or below the limit', () => {
		const seen = new SeenSignatures(2);
		seen.add('a', 1000, 0);
		seen.add('b', 1000, 0);
		seen.add('c', 1000, 0);
		expect(seen.size).toBe(2);
		expect(seen.add('a', 1000, 0)).toBe(true);
	});
});
