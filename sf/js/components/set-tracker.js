/**
 * Set tracker — renders set rows inside an exercise card during a session.
 * Returns HTML; also provides update helpers for the active set row.
 *
 * Each row shows: set# | duration | reps | weight | RPE | notes
 * Completed sets are read-only; active set has editable inputs.
 */

import { formatTime, formatWeight } from '../utils/format.js';

/**
 * Render the full set table
 * @param {number} totalSets     — total sets planned
 * @param {Array}  completedSets — array of { setNumber, durationSec, reps, weightKg, rpe, notes }
 * @param {number} currentSet    — 1-indexed, 0 = none active
 * @param {Object} defaults      — { reps, weightKg } from plan entry
 */
export function renderSetTracker(totalSets, completedSets, currentSet, defaults = {}) {
  let html = `<div class="set-tracker" id="set-tracker">`;
  html += `<div class="set-tracker-header">
    <span class="st-col st-num mono text-xs text-dim">#</span>
    <span class="st-col st-time mono text-xs text-dim">Час</span>
    <span class="st-col st-reps mono text-xs text-dim">Повт.</span>
    <span class="st-col st-weight mono text-xs text-dim">Вага</span>
    <span class="st-col st-rpe mono text-xs text-dim">RPE</span>
  </div>`;

  for (let i = 1; i <= totalSets; i++) {
    const done = completedSets.find(s => s.setNumber === i);
    const isActive = i === currentSet && !done;
    html += renderSetRow(i, done, isActive, defaults);
  }

  html += `</div>`;
  return html;
}

function renderSetRow(setNum, done, isActive, defaults) {
  const cls = done ? 'done' : isActive ? 'active' : 'pending';

  if (done) {
    return `
      <div class="set-row ${cls}" data-set="${setNum}">
        <span class="st-col st-num mono">${setNum}</span>
        <span class="st-col st-time mono">${formatTime(done.durationSec)}</span>
        <span class="st-col st-reps mono">${done.reps ?? '—'}</span>
        <span class="st-col st-weight mono">${done.weightKg ? formatWeight(done.weightKg) : '—'}</span>
        <span class="st-col st-rpe mono">${done.rpe ? done.rpe : '—'}</span>
      </div>
    `;
  }

  if (isActive) {
    return `
      <div class="set-row ${cls}" data-set="${setNum}" id="active-set-row">
        <span class="st-col st-num mono text-accent">${setNum}</span>
        <span class="st-col st-time mono" id="active-set-time">00:00</span>
        <input class="st-col st-reps st-input" type="number" id="input-reps"
          min="1" max="999" placeholder="${defaults.reps ?? 10}"
          value="${defaults.reps ?? ''}"
          inputmode="numeric" aria-label="Кількість повторень"/>
        <input class="st-col st-weight st-input" type="number" id="input-weight"
          min="0" max="999" step="0.5" placeholder="${defaults.weightKg ?? 0}"
          value="${defaults.weightKg ?? ''}"
          inputmode="decimal" aria-label="Вага кг"/>
        <select class="st-col st-rpe st-select" id="input-rpe" aria-label="RPE">
          <option value="">—</option>
          ${[6,7,7.5,8,8.5,9,9.5,10].map(v => `<option value="${v}">${v}</option>`).join('')}
        </select>
      </div>
    `;
  }

  // pending
  return `
    <div class="set-row ${cls}" data-set="${setNum}">
      <span class="st-col st-num mono text-dim">${setNum}</span>
      <span class="st-col st-time mono text-dim">—</span>
      <span class="st-col st-reps mono text-dim">${defaults.reps ?? '—'}</span>
      <span class="st-col st-weight mono text-dim">${defaults.weightKg ? formatWeight(defaults.weightKg) : '—'}</span>
      <span class="st-col st-rpe mono text-dim">—</span>
    </div>
  `;
}

/** Update just the active set timer display */
export function updateActiveSetTime(display) {
  const el = document.getElementById('active-set-time');
  if (el) el.textContent = display;
}

/** Read current values from active set inputs */
export function readActiveSetValues() {
  return {
    reps:     parseInt(document.getElementById('input-reps')?.value, 10) || 0,
    weightKg: parseFloat(document.getElementById('input-weight')?.value) || 0,
    rpe:      parseFloat(document.getElementById('input-rpe')?.value) || null,
  };
}

// ── Styles ────────────────────────────────────────

export function injectSetTrackerStyles() {
  if (document.getElementById('st-styles')) return;
  const style = document.createElement('style');
  style.id = 'st-styles';
  style.textContent = `
    .set-tracker { display: flex; flex-direction: column; gap: var(--space-2); }
    .set-tracker-header, .set-row {
      display: grid;
      grid-template-columns: 1.5rem 3rem 1fr 1fr 2.5rem;
      align-items: center;
      gap: var(--space-2);
    }
    .set-tracker-header { padding: 0 var(--space-1); margin-bottom: var(--space-1); }
    .set-row {
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      background: var(--surface);
      border: 1px solid transparent;
      transition: border-color var(--dur-fast), background var(--dur-fast);
    }
    .set-row.active { border-color: var(--accent); background: rgba(198,244,50,0.06); }
    .set-row.done   { opacity: 0.6; }
    .set-row.done:last-child { opacity: 1; }

    .st-col { font-family: var(--font-mono); font-size: var(--text-sm); }
    .st-input {
      width: 100%;
      padding: var(--space-1) var(--space-2);
      background: var(--muted);
      border: 1px solid var(--line);
      border-radius: var(--radius-sm);
      color: var(--text);
      font-family: var(--font-mono);
      font-size: var(--text-sm);
      text-align: center;
    }
    .st-input:focus { border-color: var(--accent); outline: none; }
    .st-select {
      width: 100%;
      padding: var(--space-1) var(--space-1);
      background: var(--muted);
      border: 1px solid var(--line);
      border-radius: var(--radius-sm);
      color: var(--text);
      font-family: var(--font-mono);
      font-size: var(--text-sm);
      appearance: none;
    }
    .st-select:focus { border-color: var(--accent); outline: none; }
  `;
  document.head.appendChild(style);
}
