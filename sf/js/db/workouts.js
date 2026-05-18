/**
 * CRUD for workouts store.
 * A workout is a named plan with an ordered list of exercises + parameters.
 */

import { tx, reqToPromise } from './schema.js';
import { uuid } from '../utils/format.js';

const STORE = 'workouts';

/** Get all workouts, sorted by updatedAt desc */
export async function getAllWorkouts() {
  const all = await tx(STORE, 'readonly', ({ workouts }) => {
    return reqToPromise(workouts.getAll());
  });
  return all.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
}

/** Get workout by id */
export async function getWorkoutById(id) {
  return tx(STORE, 'readonly', ({ workouts }) => {
    return reqToPromise(workouts.get(id));
  });
}

/** Create a new workout plan */
export async function createWorkout(data) {
  const now = Date.now();
  const workout = {
    id:          uuid(),
    name:        data.name        || 'Без назви',
    description: data.description || '',
    tags:        data.tags        || [],
    exercises:   data.exercises   || [],
    createdAt:   now,
    updatedAt:   now,
  };
  await tx(STORE, 'readwrite', ({ workouts }) => {
    return reqToPromise(workouts.add(workout));
  });
  return workout;
}

/** Update existing workout */
export async function updateWorkout(id, data) {
  return tx(STORE, 'readwrite', ({ workouts }) => {
    return new Promise((resolve, reject) => {
      const getReq = workouts.get(id);
      getReq.onsuccess = (e) => {
        const existing = e.target.result;
        if (!existing) return reject(new Error('Workout not found'));
        const updated = { ...existing, ...data, id, updatedAt: Date.now() };
        const putReq = workouts.put(updated);
        putReq.onsuccess = () => resolve(updated);
        putReq.onerror   = (e) => reject(e.target.error);
      };
      getReq.onerror = (e) => reject(e.target.error);
    });
  });
}

/** Delete workout by id */
export async function deleteWorkout(id) {
  return tx(STORE, 'readwrite', ({ workouts }) => {
    return reqToPromise(workouts.delete(id));
  });
}

/**
 * Duplicate a workout (returns new copy).
 */
export async function duplicateWorkout(id) {
  const original = await getWorkoutById(id);
  if (!original) throw new Error('Workout not found');
  return createWorkout({
    ...original,
    name: `${original.name} (копія)`,
    id: undefined,
  });
}
