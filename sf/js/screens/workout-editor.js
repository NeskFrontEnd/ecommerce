/**
 * Workout editor — redesign per spec.
 * Expandable exercise cards with mini steppers.
 * Route: /workout/new  or  /workout/:id
 */

import { navigate, back }          from '../utils/router.js';
import { getAllExercises }          from '../db/exercises.js';
import { getWorkoutById, createWorkout, updateWorkout } from '../db/workouts.js';
import { showToast }               from '../app.js';
import { showExercisePicker, injectPickerStyles } from '../components/exercise-picker.js';

let exercises  = [];
let planItems  = [];
let workoutId  = null;
let expandedIdx = -1;

export async function renderWorkoutEditor(container, params) {
  workoutId = params.id && params.id !== 'new' ? params.id : null;
  exercises  = await getAllExercises();
  let workout = null;

  if (workoutId) {
    workout   = await getWorkoutById(workoutId);
    planItems = workout?.exercises ? workout.exercises.map(e => ({ ...e })) : [];
  } else {
    planItems = [];
  }

  expandedIdx = -1;
  render(container, workout);
}

function render(container, workout) {
  injectEditorStyles();
  injectPickerStyles();

  container.innerHTML = `
    <div class="screen" style="padding-bottom:80px">
      <div style="display:flex;align-items:center;gap:10px;padding:calc(env(safe-area-inset-top,52px) + 4px) 20px 0">
        <button id="btn-back" style="background:none;border:none;color:var(--dim);cursor:pointer;padding:4px">
          <svg class="icon icon-lg"><use href="#icon-chevron-left"/></svg>
        </button>
        <span class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em">Редагувати план</span>
      </div>

      <div style="padding:8px 20px 0">
        <div id="plan-title" style="font-family:var(--font-display);font-size:30px;margin-bottom:2px">${workout?.name || 'Новий план'}</div>
        <div id="plan-summary" class="mono" style="font-size:11px;color:var(--dim)"></div>
        <input class="input" id="input-name" type="text" placeholder="Назва плану"
          value="${workout?.name || ''}" maxlength="80" style="margin-top:10px"/>
      </div>

      <div style="padding:14px 20px;display:flex;flex-direction:column;gap:8px">
        <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.08em">ВПРАВИ</div>
        <div id="plan-list"></div>
        <button id="btn-open-picker" class="editor-add-btn">
          <svg class="icon" style="color:var(--acid)"><use href="#icon-plus"/></svg>
          Додати вправу
        </button>
      </div>

      <div style="position:fixed;bottom:calc(var(--nav-height) + var(--safe-bottom));left:50%;transform:translateX(-50%);width:100%;max-width:var(--screen-max);padding:12px 20px;background:rgba(10,10,10,0.95);border-top:1px solid var(--line);backdrop-filter:blur(8px)">
        <button class="btn btn-primary btn-full" id="btn-save" style="height:52px">Зберегти</button>
      </div>
    </div>`;

  renderPlanList(container, workout);

  container.querySelector('#btn-back').addEventListener('click', back);
  container.querySelector('#btn-save').addEventListener('click', () => handleSave(container));
  container.querySelector('#btn-open-picker').addEventListener('click', () => {
    showExercisePicker(exercises, (exId) => { addExercise(exId, container, workout); });
  });
  container.querySelector('#input-name').addEventListener('input', (e) => {
    const el = container.querySelector('#plan-title');
    if (el) el.textContent = e.target.value || 'Новий план';
  });
}

