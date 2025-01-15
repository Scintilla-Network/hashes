import { sha3_256, sha3_512 } from './sha3.js';
import { shake128, shake256 } from './shake.js';
import { k12, m14 } from './kangaroo.js';
import { blake3 } from './blake3.js';
import { turboshake128, turboshake256 } from './turboshake.js';

export const pq = {
    // NIST recommended
    sha3_256,
    sha3_512,
    shake128,
    shake256,
    
    // High performance options
    k12,          // KangarooTwelve
    m14,          // MarsupilamiFourteen
    blake3,
    
    // Additional SHA3 variants
    turboshake128,
    turboshake256,
    
    // Recommended defaults
    recommended: sha3_512,    // Most secure
    fast: k12               // Best performance while maintaining security
};

export {
    // NIST recommended
    sha3_256,
    sha3_512,
    shake128,
    shake256,
    
    // High performance
    k12,
    m14,
    blake3,
    
    // Additional variants
    turboshake128,
    turboshake256
};

export default pq; 