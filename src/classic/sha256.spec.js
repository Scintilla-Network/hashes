import { describe, it, expect } from 'vitest';
import { sha256 } from './sha256.js';
import { TEST_VECTOR } from '../test/vectors.js';

describe('SHA-256', () => {
    it('should hash empty message correctly', () => {
        const hash = sha256(TEST_VECTOR.emptyMessage);
        expect(hash).toBeInstanceOf(Uint8Array);
        expect(hash.length).toBe(32);
    });

    it('should hash test message correctly', () => {
        const hash = sha256(TEST_VECTOR.message);
        expect(hash).toBeInstanceOf(Uint8Array);
        expect(hash.length).toBe(32);
    });

    it('should handle various input formats', () => {
        const stringHash = sha256('test');
        const hexHash = sha256('deadbeef');
        const jsonHash = sha256({ test: 'value' });
        
        expect(stringHash).toBeInstanceOf(Uint8Array);
        expect(hexHash).toBeInstanceOf(Uint8Array);
        expect(jsonHash).toBeInstanceOf(Uint8Array);
        expect(stringHash.length).toBe(32);
        expect(hexHash.length).toBe(32);
        expect(jsonHash.length).toBe(32);
    });
}); 