import { sha256 } from './sha256.js';
import { sha512 } from './sha512.js';
import { ripemd160 } from './ripemd160.js';
import { blake2b } from './blake2b.js';
import { blake2s } from './blake2s.js';

export const classic = {
    // Core hash functions
    sha256,
    sha512,
    ripemd160,
    blake2b,
    blake2s,

    // Recommended defaults
    recommended: sha256,    // Most widely used
    fast: ripemd160        // Best performance
};

export {
    sha256,
    sha512,
    ripemd160,
    blake2b,
    blake2s
};

export default classic; 