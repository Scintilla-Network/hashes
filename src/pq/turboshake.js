import { turboshake128 as nobleTurbo128, turboshake256 as nobleTurbo256 } from '@noble/hashes/sha3-addons';
import { formatMessage } from '../utils/format.js';

/**
 * Computes TurboSHAKE128 hash of a message
 * @param {string | Uint8Array | Record<string, unknown>} message - Message to hash
 * @param {number} [outputLength=32] - Desired output length in bytes (default: 32)
 * @returns {Uint8Array} TurboSHAKE128 hash of specified length
 */
export const turboshake128 = (message, outputLength = 32) => {
    const formatted = formatMessage(message);
    return nobleTurbo128.create({}).update(formatted).xof(outputLength);
};

/**
 * Computes TurboSHAKE256 hash of a message
 * @param {string | Uint8Array | Record<string, unknown>} message - Message to hash
 * @param {number} [outputLength=32] - Desired output length in bytes (default: 32)
 * @returns {Uint8Array} TurboSHAKE256 hash of specified length
 */
export const turboshake256 = (message, outputLength = 32) => {
    const formatted = formatMessage(message);
    return nobleTurbo256.create({}).update(formatted).xof(outputLength);
};

/** @type {{turboshake128: typeof turboshake128, turboshake256: typeof turboshake256}} */
export default {
    turboshake128,
    turboshake256
}; 