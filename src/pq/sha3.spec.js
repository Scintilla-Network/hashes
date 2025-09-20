import { describe, it, expect } from '@scintilla-network/litest';
import { sha3_256, sha3_512, keccak_256 } from './sha3.js';
import { TEST_VECTOR } from '../test/vectors.js';

describe('SHA3', () => {
    describe('sha3_256', () => {
        it('should hash empty message correctly', () => {
            const hash = sha3_256(TEST_VECTOR.emptyMessage);
            expect(hash).toBeInstanceOf(Uint8Array);
            expect(hash.length).toBe(32);
        });

        it('should hash test message correctly', () => {
            const hash = sha3_256(TEST_VECTOR.message);
            expect(hash).toBeInstanceOf(Uint8Array);
            expect(hash.length).toBe(32);
        });

        it('should handle various input formats', () => {
            const stringHash = sha3_256('test');
            const hexHash = sha3_256('deadbeef');
            const jsonHash = sha3_256({ test: 'value' });
            const uint8ArrayHash = sha3_256(new Uint8Array([0xde, 0xad, 0xbe, 0xef]));
            
            expect(stringHash).toBeInstanceOf(Uint8Array);
            expect(hexHash).toBeInstanceOf(Uint8Array);
            expect(jsonHash).toBeInstanceOf(Uint8Array);
            expect(uint8ArrayHash).toBeInstanceOf(Uint8Array);
            expect(stringHash.length).toBe(32);
            expect(hexHash.length).toBe(32);
            expect(jsonHash.length).toBe(32);
            expect(uint8ArrayHash.length).toBe(32);
        });
    });

    describe('sha3_512', () => {
        it('should hash empty message correctly', () => {
            const hash = sha3_512(TEST_VECTOR.emptyMessage);
            expect(hash).toBeInstanceOf(Uint8Array);
            expect(hash.length).toBe(64);
        });

        it('should hash test message correctly', () => {
            const hash = sha3_512(TEST_VECTOR.message);
            expect(hash).toBeInstanceOf(Uint8Array);
            expect(hash.length).toBe(64);
        });

        it('should handle various input formats', () => {
            const stringHash = sha3_512('test');
            const hexHash = sha3_512('deadbeef');
            const jsonHash = sha3_512({ test: 'value' });
            
            expect(stringHash).toBeInstanceOf(Uint8Array);
            expect(hexHash).toBeInstanceOf(Uint8Array);
            expect(jsonHash).toBeInstanceOf(Uint8Array);
            expect(stringHash.length).toBe(64);
            expect(hexHash.length).toBe(64);
            expect(jsonHash.length).toBe(64);
        });
    });

    describe('keccak_256', () => {
        it('should hash empty message correctly', () => {
            const hash = keccak_256(TEST_VECTOR.emptyMessage);
            expect(hash).toBeInstanceOf(Uint8Array);
            expect(hash.length).toBe(32);
        });

        it('should hash test message correctly', () => {
            const hash = keccak_256(TEST_VECTOR.message);
            expect(hash).toBeInstanceOf(Uint8Array);
            expect(hash.length).toBe(32);
        });

        it('should handle various input formats', () => {
            const stringHash = keccak_256('test');
            const hexHash = keccak_256('deadbeef');
            const jsonHash = keccak_256({ test: 'value' });
            const uint8ArrayHash = keccak_256(new Uint8Array([0xde, 0xad, 0xbe, 0xef]));
            
            expect(stringHash).toBeInstanceOf(Uint8Array);
            expect(hexHash).toBeInstanceOf(Uint8Array);
            expect(jsonHash).toBeInstanceOf(Uint8Array);
            expect(uint8ArrayHash).toBeInstanceOf(Uint8Array);
            expect(stringHash.length).toBe(32);
            expect(hexHash.length).toBe(32);
            expect(jsonHash.length).toBe(32);
        });
    });

}); 