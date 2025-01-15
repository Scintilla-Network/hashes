import { ripemd160 as nobleRipemd160 } from '@noble/hashes/ripemd160';
import { formatMessage } from '../utils/format.js';

/**
 * Computes RIPEMD160 hash of a message
 * @param {string | Uint8Array | Record<string, unknown>} message - Message to hash
 * @returns {Uint8Array} 20-byte RIPEMD160 hash
 */
export const ripemd160 = (message) => {
    return nobleRipemd160(formatMessage(message));
};

export default ripemd160; 