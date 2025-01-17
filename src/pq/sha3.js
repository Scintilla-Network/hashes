import { sha3_256 as nobleSha3_256, sha3_512 as nobleSha3_512 } from '@noble/hashes/sha3';
import { formatMessage } from '../utils/format.js';

/**
 * Computes SHA3-256 hash of a message
 * @param {import('../types.js').Input} message - Message to hash
 * @returns {Uint8Array} 32-byte SHA3-256 hash
 * @property {number} outputLen - Length of hash output in bytes (32)
 * @property {number} blockLen - Length of hash block in bytes
 * @property {function(): import('../types.js').HashInstance} create - Creates new SHA3-256 hash instance for streaming
 */
const sha3_256Function = (message) => {
    return nobleSha3_256(formatMessage(message));
};

sha3_256Function.outputLen = nobleSha3_256.outputLen;
sha3_256Function.blockLen = nobleSha3_256.blockLen;
sha3_256Function.create = nobleSha3_256.create;

export const sha3_256 = sha3_256Function;

/**
 * Computes SHA3-512 hash of a message
 * @param {import('../types.js').Input} message - Message to hash
 * @returns {Uint8Array} 64-byte SHA3-512 hash
 * @property {number} outputLen - Length of hash output in bytes (64)
 * @property {number} blockLen - Length of hash block in bytes
 * @property {function(): import('../types.js').HashInstance} create - Creates new SHA3-512 hash instance for streaming
 */
const sha3_512Function = (message) => {
    return nobleSha3_512(formatMessage(message));
};

sha3_512Function.outputLen = nobleSha3_512.outputLen;
sha3_512Function.blockLen = nobleSha3_512.blockLen;
sha3_512Function.create = nobleSha3_512.create;

export const sha3_512 = sha3_512Function;

export default { sha3_256, sha3_512 }; 