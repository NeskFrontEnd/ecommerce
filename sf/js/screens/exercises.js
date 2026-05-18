/**
 * Exercise library screen.
 * Browse built-in exercises + create/edit/delete custom ones.
 * Route: /exercises
 */

import { getAllExercises, createExercise, updateExercise, deleteExercise } from '../db/exercises.js';
import { CATEGORIES, EXERCISE_TYPES, MUSCLE_GROUPS } from '../data/exercise-library.js';
import { showToast } from '../app.js';

export async function renderExercises(container) {
  injectExStyles();
  container.innerHTML = `
    <div class="screen" style="padding-bottom:var(--nav-height)">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:calc(env(safe-area-inset-top,52px) + 4px) 20px 0">
        <h1 style="font-family:var(--font-display);font-size:34px;line-height:.9">ВПРАВИ</h1>
        <button class="btn btn-primary btn-sm" id="btn-new-ex">
          <svg class="icon icon-sm"><use href="#icon-plus"/></svg> Нова
        </button>
      </div>

      <div style="padding:12px 20px 0;display:flex;gap:6px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none" id="cat-filters">
        <span class="tag tag-accent" data-cat="" style="cursor:pointer;white-space:nowrap;flex-shrink:0">Всі</span>
        ${Object.entries(CATEGORIES).map(([k,v]) =>
          `<span class="tag" data-cat="${k}" style="cursor:pointer;white-space:nowrap;flex-shrink:0">${v}</span>`
        ).join('')}
      </div>

      <div style="padding:10px 20px 0">
        <input class="input" id="ex-search" type="search" placeholder="Пошук вправи..." autocomplete="off"/>
      </div>

      <div id="ex-list" class="stagger" style="padding:10px 20px 0"></div>
    </div>`;

  let exercises    = await getAllExercises();
  let filterCat    = '';
  let filterSearch = '';

  const listEl   = container.querySelector('#ex-list');
  const searchEl = container.querySelector('#ex-search');

  function render() {
    let filtered = exercises;
    if (filterCat)    filtered = filtered.filter(e => e.category === filterCat);
    if (filterSearch) filtered = filtered.filter(e =>
      e.name.toLowerCase().includes(filterSearch.toLowerCase())
    );
    filtered.sort((a, b) => a.name.localeCompare(b.name, 'uk'));
    listEl.innerHTML = filtered.map(ex => renderRow(ex)).join('') ||
      `<p class="mono" style="font-size:11px;color:var(--dim);text-align:center;padding:var(--space-8) 0">Нічого не знайдено</p>`;
    bindRowEvents(listEl, exercises, render);
  }

  container.querySelector('#cat-filters').addEventListener('click', e => {
    const chip = e.target.closest('[data-cat]');
    if (!chip) return;
    filterCat = chip.dataset.cat;
    container.querySelectorAll('[data-cat]').forEach(c => {
      c.className = `tag ${c.dataset.cat === filterCat ? 'tag-accent' : ''}`;
      c.style.cssText = 'cursor:pointer;white-space:nowrap;flex-shrink:0';
    });
    render();
  });

  searchEl.addEventListener('input', e => { filterSearch = e.target.value; render(); });

  container.querySelector('#btn-new-ex').addEventListener('click', () => {
    showExForm(null, async (data) => {
      await createExercise(data);
      exercises = await getAllExercises();
      showToast('Вправу додано ✓', 'success');
      render();
    });
  });

  render();
}

function renderRow(ex) {
  const catLabel = CATEGORIES[ex.category] || ex.category;
  return `
    <div class="card" style="margin-bottom:8px" data-id="${ex.id}">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div style="flex:1;min-width:0">
          <div style="font-weight:700;font-size:14px;margin-bottom:4px">
            ${ex.name}${ex.isCustom ? ' <span class="tag tag-dim" style="font-size:9px;vertical-align:middle">власна</span>' : ''}
          </div>
          <div style="display:flex;gap:4px;flex-wrap:wrap">
            <span class="tag tag-dim">${catLabel}</span>
            ${ex.muscleGroups.filter(mg => mg !== ex.category).slice(0,2)
              .map(mg => `<span class="tag">${MUSCLE_GROUPS[mg] || mg}</span>`).join('')}
          </div>
        </div>
        ${ex.isCustom ? `
          <div style="display:flex;gap:4px;flex-shrink:0;margin-left:8px">
            <button class="btn btn-ghost btn-icon btn-sm" data-edit="${ex.id}">
              <svg class="icon icon-sm"><use href="#icon-edit"/></svg>
            </button>
            <button class="btn btn-ghost btn-icon btn-sm" style="color:var(--red)" data-delete="${ex.id}">
              <svg class="icon icon-sm"><use href="#icon-trash"/></svg>
            </button>
          </div>` : ''}
      </div>
      <div class="mono" style="font-size:10px;color:var(--dim);margin-top:8px">
        ${ex.defaultSets} × ${ex.defaultReps ?? '—'} · відп. ${ex.defaultRestSec}с${ex.notes ? ' · ' + ex.notes : ''}
      </div>
    </div>`;
}

function bindRowEvents(listEl, exercises, render) {
  listEl.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const ex = exercises.find(e => e.id === btn.dataset.edit);
      if (!ex) return;
      showExForm(ex, async (data) => {
        await updateExercise(ex.id, data);
        const idx = exercises.findIndex(e => e.id === ex.id);
        if (idx !== -1) exercises[idx] = { ...exercises[idx], ...data };
        showToast('Збережено ✓', 'success');
        render();
      });
    });
  });

  listEl.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      if (!confirm('Видалити цю вправу?')) return;
      await deleteExercise(btn.dataset.delete);
      exercises.splice(exercises.findIndex(e => e.id === btn.dataset.delete), 1);
      showToast('Видалено', 'success');
      render();
    });
  });
}

