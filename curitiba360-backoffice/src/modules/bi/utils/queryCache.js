const cache = new Map();
export function getCachedQuery(key) {
  return cache.get(key);
}
export function setCachedQuery(key, value) {
  cache.set(key, value);
}
