import { bytesToHex, randomBytes } from '@noble/hashes/utils';
import { sha256 } from '@noble/hashes/sha256';
import { toHex, fromHex } from './hex.js';
import { isHexString, isUint8Array } from './types.js';
import { fromUtf8, toUtf8 } from './utf8.js';
import { fromJSON, toJSON } from './json.js';
import { formatMessage, formatMessageHash } from './format.js';
import { bech32, bech32m } from './bech32.js';
import { hash160 } from './hash160.js';
import { hmac, createHmac } from './hmac.js';
import { hkdf, extract as hkdfExtract, expand as hkdfExpand } from './hkdf.js';
import { pbkdf2, pbkdf2Async } from './pbkdf2.js';
import { scrypt, scryptAsync } from './scrypt.js';

/**
 * @typedef {string | Uint8Array | Record<string, unknown>} HashInput
 */

// Create namespace object
export const utils = {
    // From @noble/hashes
    bytesToHex,
    randomBytes,
    
    // Local implementations
    toHex,
    fromHex,
    isHexString,
    isUint8Array,
    
    // Format utilities
    formatMessage,
    formatMessageHash,
    
    // UTF-8 utilities
    fromUtf8,
    toUtf8,
    
    // JSON utilities
    fromJSON,
    toJSON,
    
    // Hash utilities
    hash160,
    /** @type {(message: HashInput) => Uint8Array} */
    doubleSha256: (message) => sha256(sha256(formatMessage(message))),
    
    // Key derivation
    hmac,
    createHmac,
    hkdf,
    hkdfExtract,
    hkdfExpand,
    pbkdf2,
    pbkdf2Async,
    scrypt,
    scryptAsync,
    
    // Address encoding
    bech32,
    bech32m
};

// Individual exports
export {
    // From @noble/hashes
    bytesToHex,
    randomBytes,
    
    // Local implementations
    toHex,
    fromHex,
    isHexString,
    isUint8Array,
    
    // Format utilities
    formatMessage,
    formatMessageHash,
    
    // UTF-8 utilities
    fromUtf8,
    toUtf8,
    
    // JSON utilities
    fromJSON,
    toJSON,
    
    // Hash utilities
    hash160,
    
    // Key derivation
    hmac,
    createHmac,
    hkdf,
    hkdfExtract,
    hkdfExpand,
    pbkdf2,
    pbkdf2Async,
    scrypt,
    scryptAsync,
    
    // Address encoding
    bech32,
    bech32m
};

/**
 * Performs Bitcoin's double SHA256 hash
 * @param {HashInput} message - Message to hash
 * @returns {Uint8Array} 32-byte double SHA256 hash
 */
export const doubleSha256 = (message) => sha256(sha256(formatMessage(message)));

// Default export
export default utils; 