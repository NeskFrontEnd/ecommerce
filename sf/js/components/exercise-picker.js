/**
 * Exercise picker — fullscreen overlay redesign per spec.
 * "ОБРАТИ ВПРАВУ" + search + categorized list with "+" icons.
 *
 * Usage:
 *   import { showExercisePicker, injectPickerStyles } from '../components/exercise-picker.js';
 *   showExercisePicker(exercises, (exerciseId) => { ... });
 */

import { CATEGORIES } from '../data/exercise-library.js';

export function showExercisePicker(exercises, onSelect) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:absolute;inset:0;z-index:200;background:var(--ink);display:flex;flex-direction:column;animation:sfFade .3s ease both;overflow:hidden';

  overlay.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:calc(env(safe-area-inset-top,52px) + 4px) 20px 14px">
      <h2 style="font-family:var(--font-display);font-size:24px">ОБРАТИ ВПРАВУ</h2>
      <button id="picker-close" style="width:36px;height:36px;border-radius:999px;background:var(--muted);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--paper)">
        <svg class="icon icon-sm"><use href="#icon-x"/></svg>
      </button>
    </div>
    <div style="padding:0 20px 10px">
      <input id="picker-search" type="search" placeholder="Пошук вправи..."
        style="width:100%;padding:12px 16px;background:var(--line);border:1px solid var(--muted);border-radius:12px;color:var(--paper);font-family:var(--font-sans);font-size:14px;outline:none"
        autocomplete="off" autocorrect="off"/>
    </div>
    <div id="picker-list" style="flex:1;overflow-y:auto;padding:0 20px 20px"></div>
  `;

  (document.getElementById('app') || document.body).appendChild(overlay);

  let filterSearch = '';

  function renderList() {
    let filtered = exercises;
    if (filterSearch) filtered = filtered.filter(e =>
      e.name.toLowerCase().includes(filterSearch.toLowerCase())
    );

    const listEl = overlay.querySelector('#picker-list');
    if (!filtered.length) {
      listEl.innerHTML = `<p class="mono" style="font-size:10px;color:var(--dim);text-align:center;padding:var(--space-8) 0">Нічого не знайдено</p>`;
      return;
    }

    const groups = {};
    filtered.forEach(ex => {
      if (!groups[ex.category]) groups[ex.category] = [];
      groups[ex.category].push(ex);
    });

    listEl.innerHTML = Object.entries(groups).map(([cat, items]) => `
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--acid);text-transform:uppercase;letter-spacing:.08em;padding:12px 0 6px;border-bottom:1px solid var(--line)">${CATEGORIES[cat] || cat}</div>
      ${items.map(ex => `
        <div data-pick-id="${ex.id}" style="padding:12px 0;border-bottom:1px solid var(--line);cursor:pointer;display:flex;justify-content:space-between;align-items:center;-webkit-tap-highlight-color:transparent">
          <span style="font-size:14px;font-weight:500">${ex.name}</span>
          <svg class="icon" style="color:var(--acid);flex-shrink:0"><use href="#icon-plus"/></svg>
        </div>`).join('')}
    `).join('');

    listEl.querySelectorAll('[data-pick-id]').forEach(el => {
      el.addEventListener('click', () => {
        overlay.remove();
        onSelect(el.dataset.pickId);
      });
    });
  }

  overlay.querySelector('#picker-search').addEventListener('input', e => {
    filterSearch = e.target.value;
    renderList();
  });
  overlay.querySelector('#picker-close').addEventListener('click', () => overlay.remove());

  setTimeout(() => overlay.querySelector('#picker-search')?.focus(), 300);
  renderList();
}

export function injectPickerStyles() {}
