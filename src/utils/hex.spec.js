import { describe, it, expect } from '@scintilla-network/litest';
import { toHex, fromHex } from './hex.js';

describe('Hex Utilities', () => {
    describe('toHex', () => {
        it('should convert Uint8Array to hex string', () => {
            const bytes = new Uint8Array([0xca, 0xfe, 0x01, 0x23]);
            expect(toHex(bytes)).toBe('cafe0123');
        });

        it('should handle empty array', () => {
            expect(toHex(new Uint8Array())).toBe('');
        });

        it('should pad single digit values with zero', () => {
            const bytes = new Uint8Array([0x1, 0x2, 0x3]);
            expect(toHex(bytes)).toBe('010203');
        });

        it('should throw for non-Uint8Array input', () => {
            expect(() => toHex('invalid')).toThrow('Input must be a Uint8Array');
            expect(() => toHex([1, 2, 3])).toThrow('Input must be a Uint8Array');
            expect(() => toHex(123)).toThrow('Input must be a Uint8Array');
        });
    });

    describe('fromHex', () => {
        it('should convert hex string to Uint8Array', () => {
            const result = fromHex('cafe0123');
            expect(result).toBeInstanceOf(Uint8Array);
            expect(Array.from(result)).toEqual([0xca, 0xfe, 0x01, 0x23]);
        });

        it('should handle empty string', () => {
            const result = fromHex('');
            expect(result).toBeInstanceOf(Uint8Array);
            expect(result.length).toBe(0);
        });

        it('should handle uppercase hex', () => {
            const result = fromHex('CAFE01');
            expect(Array.from(result)).toEqual([0xca, 0xfe, 0x01]);
        });

        it('should throw for invalid hex strings', () => {
            expect(() => fromHex('xyz')).toThrow('Input must be a hex string');
            expect(() => fromHex('123')).toThrow('Input must be a hex string');
            expect(() => fromHex('0x123')).toThrow('Input must be a hex string');
        });

        it('should throw for non-string input', () => {
            expect(() => fromHex(123)).toThrow('Input must be a hex string');
            expect(() => fromHex([])).toThrow('Input must be a hex string');
            expect(() => fromHex(null)).toThrow('Input must be a hex string');
        });
    });
}); 