/**
 * CRUD for sessions store.
 * A session is a recorded training event (completed or in-progress).
 */

import { tx, reqToPromise } from './schema.js';
import { uuid, toDateKey } from '../utils/format.js';

const STORE = 'sessions';

/** Get all sessions, sorted by startedAt desc */
export async function getAllSessions() {
  const all = await tx(STORE, 'readonly', ({ sessions }) => {
    return reqToPromise(sessions.getAll());
  });
  return all.sort((a, b) => (b.startedAt || 0) - (a.startedAt || 0));
}

/** Get sessions by date key (YYYY-MM-DD) */
export async function getSessionsByDate(dateKey) {
  return tx(STORE, 'readonly', ({ sessions }) => {
    const index = sessions.index('dateKey');
    return reqToPromise(index.getAll(dateKey));
  });
}

/** Get sessions for a given month (YYYY-MM prefix) */
export async function getSessionsForMonth(yearMonth) {
  const all = await getAllSessions();
  return all.filter(s => s.dateKey?.startsWith(yearMonth));
}

/** Get session by id */
export async function getSessionById(id) {
  return tx(STORE, 'readonly', ({ sessions }) => {
    return reqToPromise(sessions.get(id));
  });
}

/** Get the most recent completed session for a workoutId */
export async function getLastSessionForWorkout(workoutId) {
  const all = await tx(STORE, 'readonly', ({ sessions }) => {
    const index = sessions.index('workoutId');
    return reqToPromise(index.getAll(workoutId));
  });
  return all
    .filter(s => s.status === 'completed')
    .sort((a, b) => (b.startedAt || 0) - (a.startedAt || 0))[0] || null;
}

/** Create a new session (status: in-progress) */
export async function createSession(workoutId, workoutName) {
  const now  = Date.now();
  const session = {
    id:           uuid(),
    workoutId,
    workoutName,
    startedAt:    now,
    endedAt:      null,
    totalDuration: 0,
    status:       'in-progress',
    dateKey:      toDateKey(now),
    exercises:    [],
  };
  await tx(STORE, 'readwrite', ({ sessions }) => {
    return reqToPromise(sessions.add(session));
  });
  return session;
}

/** Update session (used for saving progress mid-session and on complete) */
export async function updateSession(id, data) {
  return tx(STORE, 'readwrite', ({ sessions }) => {
    return new Promise((resolve, reject) => {
      const getReq = sessions.get(id);
      getReq.onsuccess = (e) => {
        const existing = e.target.result;
        if (!existing) return reject(new Error('Session not found'));
        const updated = { ...existing, ...data, id };
        const putReq = sessions.put(updated);
        putReq.onsuccess = () => resolve(updated);
        putReq.onerror   = (e) => reject(e.target.error);
      };
      getReq.onerror = (e) => reject(e.target.error);
    });
  });
}

/** Mark session as completed */
export async function completeSession(id, exercisesData) {
  const now = Date.now();
  const session = await getSessionById(id);
  if (!session) throw new Error('Session not found');

  const totalDuration = Math.floor((now - session.startedAt) / 1000);
  return updateSession(id, {
    status:        'completed',
    endedAt:       now,
    totalDuration,
    exercises:     exercisesData,
  });
}

/** Mark session as abandoned */
export async function abandonSession(id) {
  return updateSession(id, {
    status:   'abandoned',
    endedAt:  Date.now(),
  });
}

/** Delete a session */
export async function deleteSession(id) {
  return tx(STORE, 'readwrite', ({ sessions }) => {
    return reqToPromise(sessions.delete(id));
  });
}

/** Get workout streak (consecutive days with completed sessions) */
export async function getStreak() {
  const all = await getAllSessions();
  const completed = all.filter(s => s.status === 'completed');
  if (!completed.length) return 0;

  const daySet = new Set(completed.map(s => s.dateKey));
  let streak = 0;
  let current = new Date();

  while (true) {
    const key = current.toISOString().slice(0, 10);
    if (!daySet.has(key)) {
      // allow skipping today if no session yet
      if (streak === 0 && key === toDateKey(Date.now())) {
        current.setDate(current.getDate() - 1);
        continue;
      }
      break;
    }
    streak++;
    current.setDate(current.getDate() - 1);
  }
  return streak;
}
