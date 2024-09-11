import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

/**
 * Log results (if onPerfEntry is provided)
 * or send to an analytics endpoint (for example: https://example.com)
 * @param {function} onPerfEntry
 */
function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    getCLS(onPerfEntry);
    getFCP(onPerfEntry);
    getFID(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
}

export default reportWebVitals;
