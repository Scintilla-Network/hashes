# @scintilla-network/hashes

Enhanced hash functions for scintilla and crypto / blockchain use.  
Provides both classical crypto hashes and quantum-resistant alternatives.

## Features

- 🔒 Classic Crypto hash functions (SHA256, SHA512, RIPEMD160, BLAKE2) - Block hash
- 🛡️ Quantum-resistant hash functions (SHA3, SHAKE, K12) - Post-quantum replacements
- ⚡ High-performance alternatives (BLAKE3, TurboSHAKE)
- 🏦 Blockchain utilities (Hash160, Bech32/Bech32m encoding)
- 🔬 Audited code (uses noble-hashes library, fixed versions, audited by Scintilla Network)
- 0️⃣ Zero dependencies beyond noble-hashes
- 🎯 Flexible input handling (strings, hex, JSON, Uint8Array)

## Installation

```bash
npm install @scintilla-network/hashes
```

## Usage

### Basic Usage

```javascript
// Direct imports (recommended)
import { sha3_512, k12 } from '@scintilla-network/hashes/pq';
import { sha256 } from '@scintilla-network/hashes/classic';

// All functions accept strings, hex strings, JSON objects, or Uint8Array
const quantumHash = sha3_512('Hello, World!');    // Most secure
const fastHash = k12('Hello, World!', 32);        // Best performance
const classicHash = sha256('Hello, World!');      // Legacy compatibility

// For advanced use cases, you can format messages manually
import { formatMessage } from '@scintilla-network/hashes/utils';
const message = formatMessage('Hello, World!');
const hash = sha256(message);

// Namespace imports (alternative)
import { pq, classic } from '@scintilla-network/hashes';
const altHash = pq.sha3_512('Hello');
```

### Classic Hash Functions

```javascript
import { sha256, sha512, ripemd160, blake2b, blake2s } from '@scintilla-network/hashes/classic';

// Fixed-length output hashes
const sha256Hash = sha256('message');      // 32 bytes
const sha512Hash = sha512('message');      // 64 bytes
const ripemdHash = ripemd160('message');   // 20 bytes

// Variable-length output hashes
const blake2bHash = blake2b('message', 64); // Custom length (default: 64)
const blake2sHash = blake2s('message', 32); // Custom length (default: 32)

// JSON input example
const jsonHash = sha256({ key: 'value' });
```

### Post-Quantum Hash Functions

```javascript
import { 
    sha3_256, sha3_512,     // NIST recommended
    shake128, shake256,     // Variable length
    k12, m14, blake3,       // High performance
    turboshake128, turboshake256  // Additional variants
} from '@scintilla-network/hashes/pq';

// NIST recommended
const sha3_256Hash = sha3_256('message');     // 32 bytes
const sha3_512Hash = sha3_512('message');     // 64 bytes

// Variable output length (XOF)
const shake128Hash = shake128('message', 64); // Custom length (default: 32)
const shake256Hash = shake256('message', 64); // Custom length (default: 32)

// High performance options
const k12Hash = k12('message', 32);          // KangarooTwelve
const m14Hash = m14('message', 32);          // MarsupilamiFourteen
const blake3Hash = blake3('message', 32);     // BLAKE3

// Additional SHA3 variants
const turbo128Hash = turboshake128('message', 32);
const turbo256Hash = turboshake256('message', 32);

// Hex string input example
const hexHash = sha3_256('deadbeef');
```

### Blockchain Utilities

```javascript
import { hash160, bech32, bech32m } from '@scintilla-network/hashes/utils';

// Hash160 (RIPEMD160(SHA256())) - commonly used for addresses
const pubKeyHash = hash160(publicKey);  // 20 bytes output

// Bech32 address encoding (used in modern blockchains)
const words = bech32.toWords(Array.from(pubKeyHash));
const address = bech32.encode('sct', words);  // e.g., sct1qw508d6qejxtdg4y5r3zarvary0c5xw7k...

// Bech32 address decoding
const decoded = bech32.decode(address);
const decodedHash = Buffer.from(bech32.fromWords(decoded.words));

// Bech32m for newer address formats
const bech32mAddress = bech32m.encode('sct', words);
```

### Utility Functions

```javascript
import { 
    formatMessage,          // Message formatting
    toHex, fromHex,        // Hex conversion
    fromUtf8, toUtf8,      // UTF-8 conversion
    fromJSON, toJSON,      // JSON conversion
    randomBytes,           // Random bytes
    doubleSha256,         // Bitcoin's double SHA256
    hash160,              // RIPEMD160(SHA256())
    bech32, bech32m       // Address encoding
} from '@scintilla-network/hashes/utils';

// Format messages (used internally by hash functions)
const message = formatMessage('Hello');     // String to Uint8Array
const hexMessage = formatMessage('deadbeef'); // Hex to Uint8Array
const jsonMessage = formatMessage({key: 'value'}); // JSON to Uint8Array

// Hex conversion
const hex = toHex(hash);                   // Bytes to hex string
const bytes = fromHex('deadbeef');         // Hex string to bytes

// UTF-8 conversion
const utf8Bytes = fromUtf8('Hello');       // String to UTF-8 bytes
const utf8String = toUtf8(bytes);          // Bytes to UTF-8 string

// JSON conversion
const jsonBytes = fromJSON({key: 'value'}); // JSON to bytes
const jsonObj = toJSON(jsonBytes);          // Bytes to JSON

// Other utilities
const random = randomBytes(32);            // Random bytes
const doubleHash = doubleSha256('message');  // Bitcoin's double SHA256
const hash160Result = hash160(publicKey);    // Address hash
const address = bech32.encode('prefix', words); // Address encoding
```

## Input Types

All hash functions accept the following input types:
- Strings (UTF-8 encoded)
- Hex strings (e.g., 'deadbeef')
- JSON objects (automatically stringified)
- Uint8Array (passed through directly)

All hash functions return a `Uint8Array` of the appropriate length.

## Security Considerations

### Post-Quantum Security
- Uses SHA3-512 as the recommended default (NIST approved)
- Provides K12 as a high-performance alternative
- All implementations from audited noble-hashes library
- Follows Australian ASD guidelines (prohibiting SHA256 after 2030)

### Quantum Impact
Grover's algorithm could reduce hash security from 2^n to 2^n/2 operations:
- SHA256 (256-bit) → 128-bit security
- SHA3-512 (512-bit) → 256-bit security
- SHAKE256 (variable) → n/2-bit security

## Performance Comparison

Relative performance on typical hardware:
```
Fastest → Slowest
K12 > BLAKE3 > SHA256 > SHAKE > SHA3-512
```

## Dependencies

- noble-hashes: Audited, zero-dependency cryptographic library
- All dependency versions are fixed for supply chain security

## License

MIT License - see LICENSE file for details.

## Related Packages
- [@scintilla-network/signatures](https://github.com/Scintilla-Network/signatures): Post-quantum signatures and key exchanges