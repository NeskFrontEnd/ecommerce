/**
 * Minimal pub/sub event bus.
 * Decouples screens and components so they don't import each other directly.
 *
 * Usage:
 *   import bus from './events.js';
 *   bus.on('session:start', handler);
 *   bus.emit('session:start', { workoutId: '...' });
 *   bus.off('session:start', handler);
 */

const listeners = new Map();

const bus = {
  on(event, fn) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(fn);
  },

  once(event, fn) {
    const wrapper = (...args) => { fn(...args); this.off(event, wrapper); };
    this.on(event, wrapper);
  },

  off(event, fn) {
    listeners.get(event)?.delete(fn);
  },

  emit(event, data) {
    listeners.get(event)?.forEach(fn => {
      try { fn(data); } catch (e) { console.error(`[bus] ${event}:`, e); }
    });
  },

  clear(event) {
    if (event) listeners.delete(event);
    else listeners.clear();
  },
};

export default bus;
