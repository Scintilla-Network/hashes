/**
 * Common types for hash functions and utilities
 */

/**
 * Basic input types accepted by hash functions
 */
export type Input = string | Uint8Array | Record<string, unknown>;

/**
 * Internal hash instance for streaming operations
 */
export interface HashInstance {
    update(msg: Input): HashInstance;
    digestInto(out: Uint8Array): Uint8Array;
    digest(): Uint8Array;
    destroy(): void;
    _cloneInto(to?: HashInstance): HashInstance;
    blockLen: number;
    outputLen: number;
    clone(): HashInstance;
}

/**
 * Internal XOF (eXtendable Output Function) instance for streaming operations
 */
export interface XOFInstance extends HashInstance {
    xof(bytes: number): Uint8Array;
}

/**
 * Hash function interface with full functionality
 */
export interface HashFunction {
    (data: Input): Uint8Array;
    outputLen: number;
    blockLen: number;
    create(): HashInstance;
}

/**
 * XOF (eXtendable Output Function) interface for variable length output
 */
export interface XOFFunction extends HashFunction {
    (data: Input, outputLength?: number): Uint8Array;
    create(): XOFInstance;
}

/**
 * HMAC interface for streaming updates
 */
export interface HMAC {
    update(message: Input): HMAC;
    digest(): Uint8Array;
}

/**
 * PBKDF2 options interface
 */
export interface PBKDF2Options {
    c: number;      // Number of iterations
    dkLen: number;  // Output length
}

/**
 * Scrypt options interface
 */
export interface ScryptOptions {
    N: number;      // CPU/memory cost parameter (must be power of 2)
    r: number;      // Block size parameter
    p: number;      // Parallelization parameter
    dkLen: number;  // Desired key length in bytes
    onProgress?: (progress: number) => void;  // Progress callback (only for async version)
}

/**
 * Variable output length hash function interface
 */
export interface VariableOutputHashFunction extends HashFunction {
    (data: Input, outputLength?: number): Uint8Array;
}

/**
 * Key derivation function interface
 */
export interface KDF {
    (password: Input, salt: Input, options: PBKDF2Options | ScryptOptions): Uint8Array;
}

/**
 * Async key derivation function interface
 */
export interface AsyncKDF {
    (password: Input, salt: Input, options: PBKDF2Options | ScryptOptions): Promise<Uint8Array>;
}
