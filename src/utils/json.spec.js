import { describe, it, expect } from 'vitest';
import { fromJSON, toJSON } from './json.js';

describe('JSON Utilities', () => {
    describe('fromJSON', () => {
        it('should convert object to Uint8Array', () => {
            const obj = { test: 'value', num: 123 };
            const result = fromJSON(obj);
            expect(result).toBeInstanceOf(Uint8Array);
            expect(toJSON(result)).toEqual(obj);
        });

        it('should handle empty object', () => {
            const result = fromJSON({});
            expect(result).toBeInstanceOf(Uint8Array);
            expect(toJSON(result)).toEqual({});
        });

        it('should handle nested objects', () => {
            const obj = { 
                nested: { 
                    array: [1, 2, 3],
                    str: 'test'
                }
            };
            const result = fromJSON(obj);
            expect(result).toBeInstanceOf(Uint8Array);
            expect(toJSON(result)).toEqual(obj);
        });

        it('should throw for non-object input', () => {
            expect(() => fromJSON('invalid')).toThrow('Input must be a JSON object');
            expect(() => fromJSON(123)).toThrow('Input must be a JSON object');
            expect(() => fromJSON(null)).toThrow('Input must be a JSON object');
            expect(() => fromJSON(undefined)).toThrow('Input must be a JSON object');
            expect(() => fromJSON([1, 2, 3])).toThrow('Input must be a JSON object');
        });
    });

    describe('toJSON', () => {
        it('should convert Uint8Array to object', () => {
            const obj = { test: 'value', num: 123 };
            const bytes = new TextEncoder().encode(JSON.stringify(obj));
            expect(toJSON(bytes)).toEqual(obj);
        });

        it('should handle empty object', () => {
            const bytes = new TextEncoder().encode('{}');
            expect(toJSON(bytes)).toEqual({});
        });

        it('should handle nested objects', () => {
            const obj = { 
                nested: { 
                    array: [1, 2, 3],
                    str: 'test'
                }
            };
            const bytes = new TextEncoder().encode(JSON.stringify(obj));
            expect(toJSON(bytes)).toEqual(obj);
        });

        it('should throw for non-Uint8Array input', () => {
            expect(() => toJSON('invalid')).toThrow('Input must be a Uint8Array');
            expect(() => toJSON([1, 2, 3])).toThrow('Input must be a Uint8Array');
            expect(() => toJSON(123)).toThrow('Input must be a Uint8Array');
        });

        it('should throw for invalid JSON', () => {
            const invalidJSON = new TextEncoder().encode('{invalid json}');
            expect(() => toJSON(invalidJSON)).toThrow();
        });
    });
}); 