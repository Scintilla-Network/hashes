import { describe, it, expect } from '@scintilla-network/litest';
import { blake2b } from './blake2b.js';
import { TEST_VECTOR } from '../test/vectors.js';

describe('BLAKE2b', () => {
    it('should hash with default output length', () => {
        const hash = blake2b(TEST_VECTOR.message);
        expect(hash).toBeInstanceOf(Uint8Array);
        expect(hash.length).toBe(64);
    });

    it('should hash with custom output length', () => {
        const hash32 = blake2b(TEST_VECTOR.message, { dkLen: 32 });
        const hash48 = blake2b(TEST_VECTOR.message, { dkLen: 48 });
        expect(hash32.length).toBe(32);
        expect(hash48.length).toBe(48);
    });

    it('should be deterministic', () => {
        const hash1 = blake2b(TEST_VECTOR.message);
        const hash2 = blake2b(TEST_VECTOR.message);
        expect(Buffer.from(hash1).toString('hex')).toBe(Buffer.from(hash2).toString('hex'));
    });

    it('should handle various input formats', () => {
        const stringHash = blake2b('test');
        const hexHash = blake2b('deadbeef');
        const jsonHash = blake2b({ test: 'value' });
        
        expect(stringHash).toBeInstanceOf(Uint8Array);
        expect(hexHash).toBeInstanceOf(Uint8Array);
        expect(jsonHash).toBeInstanceOf(Uint8Array);
        expect(stringHash.length).toBe(64);
        expect(hexHash.length).toBe(64);
        expect(jsonHash.length).toBe(64);
    });
}); 