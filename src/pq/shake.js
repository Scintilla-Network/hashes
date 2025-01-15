import { shake128 as nobleShake128, shake256 as nobleShake256 } from '@noble/hashes/sha3';
import { formatMessage } from '../utils/format.js';

/**
 * Computes SHAKE128 hash of a message
 * @param {string | Uint8Array | Record<string, unknown>} message - Message to hash
 * @param {number} [outputLength=32] - Desired output length in bytes
 * @returns {Uint8Array} Hash of specified length
 */
export function shake128(message, outputLength = 32) {
    const formatted = formatMessage(message);
    return nobleShake128.create({}).update(formatted).xof(outputLength);
}

/**
 * Computes SHAKE256 hash of a message
 * @param {string | Uint8Array | Record<string, unknown>} message - Message to hash
 * @param {number} [outputLength=32] - Desired output length in bytes
 * @returns {Uint8Array} Hash of specified length
 */
export function shake256(message, outputLength = 32) {
    const formatted = formatMessage(message);
    return nobleShake256.create({}).update(formatted).xof(outputLength);
}

/** @type {{shake128: typeof shake128, shake256: typeof shake256}} */
export default {
    shake128,
    shake256
}; 