import { describe, it, expect } from '@scintilla-network/litest';
import { bech32, bech32m } from './bech32.js';

describe('bech32', () => {
    /** @type {Array<{string: string, prefix: string, hex: string}>} */
    const validBech32 = [
        {
            string: 'A12UEL5L',
            prefix: 'a',
            hex: '',
        },
        {
            string: 'a12uel5l',
            prefix: 'a',
            hex: '',
        },
        {
            string: 'an83characterlonghumanreadablepartthatcontainsthenumber1andtheexcludedcharactersbio1tt5tgs',
            prefix: 'an83characterlonghumanreadablepartthatcontainsthenumber1andtheexcludedcharactersbio',
            hex: '',
        },
        {
            string: 'abcdef1qpzry9x8gf2tvdw0s3jn54khce6mua7lmqqqxw',
            prefix: 'abcdef',
            hex: '00443214c74254b635cf84653a56d7c675be77df',
        },
        {
            string: '11qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqcqp5m7',
            prefix: '1',
            hex: '000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        },
        {
            string: 'split1checkupstagehandshakeupstreamerranterredcaperred2y9e3w',
            prefix: 'split',
            hex: 'c5f38b70305f519bf66d85fb6cf03058f3dde463ecd7918f2dc743918f2d',
        },
    ];

    /** @type {string[]} */
    const invalidBech32 = [
        ' 1nwldj5', // HRP character out of range
        '\x7f1axkwrx', // HRP character out of range
        '\x801eym55h', // HRP character out of range
        'an84characterslonghumanreadablepartthatcontainsthenumber1andtheexcludedcharactersbio1569pvx', // overall max length exceeded
        'pzry9x0s0muk', // No separator character
        '1pzry9x0s0muk', // Empty HRP
        'x1b4n0q5v', // Invalid data character
        'li1dgmt3', // Too short checksum
        'de1lg7wt\xff', // Invalid character in checksum
        'A1G7SGD8', // checksum calculated with uppercase form of HRP
        '10a06t8', // empty HRP
        '1qzzfhee', // empty HRP
    ];

    it('should encode and decode valid bech32 strings', () => {
        for (const test of validBech32) {
            const bytes = test.hex
                ? Buffer.from(test.hex, 'hex')
                : Buffer.from([]);
            
            const words = bech32.toWords(Array.from(bytes));
            const encoded = bech32.encode(test.prefix, words);
            expect(encoded.toLowerCase()).toBe(test.string.toLowerCase());

            const decoded = bech32.decode(test.string);
            expect(decoded.prefix).toBe(test.prefix.toLowerCase());
            if (test.hex) {
                const buf = Buffer.from(bech32.fromWords(decoded.words));
                expect(buf.toString('hex')).toBe(test.hex);
            }
        }
    });

    it('should fail to decode invalid bech32 strings', () => {
        for (const str of invalidBech32) {
            expect(() => bech32.decode(str)).toThrow();
        }
    });

    it('should encode and decode Scintilla addresses', () => {
        // Example hash (20 bytes, like RIPEMD160(SHA256(pubKey)) would produce)
        const hash = Buffer.from('3171a3f6c2e0f85aa502c0a7e09de29c0a608c79', 'hex');
        
        // Encode as Scintilla address
        const words = bech32.toWords(Array.from(hash));
        const address = bech32.encode('sct', words, 90);
        
        // Verify basic properties
        expect(address.startsWith('sct1')).toBe(true);
        expect(address.length).toBeLessThanOrEqual(90);
        expect(address).toMatch(/^sct1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]+$/);

        // Decode and verify
        const decoded = bech32.decode(address);
        expect(decoded.prefix).toBe('sct');
        const decodedHash = Buffer.from(bech32.fromWords(decoded.words));
        expect(decodedHash.toString('hex')).toBe(hash.toString('hex'));
    });
});

describe('bech32m', () => {
    /** @type {Array<{string: string, prefix: string, hex: string, limit?: number}>} */
    const validBech32m = [
        {
            string: 'A1LQFN3A',
            prefix: 'a',
            hex: '',
        },
        {
            string: 'a1lqfn3a',
            prefix: 'a',
            hex: '',
        },
        {
            string: 'an83characterlonghumanreadablepartthatcontainsthenumber1andtheexcludedcharactersbio1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqql62lpz',
            prefix: 'an83characterlonghumanreadablepartthatcontainsthenumber1andtheexcludedcharactersbio',
            hex: '000000000000000000000000000000000000000000000000000000000000000000000000',
            limit: 200  // Increase limit for this specific test case
        },
        {
            string: 'abcdef1qpzry9x8gf2tvdw0s3jn54khce6mua7lwusvrv',
            prefix: 'abcdef',
            hex: '00443214c74254b635cf84653a56d7c675be77df',
        },
        {
            string: 'split1checkupstagehandshakeupstreamerranterredcaperredlc445v',
            prefix: 'split',
            hex: 'c5f38b70305f519bf66d85fb6cf03058f3dde463ecd7918f2dc743918f2d',
        },
        {
            string: '?1v759aa',
            prefix: '?',
            hex: '',
        },
    ];

    it('should encode and decode valid bech32m strings', () => {
        for (const test of validBech32m) {
            const bytes = test.hex
                ? Buffer.from(test.hex, 'hex')
                : Buffer.from([]);
            
            const words = bech32m.toWords(Array.from(bytes));
            const encoded = bech32m.encode(test.prefix, words, test.limit);
            expect(encoded.toLowerCase()).toBe(test.string.toLowerCase());

            const decoded = bech32m.decode(test.string, test.limit);
            expect(decoded.prefix).toBe(test.prefix.toLowerCase());
            if (test.hex) {
                const buf = Buffer.from(bech32m.fromWords(decoded.words));
                expect(buf.toString('hex')).toBe(test.hex);
            }
        }
    });
}); 