import { turboshake128 as nobleTurbo128, turboshake256 as nobleTurbo256 } from '@noble/hashes/sha3-addons';
import { formatMessage } from '../utils/format.js';

/**
 * Computes TurboSHAKE128 hash of a message
 * @param {import('../types.js').Input} message - Message to hash
 * @param {number} [outputLength=32] - Desired output length in bytes
 * @returns {Uint8Array} TurboSHAKE128 hash of specified length
 * @property {number} outputLen - Default output length in bytes (32)
 * @property {number} blockLen - Length of hash block in bytes
 * @property {function(): import('../types.js').XOFInstance} create - Creates new TurboSHAKE128 hash instance for streaming
 */
const turboshake128Function = (message, outputLength = 32) => {
    const formatted = formatMessage(message);
    return nobleTurbo128.create({}).update(formatted).xof(outputLength);
};

turboshake128Function.outputLen = 32;  // Default output length
turboshake128Function.blockLen = nobleTurbo128.blockLen;
turboshake128Function.create = () => nobleTurbo128.create({});

export const turboshake128 = turboshake128Function;

/**
 * Computes TurboSHAKE256 hash of a message
 * @param {import('../types.js').Input} message - Message to hash
 * @param {number} [outputLength=32] - Desired output length in bytes
 * @returns {Uint8Array} TurboSHAKE256 hash of specified length
 * @property {number} outputLen - Default output length in bytes (32)
 * @property {number} blockLen - Length of hash block in bytes
 * @property {function(): import('../types.js').XOFInstance} create - Creates new TurboSHAKE256 hash instance for streaming
 */
const turboshake256Function = (message, outputLength = 32) => {
    const formatted = formatMessage(message);
    return nobleTurbo256.create({}).update(formatted).xof(outputLength);
};

turboshake256Function.outputLen = 32;  // Default output length
turboshake256Function.blockLen = nobleTurbo256.blockLen;
turboshake256Function.create = () => nobleTurbo256.create({});

export const turboshake256 = turboshake256Function;

export default { turboshake128, turboshake256 }; 