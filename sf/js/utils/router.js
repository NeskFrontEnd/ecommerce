/**
 * Hash-based router.
 * Routes: "#/" → home, "#/workouts" → workouts list, etc.
 * Supports named params: "#/workout/abc123" → { id: 'abc123' }
 */

const routes = [];
let currentRoute = null;
let onChangeCallback = null;

/**
 * Register a route.
 * @param {string} pattern - e.g. '/workout/:id'
 * @param {Function} handler - called with params object
 */
export function register(pattern, handler) {
  routes.push({ pattern, handler, regex: buildRegex(pattern) });
}

/** Navigate to a path (updates hash) */
export function navigate(path) {
  window.location.hash = path;
}

/** Go back in history */
export function back() {
  window.history.back();
}

/** Get current path (without #) */
export function currentPath() {
  const hash = window.location.hash;
  return hash ? hash.slice(1) || '/' : '/';
}

/** Called when route changes */
export function onChange(fn) {
  onChangeCallback = fn;
}

/** Start listening to hash changes */
export function start() {
  window.addEventListener('hashchange', dispatch);
  dispatch(); // run immediately for initial load
}

// ── Internal ──────────────────────────────────────

function dispatch() {
  const path = currentPath();
  for (const route of routes) {
    const match = path.match(route.regex);
    if (match) {
      const params = extractParams(route.pattern, match);
      currentRoute = { pattern: route.pattern, path, params };
      onChangeCallback?.(currentRoute);
      route.handler(params);
      return;
    }
  }
  // 404 fallback — go home
  navigate('/');
}

function buildRegex(pattern) {
  const escaped = pattern
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // escape special chars
    .replace(/:([a-zA-Z]+)/g, '([^/]+)');      // :param → capture group
  return new RegExp(`^${escaped}$`);
}

function extractParams(pattern, match) {
  const paramNames = [...pattern.matchAll(/:([a-zA-Z]+)/g)].map(m => m[1]);
  const params = {};
  paramNames.forEach((name, i) => { params[name] = match[i + 1]; });
  return params;
}