function renderPlanList(container, workout) {
  const listEl = container.querySelector('#plan-list');
  const sumEl  = container.querySelector('#plan-summary');
  const sets   = planItems.reduce((s, e) => s + (e.sets || 0), 0);
  if (sumEl) sumEl.textContent = `${planItems.length} вправ · ${sets} сетів`;

  if (!planItems.length) {
    listEl.innerHTML = `<p class="mono" style="font-size:10px;color:var(--dim);text-align:center;padding:var(--space-4) 0">Список порожній — додай вправи нижче</p>`;
    return;
  }

  listEl.innerHTML = planItems.map((item, i) => {
    const ex      = exercises.find(e => e.id === item.exerciseId);
    if (!ex) return '';
    const isOpen   = i === expandedIdx;
    const isTimed  = item.type === 'timed' || item.type === 'cardio';
    const isBodywt = item.type === 'bodyweight';
    const detail   = isTimed
      ? `${item.sets}×${item.durationSec ?? 30}с · відп. ${item.restSec ?? 90}с`
      : isBodywt
        ? `${item.sets}×${item.reps ?? '—'} · відп. ${item.restSec ?? 90}с`
        : `${item.sets}×${item.reps ?? '—'} · ${item.weightKg ?? 0}кг · відп. ${item.restSec ?? 90}с`;

    return `
      <div class="editor-card" data-index="${i}" style="border-color:${isOpen ? 'rgba(198,244,50,0.25)' : 'var(--muted)'}">
        <div class="editor-card-header" data-toggle="${i}">
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px">
              <span class="mono" style="font-size:10px;color:var(--dim)">${String(i+1).padStart(2,'0')}</span>
              <span style="font-weight:700;font-size:14px">${ex.name}</span>
            </div>
            <div class="mono" style="font-size:11px;color:var(--dim);margin-top:4px">${detail}</div>
            ${item.notes ? `<div style="font-size:11px;color:var(--dim);margin-top:2px;font-style:italic">${item.notes}</div>` : ''}
          </div>
          <svg class="icon" style="color:var(--dim)"><use href="#icon-${isOpen ? 'x' : 'chevron-right'}"/></svg>
        </div>
        ${isOpen ? `
        <div style="padding:0 14px 14px;border-top:1px solid var(--muted);padding-top:12px;display:flex;flex-direction:column;gap:12px">
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            ${miniStepper('Сетів',    'sets',    i, item.sets ?? 3,   1, 1)}
            ${isTimed
              ? miniStepper('Тривал.(с)', 'duration', i, item.durationSec ?? 30, 5, 5)
              : isBodywt
                ? miniStepper('Повт.', 'reps', i, item.reps ?? 10, 1, 0)
                : miniStepper('Повт.', 'reps', i, item.reps ?? 10, 1, 0) +
                  miniStepper('Вага',  'weight', i, item.weightKg ?? 0, 2.5, 0)}
            ${miniStepper('Відп.(с)', 'rest',    i, item.restSec ?? 90, 15, 0)}
          </div>
          <input class="input" type="text" data-field="notes" data-index="${i}"
            placeholder="Коментар до вправи..." value="${item.notes || ''}"
            style="background:var(--muted);border-color:rgba(255,255,255,0.06)"/>
          <div style="display:flex;gap:6px">
            ${i > 0 ? `<button class="btn btn-dim btn-sm" style="flex:1" data-move-up="${i}">↑ Вище</button>` : '<div style="flex:1"></div>'}
            ${i < planItems.length - 1 ? `<button class="btn btn-dim btn-sm" style="flex:1" data-move-down="${i}">↓ Нижче</button>` : '<div style="flex:1"></div>'}
          </div>
          <button class="editor-delete-btn" data-remove="${i}">Видалити вправу</button>
        </div>` : ''}
      </div>`;
  }).join('');

  listEl.querySelectorAll('[data-toggle]').forEach(el => {
    el.addEventListener('click', () => {
      const idx = Number(el.dataset.toggle);
      expandedIdx = expandedIdx === idx ? -1 : idx;
      renderPlanList(container, workout);
    });
  });

  listEl.querySelectorAll('.ms-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx   = Number(btn.dataset.idx);
      const field = btn.dataset.field;
      const step  = parseFloat(btn.dataset.step);
      const dir   = btn.dataset.dir === '+' ? 1 : -1;
      const min   = parseFloat(btn.dataset.min);
      const cur   = field === 'sets'     ? (planItems[idx].sets        ?? 3)
                  : field === 'reps'     ? (planItems[idx].reps        ?? 10)
                  : field === 'weight'   ? (planItems[idx].weightKg    ?? 0)
                  : field === 'duration' ? (planItems[idx].durationSec ?? 30)
                  :                        (planItems[idx].restSec     ?? 90);
      const next  = Math.max(min, +(cur + dir * step).toFixed(1));
      if (field === 'sets')     planItems[idx].sets        = next;
      if (field === 'reps')     planItems[idx].reps        = next;
      if (field === 'weight')   planItems[idx].weightKg    = next;
      if (field === 'duration') planItems[idx].durationSec = next;
      if (field === 'rest')     planItems[idx].restSec     = next;
      const valEl = btn.parentElement.querySelector('.ms-val');
      if (valEl) valEl.textContent = next;
      const sumEl2 = container.querySelector('#plan-summary');
      if (sumEl2) sumEl2.textContent = `${planItems.length} вправ · ${planItems.reduce((s, e) => s + (e.sets || 0), 0)} сетів`;
    });
  });

  listEl.querySelectorAll('[data-field="notes"]').forEach(input => {
    input.addEventListener('input', (e) => {
      planItems[Number(input.dataset.index)].notes = e.target.value;
    });
  });

  listEl.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      planItems.splice(Number(btn.dataset.remove), 1);
      expandedIdx = -1;
      renderPlanList(container, workout);
    });
  });

  listEl.querySelectorAll('[data-move-up]').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.moveUp);
      [planItems[i - 1], planItems[i]] = [planItems[i], planItems[i - 1]];
      expandedIdx = i - 1;
      renderPlanList(container, workout);
    });
  });

  listEl.querySelectorAll('[data-move-down]').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.moveDown);
      [planItems[i], planItems[i + 1]] = [planItems[i + 1], planItems[i]];
      expandedIdx = i + 1;
      renderPlanList(container, workout);
    });
  });
}

