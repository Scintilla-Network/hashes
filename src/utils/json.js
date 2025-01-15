import { isUint8Array } from './types.js';

/**
 * Converts a JSON object to bytes
 * @param {Record<string, unknown>} obj - JSON object to convert
 * @returns {Uint8Array} UTF-8 encoded JSON bytes
 * @throws {Error} If input is not a valid JSON object
 */
export function fromJSON(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        throw new Error('Input must be a JSON object');
    }
    return new TextEncoder().encode(JSON.stringify(obj));
}

/**
 * Converts bytes to a JSON object
 * @param {Uint8Array} bytes - UTF-8 encoded JSON bytes
 * @returns {Record<string, unknown>} Parsed JSON object
 * @throws {Error} If input is not a valid Uint8Array or not valid JSON
 */
export function toJSON(bytes) {
    if (!isUint8Array(bytes)) {
        throw new Error('Input must be a Uint8Array');
    }
    return JSON.parse(new TextDecoder().decode(bytes));
} 