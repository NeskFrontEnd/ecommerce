/**
 * Plans screen — redesign per spec.
 * Header "ПЛАНИ" + "+" circle, plan cards with tags + arrow.
 */

import { navigate }     from '../utils/router.js';
import { getAllWorkouts, deleteWorkout } from '../db/workouts.js';
import { showToast }    from '../app.js';

export async function renderWorkouts(container) {
  injectWorkoutsStyles();
  container.innerHTML = `
    <div class="screen" style="padding-bottom:var(--nav-height)">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:calc(env(safe-area-inset-top,52px) + 4px) 20px 0">
        <h1 style="font-family:var(--font-display);font-size:34px">ПЛАНИ</h1>
        <button id="btn-new" style="width:40px;height:40px;border-radius:999px;background:var(--acid);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer">
          <svg class="icon" style="color:var(--ink)"><use href="#icon-plus"/></svg>
        </button>
      </div>
      <div id="plans-list" style="padding:20px;display:flex;flex-direction:column;gap:10px">
        <div class="mono" style="font-size:10px;color:var(--dim);text-align:center;padding:var(--space-8) 0">Завантаження...</div>
      </div>
    </div>`;

  container.querySelector('#btn-new').addEventListener('click', () => navigate('/workout/new'));
  await loadList(container.querySelector('#plans-list'));
}

const CATEGORY_TAGS = {
  chest: 'Груди', back: 'Спина', legs: 'Ноги',
  shoulders: 'Плечі', arms: 'Руки', core: 'Кор', cardio: 'Кардіо',
};

async function loadList(listEl) {
  const workouts = await getAllWorkouts();

  if (!workouts.length) {
    listEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🏋️</div>
        <div class="empty-state-title">Немає планів</div>
        <p class="text-dim text-sm">Натисни "+" щоб створити перший план</p>
      </div>`;
    return;
  }

  listEl.innerHTML = workouts.map(w => planCard(w)).join('');

  listEl.querySelectorAll('.plan-card').forEach(el => {
    el.addEventListener('click', () => navigate(`/workout/${el.dataset.id}`));
  });
  listEl.querySelectorAll('[data-action="delete"]').forEach(el => {
    el.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (!confirm('Видалити цей план?')) return;
      try {
        await deleteWorkout(el.dataset.id);
        showToast('Видалено', 'success');
        await loadList(listEl);
      } catch { showToast('Помилка', 'error'); }
    });
  });
}

function planCard(w) {
  const exCount = w.exercises?.length || 0;
  const sets    = w.exercises?.reduce((s, e) => s + (e.sets || 0), 0) || 0;
  const tags    = [
    `<span class="plan-tag">${exCount} вправ</span>`,
    `<span class="plan-tag">${sets} сетів</span>`,
    ...(w.tags || []).map(t => `<span class="plan-tag plan-tag-accent">${t}</span>`),
  ].join('');

  return `
    <div class="plan-card" data-id="${w.id}">
      <div style="flex:1">
        <div style="font-weight:700;font-size:15px">${w.name}</div>
        <div style="font-size:12px;color:var(--dim);margin-top:2px">${exCount} вправ · ${sets} сетів</div>
        <div class="plan-card-tags">${tags}</div>
      </div>
      <svg class="icon" style="color:var(--dim);flex-shrink:0"><use href="#icon-chevron-right"/></svg>
    </div>`;
}

export function injectWorkoutsStyles() {
  if (document.getElementById('workouts-styles')) return;
  const s = document.createElement('style');
  s.id = 'workouts-styles';
  s.textContent = '';
  document.head.appendChild(s);
}
