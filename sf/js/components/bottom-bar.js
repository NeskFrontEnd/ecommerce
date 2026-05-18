/**
 * Session bottom status bar.
 * Status strip showing phase timer + context controls.
 * Primary actions (Start/Stop Set) live in the content area, not here.
 *
 * Events emitted via bus:
 *   session:bar:pause  — pause/resume during set
 *   session:bar:skip   — skip current phase (warmup/rest/cooldown)
 *   session:bar:back   — abandon session
 */

import bus from '../utils/events.js';

export const BAR_MODES = {
  IDLE:     'idle',
  WARMUP:   'warmup',
  SET:      'set',
  REST:     'rest',
  COOLDOWN: 'cooldown',
  PAUSED:   'paused',
  DONE:     'done',
};

let barEl = null;

export function initBottomBar() {
  barEl = document.getElementById('bottom-bar');
  if (!barEl) {
    barEl = document.createElement('div');
    barEl.id = 'bottom-bar';
    barEl.className = 'bottom-bar hidden';
    document.getElementById('app')?.appendChild(barEl);
  }
}

export function showBar(mode = BAR_MODES.IDLE, opts = {}) {
  if (!barEl) initBottomBar();
  barEl.classList.remove('hidden');
  renderBar(mode, opts);
}

export function hideBar() {
  if (barEl) barEl.classList.add('hidden');
}

export function updateTimer(display) {
  const el = barEl?.querySelector('.bottom-bar-timer');
  if (el) el.textContent = display;
}

// ── Internal ──────────────────────────────────────

function renderBar(mode, opts = {}) {
  const { timer = '00:00' } = opts;

  if (mode === BAR_MODES.SET) {
    barEl.innerHTML = `
      <div class="bottom-bar-inner">
        <button class="bottom-bar-side-btn" data-action="pause" aria-label="Пауза">
          <svg class="icon icon-sm"><use href="#icon-pause"/></svg>
        </button>
        <span class="mono text-xs" style="flex:1;text-align:center;color:var(--accent);">сет іде</span>
        <div style="width:2.5rem;"></div>
      </div>
    `;
  } else if (mode === BAR_MODES.REST || mode === BAR_MODES.WARMUP || mode === BAR_MODES.COOLDOWN) {
    const label = mode === BAR_MODES.REST      ? 'відпочинок'
                : mode === BAR_MODES.WARMUP    ? 'розминка'
                : 'охолодження';
    barEl.innerHTML = `
      <div class="bottom-bar-inner">
        <button class="bottom-bar-side-btn" data-action="back" aria-label="Перервати">
          <svg class="icon icon-sm"><use href="#icon-x"/></svg>
        </button>
        <span class="mono text-xs text-dim" style="flex:1;text-align:center;">${label}</span>
        <button class="bottom-bar-side-btn" data-action="skip" aria-label="Пропустити">
          <svg class="icon icon-sm"><use href="#icon-skip"/></svg>
        </button>
      </div>
    `;
  } else {
    barEl.innerHTML = `
      <div class="bottom-bar-inner">
        <button class="bottom-bar-side-btn" data-action="back" aria-label="Перервати">
          <svg class="icon icon-sm"><use href="#icon-x"/></svg>
        </button>
        <span class="mono text-xs text-dim" style="flex:1;text-align:center;">готово до старту</span>
        <div style="width:2.5rem;"></div>
      </div>
    `;
  }

  bindEvents();
}

function bindEvents() {
  barEl.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', () => {
      const a = el.dataset.action;
      if (a === 'pause') bus.emit('session:bar:pause');
      else if (a === 'skip') bus.emit('session:bar:skip');
      else if (a === 'back') bus.emit('session:bar:back');
    });
  });
}
