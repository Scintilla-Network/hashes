export interface HashFunction {
    (data: string | Uint8Array): Uint8Array;
}

export const sha3_256: HashFunction;
export const sha3_512: HashFunction;
export const shake128: HashFunction;
export const shake256: HashFunction;
export const k12: HashFunction;
export const m14: HashFunction;
export const blake3: HashFunction;
export const turboshake128: HashFunction;
export const turboshake256: HashFunction;
export const recommended: HashFunction;
export const fast: HashFunction;

declare const pq: {
    sha3_256: HashFunction;
    sha3_512: HashFunction;
    shake128: HashFunction;
    shake256: HashFunction;
    k12: HashFunction;
    m14: HashFunction;
    blake3: HashFunction;
    turboshake128: HashFunction;
    turboshake256: HashFunction;
    recommended: HashFunction;
    fast: HashFunction;
};

export default pq; 