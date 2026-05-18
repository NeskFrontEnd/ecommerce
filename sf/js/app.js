/**
 * App entry point.
 * Initializes DB, seeds exercise library, registers routes, starts router.
 */

import { register, start as startRouter, onChange } from './utils/router.js';
import { openDB }             from './db/schema.js';
import { seedBuiltinExercises } from './db/exercises.js';
import { EXERCISE_LIBRARY }   from './data/exercise-library.js';
import { initNav, showNav, hideNav } from './components/nav.js';
import { initBottomBar }      from './components/bottom-bar.js';

// Screens (lazy-loaded on route match)
import { renderHome, injectHomeStyles }         from './screens/home.js';
import { renderWorkouts, injectWorkoutsStyles } from './screens/workouts.js';
import { renderWorkoutEditor, injectEditorStyles } from './screens/workout-editor.js';
import { renderSessionPreview }                 from './screens/session-preview.js';
import { renderSessionActive }                  from './screens/session-active.js';
import { renderHistory }                        from './screens/history.js';
import { renderExercises }                      from './screens/exercises.js';
import { renderProfile }                        from './screens/profile.js';

// ── Boot sequence ─────────────────────────────────

async function boot() {
  try {
    // 1. Open DB
    await openDB();

    // 2. Seed built-in exercises
    await seedBuiltinExercises(EXERCISE_LIBRARY);

    // 3. Load SVG sprite
    await loadSvgSprite();

    // 4. Inject shared styles
    injectHomeStyles();
    injectWorkoutsStyles();
    injectEditorStyles();

    // 5. Init components
    initNav();
    initBottomBar();

    // 6. Register routes
    registerRoutes();

    // 7. Start router
    startRouter();

    // 8. Hide splash
    hideSplash();

  } catch (err) {
    console.error('[app] Boot failed:', err);
    showFatalError(err);
  }
}

// ── Routes ────────────────────────────────────────

function registerRoutes() {
  const container = document.getElementById('screen');

  register('/', async () => {
    showNav();
    await renderHome(container);
  });

  register('/workouts', async () => {
    showNav();
    await renderWorkouts(container);
  });

  register('/workout/new', async () => {
    showNav();
    await renderWorkoutEditor(container, { id: 'new' });
  });

  register('/workout/:id', async (params) => {
    showNav();
    await renderWorkoutEditor(container, params);
  });

  register('/session/:id', async (params) => {
    showNav();
    await renderSessionPreview(container, params);
  });

  register('/session/:id/active', async (params) => {
    hideNav();
    await renderSessionActive(container, params);
  });

  register('/history', async () => {
    showNav();
    await renderHistory(container);
  });

  register('/exercises', async () => {
    showNav();
    await renderExercises(container);
  });

  register('/profile', async () => {
    showNav();
    await renderProfile(container);
  });
}

// ── Toast system ──────────────────────────────────

/**
 * Show a toast notification.
 * @param {string} message
 * @param {'success'|'error'|'info'} type
 * @param {number} [duration=2500]
 */
export function showToast(message, type = 'info', duration = 2500) {
  const container = document.getElementById('toasts');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toast-out 250ms ease forwards';
    setTimeout(() => toast.remove(), 260);
  }, duration);
}

// ── Helpers ───────────────────────────────────────

async function loadSvgSprite() {
  try {
    const res  = await fetch('./assets/icons.svg');
    const text = await res.text();
    const div  = document.createElement('div');
    div.style.display = 'none';
    div.innerHTML = text;
    document.body.insertBefore(div, document.body.firstChild);
  } catch {
    console.warn('[app] SVG sprite failed to load');
  }
}

function hideSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  // Small delay so the first screen renders before hiding
  requestAnimationFrame(() => {
    setTimeout(() => splash.classList.add('hidden'), 200);
  });
}

function showFatalError(err) {
  document.body.innerHTML = `
    <div style="
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; min-height: 100dvh; padding: 2rem;
      font-family: monospace; color: #f5f5f0; text-align: center;">
      <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
      <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">Помилка запуску</div>
      <div style="color: #ff4444; font-size: 0.8rem;">${err.message}</div>
      <button onclick="location.reload()"
        style="margin-top: 2rem; padding: 0.75rem 2rem; background: #c6f432;
               color: #0a0a0a; border: none; border-radius: 9999px; cursor: pointer;
               font-weight: 700; font-family: monospace;">
        Перезавантажити
      </button>
    </div>
  `;
}

// ── Start ─────────────────────────────────────────

boot();
