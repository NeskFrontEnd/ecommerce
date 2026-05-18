/**
 * Active session screen — ring-layout redesign.
 * State machine: warmup → ready → active ↔ paused → rest → cooldown → finish
 * Route: /session/:id/active
 */

import { navigate }        from '../utils/router.js';
import { getWorkoutById }  from '../db/workouts.js';
import { getAllExercises } from '../db/exercises.js';
import { createSession, completeSession, abandonSession } from '../db/sessions.js';
import { Timer }           from '../components/timer.js';
import { hideBar }         from '../components/bottom-bar.js';
import { hideNav, showNav } from '../components/nav.js';
import { formatTime }      from '../utils/format.js';
import { showToast }       from '../app.js';
import {
  renderWarmupHTML, renderExerciseHTML, renderRestHTML,
  renderCooldownHTML, renderExitModalHTML,
  renderSetLog, updateRing, injectSessionStyles,
} from './session-renders.js';
import { setRingContent, updateTotalTimeDisplay, bindSteppers, buildSessionExercisesData, renderFinishHTML } from './session-helpers.js';

const WARMUP_SEC   = 180;
const COOLDOWN_SEC = 180;

let state = null;

function resetState() {
  state = {
    phase: 'warmup', workout: null, exerciseMap: {},
    sessionId: null, currentExIdx: 0, goTo: null,
    completedSets: [], setStartedAt: null,
    timer: null, container: null,
    reps: 0, wt: 0, duration: 0, tt: 0, ttInterval: null,
  };
}

export async function renderSessionActive(container, params) {
  injectSessionStyles();
  resetState();
  state.container = container;
  hideNav();
  hideBar();

  const [workout, allExercises] = await Promise.all([
    getWorkoutById(params.id),
    getAllExercises(),
  ]);

  if (!workout) { showToast('Тренування не знайдено', 'error'); navigate('/workouts'); return; }

  state.workout       = workout;
  state.exerciseMap   = Object.fromEntries(allExercises.map(e => [e.id, e]));
  state.completedSets = workout.exercises.map(() => []);

  const session   = await createSession(workout.id, workout.name);
  state.sessionId = session.id;
  startTotalTimer();
  startWarmup();
}

function startTotalTimer() {
  state.ttInterval = setInterval(() => {
    state.tt++;
    updateTotalTimeDisplay(state.container, state.tt);
  }, 1000);
}

function stopTotalTimer() { clearInterval(state.ttInterval); state.ttInterval = null; }

function startWarmup() {
  state.phase = 'warmup';
  state.container.innerHTML = renderWarmupHTML(state.workout, state.exerciseMap);
  bindExitBtn();
  state.container.querySelector('#btn-skip-warmup')?.addEventListener('click', endWarmup);
  setRingContent(state.container, formatTime(WARMUP_SEC), 'var(--orange)', 'ЗАЛИШИЛОСЬ');

  state.timer = new Timer('countdown', WARMUP_SEC);
  state.timer.onTick(({ remaining }) => {
    updateRing(state.container, 1 - remaining / WARMUP_SEC, 'var(--orange)');
    setRingContent(state.container, formatTime(remaining), 'var(--orange)', 'ЗАЛИШИЛОСЬ');
  });
  state.timer.onComplete(endWarmup);
  state.timer.start();
}

function endWarmup() { stopTimer(); startReady(0); }

function startReady(exIdx) {
  state.phase = 'ready'; state.currentExIdx = exIdx; state.goTo = null;
  const item      = state.workout.exercises[exIdx];
  state.reps      = item.reps ?? 10;
  state.wt        = item.weightKg ?? 0;
  state.duration  = item.durationSec ?? 30;

  state.container.innerHTML = renderExerciseHTML(state.workout, state.exerciseMap, state.completedSets, exIdx);
  updateTotalTimeDisplay(state.container, state.tt);
  setRingContent(state.container, '00:00', 'var(--acid)', `Сет ${state.completedSets[exIdx].length + 1}/${item.sets}`);

  bindExitBtn();
  bindSteppers(state.container, state);
  state.container.querySelector('#btn-start-set')?.addEventListener('click', startActive);
}

