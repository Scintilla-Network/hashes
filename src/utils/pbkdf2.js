import { pbkdf2 as noblePbkdf2, pbkdf2Async as noblePbkdf2Async } from '@noble/hashes/pbkdf2';

/**
 * Derives a key using PBKDF2
 * @param {import('../types.js').HashFunction} hash - Hash function to use (e.g. sha256)
 * @param {string | Uint8Array} password - Password to derive key from
 * @param {string | Uint8Array} salt - Salt for key derivation
 * @param {import('../types.js').PBKDF2Options} options - PBKDF2 options
 * @returns {Uint8Array} Derived key
 */
export const pbkdf2 = (hash, password, salt, options) => {
    return noblePbkdf2(hash, password, salt, options);
};

/**
 * Asynchronously derives a key using PBKDF2
 * @param {import('../types.js').HashFunction} hash - Hash function to use (e.g. sha256)
 * @param {string | Uint8Array} password - Password to derive key from
 * @param {string | Uint8Array} salt - Salt for key derivation
 * @param {import('../types.js').PBKDF2Options} options - PBKDF2 options
 * @returns {Promise<Uint8Array>} Derived key
 */
export const pbkdf2Async = async (hash, password, salt, options) => {
    return noblePbkdf2Async(hash, password, salt, options);
};

export default { pbkdf2, pbkdf2Async }; 