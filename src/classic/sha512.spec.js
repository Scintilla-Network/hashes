import { describe, it, expect } from '@scintilla-network/litest';
import { sha512 } from './sha512.js';
import { TEST_VECTOR } from '../test/vectors.js';

describe('SHA-512', () => {
    it('should hash empty message correctly', () => {
        const hash = sha512(TEST_VECTOR.emptyMessage);
        expect(hash).toBeInstanceOf(Uint8Array);
        expect(hash.length).toBe(64);
    });

    it('should hash test message correctly', () => {
        const hash = sha512(TEST_VECTOR.message);
        expect(hash).toBeInstanceOf(Uint8Array);
        expect(hash.length).toBe(64);
    });

    it('should handle various input formats', () => {
        const stringHash = sha512('test');
        const hexHash = sha512('deadbeef');
        const jsonHash = sha512({ test: 'value' });
        
        expect(stringHash).toBeInstanceOf(Uint8Array);
        expect(hexHash).toBeInstanceOf(Uint8Array);
        expect(jsonHash).toBeInstanceOf(Uint8Array);
        expect(stringHash.length).toBe(64);
        expect(hexHash.length).toBe(64);
        expect(jsonHash.length).toBe(64);
    });
}); 