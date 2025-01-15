import { blake2b as nobleBlake2b } from '@noble/hashes/blake2b';
import { formatMessage } from '../utils/format.js';

/**
 * Computes BLAKE2b hash of a message
 * @param {string | Uint8Array | Record<string, unknown>} message - Message to hash
 * @param {number} [outputLength=64] - Desired output length in bytes (default: 64)
 * @returns {Uint8Array} BLAKE2b hash of specified length
 */
export const blake2b = (message, outputLength = 64) => {
    return nobleBlake2b.create({ dkLen: outputLength })
        .update(formatMessage(message))
        .digest();
};

export default blake2b; 