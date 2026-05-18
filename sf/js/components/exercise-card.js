/**
 * Exercise card renderer.
 * Used in session-active screen to display the current exercise.
 * Returns HTML string — parent is responsible for insertion.
 */

import { CATEGORIES } from '../data/exercise-library.js';
import { formatWeight } from '../utils/format.js';

/**
 * Full exercise card for active session view
 * @param {Object} exercise      — exercise definition
 * @param {Object} planEntry     — workout plan entry (sets, reps, weightKg, restSec, notes)
 * @param {Array}  completedSets — array of recorded set objects
 * @param {number} currentSet    — 1-indexed number of current set (0 = not started)
 */
export function renderExerciseCard(exercise, planEntry, completedSets = [], currentSet = 0) {
  const totalSets  = planEntry.sets || 3;
  const targetReps = planEntry.reps;
  const targetKg   = planEntry.weightKg;
  const restSec    = planEntry.restSec ?? 90;

  const categoryLabel = CATEGORIES[exercise.category] || exercise.category;
  const progress = `${completedSets.length}/${totalSets}`;

  return `
    <div class="ex-card card" data-exercise-id="${exercise.id}">
      <div class="ex-card-header">
        <div class="ex-card-meta">
          <span class="tag">${categoryLabel}</span>
          ${exercise.muscleGroups.slice(0, 2).map(mg => `<span class="tag">${mg}</span>`).join('')}
        </div>
        <span class="ex-card-sets mono text-sm text-dim">${progress} сетів</span>
      </div>

      <h2 class="ex-card-name display">${exercise.name}</h2>

      <div class="ex-card-targets flex gap-4 mt-2">
        ${targetReps ? `<div class="ex-target">
          <span class="ex-target-label">Повторень</span>
          <span class="ex-target-value">${targetReps}</span>
        </div>` : ''}
        ${targetKg ? `<div class="ex-target">
          <span class="ex-target-label">Вага</span>
          <span class="ex-target-value">${formatWeight(targetKg)}</span>
        </div>` : ''}
        <div class="ex-target">
          <span class="ex-target-label">Відпочинок</span>
          <span class="ex-target-value">${restSec}с</span>
        </div>
      </div>

      ${exercise.notes ? `<p class="ex-card-notes text-sm text-dim mt-2">${exercise.notes}</p>` : ''}

      <div class="ex-card-progress mt-4">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${(completedSets.length / totalSets) * 100}%"></div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Compact exercise card for session overview / preview list
 */
export function renderExerciseListItem(exercise, planEntry, index, status = 'pending') {
  const statusIcon = status === 'done'   ? '✓'
                   : status === 'active' ? '▶'
                   : String(index + 1).padStart(2, '0');

  const statusClass = status === 'done'   ? 'done'
                    : status === 'active' ? 'active'
                    : '';

  return `
    <div class="ex-list-item ${statusClass}" data-index="${index}">
      <span class="ex-list-num mono">${statusIcon}</span>
      <div class="ex-list-info">
        <span class="ex-list-name">${exercise.name}</span>
        <span class="ex-list-meta mono text-xs text-dim">
          ${planEntry.sets} × ${planEntry.reps ?? '—'} ${planEntry.weightKg ? '· ' + formatWeight(planEntry.weightKg) : ''}
        </span>
      </div>
    </div>
  `;
}

// ── CSS for exercise cards (injected once) ────────

export function injectExerciseCardStyles() {
  if (document.getElementById('ex-card-styles')) return;
  const style = document.createElement('style');
  style.id = 'ex-card-styles';
  style.textContent = `
    .ex-card { margin-bottom: var(--space-4); }
    .ex-card-header { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); flex-wrap: wrap; margin-bottom: var(--space-3); }
    .ex-card-meta { display: flex; gap: var(--space-2); flex-wrap: wrap; }
    .ex-card-name { font-size: clamp(2rem, 10vw, 3.5rem); line-height: 0.9; margin-bottom: 0; }
    .ex-card-notes { border-left: 2px solid var(--muted); padding-left: var(--space-3); }
    .ex-target { display: flex; flex-direction: column; gap: 2px; }
    .ex-target-label { font-family: var(--font-mono); font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-dim); }
    .ex-target-value { font-family: var(--font-mono); font-size: var(--text-lg); font-weight: 700; color: var(--accent); }

    .ex-list-item { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); border: var(--border); background: var(--surface); transition: background var(--dur-fast); }
    .ex-list-item.active { border-color: var(--accent); background: rgba(198,244,50,0.06); }
    .ex-list-item.done { opacity: 0.5; }
    .ex-list-num { font-family: var(--font-mono); font-size: var(--text-sm); font-weight: 700; color: var(--text-dim); min-width: 1.5rem; }
    .ex-list-item.active .ex-list-num { color: var(--accent); }
    .ex-list-info { display: flex; flex-direction: column; gap: 2px; }
    .ex-list-name { font-weight: 700; font-size: var(--text-base); }
  `;
  document.head.appendChild(style);
}
