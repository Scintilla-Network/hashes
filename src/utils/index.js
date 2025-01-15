import { bytesToHex, randomBytes } from '@noble/hashes/utils';
import { sha256 } from '@noble/hashes/sha256';
import { toHex, fromHex } from './hex.js';
import { isHexString, isUint8Array } from './types.js';
import { fromUtf8, toUtf8 } from './utf8.js';
import { fromJSON, toJSON } from './json.js';
import { formatMessage, formatMessageHash } from './format.js';

// Re-export individual utilities
export { 
    bytesToHex,
    randomBytes,
    toHex,
    fromHex,
    isHexString,
    isUint8Array,
    formatMessage,
    formatMessageHash,
    fromUtf8,
    toUtf8,
    fromJSON,
    toJSON
};

/**
 * Performs Bitcoin's double SHA256 hash
 * @param {string | Uint8Array | Record<string, unknown>} message - Message to hash
 * @returns {Uint8Array} 32-byte double SHA256 hash
 */
export const doubleSha256 = (message) => {
    return sha256(sha256(formatMessage(message)));
};

/**
 * @typedef {object} Utils
 * @property {typeof bytesToHex} bytesToHex
 * @property {typeof randomBytes} randomBytes
 * @property {typeof toHex} toHex
 * @property {typeof fromHex} fromHex
 * @property {typeof isHexString} isHexString
 * @property {typeof isUint8Array} isUint8Array
 * @property {typeof formatMessage} formatMessage
 * @property {typeof formatMessageHash} formatMessageHash
 * @property {typeof fromUtf8} fromUtf8
 * @property {typeof toUtf8} toUtf8
 * @property {typeof fromJSON} fromJSON
 * @property {typeof toJSON} toJSON
 * @property {typeof doubleSha256} doubleSha256
 */

/** @type {Utils} */
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
    doubleSha256
};

export default utils; 