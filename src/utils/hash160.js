/**
 * Hash160 is a commonly used hash function in cryptocurrencies that combines
 * SHA256 and RIPEMD160. It's used primarily for generating addresses from public keys.
 * @module hash160
 */

import { sha256 } from '../classic/sha256.js';
import { ripemd160 } from '../classic/ripemd160.js';

/**
 * Computes Hash160 (RIPEMD160(SHA256(input))) of the input data
 * @param {Uint8Array} data - The input data to hash
 * @returns {Uint8Array} The Hash160 digest
 */
export function hash160(data) {
    return ripemd160(sha256(data));
} 