function miniStepper(label, field, idx, value, step, min) {
  return `<div class="ms-wrap">
    <span class="ms-label">${label}</span>
    <div class="ms-row">
      <button class="ms-btn" data-idx="${idx}" data-field="${field}" data-dir="-" data-step="${step}" data-min="${min}">−</button>
      <span class="ms-val">${value}</span>
      <button class="ms-btn" data-idx="${idx}" data-field="${field}" data-dir="+" data-step="${step}" data-min="${min}">+</button>
    </div>
  </div>`;
}

function addExercise(exId, container, workout) {
  const ex = exercises.find(e => e.id === exId);
  if (!ex) return;
  planItems.push({
    exerciseId: ex.id, order: planItems.length,
    type: ex.type || 'weighted',
    sets: ex.defaultSets ?? 3, reps: ex.defaultReps ?? null,
    weightKg: ex.defaultWeightKg ?? 0, restSec: ex.defaultRestSec ?? 90,
    durationSec: ex.defaultDurationSec ?? null,
    notes: ex.notes || '',
  });
  expandedIdx = planItems.length - 1;
  renderPlanList(container, workout);
}

async function handleSave(container) {
  const name = container.querySelector('#input-name').value.trim();
  if (!name)          { showToast('Введи назву плану', 'error'); return; }
  if (!planItems.length) { showToast('Додай хоча б одну вправу', 'error'); return; }

  const data = {
    name,
    description: '',
    tags: [],
    exercises: planItems.map((item, i) => ({ ...item, order: i })),
  };

  try {
    if (workoutId) await updateWorkout(workoutId, data);
    else           await createWorkout(data);
    showToast('Збережено ✓', 'success');
    navigate('/workouts');
  } catch { showToast('Помилка збереження', 'error'); }
}

export function injectEditorStyles() {
  if (document.getElementById('editor-styles')) return;
  const s = document.createElement('style');
  s.id = 'editor-styles';
  s.textContent = `
    .editor-card{background:var(--line);border-radius:16px;border:1px solid var(--muted);overflow:hidden;margin-bottom:8px}
    .editor-card-header{padding:14px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;-webkit-tap-highlight-color:transparent}
    .editor-delete-btn{padding:10px;background:transparent;border:1px solid var(--red);border-radius:10px;color:var(--red);font-family:var(--font-mono);font-size:12px;cursor:pointer;font-weight:600;width:100%}
    .editor-add-btn{padding:14px;background:var(--acid-dim);border:1px dashed rgba(198,244,50,0.3);border-radius:16px;color:var(--acid);font-family:var(--font-sans);font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;width:100%}
  `;
  document.head.appendChild(s);
}
