import { describe, it, expect } from '@scintilla-network/litest';
import { hash160 } from './hash160.js';

describe('hash160', () => {
    it('should compute correct Hash160 values', () => {
        // Test vector: "hello"
        const input = new TextEncoder().encode('hello');
        const expected = 'b6a9c8c230722b7c748331a8b450f05566dc7d0f';
        const result = Buffer.from(hash160(input)).toString('hex');
        expect(result).toBe(expected);
    });

    it('should handle empty input', () => {
        const input = new Uint8Array(0);
        const result = hash160(input);
        expect(result).toBeInstanceOf(Uint8Array);
        expect(result.length).toBe(20); // RIPEMD160 produces 20 bytes
    });

    it('should produce 20-byte output', () => {
        const input = new TextEncoder().encode('test');
        const result = hash160(input);
        expect(result.length).toBe(20); // RIPEMD160 produces 20 bytes
    });
}); 