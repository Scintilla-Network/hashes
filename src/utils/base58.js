const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const BASE = 58;

/**
 * @param {Uint8Array} data
 * @returns {string}
 */
export function encode(data) {
    if (!(data instanceof Uint8Array)) {
        throw new Error('Input must be Uint8Array');
    }

    let zeros = 0;
    while (zeros < data.length && data[zeros] === 0) {
        zeros++;
    }

    const input = Array.from(data);
    let carry, j;
    const digits = [];

    for (let i = zeros; i < input.length; i++) {
        carry = input[i];
        for (j = 0; j < digits.length; j++) {
            carry += digits[j] << 8;
            digits[j] = carry % BASE;
            carry = (carry / BASE) | 0;
        }
        while (carry > 0) {
            digits.push(carry % BASE);
            carry = (carry / BASE) | 0;
        }
    }

    let result = '1'.repeat(zeros);

    for (let i = digits.length - 1; i >= 0; i--) {
        result += BASE58_ALPHABET[digits[i]];
    }

    return result;
}

/**
 * @param {string} str
 * @returns {Uint8Array}
 */
export function decode(str) {
    if (typeof str !== 'string') {
        throw new Error('Input must be string');
    }

    let zeros = 0;
    while (zeros < str.length && str[zeros] === '1') {
        zeros++;
    }

    let length = str.length;
    let digits = new Uint8Array(length);
    let outputSize = 0;

    for (let i = zeros; i < length; i++) {
        let value = BASE58_ALPHABET.indexOf(str[i]);
        if (value === -1) {
            throw new Error('Invalid base58 character');
        }

        let carry = value;
        for (let j = 0; j < outputSize; j++) {
            carry += digits[j] * BASE;
            digits[j] = carry & 0xff;
            carry >>= 8;
        }

        while (carry > 0) {
            digits[outputSize++] = carry & 0xff;
            carry >>= 8;
        }
    }

    const result = new Uint8Array(zeros + outputSize);
    result.fill(0, 0, zeros);
    for (let i = 0; i < outputSize; i++) {
        result[result.length - 1 - i] = digits[i];
    }

    return result;
}

export default { encode, decode }; 