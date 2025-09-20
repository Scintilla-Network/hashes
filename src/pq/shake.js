import { shake128 as nobleShake128, shake256 as nobleShake256 } from '@noble/hashes/sha3.js';
import { formatMessage } from '../utils/format.js';

/**
 * Computes SHAKE128 hash of a message
 * @param {import('../types.js').Input} message - Message to hash
 * @param {number} [outputLength=32] - Desired output length in bytes
 * @returns {Uint8Array} Hash of specified length
 * @property {number} outputLen - Default output length in bytes (32)
 * @property {number} blockLen - Length of hash block in bytes
 * @property {function(): import('../types.js').XOFInstance} create - Creates new SHAKE128 hash instance for streaming
 */
const shake128Function = (message, outputLength = 32) => {
    const formatted = formatMessage(message);
    return nobleShake128.create({}).update(formatted).xof(outputLength);
};

shake128Function.outputLen = 32;  // Default output length
shake128Function.blockLen = nobleShake128.blockLen;
shake128Function.create = () => nobleShake128.create({});

export const shake128 = shake128Function;

/**
 * Computes SHAKE256 hash of a message
 * @param {import('../types.js').Input} message - Message to hash
 * @param {number} [outputLength=32] - Desired output length in bytes
 * @returns {Uint8Array} Hash of specified length
 * @property {number} outputLen - Default output length in bytes (32)
 * @property {number} blockLen - Length of hash block in bytes
 * @property {function(): import('../types.js').XOFInstance} create - Creates new SHAKE256 hash instance for streaming
 */
const shake256Function = (message, outputLength = 32) => {
    const formatted = formatMessage(message);
    return nobleShake256.create({ dkLen: outputLength }).update(formatted).xof(outputLength);
};

shake256Function.outputLen = nobleShake256.outputLen;  // Default output length
shake256Function.blockLen = nobleShake256.blockLen;
shake256Function.create = nobleShake256.create;

export const shake256 = shake256Function;

export default { shake128, shake256 }; 