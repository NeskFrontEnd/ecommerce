import { formatTime } from '../utils/format.js';

const RING_SZ = 220;
const RING_SW = 10;
const RING_R  = (RING_SZ - RING_SW) / 2;
const RING_CI = 2 * Math.PI * RING_R;

export function ringHTML(progress, color) {
  const p      = Math.min(1, Math.max(0, progress));
  const offset = RING_CI - p * RING_CI;
  return `
    <div class="ring-wrap">
      <svg width="${RING_SZ}" height="${RING_SZ}">
        <circle cx="${RING_SZ/2}" cy="${RING_SZ/2}" r="${RING_R}"
          stroke="var(--muted)" stroke-width="${RING_SW}" fill="none"/>
        <circle cx="${RING_SZ/2}" cy="${RING_SZ/2}" r="${RING_R}"
          stroke="${color}" stroke-width="${RING_SW}" fill="none"
          stroke-linecap="round"
          stroke-dasharray="${RING_CI.toFixed(2)}"
          stroke-dashoffset="${offset.toFixed(2)}"
          class="ring-progress"
          style="transition:stroke-dashoffset .8s ease"/>
      </svg>
      <div class="ring-inner" id="ring-inner"></div>
    </div>`;
}

export function updateRing(container, progress, color) {
  const circle = container.querySelector('.ring-progress');
  if (!circle) return;
  const p = Math.min(1, Math.max(0, progress));
  circle.setAttribute('stroke-dashoffset', (RING_CI - p * RING_CI).toFixed(2));
  if (color) circle.setAttribute('stroke', color);
}

export function renderWarmupHTML(workout, exerciseMap) {
  const exRows = workout.exercises.slice(0, 4).map((item, i) => {
    const ex = exerciseMap[item.exerciseId];
    const isTimed = item.type === 'timed' || item.type === 'cardio';
    const summary = isTimed ? `${item.sets}×${item.durationSec ?? 30}с` : `${item.sets}×${item.reps ?? '—'}`;
    return ex ? `
      <div style="display:flex;gap:10px;padding:5px 0;border-top:${i ? '1px solid var(--line)' : 'none'};align-items:center">
        <span class="mono" style="font-size:10px;color:var(--dim);min-width:20px">${String(i+1).padStart(2,'0')}</span>
        <span style="font-size:13px;font-weight:600;flex:1">${ex.name}</span>
        <span class="mono" style="font-size:11px;color:var(--dim)">${summary}</span>
      </div>` : '';
  }).join('');

  return `
    <div style="position:absolute;inset:0;background:var(--ink);display:flex;flex-direction:column;align-items:center;overflow:auto">
      <div style="padding:calc(env(safe-area-inset-top,52px) + 4px) 24px 0;text-align:center;width:100%;position:relative">
        <button id="btn-exit" style="position:absolute;top:max(14px,env(safe-area-inset-top,52px));left:20px;background:none;border:none;color:var(--dim);cursor:pointer;padding:4px">
          <svg class="icon icon-lg"><use href="#icon-x"/></svg>
        </button>
        <svg class="icon icon-xl" style="color:var(--orange);margin-bottom:10px;display:block;margin-left:auto;margin-right:auto"><use href="#icon-fire"/></svg>
        <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">Фаза 1 / 3</div>
        <h1 style="font-family:var(--font-display);font-size:44px;line-height:.9">РОЗМИНКА</h1>
        <p style="font-size:13px;color:var(--dim);margin-top:6px">Легке кардіо, рухливість суглобів</p>
      </div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center">
        ${ringHTML(0, 'var(--orange)')}
      </div>
      <div style="width:100%;padding:0 20px">
        <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Сьогодні</div>
        ${exRows}
      </div>
      <div style="width:100%;padding:20px">
        <button class="btn btn-ghost btn-full" id="btn-skip-warmup" style="height:52px">
          <svg class="icon icon-sm"><use href="#icon-skip"/></svg>
          Пропустити
        </button>
      </div>
    </div>`;
}

