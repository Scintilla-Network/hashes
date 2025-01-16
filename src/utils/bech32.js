/**
 * Bech32 and Bech32m address encoding implementation.
 * This module provides functions to encode and decode Bech32 addresses,
 * which are commonly used in blockchain applications.
 * @module bech32
 */

'use strict';

// The Bech32 character set for encoding
const ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

// Mapping of characters to their respective values
/** @type {Object.<string, number>} */
const ALPHABET_MAP = {};
for (let z = 0; z < ALPHABET.length; z++) {
    const x = ALPHABET.charAt(z);
    ALPHABET_MAP[x] = z;
}

/**
 * Performs one step of the polymod calculation.
 * @param {number} pre - The previous value in the polynomial calculation
 * @returns {number} The result of the polynomial step
 */
function polymodStep(pre) {
    const b = pre >> 25;
    return (
        ((pre & 0x1ffffff) << 5) ^
        (-((b >> 0) & 1) & 0x3b6a57b2) ^
        (-((b >> 1) & 1) & 0x26508e6d) ^
        (-((b >> 2) & 1) & 0x1ea119fa) ^
        (-((b >> 3) & 1) & 0x3d4233dd) ^
        (-((b >> 4) & 1) & 0x2a1462b3)
    );
}

/**
 * Verifies the checksum for a Bech32 prefix.
 * @param {string} prefix - The human-readable part of the address
 * @returns {number|string} The checksum value or an error message
 */
function prefixChk(prefix) {
    let chk = 1;
    for (let i = 0; i < prefix.length; ++i) {
        const c = prefix.charCodeAt(i);
        if (c < 33 || c > 126) return 'Invalid prefix (' + prefix + ')';

        chk = polymodStep(chk) ^ (c >> 5);
    }
    chk = polymodStep(chk);

    for (let i = 0; i < prefix.length; ++i) {
        const v = prefix.charCodeAt(i);
        chk = polymodStep(chk) ^ (v & 0x1f);
    }
    return chk;
}

/**
 * Converts data between different bit representations.
 * @param {number[]} data - Array of numbers to convert
 * @param {number} inBits - Number of bits in the input representation
 * @param {number} outBits - Number of bits in the output representation
 * @param {boolean} pad - Whether to pad the output
 * @returns {number[]|string} Converted data or error message
 */
function convert(data, inBits, outBits, pad) {
    let value = 0;
    let bits = 0;
    const maxV = (1 << outBits) - 1;

    const result = [];
    for (let i = 0; i < data.length; ++i) {
        value = (value << inBits) | data[i];
        bits += inBits;

        while (bits >= outBits) {
            bits -= outBits;
            result.push((value >> bits) & maxV);
        }
    }

    if (pad) {
        if (bits > 0) {
            result.push((value << (outBits - bits)) & maxV);
        }
    } else {
        if (bits >= inBits) return 'Excess padding';
        if ((value << (outBits - bits)) & maxV) return 'Non-zero padding';
    }

    return result;
}

/**
 * Converts bytes to 5-bit words.
 * @param {number[]} bytes - Array of bytes to convert
 * @returns {number[]} Array of 5-bit words
 */
function toWords(bytes) {
    return /** @type {number[]} */ (convert(bytes, 8, 5, true));
}

/**
 * Converts 5-bit words back to bytes, with error checking.
 * @param {number[]} words - Array of 5-bit words
 * @returns {number[]|undefined} Array of bytes or undefined if invalid
 */
function fromWordsUnsafe(words) {
    const res = convert(words, 5, 8, false);
    if (Array.isArray(res)) return res;
}

/**
 * Converts 5-bit words back to bytes, throwing on error.
 * @param {number[]} words - Array of 5-bit words
 * @returns {number[]} Array of bytes
 * @throws {Error} If the conversion fails
 */
function fromWords(words) {
    const res = convert(words, 5, 8, false);
    if (Array.isArray(res)) return res;

    throw new Error(res);
}

/**
 * Creates a Bech32 or Bech32m codec based on the encoding type.
 * @param {string} encoding - Either 'bech32' or 'bech32m'
 * @returns {Object} An object with encode/decode methods
 */
