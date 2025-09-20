import { describe, it, expect } from '@scintilla-network/litest';
import { shake128, shake256 } from './shake.js';
import { TEST_VECTOR } from '../test/vectors.js';

describe('SHAKE', () => {
    describe('shake128', () => {
        it('should generate default length output', () => {
            const hash = shake128(TEST_VECTOR.message);
            expect(hash).toBeInstanceOf(Uint8Array);
            expect(hash.length).toBe(32);
        });

        it('should generate variable length output', () => {
            const hash64 = shake128(TEST_VECTOR.message, 64);
            const hash128 = shake128(TEST_VECTOR.message, 128);
            expect(hash64.length).toBe(64);
            expect(hash128.length).toBe(128);
        });

        it('should be deterministic', () => {
            const hash1 = shake128(TEST_VECTOR.message);
            const hash2 = shake128(TEST_VECTOR.message);
            expect(Buffer.from(hash1).toString('hex')).toBe(Buffer.from(hash2).toString('hex'));
        });

        it('should handle various input formats', () => {
            const stringHash = shake128('test');
            const hexHash = shake128('deadbeef');
            const jsonHash = shake128({ test: 'value' });
            
            expect(stringHash).toBeInstanceOf(Uint8Array);
            expect(hexHash).toBeInstanceOf(Uint8Array);
            expect(jsonHash).toBeInstanceOf(Uint8Array);
            expect(stringHash.length).toBe(32);
            expect(hexHash.length).toBe(32);
            expect(jsonHash.length).toBe(32);
        });
    });

    describe('shake256', () => {
        it('should generate default length output', () => {
            const hash = shake256(TEST_VECTOR.message);
            expect(hash).toBeInstanceOf(Uint8Array);
            expect(hash.length).toBe(32);
        });

        it('should generate variable length output', () => {
            const hash64 = shake256(TEST_VECTOR.message, 64);
            const hash128 = shake256(TEST_VECTOR.message, 128);
            expect(hash64.length).toBe(64);
            expect(hash128.length).toBe(128);
        });

        it('should be deterministic', () => {
            const hash1 = shake256(TEST_VECTOR.message);
            const hash2 = shake256(TEST_VECTOR.message);
            expect(Buffer.from(hash1).toString('hex')).toBe(Buffer.from(hash2).toString('hex'));
        });

        it('should handle various input formats', () => {
            const stringHash = shake256('test');
            const hexHash = shake256('deadbeef');
            const jsonHash = shake256({ test: 'value' });
            
            expect(stringHash).toBeInstanceOf(Uint8Array);
            expect(hexHash).toBeInstanceOf(Uint8Array);
            expect(jsonHash).toBeInstanceOf(Uint8Array);
            expect(stringHash.length).toBe(32);
            expect(hexHash.length).toBe(32);
            expect(jsonHash.length).toBe(32);
        });
    });
}); 