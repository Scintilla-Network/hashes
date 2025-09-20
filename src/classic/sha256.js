import { sha256 as nobleSha256 } from '@noble/hashes/sha2.js';
import { formatMessage } from '../utils/format.js';

/**
 * Computes SHA256 hash of a message
 * @param {string | Uint8Array | Record<string, unknown>} message - Message to hash
 * @returns {Uint8Array} 32-byte SHA256 hash
 * @property {number} outputLen - Length of hash output in bytes (32)
 * @property {number} blockLen - Length of hash block in bytes
 * @property {function(): import('@noble/hashes/utils').Hash<any>} create - Creates new SHA256 hash instance for streaming
 */
const sha256Function = (message) => {
    return nobleSha256(formatMessage(message));
};

sha256Function.outputLen = nobleSha256.outputLen;
sha256Function.blockLen = nobleSha256.blockLen;
sha256Function.create = nobleSha256.create;

export const sha256 = sha256Function;

export default sha256;
