import * as nobleHkdf from '@noble/hashes/hkdf';

/**
 * Derives a key using HKDF
 * @param {import('../types.js').HashFunction} hash - Hash function to use (e.g. sha256)
 * @param {string | Uint8Array} inputKey - Initial keying material
 * @param {string | Uint8Array} salt - Salt value (recommended to be random)
 * @param {string | Uint8Array} info - Context and application specific information
 * @param {number} length - Length of output keying material in bytes
 * @returns {Uint8Array} Derived key
 */
export const hkdf = (hash, inputKey, salt, info, length) => {
    return nobleHkdf.hkdf(hash, inputKey, salt, info, length);
};

/**
 * Extracts a pseudorandom key from input keying material
 * @param {import('../types.js').HashFunction} hash - Hash function to use (e.g. sha256)
 * @param {string | Uint8Array} inputKey - Initial keying material
 * @param {string | Uint8Array} salt - Salt value (recommended to be random)
 * @returns {Uint8Array} Pseudorandom key
 */
export const extract = (hash, inputKey, salt) => {
    return nobleHkdf.extract(hash, inputKey, salt);
};

/**
 * Expands a pseudorandom key to desired length
 * @param {import('../types.js').HashFunction} hash - Hash function to use (e.g. sha256)
 * @param {string | Uint8Array} prk - Pseudorandom key
 * @param {string | Uint8Array} info - Context and application specific information
 * @param {number} length - Length of output keying material in bytes
 * @returns {Uint8Array} Derived key
 */
export const expand = (hash, prk, info, length) => {
    return nobleHkdf.expand(hash, prk, info, length);
};

export default { hkdf, extract, expand };