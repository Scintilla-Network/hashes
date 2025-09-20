import { blake2s as nobleBlake2s } from '@noble/hashes/blake2.js';
import { formatMessage } from '../utils/format.js';

/**
 * Computes BLAKE2s hash of a message
 * @param {import('../types.js').Input} message - Message to hash
 * @param {object} [options] - BLAKE2s options
 * @param {number} [options.dkLen=32] - Output length in bytes (default: 32)
 * @param {Uint8Array | string} [options.key] - Optional key for keyed hashing
 * @param {Uint8Array | string} [options.salt] - Optional salt for randomized hashing
 * @param {Uint8Array | string} [options.personalization] - Optional personalization string
 * @returns {Uint8Array} BLAKE2s hash of specified length
 * @property {number} outputLen - Length of hash output in bytes (32)
 * @property {number} blockLen - Length of hash block in bytes
 * @property {function(object?): import('../types.js').HashInstance} create - Creates new BLAKE2s hash instance for streaming
 */
const blake2sFunction = (message, options = {}) => {
    const formattedMessage = formatMessage(message);
    const opts = { dkLen: nobleBlake2s.outputLen, ...options };
    return nobleBlake2s.create(opts).update(formattedMessage).digest();
};

blake2sFunction.outputLen = nobleBlake2s.outputLen;
blake2sFunction.blockLen = nobleBlake2s.blockLen;
blake2sFunction.create = nobleBlake2s.create;

export const blake2s = blake2sFunction;

export default blake2s; 