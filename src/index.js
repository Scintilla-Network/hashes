/**
 * Enhanced hash functions for blockchain use
 * Organized into classic and post-quantum resistant categories
 */

import classic from './classic/index.js';
import pq from './pq/index.js';
import utils from './utils/index.js';

// Create aliases for recommended defaults
export const recommended = pq.recommended;  // Most secure (post-quantum)
export const fast = pq.fast;               // Best performance while maintaining security
export const classic_recommended = classic.recommended;  // Classical fallback

// Export namespaces
export { classic, pq, utils };

// Default export
export default { classic, pq, utils, recommended, fast, classic_recommended };