export function renderExerciseHTML(workout, exerciseMap, completedSets, exIdx) {
  const item       = workout.exercises[exIdx];
  const ex         = exerciseMap[item.exerciseId];
  const done       = completedSets[exIdx] || [];
  const total      = workout.exercises.length;
  const reps       = item.reps ?? 10;
  const wt         = item.weightKg ?? 0;
  const isTimed    = item.type === 'timed' || item.type === 'cardio';
  const isBodywt   = item.type === 'bodyweight';

  const stepperBlock = isTimed
    ? `<div style="text-align:center;padding:8px 20px">
        <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">ЦІЛЬ</div>
        <div style="font-family:var(--font-display);font-size:48px;color:var(--acid);line-height:1">${formatTime(item.durationSec ?? 30)}</div>
      </div>`
    : `<div style="display:flex;gap:16px;justify-content:center;padding:12px 20px">
        ${!isBodywt ? `<div class="sf-stepper">
          <span class="sf-stepper-label">ВАГА</span>
          <div class="sf-stepper-row">
            <button class="sf-stepper-btn" id="btn-wt-dec">−</button>
            <div><span class="sf-stepper-val" id="val-weight">${wt}</span><span class="sf-stepper-unit">кг</span></div>
            <button class="sf-stepper-btn" id="btn-wt-inc">+</button>
          </div>
        </div>` : ''}
        <div class="sf-stepper">
          <span class="sf-stepper-label">ПОВТ</span>
          <div class="sf-stepper-row">
            <button class="sf-stepper-btn" id="btn-reps-dec">−</button>
            <span class="sf-stepper-val" id="val-reps">${reps}</span>
            <button class="sf-stepper-btn" id="btn-reps-inc">+</button>
          </div>
        </div>
      </div>`;

  return `
    <div style="position:absolute;inset:0;background:var(--ink);display:flex;flex-direction:column;overflow:auto">
      <div class="sf-top-bar">
        <div class="sf-top-bar-left">
          <button id="btn-exit" style="background:none;border:none;color:var(--dim);cursor:pointer;padding:4px">
            <svg class="icon"><use href="#icon-chevron-left"/></svg>
          </button>
          <span class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em">${ex?.category ?? ''}</span>
        </div>
        <div class="sf-top-bar-right">
          <span id="total-time">00:00</span> · ${exIdx+1}/${total}
        </div>
      </div>

      <div style="text-align:center;padding:0 20px 10px">
        <h2 style="font-family:var(--font-display);font-size:clamp(22px,7vw,30px);text-transform:uppercase;line-height:.9">${ex?.name ?? '—'}</h2>
      </div>

      <div style="display:flex;justify-content:center;padding:0 20px">
        ${ringHTML(done.length / (item.sets || 1), 'var(--acid)')}
      </div>

      ${stepperBlock}

      <div class="sf-set-log" id="set-log">
        ${renderSetLog(done, item.sets, false)}
      </div>

      ${item.notes ? `<p style="font-size:12px;color:var(--dim);text-align:center;font-style:italic;margin:8px 20px;padding:4px 8px;background:var(--line);border-radius:10px">${item.notes}</p>` : ''}

      <div style="padding:12px 20px 28px;display:flex;gap:12px;flex-direction:column;margin-top:auto">
        <button class="btn btn-primary btn-xl btn-full" id="btn-start-set">
          <svg class="icon icon-lg"><use href="#icon-play"/></svg>
          СТАРТ
        </button>
        <div style="display:none;gap:12px" id="active-controls">
          <button id="btn-pause" style="width:72px;height:72px;border-radius:999px;background:var(--muted);border:1px solid rgba(255,255,255,0.08);color:var(--paper);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0">
            <svg class="icon icon-lg"><use href="#icon-pause"/></svg>
          </button>
          <button class="btn btn-danger btn-full" id="btn-stop-set" style="height:72px;font-size:15px">
            <svg class="icon icon-lg"><use href="#icon-stop"/></svg>
            СТОП
          </button>
        </div>
      </div>
    </div>`;
}

export function renderSetLog(done, totalSets, isActive) {
  return Array.from({length: totalSets}, (_, i) => {
    const s = done[i];
    const isCur = i === done.length;
    const nameColor = s ? 'var(--acid)' : isCur ? 'var(--paper)' : 'var(--dim)';
    let status = '';
    if (s) {
      const haReps = s.reps !== null && s.reps !== undefined;
      const haWt   = s.weightKg !== null && s.weightKg !== undefined && s.weightKg > 0;
      const detail = haReps
        ? (haWt ? `${s.reps}×${s.weightKg}кг` : `${s.reps} повт.`)
        : '';
      status = `<svg class="icon icon-sm" style="color:var(--acid)"><use href="#icon-check"/></svg>
        <span class="mono" style="font-size:11px;color:var(--dim)">${formatTime(s.durationSec)}</span>
        ${detail ? `<span class="mono" style="font-size:11px;color:var(--dim)">${detail}</span>` : ''}`;
    } else if (isCur) {
      status = `<span class="mono" style="font-size:11px;color:var(--acid)">${isActive ? '● АКТИВНИЙ' : '▸ ГОТОВИЙ'}</span>`;
    } else {
      status = `<span class="mono" style="font-size:11px;color:var(--muted)">—</span>`;
    }
    return `<div class="sf-set-row ${isCur ? 'is-current' : ''}">
      <span class="sf-set-name" style="color:${nameColor}">Сет ${i+1}</span>
      <div style="display:flex;gap:8px;align-items:center;flex:1">${status}</div>
    </div>`;
  }).join('');
}

