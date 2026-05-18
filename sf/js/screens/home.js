/**
 * Home screen — redesign per spec.
 * SUPAFIT label + SF. hero, stat cards, today's workout card, CTA, last session.
 */

import { navigate }                  from '../utils/router.js';
import { formatDate, formatDuration } from '../utils/format.js';
import { getAllWorkouts }             from '../db/workouts.js';
import { getAllSessions, getStreak }  from '../db/sessions.js';
import { getAllExercises }            from '../db/exercises.js';

export async function renderHome(container) {
  injectHomeStyles();
  container.innerHTML = `<div class="screen" style="padding-bottom:var(--nav-height)">
    <div style="padding:calc(env(safe-area-inset-top,52px) + 4px) 20px 0">
      <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.12em">SUPAFIT</div>
      <div style="font-family:var(--font-display);font-size:clamp(52px,16vw,76px);line-height:.88;color:var(--acid);margin-top:2px">SF.</div>
    </div>
  </div>`;

  const [workouts, sessions, streak, allExercises] = await Promise.all([
    getAllWorkouts(),
    getAllSessions(),
    getStreak(),
    getAllExercises(),
  ]);

  const exMap     = Object.fromEntries(allExercises.map(e => [e.id, e]));
  const completed = sessions.filter(s => s.status === 'completed');
  const totalVol  = completed.reduce((sum, s) =>
    sum + (s.exercises || []).reduce((es, ex) =>
      es + (ex.sets || []).reduce((ss, set) => ss + (set.reps||0)*(set.weightKg||0), 0), 0), 0);

  const todayWk  = workouts[0] || null;
  const lastSess = completed[0] || null;
  const estMins  = todayWk
    ? Math.round(todayWk.exercises.reduce((s, e) => s + (e.sets||3) * ((e.restSec||90) + 45), 360) / 60)
    : 0;

  const screen = container.querySelector('.screen');
  screen.innerHTML = `
    <div style="padding:calc(env(safe-area-inset-top,52px) + 4px) 20px 0">
      <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.12em">SUPAFIT</div>
      <div style="font-family:var(--font-display);font-size:clamp(52px,16vw,76px);line-height:.88;color:var(--acid);margin-top:2px">SF.</div>
    </div>

    <div class="sf-stats-grid" style="padding:18px 20px 0">
      ${sfStatCard(streak, 'днів підряд')}
      ${sfStatCard(completed.length, 'тренувань')}
      ${sfStatCard(fmtVol(totalVol), "кг об'єм")}
    </div>

    ${todayWk ? `
    <div style="padding:22px 20px 0">
      <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px">СЬОГОДНІ</div>
      <div class="home-today-card" id="today-card" data-id="${todayWk.id}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
          <div>
            <div style="font-weight:700;font-size:17px">${todayWk.name}</div>
            ${todayWk.description ? `<div class="mono" style="font-size:11px;color:var(--dim);margin-top:2px">${todayWk.description}</div>` : ''}
          </div>
          <span class="mono" style="font-size:10px;color:var(--acid);background:var(--acid-dim);padding:3px 10px;border-radius:999px;white-space:nowrap">~${estMins} хв</span>
        </div>
        ${todayWk.exercises.slice(0, 5).map((item, i) => {
          const ex = exMap[item.exerciseId];
          return ex ? `
            <div style="display:flex;gap:10px;padding:6px 0;border-top:${i ? '1px solid var(--muted)' : 'none'};align-items:center">
              <span class="mono" style="font-size:10px;color:var(--dim);min-width:20px">${String(i+1).padStart(2,'0')}</span>
              <span style="font-size:13px;font-weight:600;flex:1">${ex.name}</span>
              <span class="mono" style="font-size:11px;color:var(--dim)">${item.sets}×${item.reps ?? '—'}</span>
            </div>` : '';
        }).join('')}
        ${todayWk.exercises.length > 5 ? `<div class="mono" style="font-size:10px;color:var(--dim);padding-top:4px">+ ще ${todayWk.exercises.length - 5}</div>` : ''}
      </div>
      <button class="btn btn-primary btn-xl btn-full" id="btn-start" style="margin-top:14px">
        <svg class="icon icon-lg"><use href="#icon-play"/></svg>
        ПОЧАТИ ТРЕНУВАННЯ
      </button>
    </div>` : `
    <div style="padding:22px 20px 0">
      <div class="empty-state" style="padding:var(--space-8) 0">
        <div class="empty-state-icon">💪</div>
        <div class="empty-state-title">Немає планів</div>
        <p class="text-dim text-sm">Створи перший план тренування</p>
        <button class="btn btn-primary" id="btn-create">Створити план</button>
      </div>
    </div>`}

    ${lastSess ? `
    <div style="padding:18px 20px 20px">
      <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">ОСТАННЯ СЕСІЯ</div>
      <div style="background:var(--line);border-radius:14px;padding:12px;border:1px solid var(--muted);display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:600;font-size:13px">${lastSess.workoutName}</div>
          <div class="mono" style="font-size:11px;color:var(--dim);margin-top:1px">${formatDate(lastSess.startedAt)} · ${formatDuration(lastSess.totalDuration || 0)}</div>
        </div>
        <span class="mono" style="font-size:10px;color:var(--acid);background:var(--acid-dim);padding:3px 8px;border-radius:999px">✓</span>
      </div>
    </div>` : ''}
  `;

  screen.querySelector('#btn-start')?.addEventListener('click', () => {
    navigate(`/session/${todayWk.id}`);
  });
  screen.querySelector('#btn-create')?.addEventListener('click', () => navigate('/workout/new'));
  screen.querySelector('#today-card')?.addEventListener('click', () => {
    if (todayWk) navigate(`/session/${todayWk.id}`);
  });
}

function sfStatCard(value, label) {
  return `<div class="sf-stat-card"><div class="sf-stat-value">${value}</div><div class="sf-stat-label">${label}</div></div>`;
}

function fmtVol(v) {
  if (v >= 1000) return (v / 1000).toFixed(1) + 'K';
  return Math.round(v).toString();
}

export function injectHomeStyles() {
  if (document.getElementById('home-styles')) return;
  const s = document.createElement('style');
  s.id = 'home-styles';
  s.textContent = `
    .home-today-card{background:var(--line);border-radius:20px;padding:16px;border:1px solid var(--muted);cursor:pointer;-webkit-tap-highlight-color:transparent}
    .home-today-card:active{border-color:rgba(198,244,50,0.3)}
  `;
  document.head.appendChild(s);
}
