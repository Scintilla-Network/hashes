import { expect } from 'chai';
import { createBase58check } from './base58check.js';
import { sha256 } from '../classic/index.js';

describe('base58check', () => {
    const base58check = createBase58check(sha256);

    it('should encode and decode data correctly', () => {
        const testData = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04]);
        const encoded = base58check.encode(testData);
        const decoded = base58check.decode(encoded);
        expect(Array.from(decoded)).to.deep.equal(Array.from(testData));
    });

    it('should handle zero bytes at start', () => {
        const testData = new Uint8Array([0x00, 0x00, 0x01, 0x02]);
        const encoded = base58check.encode(testData);
        const decoded = base58check.decode(encoded);
        expect(Array.from(decoded)).to.deep.equal(Array.from(testData));
    });

    it('should throw on invalid input for encode', () => {
        expect(() => base58check.encode('invalid')).to.throw('Input must be Uint8Array');
        expect(() => base58check.encode(null)).to.throw('Input must be Uint8Array');
    });

    it('should throw on invalid input for decode', () => {
        expect(() => base58check.decode(123)).to.throw('Input must be string');
        expect(() => base58check.decode(null)).to.throw('Input must be string');
    });

    it('should throw on invalid base58 characters', () => {
        expect(() => base58check.decode('invalid0')).to.throw('Invalid base58 character');
    });

    it('should throw on invalid checksum', () => {
        const testData = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04]);
        const encoded = base58check.encode(testData);
        const corrupted = encoded.slice(0, -1) + '1';
        expect(() => base58check.decode(corrupted)).to.throw('Invalid checksum');
    });

    it('should throw on invalid hash function', () => {
        expect(() => createBase58check('not a function')).to.throw('Hash function must be a function');
    });
}); 