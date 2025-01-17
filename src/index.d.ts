declare module '@scintilla-network/hashes' {
    export interface HashFunction {
        (data: string | Uint8Array): Uint8Array;
    }

    export interface HashModule {
        recommended: HashFunction;
        fast?: HashFunction;
    }

    // Classic hash functions
    export const classic: {
        recommended: HashFunction;
        fast: HashFunction;
        sha256: HashFunction;
        sha512: HashFunction;
        blake2b: HashFunction;
        blake2s: HashFunction;
        ripemd160: HashFunction;
    };

    // Post-quantum hash functions
    export const pq: {
        recommended: HashFunction;
        fast: HashFunction;
        sha3_256: HashFunction;
        sha3_512: HashFunction;
        shake128: HashFunction;
        shake256: HashFunction;
        k12: HashFunction;
        m14: HashFunction;
        blake3: HashFunction;
        turboshake128: HashFunction;
        turboshake256: HashFunction;
    };

    // Utility functions
    export const utils: {
        bytesToHex: (bytes: Uint8Array) => string;
        randomBytes: (length: number) => Uint8Array;
        toHex: (data: string | Uint8Array) => string;
        fromHex: (hex: string) => Uint8Array;
        isHexString: (value: any) => boolean;
        isUint8Array: (value: any) => boolean;
        formatMessage: (message: string | Uint8Array) => Uint8Array;
        formatMessageHash: (hash: string | Uint8Array) => string;
        fromUtf8: (text: string) => Uint8Array;
        toUtf8: (bytes: Uint8Array) => string;
        fromJSON: (json: string) => any;
        toJSON: (data: any) => string;
        hash160: HashFunction;
        bech32: {
            encode: (prefix: string, words: number[]) => string;
            decode: (str: string) => { prefix: string; words: number[] };
            toWords: (bytes: Uint8Array) => number[];
            fromWords: (words: number[]) => Uint8Array;
        };
        bech32m: {
            encode: (prefix: string, words: number[]) => string;
            decode: (str: string) => { prefix: string; words: number[] };
            toWords: (bytes: Uint8Array) => number[];
            fromWords: (words: number[]) => Uint8Array;
        };
        doubleSha256: HashFunction;
    };

    // Individual exports from classic
    export const sha256: HashFunction;
    export const sha512: HashFunction;
    export const ripemd160: HashFunction;
    export const blake2b: HashFunction;
    export const blake2s: HashFunction;

    // Individual exports from pq
    export const sha3_256: HashFunction;
    export const sha3_512: HashFunction;
    export const shake128: HashFunction;
    export const shake256: HashFunction;
    export const k12: HashFunction;
    export const m14: HashFunction;
    export const blake3: HashFunction;
    export const turboshake128: HashFunction;
    export const turboshake256: HashFunction;

    // Top-level recommended exports
    export const recommended: HashFunction;
    export const fast: HashFunction;
    export const classic_recommended: HashFunction;

    const defaultExport: {
        classic: typeof classic;
        pq: typeof pq;
        utils: typeof utils;
        recommended: HashFunction;
        fast: HashFunction;
        classic_recommended: HashFunction;
    };
    export default defaultExport;
} 