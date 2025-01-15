import { sha512 as nobleSha512 } from '@noble/hashes/sha512';
import { formatMessage } from '../utils/format.js';

/**
 * Computes SHA512 hash of a message
 * @param {string | Uint8Array | Record<string, unknown>} message - Message to hash
 * @returns {Uint8Array} 64-byte SHA512 hash
 */
export const sha512 = (message) => {
    return nobleSha512(formatMessage(message));
};

export default sha512; 