function startActive() {
  state.phase = 'active'; state.setStartedAt = Date.now();
  const startBtn   = state.container.querySelector('#btn-start-set');
  const activeCtrl = state.container.querySelector('#active-controls');
  startBtn?.style.setProperty('display', 'none');
  if (activeCtrl) activeCtrl.style.display = 'flex';

  const item     = state.workout.exercises[state.currentExIdx];
  const done     = state.completedSets[state.currentExIdx];
  const isTimed  = item.type === 'timed' || item.type === 'cardio';
  const durSec   = state.duration;
  state.container.querySelector('#set-log').innerHTML = renderSetLog(done, item.sets, true);

  if (isTimed) {
    setRingContent(state.container, formatTime(durSec), 'var(--acid)', `Сет ${done.length + 1}/${item.sets}`);
    state.timer = new Timer('countdown', durSec);
    state.timer.onTick(({ remaining }) => {
      updateRing(state.container, 1 - remaining / durSec, 'var(--acid)');
      setRingContent(state.container, formatTime(remaining), 'var(--acid)', `Сет ${done.length + 1}/${item.sets}`);
    });
    state.timer.onComplete(stopActive);
  } else {
    state.timer = new Timer('stopwatch');
    state.timer.onTick(({ elapsed }) => {
      setRingContent(state.container, formatTime(elapsed), 'var(--acid)', `Сет ${done.length + 1}/${item.sets}`);
    });
  }
  state.timer.start();
  state.container.querySelector('#btn-pause')?.addEventListener('click', togglePause);
  state.container.querySelector('#btn-stop-set')?.addEventListener('click', stopActive);
}

function togglePause() {
  if (!state.timer) return;
  const wasPaused = state.timer.isPaused;
  const currentTime = state.container.querySelector('.ring-timer')?.textContent || '00:00';

  if (wasPaused) {
    state.timer.start();
    const color = state.phase === 'rest' ? 'var(--blue)' : 'var(--acid)';
    state.container.querySelector('.ring-progress')?.setAttribute('stroke', color);
  } else {
    state.timer.pause();
    state.container.querySelector('.ring-progress')?.setAttribute('stroke', 'var(--paper)');
    if (state.phase === 'rest') {
      setRingContent(state.container, currentTime, 'var(--paper)', 'ПАУЗА');
    } else if (state.phase === 'active') {
      const item = state.workout.exercises[state.currentExIdx];
      const done = state.completedSets[state.currentExIdx];
      setRingContent(state.container, currentTime, 'var(--paper)', `Сет ${done.length + 1}/${item?.sets}`);
    }
  }

  const useEl = state.container.querySelector('#btn-pause svg use');
  if (useEl) useEl.setAttribute('href', wasPaused ? '#icon-pause' : '#icon-play');
}

function stopActive() {
  const durationSec = Math.round(state.timer?.stop() ?? 0);
  stopTimer();
  const item     = state.workout.exercises[state.currentExIdx];
  const isTimed  = item.type === 'timed' || item.type === 'cardio';
  const isBodywt = item.type === 'bodyweight';
  const reps     = isTimed  ? null
                 : (parseInt(state.container.querySelector('#val-reps')?.textContent, 10) || state.reps);
  const weightKg = (isTimed || isBodywt) ? null
                 : (parseFloat(state.container.querySelector('#val-weight')?.textContent) || state.wt);

  state.completedSets[state.currentExIdx].push({
    setNumber: state.completedSets[state.currentExIdx].length + 1,
    startedAt: state.setStartedAt, endedAt: Date.now(),
    durationSec, reps, weightKg, rpe: null, notes: '',
  });

  const allDone = state.completedSets[state.currentExIdx].length >= item.sets;
  if (allDone) {
    const nextIdx = state.currentExIdx + 1;
    if (nextIdx < state.workout.exercises.length) startRest(180, nextIdx);
    else startCooldown();
  } else {
    startRest(item.restSec ?? 90, null);
  }
}

