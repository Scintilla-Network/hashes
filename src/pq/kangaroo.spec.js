import { describe, it, expect } from '@scintilla-network/litest';
import { k12, m14 } from './kangaroo.js';
import { TEST_VECTOR } from '../test/vectors.js';

describe('Kangaroo Family', () => {
    describe('KangarooTwelve (K12)', () => {
        it('should hash with default output length', () => {
            const hash = k12(TEST_VECTOR.message);
            expect(hash).toBeInstanceOf(Uint8Array);
            expect(hash.length).toBe(32);
        });

        it('should hash with custom output length', () => {
            const hash64 = k12(TEST_VECTOR.message, 64);
            const hash128 = k12(TEST_VECTOR.message, 128);
            expect(hash64.length).toBe(64);
            expect(hash128.length).toBe(128);
        });

        it('should be deterministic', () => {
            const hash1 = k12(TEST_VECTOR.message);
            const hash2 = k12(TEST_VECTOR.message);
            expect(Buffer.from(hash1).toString('hex')).toBe(Buffer.from(hash2).toString('hex'));
        });

        it('should handle various input formats', () => {
            const stringHash = k12('test');
            const hexHash = k12('deadbeef');
            const jsonHash = k12({ test: 'value' });
            
            expect(stringHash).toBeInstanceOf(Uint8Array);
            expect(hexHash).toBeInstanceOf(Uint8Array);
            expect(jsonHash).toBeInstanceOf(Uint8Array);
            expect(stringHash.length).toBe(32);
            expect(hexHash.length).toBe(32);
            expect(jsonHash.length).toBe(32);
        });
    });

    describe('MarsupilamiFourteen (M14)', () => {
        it('should hash with default output length', () => {
            const hash = m14(TEST_VECTOR.message);
            expect(hash).toBeInstanceOf(Uint8Array);
            expect(hash.length).toBe(32);
        });

        it('should hash with custom output length', () => {
            const hash64 = m14(TEST_VECTOR.message, 64);
            const hash128 = m14(TEST_VECTOR.message, 128);
            expect(hash64.length).toBe(64);
            expect(hash128.length).toBe(128);
        });

        it('should be deterministic', () => {
            const hash1 = m14(TEST_VECTOR.message);
            const hash2 = m14(TEST_VECTOR.message);
            expect(Buffer.from(hash1).toString('hex')).toBe(Buffer.from(hash2).toString('hex'));
        });

        it('should handle various input formats', () => {
            const stringHash = m14('test');
            const hexHash = m14('deadbeef');
            const jsonHash = m14({ test: 'value' });
            
            expect(stringHash).toBeInstanceOf(Uint8Array);
            expect(hexHash).toBeInstanceOf(Uint8Array);
            expect(jsonHash).toBeInstanceOf(Uint8Array);
            expect(stringHash.length).toBe(32);
            expect(hexHash.length).toBe(32);
            expect(jsonHash.length).toBe(32);
        });
    });
}); 