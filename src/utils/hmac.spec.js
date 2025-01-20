import { describe, it, expect } from 'vitest';
import { hmac, createHmac } from './hmac.js';
import { sha256 } from '@noble/hashes/sha256';

describe('HMAC Utilities', () => {
    const testKey = 'test-key';
    const testMessage = 'test-message';

    describe('hmac', () => {
        it('should compute HMAC with string inputs', () => {
            const result = hmac(sha256, testKey, testMessage);
            expect(result).toBeInstanceOf(Uint8Array);
            // Known HMAC-SHA256 value for test key/message
            const expectedHex = 'f8c2bb87c17608c9038eab4e92ef2775e42629c939d6fd3390d42f80af6bb712';
            expect(Buffer.from(result).toString('hex')).toBe(expectedHex);
        });

        it('should compute HMAC with Uint8Array inputs', () => {
            const keyBytes = new TextEncoder().encode(testKey);
            const messageBytes = new TextEncoder().encode(testMessage);
            const result = hmac(sha256, keyBytes, messageBytes);
            expect(result).toBeInstanceOf(Uint8Array);
            const expectedHex = 'f8c2bb87c17608c9038eab4e92ef2775e42629c939d6fd3390d42f80af6bb712';
            expect(Buffer.from(result).toString('hex')).toBe(expectedHex);
        });
    });

    describe('createHmac', () => {
        it('should create HMAC instance for streaming updates', () => {
            const hmacInstance = createHmac(sha256, testKey);
            expect(hmacInstance.update).toBeDefined();
            expect(hmacInstance.digest).toBeDefined();
            
            hmacInstance.update(testMessage);
            const result = hmacInstance.digest();
            expect(result).toBeInstanceOf(Uint8Array);
            const expectedHex = 'f8c2bb87c17608c9038eab4e92ef2775e42629c939d6fd3390d42f80af6bb712';
            expect(Buffer.from(result).toString('hex')).toBe(expectedHex);
        });

        it('should handle multiple updates', () => {
            const hmacInstance = createHmac(sha256, testKey);
            hmacInstance.update('test-');
            hmacInstance.update('message');
            const result = hmacInstance.digest();
            expect(result).toBeInstanceOf(Uint8Array);
            const expectedHex = 'f8c2bb87c17608c9038eab4e92ef2775e42629c939d6fd3390d42f80af6bb712';
            expect(Buffer.from(result).toString('hex')).toBe(expectedHex);
        });
    });
}); 