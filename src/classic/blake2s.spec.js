import { describe, it, expect } from '@scintilla-network/litest';
import { blake2s } from './blake2s.js';
import { TEST_VECTOR } from '../test/vectors.js';

describe('BLAKE2s', () => {
    it('should hash with default output length', () => {
        const hash = blake2s(TEST_VECTOR.message);
        expect(hash).toBeInstanceOf(Uint8Array);
        expect(hash.length).toBe(32);
    });

    it('should hash with custom output length', () => {
        const hash16 = blake2s(TEST_VECTOR.message, { dkLen: 16 });
        const hash24 = blake2s(TEST_VECTOR.message, { dkLen: 24 });
        expect(hash16.length).toBe(16);
        expect(hash24.length).toBe(24);
    });

    it('should be deterministic', () => {
        const hash1 = blake2s(TEST_VECTOR.message);
        const hash2 = blake2s(TEST_VECTOR.message);
        expect(Buffer.from(hash1).toString('hex')).toBe(Buffer.from(hash2).toString('hex'));
    });

    it('should handle various input formats', () => {
        const stringHash = blake2s('test');
        const hexHash = blake2s('deadbeef');
        const jsonHash = blake2s({ test: 'value' });
        
        expect(stringHash).toBeInstanceOf(Uint8Array);
        expect(hexHash).toBeInstanceOf(Uint8Array);
        expect(jsonHash).toBeInstanceOf(Uint8Array);
        expect(stringHash.length).toBe(32);
        expect(hexHash.length).toBe(32);
        expect(jsonHash.length).toBe(32);
    });
}); 