/**
 * @typedef {Uint8Array} HashInput
 */

import { isHexString } from './types.js';
import { fromHex } from './hex.js';

/**
 * Formats various input types into a Uint8Array for hashing
 * @param {string | Uint8Array | object} message - The message to format
 * @returns {Uint8Array} The formatted message as bytes
 * @throws {Error} If the message format is invalid
 */
export function formatMessage(message) {
    if (message instanceof Uint8Array) {
        return message;
    }
    if (typeof message === 'string') {
        if (isHexString(message)) {
            return fromHex(message);
        }
        return new TextEncoder().encode(message);
    }
    if (typeof message === 'object' && message !== null) {
        return new TextEncoder().encode(JSON.stringify(message));
    }
    throw new Error('Message must be a string, Uint8Array, or JSON object');
}

/**
 * Formats a message hash ensuring it's a valid 32-byte hash
 * @param {string | Uint8Array} messageHash - The hash to format
 * @returns {Uint8Array} The formatted 32-byte hash
 * @throws {Error} If the hash is invalid or not 32 bytes
 */
export function formatMessageHash(messageHash) {
    if (messageHash instanceof Uint8Array) {
        if (messageHash.length !== 32) {
            throw new Error('Message hash must be 32 bytes');
        }
        return messageHash;
    }
    if (typeof messageHash !== 'string') {
        throw new Error('Message must be a string');
    }
    if (!isHexString(messageHash)) {
        throw new Error('Message must be a hex string');
    }
    const bytes = fromHex(messageHash);
    if (bytes.length !== 32) {
        throw new Error('Message hash must be 32 bytes');
    }
    return bytes;
} 