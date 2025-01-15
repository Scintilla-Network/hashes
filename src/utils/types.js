/**
 * Checks if a value is a valid hex string
 * @param {unknown} value - Value to check
 * @returns {boolean} True if value is a valid hex string
 */
export function isHexString(value) {
    if (typeof value !== 'string') {
        return false;
    }
    if (value.length === 0 || value.length % 2 !== 0) {
        return false;
    }
    return /^[0-9a-fA-F]+$/.test(value);
}

/**
 * Checks if a value is a Uint8Array
 * @param {unknown} value - Value to check
 * @returns {value is Uint8Array} True if value is a Uint8Array
 */
export function isUint8Array(value) {
    return value instanceof Uint8Array;
} 