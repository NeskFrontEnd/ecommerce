/**
 * Session preview — pre-flight screen before starting a workout.
 * Route: /session/:id
 */

import { navigate, back }    from '../utils/router.js';
import { getWorkoutById }    from '../db/workouts.js';
import { getAllExercises }   from '../db/exercises.js';
import { getLastSessionForWorkout } from '../db/sessions.js';
import { formatDuration, formatDate, formatWeight } from '../utils/format.js';

export async function renderSessionPreview(container, params) {
  container.innerHTML = `
    <div class="screen" style="padding-bottom:100px">
      <div style="display:flex;align-items:center;gap:10px;padding:calc(env(safe-area-inset-top,52px) + 4px) 20px 0">
        <button id="btn-back" style="background:none;border:none;color:var(--dim);cursor:pointer;padding:4px">
          <svg class="icon icon-lg"><use href="#icon-chevron-left"/></svg>
        </button>
        <span class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em">Перед стартом</span>
      </div>
      <div id="preview-body" style="padding:12px 20px 0;display:flex;flex-direction:column;gap:16px">
        <p class="mono" style="font-size:11px;color:var(--dim)">Завантаження...</p>
      </div>
      <div style="position:fixed;bottom:calc(var(--nav-height) + var(--safe-bottom));left:50%;transform:translateX(-50%);width:100%;max-width:var(--screen-max);padding:12px 20px;background:rgba(10,10,10,0.95);border-top:1px solid var(--line);backdrop-filter:blur(8px)">
        <button class="btn btn-primary btn-xl btn-full" id="btn-start" disabled>
          <svg class="icon"><use href="#icon-play"/></svg>
          Почати тренування
        </button>
      </div>
    </div>`;

  container.querySelector('#btn-back').addEventListener('click', back);

  const [workout, allExercises, lastSession] = await Promise.all([
    getWorkoutById(params.id),
    getAllExercises(),
    getLastSessionForWorkout(params.id),
  ]);

  const body   = container.querySelector('#preview-body');
  const btnStart = container.querySelector('#btn-start');

  if (!workout) {
    body.innerHTML = `<p style="color:var(--red);font-size:14px">Тренування не знайдено</p>`;
    return;
  }

  const exerciseMap = Object.fromEntries(allExercises.map(e => [e.id, e]));
  const totalSets   = workout.exercises.reduce((s, e) => s + (e.sets || 0), 0);
  const estMin      = Math.round(workout.exercises.reduce((sum, e) =>
    sum + (e.sets || 0) * ((e.restSec || 60) + 45), 360) / 60);

  body.innerHTML = `
    <!-- Title -->
    <div>
      <div style="font-family:var(--font-display);font-size:clamp(28px,10vw,44px);line-height:.9;text-transform:uppercase;margin-bottom:10px">${workout.name}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <span class="tag tag-accent">~${estMin} хв</span>
        <span class="tag">${workout.exercises.length} вправ</span>
        <span class="tag">${totalSets} сетів</span>
        ${(workout.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>

    <!-- Last session -->
    ${lastSession ? `
    <div style="background:var(--line);border:1px solid var(--muted);border-radius:16px;padding:14px">
      <div class="mono" style="font-size:9px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px">Минулого разу</div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:13px;font-weight:600">${formatDate(lastSession.startedAt)}</span>
        <span class="mono" style="font-size:12px;color:var(--acid)">${formatDuration(lastSession.totalDuration || 0)}</span>
      </div>
    </div>` : ''}

    <!-- Exercise list -->
    <div>
      <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">Програма</div>
      ${workout.exercises.map((item, i) => {
        const ex = exerciseMap[item.exerciseId];
        if (!ex) return '';
        const hint = lastSession ? lastSetHint(lastSession, item.exerciseId) : '';
        return `
          <div style="padding:12px 0;border-bottom:1px solid var(--line);display:flex;gap:12px;align-items:flex-start">
            <span class="mono" style="font-size:10px;color:var(--dim);min-width:20px;padding-top:2px">${String(i+1).padStart(2,'0')}</span>
            <div style="flex:1">
              <div style="font-size:14px;font-weight:700">${ex.name}</div>
              <div class="mono" style="font-size:11px;color:var(--dim);margin-top:3px">
                ${item.sets} сетів · ${item.reps ?? '—'} повт.${item.weightKg ? ' · ' + formatWeight(item.weightKg) : ''} · відп. ${item.restSec ?? 90}с
              </div>
              ${hint}
            </div>
          </div>`;
      }).join('')}
    </div>

    <!-- Structure -->
    <div style="background:var(--line);border:1px solid var(--muted);border-radius:16px;padding:14px">
      <div class="mono" style="font-size:9px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px">Структура</div>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${flowRow('icon-fire', 'var(--orange)', 'Розминка', '3 хв')}
        ${flowRow('icon-dumbbell', 'var(--acid)', 'Тренування', `${workout.exercises.length} вправ`)}
        ${flowRow('icon-snow', 'var(--ltblue)', 'Заминка', '3 хв')}
        ${flowRow('icon-chart', 'var(--dim)', 'Статистика', 'результати')}
      </div>
    </div>
  `;

  btnStart.disabled = false;
  btnStart.addEventListener('click', () => navigate(`/session/${params.id}/active`));
}

function lastSetHint(lastSession, exerciseId) {
  const exData = lastSession.exercises?.find(e => e.exerciseId === exerciseId);
  if (!exData?.sets?.length) return '';
  const last  = exData.sets[exData.sets.length - 1];
  const parts = [];
  if (last.reps)     parts.push(`${last.reps} повт.`);
  if (last.weightKg) parts.push(formatWeight(last.weightKg));
  if (!parts.length) return '';
  return `<div class="mono" style="font-size:10px;color:var(--acid);margin-top:4px">↑ Минулого: ${parts.join(' × ')}</div>`;
}

function flowRow(icon, color, label, value) {
  return `
    <div style="display:flex;align-items:center;gap:10px">
      <svg class="icon" style="color:${color};flex-shrink:0"><use href="#${icon}"/></svg>
      <span style="font-size:13px;font-weight:600;flex:1">${label}</span>
      <span class="mono" style="font-size:11px;color:var(--dim)">${value}</span>
    </div>`;
}
