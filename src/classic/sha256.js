import { sha256 as nobleSha256 } from '@noble/hashes/sha256';
import { formatMessage } from '../utils/format.js';

/**
 * Computes SHA256 hash of a message
 * @param {string | Uint8Array | Record<string, unknown>} message - Message to hash
 * @returns {Uint8Array} 32-byte SHA256 hash
 */
export const sha256 = (message) => {
    return nobleSha256(formatMessage(message));
};

export default sha256; 