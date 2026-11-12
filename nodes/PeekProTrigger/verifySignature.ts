import { createHmac, timingSafeEqual } from 'crypto';

export const SIGNATURE_HEADER = 'x-peek-signature';
export const TIMESTAMP_HEADER = 'x-peek-timestamp';
export const SIGNATURE_VERSION = 'v1';
export const SIGNATURE_TOLERANCE_SECONDS = 300;

const MAX_SEEN_SIGNATURES = 10000;

export type SignatureFailure =
	| 'missing_secret'
	| 'missing_body'
	| 'missing_signature'
	| 'missing_timestamp'
	| 'invalid_timestamp'
	| 'stale_timestamp'
	| 'invalid_signature'
	| 'replayed_signature';

export type SignatureResult = { valid: true } | { valid: false; reason: SignatureFailure };

export interface SignatureInput {
	secret: unknown;
	rawBody: unknown;
	headers: Record<string, unknown>;
	nowSeconds: number;
	seen?: SeenSignatures;
}

/**
 * Keeps the signatures that this n8n process accepted inside the tolerance window.
 * Expired entries are removed on each check. The size has a limit.
 */
export class SeenSignatures {
	private readonly entries = new Map<string, number>();

	constructor(private readonly maxEntries = MAX_SEEN_SIGNATURES) {}

	/** Returns false when the signature is already in the set. Else adds it and returns true. */
	add(signature: string, expiresAt: number, nowSeconds: number): boolean {
		// Entries are added in about the same order as they expire, so stop at the first live entry.
		for (const [key, expiry] of this.entries) {
			if (expiry > nowSeconds) break;
			this.entries.delete(key);
		}
		if (this.entries.has(signature)) return false;
		while (this.entries.size >= this.maxEntries) {
			const oldest = this.entries.keys().next().value;
			if (oldest === undefined) break;
			this.entries.delete(oldest);
		}
		this.entries.set(signature, expiresAt);
		return true;
	}

	get size(): number {
		return this.entries.size;
	}
}

export const seenSignatures = new SeenSignatures();

function headerValue(headers: Record<string, unknown>, name: string): string | undefined {
	const value = headers[name];
	if (Array.isArray(value)) return typeof value[0] === 'string' ? value[0] : undefined;
	return typeof value === 'string' ? value : undefined;
}

export function computeSignature(secret: string, timestamp: string, rawBody: Buffer): string {
	const hmac = createHmac('sha256', secret);
	hmac.update(`${timestamp}.`);
	hmac.update(rawBody);
	return `${SIGNATURE_VERSION}=${hmac.digest('hex')}`;
}

function signaturesMatch(expected: string, received: string): boolean {
	const a = Buffer.from(expected, 'utf8');
	const b = Buffer.from(received, 'utf8');
	if (a.length !== b.length) return false;
	return timingSafeEqual(a, b);
}

export function verifySignature(input: SignatureInput): SignatureResult {
	const { secret, rawBody, headers, nowSeconds, seen = seenSignatures } = input;

	if (typeof secret !== 'string' || secret.length === 0) {
		return { valid: false, reason: 'missing_secret' };
	}
	if (!Buffer.isBuffer(rawBody)) {
		return { valid: false, reason: 'missing_body' };
	}

	const signature = headerValue(headers, SIGNATURE_HEADER)?.trim();
	if (!signature) return { valid: false, reason: 'missing_signature' };

	const timestamp = headerValue(headers, TIMESTAMP_HEADER)?.trim();
	if (!timestamp) return { valid: false, reason: 'missing_timestamp' };
	if (!/^\d{1,12}$/.test(timestamp)) return { valid: false, reason: 'invalid_timestamp' };

	const timestampSeconds = Number(timestamp);
	if (Math.abs(nowSeconds - timestampSeconds) > SIGNATURE_TOLERANCE_SECONDS) {
		return { valid: false, reason: 'stale_timestamp' };
	}

	const expected = computeSignature(secret, timestamp, rawBody);
	if (!signaturesMatch(expected, signature)) {
		return { valid: false, reason: 'invalid_signature' };
	}

	const expiresAt = timestampSeconds + SIGNATURE_TOLERANCE_SECONDS;
	if (!seen.add(expected, expiresAt, nowSeconds)) {
		return { valid: false, reason: 'replayed_signature' };
	}

	return { valid: true };
}
