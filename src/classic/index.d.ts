import { HashFunction } from '../types.js';

export const sha256: HashFunction;
export const sha512: HashFunction;
export const ripemd160: HashFunction;
export const blake2b: HashFunction;
export const blake2s: HashFunction;
export const recommended: HashFunction;
export const fast: HashFunction;

declare const classic: {
    sha256: HashFunction;
    sha512: HashFunction;
    ripemd160: HashFunction;
    blake2b: HashFunction;
    blake2s: HashFunction;
    recommended: HashFunction;
    fast: HashFunction;
};

export default classic; 