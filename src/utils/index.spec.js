import { describe, it, expect } from 'vitest';
import { utils } from './index.js';
import { TEST_VECTOR } from '../test/vectors.js';

describe('Utility Functions', () => {
    describe('bytesToHex', () => {
        it('should convert bytes to hex string', () => {
            const hex = utils.bytesToHex(TEST_VECTOR.message);
            expect(hex).toBe('000102030405');
        });

        it('should handle empty array', () => {
            const hex = utils.bytesToHex(new Uint8Array(0));
            expect(hex).toBe('');
        });
    });

    describe('randomBytes', () => {
        it('should generate random bytes of specified length', () => {
            const random = utils.randomBytes(32);
            expect(random).toBeInstanceOf(Uint8Array);
            expect(random.length).toBe(32);
        });

        it('should generate different values on each call', () => {
            const random1 = utils.randomBytes(32);
            const random2 = utils.randomBytes(32);
            expect(Buffer.from(random1).toString('hex')).not.toBe(Buffer.from(random2).toString('hex'));
        });
    });

    describe('doubleSha256', () => {
        it('should perform double SHA256 hash', () => {
            const hash = utils.doubleSha256(TEST_VECTOR.message);
            expect(hash).toBeInstanceOf(Uint8Array);
            expect(hash.length).toBe(32); // SHA256 output is always 32 bytes
        });

        it('should handle empty input', () => {
            const hash = utils.doubleSha256(TEST_VECTOR.emptyMessage);
            expect(hash).toBeInstanceOf(Uint8Array);
            expect(hash.length).toBe(32);
        });
    });
}); 