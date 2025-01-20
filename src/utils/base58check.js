import { sha256 } from '../classic/index.js';
import { encode, decode } from './base58.js';

/**
 * Creates a base58check encoder/decoder with a specified hash function
 * @param {import('../types.js').HashFunction} [hashFunction=sha256] - Hash function to use for checksum
 * @returns {import('./index.d.ts').Base58Check} Base58Check encoder/decoder
 */
const createBase58check = (hashFunction = sha256) => {
    if (typeof hashFunction !== 'function') {
        throw new Error('Hash function must be a function');
    }

    return {
        encode(data) {
            if (!(data instanceof Uint8Array)) {
                throw new Error('Input must be Uint8Array');
            }

            const checksum = hashFunction(hashFunction(data)).slice(0, 4);
            const combined = new Uint8Array(data.length + 4);
            combined.set(data);
            combined.set(checksum, data.length);

            return encode(combined);
        },

        decode(str) {
            if (typeof str !== 'string') {
                throw new Error('Input must be string');
            }

            const decoded = decode(str);
            if (decoded.length < 4) {
                throw new Error('Invalid base58check string');
            }

            const data = decoded.slice(0, -4);
            const checksum = decoded.slice(-4);

            const newChecksum = hashFunction(hashFunction(data)).slice(0, 4);
            for (let i = 0; i < 4; i++) {
                if (checksum[i] !== newChecksum[i]) {
                    throw new Error('Invalid checksum');
                }
            }

            return data;
        }
    };
};

/**
 * Standard Base58Check implementation using SHA256
 * @type {import('./index.d.ts').Base58Check}
 */
export const base58check = createBase58check(sha256);

export default base58check;
export { createBase58check };