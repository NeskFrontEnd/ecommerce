/**
 * History screen — mini-calendar + session list per spec.
 * Route: /history
 */

import { getAllSessions, deleteSession } from '../db/sessions.js';
import { formatDate, formatDuration, calcVolume, toDateKey } from '../utils/format.js';
import { showToast } from '../app.js';

export async function renderHistory(container) {
  container.innerHTML = `
    <div class="screen" style="padding-bottom:var(--nav-height)">
      <div style="padding:calc(env(safe-area-inset-top,52px) + 4px) 20px 0">
        <h1 style="font-family:var(--font-display);font-size:34px;line-height:.9">ІСТОРІЯ</h1>
      </div>
      <div id="history-body" style="padding:16px 20px 0">
        <div class="mono" style="font-size:10px;color:var(--dim);text-align:center;padding:var(--space-8) 0">Завантаження...</div>
      </div>
    </div>`;

  const sessions = await getAllSessions();
  renderFull(container.querySelector('#history-body'), sessions);
}

function renderFull(body, sessions) {
  const completed = sessions.filter(s => s.status === 'completed');

  if (!completed.length) {
    body.innerHTML = `
      <div class="empty-state">
        <svg class="icon icon-xl" style="opacity:.3"><use href="#icon-calendar"/></svg>
        <div class="empty-state-title">Немає записів</div>
        <p class="mono" style="font-size:11px;color:var(--dim)">Виконай перше тренування</p>
      </div>`;
    return;
  }

  const dayMap = buildDayMap(completed);

  body.innerHTML = `
    ${renderCalendar(new Date(), dayMap)}
    <div class="stagger" style="display:flex;flex-direction:column;gap:8px;margin-top:16px">
      ${completed.map(s => sessionCard(s)).join('')}
    </div>`;

  body.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = btn.dataset.delete;
      if (!confirm('Видалити цей запис?')) return;
      try {
        await deleteSession(id);
        showToast('Видалено', 'success');
        renderFull(body, await getAllSessions());
      } catch { showToast('Помилка', 'error'); }
    });
  });
}

function renderCalendar(date, dayMap) {
  const year  = date.getFullYear();
  const month = date.getMonth();
  const first = new Date(year, month, 1);
  const last  = new Date(year, month + 1, 0);
  const startDow  = (first.getDay() + 6) % 7;
  const monthName = date.toLocaleDateString('uk-UA', { month: 'long', year: 'numeric' });

  const headers = ['Пн','Вт','Ср','Чт','Пт','Сб','Нд']
    .map(d => `<div style="text-align:center;font-family:var(--font-mono);font-size:9px;color:var(--dim)">${d}</div>`)
    .join('');

  const blanks = Array.from({ length: startDow }, () => `<div style="aspect-ratio:1"></div>`).join('');

  let days = '';
  for (let d = 1; d <= last.getDate(); d++) {
    const key    = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const active = dayMap.has(key);
    days += `<div class="mini-cal-day ${active ? 'active' : 'inactive'}">
      <span>${d}</span>
      ${active ? `<div class="mini-cal-dot"></div>` : ''}
    </div>`;
  }

  return `
    <div style="background:var(--line);border-radius:14px;padding:12px;border:1px solid var(--muted)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <span class="mono" style="font-size:11px;font-weight:700;text-transform:capitalize">${monthName}</span>
        <svg class="icon icon-sm" style="color:var(--dim)"><use href="#icon-calendar"/></svg>
      </div>
      <div class="mini-cal-grid">${headers}${blanks}${days}</div>
    </div>`;
}

function sessionCard(s) {
  const sets   = s.exercises?.reduce((t, e) => t + (e.sets?.length || 0), 0) || 0;
  const volume = s.exercises?.reduce((t, e) => t + calcVolume(e.sets || []), 0) || 0;
  const volStr = volume > 0 ? `${Math.round(volume)} кг` : null;

  return `
    <div style="background:var(--line);border-radius:14px;padding:14px;border:1px solid var(--muted)" class="animate-reveal">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
        <div>
          <div style="font-weight:700;font-size:14px;margin-bottom:2px">${s.workoutName}</div>
          <div class="mono" style="font-size:10px;color:var(--dim)">${formatDate(s.startedAt)}</div>
        </div>
        <button style="background:none;border:none;color:var(--dim);cursor:pointer;padding:4px;-webkit-tap-highlight-color:transparent" data-delete="${s.id}">
          <svg class="icon icon-sm"><use href="#icon-trash"/></svg>
        </button>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <span class="tag"><svg class="icon icon-sm" style="margin-right:2px"><use href="#icon-timer"/></svg>${formatDuration(s.totalDuration || 0)}</span>
        <span class="tag">${sets} сетів</span>
        ${volStr ? `<span class="tag tag-accent">${volStr}</span>` : ''}
      </div>
    </div>`;
}

function buildDayMap(sessions) {
  const map = new Map();
  sessions.forEach(s => {
    const key = s.dateKey || toDateKey(s.startedAt);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  });
  return map;
}
