import { blake2b as nobleBlake2b } from '@noble/hashes/blake2.js';
import { formatMessage } from '../utils/format.js';

/**
 * Computes BLAKE2b hash of a message
 * @param {import('../types.js').Input} message - Message to hash
 * @param {object} [options] - BLAKE2b options
 * @param {number} [options.dkLen=64] - Output length in bytes (default: 64)
 * @param {Uint8Array | string} [options.key] - Optional key for keyed hashing
 * @param {Uint8Array | string} [options.salt] - Optional salt for randomized hashing
 * @param {Uint8Array | string} [options.personalization] - Optional personalization string
 * @returns {Uint8Array} BLAKE2b hash of specified length
 * @property {number} outputLen - Length of hash output in bytes (64)
 * @property {number} blockLen - Length of hash block in bytes
 * @property {function(object?): import('../types.js').HashInstance} create - Creates new BLAKE2b hash instance for streaming
 */
const blake2bFunction = (message, options = {}) => {
    const formattedMessage = formatMessage(message);
    const opts = { dkLen: nobleBlake2b.outputLen, ...options };
    return nobleBlake2b.create(opts).update(formattedMessage).digest();
};

blake2bFunction.outputLen = nobleBlake2b.outputLen;
blake2bFunction.blockLen = nobleBlake2b.blockLen;
blake2bFunction.create = nobleBlake2b.create;

export const blake2b = blake2bFunction;

export default blake2b; 