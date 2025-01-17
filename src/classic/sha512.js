import { sha512 as nobleSha512 } from '@noble/hashes/sha512';
import { formatMessage } from '../utils/format.js';

/**
 * Computes SHA512 hash of a message
 * @param {import('../types.js').Input} message - Message to hash
 * @returns {Uint8Array} 64-byte SHA512 hash
 * @property {number} outputLen - Length of hash output in bytes (64)
 * @property {number} blockLen - Length of hash block in bytes
 * @property {function(): import('../types.js').HashInstance} create - Creates new SHA512 hash instance for streaming
 */
const sha512Function = (message) => {
    return nobleSha512(formatMessage(message));
};

sha512Function.outputLen = nobleSha512.outputLen;
sha512Function.blockLen = nobleSha512.blockLen;
sha512Function.create = nobleSha512.create;

export const sha512 = sha512Function;

export default sha512; 