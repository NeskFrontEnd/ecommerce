/**
 * Profile screen — avatar + 2×2 stat grid + settings list.
 * Route: /profile
 */

import { getAllSessions, getStreak } from '../db/sessions.js';
import { formatDuration, calcVolume } from '../utils/format.js';

const SETTINGS = [
  { label: 'Одиниці виміру',    icon: 'icon-edit' },
  { label: 'Час відпочинку',    icon: 'icon-timer' },
  { label: 'Звук та вібрація',  icon: 'icon-skip' },
  { label: 'Експорт даних',     icon: 'icon-chart' },
];

export async function renderProfile(container) {
  const [sessions, streak] = await Promise.all([getAllSessions(), getStreak()]);
  const completed = sessions.filter(s => s.status === 'completed');

  const totalVol  = completed.reduce((sum, s) =>
    sum + (s.exercises || []).reduce((es, ex) =>
      es + calcVolume(ex.sets || []), 0), 0);
  const totalSecs = completed.reduce((s, sess) => s + (sess.totalDuration || 0), 0);
  const hours     = (totalSecs / 3600).toFixed(1).replace('.0', '');

  container.innerHTML = `
    <div class="screen" style="padding-bottom:var(--nav-height)">

      <div style="padding:calc(env(safe-area-inset-top,52px) + 16px) 20px 0;text-align:center">
        <div class="profile-avatar">
          <span style="font-family:var(--font-display);font-size:28px;color:var(--ink);line-height:1">SF</span>
        </div>
        <h1 style="font-family:var(--font-display);font-size:34px;line-height:.9;margin-top:6px">ПРОФІЛЬ</h1>
        <p class="mono" style="font-size:10px;color:var(--dim);margin-top:4px;letter-spacing:.06em">SUPAFAST FITESS · v1.0</p>
      </div>

      <div style="padding:20px" class="stagger">
        <div class="sf-stats-grid-2">
          ${statCard(completed.length, 'Тренувань')}
          ${statCard(streak, 'Серія днів')}
          ${statCard(Math.round(totalVol).toLocaleString('uk-UA'), "Об'єм кг")}
          ${statCard(hours, 'Годин')}
        </div>
      </div>

      <div style="padding:0 20px 20px;display:flex;flex-direction:column;gap:6px">
        <div class="mono" style="font-size:9px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">Налаштування</div>
        ${SETTINGS.map(s => `
          <div class="settings-row">
            <div style="display:flex;align-items:center;gap:10px">
              <svg class="icon icon-sm" style="color:var(--dim)"><use href="#${s.icon}"/></svg>
              <span style="font-size:13px;font-weight:500">${s.label}</span>
            </div>
            <svg class="icon icon-sm" style="color:var(--dim)"><use href="#icon-chevron-right"/></svg>
          </div>`).join('')}
      </div>

    </div>`;
}

function statCard(value, label) {
  return `
    <div class="sf-stat-card">
      <div class="sf-stat-value">${value}</div>
      <div class="sf-stat-label">${label}</div>
    </div>`;
}
