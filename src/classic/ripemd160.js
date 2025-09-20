import { ripemd160 as nobleRipemd160 } from '@noble/hashes/legacy.js';
import { formatMessage } from '../utils/format.js';

/**
 * Computes RIPEMD160 hash of a message
 * @param {import('../types.js').Input} message - Message to hash
 * @returns {Uint8Array} 20-byte RIPEMD160 hash
 * @property {number} outputLen - Length of hash output in bytes (20)
 * @property {number} blockLen - Length of hash block in bytes
 * @property {function(): import('../types.js').HashInstance} create - Creates new RIPEMD160 hash instance for streaming
 */
const ripemd160Function = (message) => {
    return nobleRipemd160(formatMessage(message));
};

ripemd160Function.outputLen = nobleRipemd160.outputLen;
ripemd160Function.blockLen = nobleRipemd160.blockLen;
ripemd160Function.create = nobleRipemd160.create;

export const ripemd160 = ripemd160Function;

export default ripemd160; 