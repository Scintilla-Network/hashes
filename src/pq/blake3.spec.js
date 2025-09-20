import { describe, it, expect } from '@scintilla-network/litest';
import { blake3 } from './blake3.js';
import { TEST_VECTOR } from '../test/vectors.js';

describe('BLAKE3', () => {
    it('should hash with default output length', () => {
        const hash = blake3(TEST_VECTOR.message);
        expect(hash).toBeInstanceOf(Uint8Array);
        expect(hash.length).toBe(32);
    });

    it('should hash with custom output length', () => {
        const hash16 = blake3(TEST_VECTOR.message, 16);
        const hash64 = blake3(TEST_VECTOR.message, 64);
        expect(hash16.length).toBe(16);
        expect(hash64.length).toBe(64);
    });

    it('should be deterministic', () => {
        const hash1 = blake3(TEST_VECTOR.message);
        const hash2 = blake3(TEST_VECTOR.message);
        expect(Buffer.from(hash1).toString('hex')).toBe(Buffer.from(hash2).toString('hex'));
    });

    it('should handle various input formats', () => {
        const stringHash = blake3('test');
        const hexHash = blake3('deadbeef');
        const jsonHash = blake3({ test: 'value' });
        
        expect(stringHash).toBeInstanceOf(Uint8Array);
        expect(hexHash).toBeInstanceOf(Uint8Array);
        expect(jsonHash).toBeInstanceOf(Uint8Array);
        expect(stringHash.length).toBe(32);
        expect(hexHash.length).toBe(32);
        expect(jsonHash.length).toBe(32);
    });
}); 