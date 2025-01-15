import { describe, it, expect } from 'vitest';
import { fromUtf8, toUtf8 } from './utf8.js';

describe('UTF-8 Utilities', () => {
    describe('fromUtf8', () => {
        it('should convert string to Uint8Array', () => {
            const result = fromUtf8('test');
            expect(result).toBeInstanceOf(Uint8Array);
            expect(Array.from(result)).toEqual([116, 101, 115, 116]); // 'test' in UTF-8
        });

        it('should handle empty string', () => {
            const result = fromUtf8('');
            expect(result).toBeInstanceOf(Uint8Array);
            expect(result.length).toBe(0);
        });

        it('should handle special characters', () => {
            const result = fromUtf8('€');
            expect(Array.from(result)).toEqual([226, 130, 172]); // '€' in UTF-8
        });

        it('should throw for non-string input', () => {
            expect(() => fromUtf8(123)).toThrow('Input must be a string');
            expect(() => fromUtf8(null)).toThrow('Input must be a string');
            expect(() => fromUtf8(undefined)).toThrow('Input must be a string');
            expect(() => fromUtf8([])).toThrow('Input must be a string');
        });
    });

    describe('toUtf8', () => {
        it('should convert Uint8Array to string', () => {
            const bytes = new Uint8Array([116, 101, 115, 116]);
            expect(toUtf8(bytes)).toBe('test');
        });

        it('should handle empty array', () => {
            expect(toUtf8(new Uint8Array())).toBe('');
        });

        it('should handle special characters', () => {
            const bytes = new Uint8Array([226, 130, 172]); // '€' in UTF-8
            expect(toUtf8(bytes)).toBe('€');
        });

        it('should throw for non-Uint8Array input', () => {
            expect(() => toUtf8('invalid')).toThrow('Input must be a Uint8Array');
            expect(() => toUtf8([1, 2, 3])).toThrow('Input must be a Uint8Array');
            expect(() => toUtf8(123)).toThrow('Input must be a Uint8Array');
        });
    });
}); 