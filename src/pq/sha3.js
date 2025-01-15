import { sha3_256 as _sha3_256, sha3_512 as _sha3_512 } from '@noble/hashes/sha3';
import { formatMessage } from '../utils/format.js';

/**
 * Computes SHA3-256 hash of a message
 * @param {string | Uint8Array | Record<string, unknown>} message - Message to hash
 * @returns {Uint8Array} 32-byte SHA3-256 hash
 */
export function sha3_256(message) {
    return _sha3_256(formatMessage(message));
}

/**
 * Computes SHA3-512 hash of a message
 * @param {string | Uint8Array | Record<string, unknown>} message - Message to hash
 * @returns {Uint8Array} 64-byte SHA3-512 hash
 */
export function sha3_512(message) {
    return _sha3_512(formatMessage(message));
}

/** @type {{sha3_256: typeof sha3_256, sha3_512: typeof sha3_512}} */
export default {
    sha3_256,
    sha3_512
}; 