function getLibraryFromEncoding(encoding) {
    const ENCODING_CONST = encoding === 'bech32' ? 1 : 0x2bc830a3;

    /**
     * Encodes data into a Bech32/Bech32m string.
     * @param {string} prefix - The human-readable prefix
     * @param {number[]} words - Array of 5-bit words
     * @param {number} [LIMIT=90] - Maximum length of the encoded string
     * @returns {string} The encoded string
     */
    function encode(prefix, words, LIMIT = 90) {
        if (prefix.length + 7 + words.length > LIMIT) throw new TypeError('Exceeds length limit');

        prefix = prefix.toLowerCase();

        let chk = prefixChk(prefix);
        if (typeof chk === 'string') throw new Error(chk);

        let result = prefix + '1';
        for (let i = 0; i < words.length; ++i) {
            const x = words[i];
            if (x >> 5 !== 0) throw new Error('Non 5-bit word');

            chk = polymodStep(chk) ^ x;
            result += ALPHABET.charAt(x);
        }

        for (let i = 0; i < 6; ++i) {
            chk = polymodStep(chk);
        }
        chk ^= ENCODING_CONST;

        for (let i = 0; i < 6; ++i) {
            const v = (chk >> ((5 - i) * 5)) & 0x1f;
            result += ALPHABET.charAt(v);
        }

        return result;
    }

    /**
     * Internal decode function with detailed error messages.
     * @param {string} str - The string to decode
     * @param {number} [LIMIT=90] - Maximum length of the encoded string
     * @returns {string|{prefix: string, words: number[]}} Decoded data or error message
     * @private
     */
    function __decode(str, LIMIT = 90) {
        if (str.length < 8) return str + ' too short';
        if (str.length > LIMIT) return 'Exceeds length limit';

        const lowered = str.toLowerCase();
        const uppered = str.toUpperCase();
        if (str !== lowered && str !== uppered) return 'Mixed-case string ' + str;
        str = lowered;

        const split = str.lastIndexOf('1');
        if (split === -1) return 'No separator character for ' + str;
        if (split === 0) return 'Missing prefix for ' + str;

        const prefix = str.slice(0, split);
        const wordChars = str.slice(split + 1);
        if (wordChars.length < 6) return 'Data too short';

        let chk = prefixChk(prefix);
        if (typeof chk === 'string') return chk;

        const words = [];
        for (let i = 0; i < wordChars.length; ++i) {
            const c = wordChars.charAt(i);
            const v = ALPHABET_MAP[c];
            if (v === undefined) return 'Unknown character ' + c;
            chk = polymodStep(chk) ^ v;

            if (i + 6 >= wordChars.length) continue;
            words.push(v);
        }

        if (chk !== ENCODING_CONST) return 'Invalid checksum for ' + str;
        return { prefix, words };
    }

    /**
     * Decodes a Bech32/Bech32m string without throwing errors.
     * @param {string} str - The string to decode
     * @param {number} [LIMIT] - Maximum length of the encoded string
     * @returns {{prefix: string, words: number[]}|undefined} Decoded data or undefined if invalid
     */
    function decodeUnsafe(str, LIMIT) {
        const res = __decode(str, LIMIT);
        if (typeof res === 'object') return res;
    }

    /**
     * Decodes a Bech32/Bech32m string.
     * @param {string} str - The string to decode
     * @param {number} [LIMIT] - Maximum length of the encoded string
     * @returns {{prefix: string, words: number[]}} Decoded data
     * @throws {Error} If the string is invalid
     */
    function decode(str, LIMIT) {
        const res = __decode(str, LIMIT);
        if (typeof res === 'object') return res;

        throw new Error(res);
    }

    return {
        decodeUnsafe,
        decode,
        encode,
        toWords,
        fromWordsUnsafe,
        fromWords,
    };
}

// Create instances for both Bech32 and Bech32m encodings
const bech32 = getLibraryFromEncoding('bech32');
const bech32m = getLibraryFromEncoding('bech32m');

export { bech32, bech32m }; 