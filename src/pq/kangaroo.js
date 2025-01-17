import { k12 as nobleK12, m14 as nobleM14 } from '@noble/hashes/sha3-addons';
import { formatMessage } from '../utils/format.js';

/**
 * Options for variable output length hash functions
 * @typedef {object} XOFOptions
 * @property {number} [dkLen] - Desired output length in bytes
 */

/**
 * Computes KangarooTwelve (K12) hash of a message
 * @param {import('../types.js').Input} message - Message to hash
 * @param {number} [outputLength=32] - Desired output length in bytes
 * @returns {Uint8Array} K12 hash of specified length
 * @property {number} outputLen - Default output length in bytes (32)
 * @property {number} blockLen - Length of hash block in bytes
 * @property {function(XOFOptions): import('../types.js').XOFInstance} create - Creates new K12 hash instance for streaming
 */
const k12Function = (message, outputLength = 32) => {
    const formatted = formatMessage(message);
    return nobleK12.create({ dkLen: outputLength }).update(formatted).digest();
};

k12Function.outputLen = 32;  // Default output length
k12Function.blockLen = nobleK12.blockLen;
k12Function.create = (opts = { dkLen: 32 }) => nobleK12.create(opts);

export const k12 = k12Function;

/**
 * Computes MarsupilamiFourteen (M14) hash of a message
 * @param {import('../types.js').Input} message - Message to hash
 * @param {number} [outputLength=32] - Desired output length in bytes
 * @returns {Uint8Array} M14 hash of specified length
 * @property {number} outputLen - Default output length in bytes (32)
 * @property {number} blockLen - Length of hash block in bytes
 * @property {function(XOFOptions): import('../types.js').XOFInstance} create - Creates new M14 hash instance for streaming
 */
const m14Function = (message, outputLength = 32) => {
    const formatted = formatMessage(message);
    return nobleM14.create({ dkLen: outputLength }).update(formatted).digest();
};

m14Function.outputLen = 32;  // Default output length
m14Function.blockLen = nobleM14.blockLen;
m14Function.create = nobleM14.create;

export const m14 = m14Function;

export default { k12, m14 }; 