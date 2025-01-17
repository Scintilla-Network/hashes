import type { HashFunction } from './classic/index.js';

export * from './classic/index.js';
export * from './pq/index.js';
export * from './utils/index.js';

export * as classic from './classic/index.js';
export * as pq from './pq/index.js';
export * as utils from './utils/index.js';

export { HashFunction };

export const recommended: HashFunction;
export const fast: HashFunction;
export const classic_recommended: HashFunction;

declare const defaultExport: {
    classic: typeof import('./classic/index.js').default;
    pq: typeof import('./pq/index.js').default;
    utils: typeof import('./utils/index.js').default;
    recommended: HashFunction;
    fast: HashFunction;
    classic_recommended: HashFunction;
};

export default defaultExport; 