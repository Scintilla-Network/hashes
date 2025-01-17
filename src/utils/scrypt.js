import { scrypt as nobleScrypt, scryptAsync as nobleScryptAsync } from '@noble/hashes/scrypt';

/**
 * Scrypt options interface
 * @typedef {object} ScryptOptions
 * @property {number} N - CPU/memory cost parameter (must be power of 2)
 * @property {number} r - Block size parameter
 * @property {number} p - Parallelization parameter
 * @property {number} dkLen - Desired key length in bytes
 * @property {((progress: number) => void)} [onProgress] - Progress callback (only for async version)
 */

/**
 * Derives a key using Scrypt
 * @param {string | Uint8Array} password - Password to derive key from
 * @param {string | Uint8Array} salt - Salt for key derivation
 * @param {ScryptOptions} options - Scrypt options
 * @returns {Uint8Array} Derived key
 */
export const scrypt = (password, salt, options) => {
    return nobleScrypt(password, salt, options);
};

/**
 * Asynchronously derives a key using Scrypt
 * @param {string | Uint8Array} password - Password to derive key from
 * @param {string | Uint8Array} salt - Salt for key derivation
 * @param {ScryptOptions} options - Scrypt options
 * @returns {Promise<Uint8Array>} Derived key
 */
export const scryptAsync = async (password, salt, options) => {
    return nobleScryptAsync(password, salt, options);
};

export default { scrypt, scryptAsync }; 