function showExForm(existing, onSave) {
  const isEdit  = Boolean(existing);
  const overlay = document.createElement('div');
  overlay.className = 'ex-form-overlay';
  overlay.innerHTML = `
    <div class="ex-form-sheet animate-reveal-up">
      <div style="width:2.5rem;height:4px;border-radius:9999px;background:var(--muted);margin:0 auto var(--space-3)"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <strong style="font-size:16px">${isEdit ? 'Редагувати вправу' : 'Нова вправа'}</strong>
        <button class="btn btn-ghost btn-icon btn-sm" id="close-form">
          <svg class="icon icon-sm"><use href="#icon-x"/></svg>
        </button>
      </div>
      <label class="input-label">Назва</label>
      <input class="input" id="nf-name" type="text" placeholder="Назва вправи" value="${existing?.name || ''}" style="margin-bottom:12px"/>
      <label class="input-label">Тип</label>
      <select class="select" id="nf-type" style="margin-bottom:12px">
        ${Object.entries(EXERCISE_TYPES).map(([k,v]) =>
          `<option value="${k}" ${(existing?.type || 'weighted') === k ? 'selected' : ''}>${v}</option>`
        ).join('')}
      </select>
      <label class="input-label">Категорія</label>
      <select class="select" id="nf-cat" style="margin-bottom:12px">
        ${Object.entries(CATEGORIES).map(([k,v]) =>
          `<option value="${k}" ${existing?.category === k ? 'selected' : ''}>${v}</option>`
        ).join('')}
      </select>
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <div style="flex:1"><label class="input-label">Сети</label>
          <input class="input" id="nf-sets" type="number" value="${existing?.defaultSets ?? 3}" min="1" max="20" inputmode="numeric"/></div>
        <div style="flex:1" id="nf-reps-wrap"><label class="input-label">Повт.</label>
          <input class="input" id="nf-reps" type="number" value="${existing?.defaultReps ?? 10}" min="1" max="999" inputmode="numeric"/></div>
        <div style="flex:1" id="nf-dur-wrap" style="display:none"><label class="input-label">Тривалість (с)</label>
          <input class="input" id="nf-dur" type="number" value="${existing?.defaultDurationSec ?? 30}" min="5" max="3600" inputmode="numeric"/></div>
        <div style="flex:1"><label class="input-label">Відп.(с)</label>
          <input class="input" id="nf-rest" type="number" value="${existing?.defaultRestSec ?? 90}" min="0" max="600" inputmode="numeric"/></div>
      </div>
      <label class="input-label">Нотатки</label>
      <input class="input" id="nf-notes" type="text" placeholder="Підказки, техніка..." value="${existing?.notes || ''}" style="margin-bottom:20px"/>
      <button class="btn btn-primary btn-xl btn-full" id="save-ex">${isEdit ? 'Зберегти зміни' : 'Додати вправу'}</button>
    </div>`;

  (document.getElementById('app') || document.body).appendChild(overlay);

  const typeEl    = overlay.querySelector('#nf-type');
  const repsWrap  = overlay.querySelector('#nf-reps-wrap');
  const durWrap   = overlay.querySelector('#nf-dur-wrap');
  const toggleFields = () => {
    const isTimed = typeEl.value === 'timed' || typeEl.value === 'cardio';
    repsWrap.style.display = isTimed ? 'none' : 'flex';
    durWrap.style.display  = isTimed ? 'flex'  : 'none';
  };
  typeEl.addEventListener('change', toggleFields);
  toggleFields();

  overlay.querySelector('#close-form').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  overlay.querySelector('#save-ex').addEventListener('click', async () => {
    const name = overlay.querySelector('#nf-name').value.trim();
    if (!name) { showToast('Введи назву', 'error'); return; }
    const type    = typeEl.value;
    const isTimed = type === 'timed' || type === 'cardio';
    await onSave({
      name, category: overlay.querySelector('#nf-cat').value, type,
      defaultSets: Number(overlay.querySelector('#nf-sets').value) || 3,
      defaultReps: isTimed ? null : (Number(overlay.querySelector('#nf-reps').value) || null),
      defaultDurationSec: isTimed ? (Number(overlay.querySelector('#nf-dur').value) || 30) : null,
      defaultRestSec: Number(overlay.querySelector('#nf-rest').value) || 90,
      notes: overlay.querySelector('#nf-notes').value.trim(),
      muscleGroups: existing?.muscleGroups || [],
    });
    overlay.remove();
  });
  setTimeout(() => overlay.querySelector('#nf-name')?.focus(), 300);
}

function injectExStyles() {
  if (document.getElementById('ex-lib-styles')) return;
  const s = document.createElement('style');
  s.id = 'ex-lib-styles';
  s.textContent = `
    .ex-form-overlay { position:absolute;inset:0;background:rgba(0,0,0,0.7);z-index:200;display:flex;align-items:flex-end; }
    .ex-form-sheet { width:100%;background:#111;border-top:1px solid var(--muted);border-radius:var(--radius-xl) var(--radius-xl) 0 0;padding:var(--space-4) var(--space-5) calc(var(--safe-bottom) + var(--space-6));max-height:85dvh;overflow-y:auto; }
    #cat-filters::-webkit-scrollbar { display:none }
  `;
  document.head.appendChild(s);
}
