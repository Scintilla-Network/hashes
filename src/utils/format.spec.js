import { describe, it, expect } from '@scintilla-network/litest';
import { formatMessage, formatMessageHash } from './format.js';

describe('Format Utilities', () => {
    describe('formatMessage', () => {
        it('should pass through Uint8Array', () => {
            const bytes = new Uint8Array([1, 2, 3]);
            expect(formatMessage(bytes)).toBe(bytes);
        });

        it('should convert hex string', () => {
            const result = formatMessage('010203');
            expect(result).toBeInstanceOf(Uint8Array);
            expect(Array.from(result)).toEqual([1, 2, 3]);
        });

        it('should convert UTF-8 string', () => {
            const result = formatMessage('test');
            expect(result).toBeInstanceOf(Uint8Array);
            expect(new TextDecoder().decode(result)).toBe('test');
        });

        it('should convert JSON object', () => {
            const obj = { test: 'value' };
            const result = formatMessage(obj);
            expect(result).toBeInstanceOf(Uint8Array);
            expect(JSON.parse(new TextDecoder().decode(result))).toEqual(obj);
        });

        it('should throw for invalid input', () => {
            expect(() => formatMessage(123)).toThrow('Message must be a string, Uint8Array, or JSON object');
            expect(() => formatMessage(null)).toThrow('Message must be a string, Uint8Array, or JSON object');
            expect(() => formatMessage(undefined)).toThrow('Message must be a string, Uint8Array, or JSON object');
        });
    });

    describe('formatMessageHash', () => {
        it('should pass through valid 32-byte Uint8Array', () => {
            const bytes = new Uint8Array(32).fill(1);
            expect(formatMessageHash(bytes)).toBe(bytes);
        });

        it('should convert valid hex string', () => {
            const hex = '0'.repeat(64); // 32 bytes
            const result = formatMessageHash(hex);
            expect(result).toBeInstanceOf(Uint8Array);
            expect(result.length).toBe(32);
        });

        it('should throw for invalid length Uint8Array', () => {
            const bytes = new Uint8Array(31);
            expect(() => formatMessageHash(bytes)).toThrow('Message hash must be 32 bytes');
        });

        it('should throw for invalid length hex string', () => {
            expect(() => formatMessageHash('0'.repeat(62))).toThrow('Message hash must be 32 bytes');
        });

        it('should throw for non-hex string', () => {
            expect(() => formatMessageHash('not a hex string')).toThrow('Message must be a hex string');
        });

        it('should throw for invalid input type', () => {
            expect(() => formatMessageHash(123)).toThrow('Message must be a string');
            expect(() => formatMessageHash(null)).toThrow('Message must be a string');
            expect(() => formatMessageHash(undefined)).toThrow('Message must be a string');
            expect(() => formatMessageHash({})).toThrow('Message must be a string');
        });
    });
}); 