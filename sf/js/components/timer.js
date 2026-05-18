/**
 * Timer — countdown and stopwatch.
 * Uses performance.now() for accuracy, requestAnimationFrame for rendering.
 *
 * Usage:
 *   const t = new Timer('countdown', 180);
 *   t.onTick(({ display, elapsed, remaining }) => updateUI(display));
 *   t.onComplete(() => goNext());
 *   t.start();
 */

export class Timer {
  /**
   * @param {'countdown'|'stopwatch'} mode
   * @param {number} [initialSec=0] — required for countdown
   */
  constructor(mode, initialSec = 0) {
    this.mode       = mode;
    this.initialSec = initialSec;
    this.elapsed    = 0;       // seconds elapsed
    this._running   = false;
    this._paused    = false;
    this._startTs   = null;    // performance.now() when last resumed
    this._rafId     = null;
    this._tickCb    = null;
    this._completeCb = null;
  }

  /** Register tick callback: fn({ display, elapsed, remaining }) */
  onTick(fn)     { this._tickCb = fn; return this; }

  /** Register completion callback (countdown only) */
  onComplete(fn) { this._completeCb = fn; return this; }

  get isRunning() { return this._running && !this._paused; }
  get isPaused()  { return this._paused; }
  get isStopped() { return !this._running; }

  /** Elapsed seconds (for stopwatch usage after stop) */
  get elapsedSec() { return this.elapsed; }

  start() {
    if (this._running && !this._paused) return;
    if (this._paused) {
      this._paused   = false;
      this._startTs  = performance.now();
    } else {
      this.elapsed   = 0;
      this._running  = true;
      this._paused   = false;
      this._startTs  = performance.now();
    }
    this._tick();
  }

  pause() {
    if (!this._running || this._paused) return;
    this._accumulateElapsed();
    this._paused = true;
    cancelAnimationFrame(this._rafId);
  }

  stop() {
    this._accumulateElapsed();
    this._running = false;
    this._paused  = false;
    cancelAnimationFrame(this._rafId);
    this._fire(); // fire one last tick with final value
    return this.elapsed;
  }

  reset() {
    this.stop();
    this.elapsed  = 0;
    this._running = false;
    this._paused  = false;
  }

  // ── Internal ────────────────────────────────────

  _accumulateElapsed() {
    if (this._startTs !== null) {
      this.elapsed += (performance.now() - this._startTs) / 1000;
      this._startTs = null;
    }
  }

  _tick() {
    this._rafId = requestAnimationFrame(() => {
      if (!this._running || this._paused) return;

      const now     = performance.now();
      const current = this.elapsed + (now - this._startTs) / 1000;

      if (this.mode === 'countdown') {
        const remaining = Math.max(0, this.initialSec - current);
        this._fireWith(current, remaining);
        if (remaining <= 0) {
          this._accumulateElapsed();
          this._running = false;
          this._completeCb?.();
          return;
        }
      } else {
        this._fireWith(current, null);
      }

      this._tick();
    });
  }

  _fireWith(elapsed, remaining) {
    const sec = remaining !== null ? remaining : elapsed;
    const m   = Math.floor(sec / 60);
    const s   = Math.floor(sec % 60);
    const display = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    this._tickCb?.({ display, elapsed, remaining });
  }

  _fire() {
    const elapsed   = this.elapsed;
    const remaining = this.mode === 'countdown'
      ? Math.max(0, this.initialSec - elapsed)
      : null;
    this._fireWith(elapsed, remaining);
  }
}
