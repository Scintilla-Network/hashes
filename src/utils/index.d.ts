export interface HashFunction {
    (data: string | Uint8Array): Uint8Array;
}

export const bytesToHex: (bytes: Uint8Array) => string;
export const randomBytes: (length: number) => Uint8Array;
export const toHex: (data: string | Uint8Array) => string;
export const fromHex: (hex: string) => Uint8Array;
export const isHexString: (value: any) => boolean;
export const isUint8Array: (value: any) => boolean;
export const formatMessage: (message: string | Uint8Array) => Uint8Array;
export const formatMessageHash: (hash: string | Uint8Array) => string;
export const fromUtf8: (text: string) => Uint8Array;
export const toUtf8: (bytes: Uint8Array) => string;
export const fromJSON: (json: string) => any;
export const toJSON: (data: any) => string;
export const hash160: HashFunction;
export const doubleSha256: HashFunction;

export const bech32: {
    encode: (prefix: string, words: number[]) => string;
    decode: (str: string) => { prefix: string; words: number[] };
    toWords: (bytes: Uint8Array) => number[];
    fromWords: (words: number[]) => Uint8Array;
};

export const bech32m: {
    encode: (prefix: string, words: number[]) => string;
    decode: (str: string) => { prefix: string; words: number[] };
    toWords: (bytes: Uint8Array) => number[];
    fromWords: (words: number[]) => Uint8Array;
};

declare const utils: {
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
    doubleSha256: HashFunction;
    bech32: typeof bech32;
    bech32m: typeof bech32m;
};

export default utils; 