function startRest(restSec, goTo) {
  state.phase = 'rest'; state.goTo = goTo;
  const isEx = goTo !== null;
  let next = null;
  if (isEx) {
    const ne = state.workout.exercises[goTo];
    const ex = state.exerciseMap[ne?.exerciseId];
    if (ex) next = { name: ex.name, detail: `${ne.sets}×${ne.reps} · ${ne.weightKg ?? 0} кг` };
  } else {
    const item    = state.workout.exercises[state.currentExIdx];
    const isTimed = item.type === 'timed' || item.type === 'cardio';
    const detail  = isTimed ? formatTime(state.duration) : `${state.reps} повт · ${state.wt} кг`;
    next = { name: `Сет ${state.completedSets[state.currentExIdx].length + 1} / ${item.sets}`, detail };
  }
  state.container.innerHTML = renderRestHTML(restSec, isEx, next);
  bindExitBtn();
  setRingContent(state.container, formatTime(restSec), 'var(--blue)', '');
  state.timer = new Timer('countdown', restSec);
  state.timer.onTick(({ remaining }) => {
    updateRing(state.container, 1 - remaining / restSec, 'var(--blue)');
    setRingContent(state.container, formatTime(remaining), 'var(--blue)', '');
  });
  state.timer.onComplete(endRest);
  state.timer.start();
  state.container.querySelector('#btn-pause')?.addEventListener('click', togglePause);
  state.container.querySelector('#btn-skip-rest')?.addEventListener('click', endRest);
}

function endRest() {
  stopTimer();
  const goTo = state.goTo; state.goTo = null;
  startReady(goTo !== null ? goTo : state.currentExIdx);
}

function startCooldown() {
  state.phase = 'cooldown';
  state.container.innerHTML = renderCooldownHTML();
  bindExitBtn();
  setRingContent(state.container, formatTime(COOLDOWN_SEC), 'var(--ltblue)', 'ЗАЛИШИЛОСЬ');
  state.container.querySelector('#btn-skip-cooldown')?.addEventListener('click', showFinish);
  state.timer = new Timer('countdown', COOLDOWN_SEC);
  state.timer.onTick(({ remaining }) => {
    updateRing(state.container, 1 - remaining / COOLDOWN_SEC, 'var(--ltblue)');
    setRingContent(state.container, formatTime(remaining), 'var(--ltblue)', 'ЗАЛИШИЛОСЬ');
  });
  state.timer.onComplete(showFinish);
  state.timer.start();
}

async function showFinish() {
  stopTimer(); stopTotalTimer(); state.phase = 'finish';
  const exercisesData = buildSessionExercisesData(state.workout, state.exerciseMap, state.completedSets);
  await completeSession(state.sessionId, exercisesData);
  state.container.innerHTML = renderFinishHTML(state.workout.name, exercisesData, state.tt);
  showNav();
  state.container.querySelector('#btn-finish')?.addEventListener('click', () => navigate('/'));
}

function bindExitBtn() {
  state.container.querySelector('#btn-exit')?.addEventListener('click', showExitModal);
}

function showExitModal() {
  if (state.container.querySelector('#exit-modal')) return;
  state.container.insertAdjacentHTML('beforeend', renderExitModalHTML());
  state.container.querySelector('#btn-exit-confirm')?.addEventListener('click', doExit);
  state.container.querySelector('#btn-exit-cancel')?.addEventListener('click', () => {
    state.container.querySelector('#exit-modal')?.remove();
  });
}

function doExit() {
  stopTimer(); stopTotalTimer();
  abandonSession(state.sessionId).catch(() => {});
  showNav(); navigate('/');
}

function stopTimer() { state.timer?.stop(); state.timer = null; }
