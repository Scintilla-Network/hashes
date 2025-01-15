import { blake2s as nobleBlake2s } from '@noble/hashes/blake2s';
import { formatMessage } from '../utils/format.js';

/**
 * Computes BLAKE2s hash of a message
 * @param {string | Uint8Array | Record<string, unknown>} message - Message to hash
 * @param {number} [outputLength=32] - Desired output length in bytes (default: 32)
 * @returns {Uint8Array} BLAKE2s hash of specified length
 */
export const blake2s = (message, outputLength = 32) => {
    return nobleBlake2s.create({ dkLen: outputLength })
        .update(formatMessage(message))
        .digest();
};

export default blake2s; 