export function renderRestHTML(restSec, isEx, next) {
  const heading = isEx ? 'ВІДПОЧИНОК МІЖ ВПРАВАМИ' : 'ВІДПОЧИНОК';
  const nextCard = next ? `
    <div style="width:100%;padding:0 24px;margin-bottom:14px">
      <div style="background:var(--line);border-radius:16px;padding:14px;border:1px solid var(--muted)">
        <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;margin-bottom:4px;letter-spacing:.08em">${isEx ? 'Наступна вправа' : 'Наступний сет'}</div>
        <div style="font-weight:700;font-size:14px">${next.name}</div>
        <div class="mono" style="font-size:12px;color:var(--dim);margin-top:2px">${next.detail}</div>
      </div>
    </div>` : '';

  return `
    <div style="position:absolute;inset:0;background:var(--ink);display:flex;flex-direction:column;align-items:center">
      <div style="padding:calc(env(safe-area-inset-top,52px) + 4px) 24px 0;text-align:center;position:relative;width:100%">
        <button id="btn-exit" style="position:absolute;top:max(14px,env(safe-area-inset-top,52px));left:20px;background:none;border:none;color:var(--dim);cursor:pointer;padding:4px">
          <svg class="icon icon-lg"><use href="#icon-x"/></svg>
        </button>
        <div class="mono" style="font-size:11px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em">${heading}</div>
      </div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center">
        ${ringHTML(0, 'var(--blue)')}
      </div>
      ${nextCard}
      <div style="width:100%;padding:0 20px 28px;display:flex;gap:12px">
        <button id="btn-pause" style="width:72px;height:72px;border-radius:999px;background:var(--muted);border:1px solid rgba(255,255,255,0.06);color:var(--paper);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0">
          <svg class="icon"><use href="#icon-pause"/></svg>
        </button>
        <button class="btn btn-orange btn-full" id="btn-skip-rest" style="height:72px">
          <svg class="icon icon-sm"><use href="#icon-skip"/></svg>
          Пропустити
        </button>
      </div>
    </div>`;
}

export function renderCooldownHTML() {
  return `
    <div style="position:absolute;inset:0;background:var(--ink);display:flex;flex-direction:column;align-items:center">
      <div style="padding:calc(env(safe-area-inset-top,52px) + 4px) 24px 0;text-align:center;position:relative;width:100%">
        <button id="btn-exit" style="position:absolute;top:max(14px,env(safe-area-inset-top,52px));left:20px;background:none;border:none;color:var(--dim);cursor:pointer;padding:4px">
          <svg class="icon icon-lg"><use href="#icon-x"/></svg>
        </button>
        <svg class="icon icon-xl" style="color:var(--ltblue);margin-bottom:10px;display:block;margin-left:auto;margin-right:auto"><use href="#icon-snow"/></svg>
        <div class="mono" style="font-size:10px;color:var(--dim);text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">Фаза 3 / 3</div>
        <h1 style="font-family:var(--font-display);font-size:44px;line-height:.9">ЗАМИНКА</h1>
        <p style="font-size:13px;color:var(--dim);margin-top:6px">Розтяжка, глибоке дихання</p>
      </div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center">
        ${ringHTML(0, 'var(--ltblue)')}
      </div>
      <div style="width:100%;padding:0 20px 28px">
        <button class="btn btn-ghost btn-full" id="btn-skip-cooldown" style="height:52px">
          <svg class="icon icon-sm"><use href="#icon-skip"/></svg>
          Пропустити
        </button>
      </div>
    </div>`;
}

export function renderExitModalHTML() {
  return `
    <div class="exit-modal-overlay" id="exit-modal">
      <div class="exit-modal-box">
        <div class="exit-modal-icon">
          <svg class="icon icon-lg"><use href="#icon-x"/></svg>
        </div>
        <h3 style="font-family:var(--font-display);font-size:22px;margin-bottom:6px">ЗАВЕРШИТИ?</h3>
        <p style="font-size:13px;color:var(--dim);line-height:1.5;margin-bottom:20px">Прогрес поточного тренування буде втрачено</p>
        <div style="display:flex;flex-direction:column;gap:10px">
          <button class="btn btn-danger btn-full" id="btn-exit-confirm" style="height:52px">Так, завершити</button>
          <button class="btn btn-sec btn-full" id="btn-exit-cancel" style="height:52px">Продовжити</button>
        </div>
      </div>
    </div>`;
}

export function injectSessionStyles() {
  if (document.getElementById('session-styles')) return;
  const s = document.createElement('style');
  s.id = 'session-styles';
  s.textContent = ``;
  document.head.appendChild(s);
}
