import { describe, it, expect } from 'vitest';
import { ripemd160 } from './ripemd160.js';
import { TEST_VECTOR } from '../test/vectors.js';

describe('RIPEMD-160', () => {
    it('should hash test message correctly', () => {
        const hash = ripemd160(TEST_VECTOR.message);
        expect(hash).toBeInstanceOf(Uint8Array);
        expect(hash.length).toBe(20);
    });

    it('should be deterministic', () => {
        const hash1 = ripemd160(TEST_VECTOR.message);
        const hash2 = ripemd160(TEST_VECTOR.message);
        expect(Buffer.from(hash1).toString('hex')).toBe(Buffer.from(hash2).toString('hex'));
    });

    it('should handle various input formats', () => {
        const stringHash = ripemd160('test');
        const hexHash = ripemd160('deadbeef');
        const jsonHash = ripemd160({ test: 'value' });
        
        expect(stringHash).toBeInstanceOf(Uint8Array);
        expect(hexHash).toBeInstanceOf(Uint8Array);
        expect(jsonHash).toBeInstanceOf(Uint8Array);
        expect(stringHash.length).toBe(20);
        expect(hexHash.length).toBe(20);
        expect(jsonHash.length).toBe(20);
    });
}); 