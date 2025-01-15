import { k12 as nobleK12, m14 as nobleM14 } from '@noble/hashes/sha3-addons';
import { formatMessage } from '../utils/format.js';

/**
 * Computes KangarooTwelve (K12) hash of a message
 * @param {string | Uint8Array | Record<string, unknown>} message - Message to hash
 * @param {number} [outputLength=32] - Desired output length in bytes (default: 32)
 * @returns {Uint8Array} K12 hash of specified length
 */
export const k12 = (message, outputLength = 32) => {
    const formatted = formatMessage(message);
    return nobleK12.create({ dkLen: outputLength }).update(formatted).digest();
};

/**
 * Computes MarsupilamiFourteen (M14) hash of a message
 * @param {string | Uint8Array | Record<string, unknown>} message - Message to hash
 * @param {number} [outputLength=32] - Desired output length in bytes (default: 32)
 * @returns {Uint8Array} M14 hash of specified length
 */
export const m14 = (message, outputLength = 32) => {
    const formatted = formatMessage(message);
    return nobleM14.create({ dkLen: outputLength }).update(formatted).digest();
};

/** @type {{k12: typeof k12, m14: typeof m14}} */
export default {
    k12,
    m14
}; 