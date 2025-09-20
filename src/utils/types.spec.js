import { describe, it, expect } from '@scintilla-network/litest';
import { isHexString, isUint8Array } from './types.js';

describe('Type Checking Utilities', () => {
    describe('isHexString', () => {
        it('should return true for valid hex strings', () => {
            expect(isHexString('0123456789abcdef')).toBe(true);
            expect(isHexString('ABCDEF')).toBe(true);
            expect(isHexString('00')).toBe(true);
        });

        it('should return false for invalid hex strings', () => {
            expect(isHexString('xyz')).toBe(false);
            expect(isHexString('0x123')).toBe(false);
            expect(isHexString('123g')).toBe(false);
        });

        it('should return false for odd length strings', () => {
            expect(isHexString('123')).toBe(false);
            expect(isHexString('f')).toBe(false);
        });

        it('should return false for non-strings', () => {
            expect(isHexString(123)).toBe(false);
            expect(isHexString(null)).toBe(false);
            expect(isHexString(undefined)).toBe(false);
            expect(isHexString([])).toBe(false);
        });
    });

    describe('isUint8Array', () => {
        it('should return true for Uint8Array', () => {
            expect(isUint8Array(new Uint8Array())).toBe(true);
            expect(isUint8Array(new Uint8Array([1, 2, 3]))).toBe(true);
            expect(isUint8Array(Buffer.from([]))).toBe(true);
        });

        it('should return false for non-Uint8Array types', () => {
            expect(isUint8Array([])).toBe(false);
            expect(isUint8Array(new Uint16Array())).toBe(false);
            expect(isUint8Array('123')).toBe(false);
            expect(isUint8Array(123)).toBe(false);
            expect(isUint8Array(null)).toBe(false);
            expect(isUint8Array(undefined)).toBe(false);
        });
    });
}); 