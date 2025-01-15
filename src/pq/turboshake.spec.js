import { describe, it, expect } from 'vitest';
import { turboshake128, turboshake256 } from './turboshake.js';
import { TEST_VECTOR } from '../test/vectors.js';

describe('TurboSHAKE', () => {
    describe('turboshake128', () => {
        it('should generate default length output', () => {
            const hash = turboshake128(TEST_VECTOR.message);
            expect(hash).toBeInstanceOf(Uint8Array);
            expect(hash.length).toBe(32);
        });

        it('should generate variable length output', () => {
            const hash64 = turboshake128(TEST_VECTOR.message, 64);
            const hash128 = turboshake128(TEST_VECTOR.message, 128);
            expect(hash64.length).toBe(64);
            expect(hash128.length).toBe(128);
        });

        it('should be deterministic', () => {
            const hash1 = turboshake128(TEST_VECTOR.message);
            const hash2 = turboshake128(TEST_VECTOR.message);
            expect(Buffer.from(hash1).toString('hex')).toBe(Buffer.from(hash2).toString('hex'));
        });

        it('should handle various input formats', () => {
            const stringHash = turboshake128('test');
            const hexHash = turboshake128('deadbeef');
            const jsonHash = turboshake128({ test: 'value' });
            
            expect(stringHash).toBeInstanceOf(Uint8Array);
            expect(hexHash).toBeInstanceOf(Uint8Array);
            expect(jsonHash).toBeInstanceOf(Uint8Array);
            expect(stringHash.length).toBe(32);
            expect(hexHash.length).toBe(32);
            expect(jsonHash.length).toBe(32);
        });
    });

    describe('turboshake256', () => {
        it('should generate default length output', () => {
            const hash = turboshake256(TEST_VECTOR.message);
            expect(hash).toBeInstanceOf(Uint8Array);
            expect(hash.length).toBe(32);
        });

        it('should generate variable length output', () => {
            const hash64 = turboshake256(TEST_VECTOR.message, 64);
            const hash128 = turboshake256(TEST_VECTOR.message, 128);
            expect(hash64.length).toBe(64);
            expect(hash128.length).toBe(128);
        });

        it('should be deterministic', () => {
            const hash1 = turboshake256(TEST_VECTOR.message);
            const hash2 = turboshake256(TEST_VECTOR.message);
            expect(Buffer.from(hash1).toString('hex')).toBe(Buffer.from(hash2).toString('hex'));
        });

        it('should handle various input formats', () => {
            const stringHash = turboshake256('test');
            const hexHash = turboshake256('deadbeef');
            const jsonHash = turboshake256({ test: 'value' });
            
            expect(stringHash).toBeInstanceOf(Uint8Array);
            expect(hexHash).toBeInstanceOf(Uint8Array);
            expect(jsonHash).toBeInstanceOf(Uint8Array);
            expect(stringHash.length).toBe(32);
            expect(hexHash.length).toBe(32);
            expect(jsonHash.length).toBe(32);
        });
    });
}); 