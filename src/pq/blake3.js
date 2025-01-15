import { blake3 as nobleBlake3 } from '@noble/hashes/blake3';
import { formatMessage } from '../utils/format.js';

/**
 * Computes BLAKE3 hash of a message
 * @param {string | Uint8Array | Record<string, unknown>} message - Message to hash
 * @param {number} [outputLength=32] - Desired output length in bytes (default: 32)
 * @returns {Uint8Array} BLAKE3 hash of specified length
 */
export const blake3 = (message, outputLength = 32) => {
    return nobleBlake3.create({ dkLen: outputLength })
        .update(formatMessage(message))
        .digest();
};

export default blake3; 