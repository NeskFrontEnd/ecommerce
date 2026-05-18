/**
 * Shared helpers for session-active.js — rendering utilities.
 */

import { formatTime } from '../utils/format.js';

export function setRingContent(container, timerText, color, sublabel) {
  const inner = container.querySelector('#ring-inner');
  if (!inner) return;
  inner.innerHTML = `
    <div class="ring-timer" style="color:${color}">${timerText}</div>
    ${sublabel ? `<div class="ring-sublabel">${sublabel}</div>` : ''}`;
}

export function updateTotalTimeDisplay(container, tt) {
  const el = container.querySelector('#total-time');
  if (el) el.textContent = formatTime(tt);
}

export function bindSteppers(container, state) {
  const adjust = (id, delta, isFloat) => {
    const el = container.querySelector(id);
    if (!el) return;
    const cur  = isFloat ? parseFloat(el.textContent) : parseInt(el.textContent, 10);
    const next = Math.max(0, isFloat ? +(cur + delta).toFixed(1) : cur + delta);
    el.textContent = next;
    if (id === '#val-reps')   state.reps = next;
    if (id === '#val-weight') state.wt   = next;
  };
  container.querySelector('#btn-reps-inc') ?.addEventListener('click', () => adjust('#val-reps',    1,   false));
  container.querySelector('#btn-reps-dec') ?.addEventListener('click', () => adjust('#val-reps',   -1,   false));
  container.querySelector('#btn-wt-inc')   ?.addEventListener('click', () => adjust('#val-weight',  2.5, true));
  container.querySelector('#btn-wt-dec')   ?.addEventListener('click', () => adjust('#val-weight', -2.5, true));
}

export function buildSessionExercisesData(workout, exerciseMap, completedSets) {
  return workout.exercises.map((item, i) => {
    const ex       = exerciseMap[item.exerciseId];
    const sets     = completedSets[i];
    const totalDur = sets.reduce((s, set) => s + (set.durationSec || 0), 0);
    return {
      exerciseId:        item.exerciseId,
      exerciseName:      ex?.name || 'Вправа',
      sets,
      totalDurationSec:  totalDur,
      avgSetDurationSec: sets.length ? Math.round(totalDur / sets.length) : 0,
    };
  });
}

function sfStatCard(value, label) {
  return `<div class="sf-stat-card"><div class="sf-stat-value">${value}</div><div class="sf-stat-label">${label}</div></div>`;
}

export function renderFinishHTML(workoutName, exercisesData, tt) {
  const totalSets = exercisesData.reduce((s, e) => s + e.sets.length, 0);
  const totalVol  = exercisesData.reduce((s, e) =>
    s + e.sets.reduce((a, st) => a + (st.reps || 0) * (st.weightKg || 0), 0), 0);
  const durLabel  = formatTime(tt);

  const exCards = exercisesData.map(e => {
    const isBodyweight = e.sets.every(s => !s.weightKg);
    const isStatic     = isBodyweight && e.sets.every(s => !s.reps);
    const vol = isBodyweight ? 0 : e.sets.reduce((a, s) => a + (s.reps || 0) * (s.weightKg || 0), 0);

    const setRows = e.sets.map(s => {
      const parts = [`${s.setNumber} сет`];
      if (!isStatic) parts.push(`${s.reps} повт.`);
      if (!isBodyweight) parts.push(`${s.weightKg} кг`);
      parts.push(formatTime(s.durationSec || 0));
      return `<div class="mono" style="font-size:11px;color:var(--dim);padding:4px 0;border-top:1px solid var(--muted)">${parts.join(' · ')}</div>`;
    }).join('');

    const footer = [];
    if (vol > 0) footer.push(`Об'єм ${Math.round(vol)} кг`);
    footer.push(`Час ${formatTime(e.totalDurationSec)}`);

    return `
      <div style="background:var(--line);border-radius:14px;padding:12px;margin-bottom:8px;border:1px solid var(--muted)">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2px">
          <div style="font-weight:700;font-size:13px">${e.exerciseName}</div>
          <div class="mono" style="font-size:10px;color:var(--dim)">Сетів: ${e.sets.length}</div>
        </div>
        ${setRows}
        <div style="display:flex;gap:12px;margin-top:6px;padding-top:6px;border-top:1px solid var(--muted)">
          ${footer.map(f => `<span class="mono" style="font-size:10px;color:var(--acid)">${f}</span>`).join('')}
        </div>
      </div>`;
  }).join('');

  return `
    <div style="position:absolute;inset:0;background:var(--ink);display:flex;flex-direction:column;overflow:auto;padding-bottom:calc(var(--nav-height) + var(--safe-bottom))">
      <div style="padding:calc(env(safe-area-inset-top,52px) + 4px) 24px 0;text-align:center">
        <div class="finish-checkmark">
          <svg class="icon icon-xl" style="color:var(--ink)"><use href="#icon-check"/></svg>
        </div>
        <div class="mono" style="font-size:10px;color:var(--acid);text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px">Завершено</div>
        <h1 style="font-family:var(--font-display);font-size:clamp(34px,11vw,48px);line-height:.9">${workoutName}</h1>
      </div>
      <div class="sf-stats-grid" style="padding:24px 20px">
        ${sfStatCard(durLabel, 'Тривалість')}
        ${sfStatCard(totalSets, 'Сетів')}
        ${sfStatCard(totalVol > 0 ? Math.round(totalVol) + ' кг' : '—', "Об'єм")}
      </div>
      <div style="padding:0 20px">
        <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">По вправах</div>
        ${exCards}
      </div>
      <div style="padding:20px;margin-top:auto">
        <button class="btn btn-primary btn-xl btn-full" id="btn-finish">
          <svg class="icon icon-lg"><use href="#icon-home"/></svg>
          НА ГОЛОВНУ
        </button>
      </div>
    </div>`;
}
