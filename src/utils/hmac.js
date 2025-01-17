import { hmac as nobleHmac } from '@noble/hashes/hmac';

/**
 * Computes HMAC of a message using specified hash function
 * @param {import('../types.js').HashFunction} hash - Hash function to use (e.g. sha256)
 * @param {string | Uint8Array} key - Key for HMAC
 * @param {string | Uint8Array} message - Message to authenticate
 * @returns {Uint8Array} HMAC value
 */
export const hmac = (hash, key, message) => {
    return nobleHmac(hash, key, message);
};

/**
 * Creates an HMAC instance for streaming updates
 * @param {import('../types.js').HashFunction} hash - Hash function to use (e.g. sha256)
 * @param {string | Uint8Array} key - Key for HMAC
 * @returns {import('../types.js').HMAC} HMAC instance
 */
export const createHmac = (hash, key) => {
    return nobleHmac.create(hash, key);
};

export default { hmac, createHmac }; 