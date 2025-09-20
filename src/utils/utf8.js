import { utf8ToBytes as fromUtf8Str } from '@noble/hashes/utils.js';
import { isUint8Array } from './types.js';

/**
 * Converts a string to UTF-8 bytes
 * @param {string} str - String to convert
 * @returns {Uint8Array} UTF-8 encoded bytes
 * @throws {Error} If input is not a string
 */
export const fromUtf8 = (str) => {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string, use utils.formatMessage() for automatic conversion');
    }
    return fromUtf8Str(str);
};

/**
 * Converts UTF-8 bytes to a string
 * @param {Uint8Array} bytes - UTF-8 encoded bytes
 * @returns {string} Decoded string
 * @throws {Error} If input is not a Uint8Array
 */
export const toUtf8 = (bytes) => {
    if (!isUint8Array(bytes)) {
        throw new Error('Input must be a Uint8Array, use utils.formatMessage() for automatic conversion');
    }
    return new TextDecoder().decode(bytes);
}; 