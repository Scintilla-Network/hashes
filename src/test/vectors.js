export const TEST_VECTOR = {
    message: new Uint8Array([0, 1, 2, 3, 4, 5]),
    longMessage: new Uint8Array(Array(1024).fill(1)),
    emptyMessage: new Uint8Array(0),
    
    // Known hashes for testing
    sha256: {
        empty: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        test: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08' // "test"
    },
    
    sha512: {
        empty: 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e',
        test: 'ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff'
    },
    
    sha3_256: {
        empty: 'a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a',
        test: '36f028580bb02cc8272a9a020f4200e346e276ae664e45ee80745574e2f5ab80'
    },
    
    sha3_512: {
        empty: 'a69f73cca23a9ac5c8b567dc185a756e97c982164fe25859e0d1dcc1475c80a615b2123af1f5f94c11e3e9402c3ac558f500199d95b6d3e301758586281dcd26',
        test: '9ece086e9bac491fac5c1d1046ca11d737b92a2b2ebd93f005d7b710110c0a678288166e7fbe796883a4f2e9b3ca9f484f521d0ce464345cc1aec96779149c14'
    }
}; 