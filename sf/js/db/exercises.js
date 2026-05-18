/**
 * CRUD for exercises store.
 * Built-in exercises are seeded on first launch (see app.js).
 */

import { tx, reqToPromise } from './schema.js';
import { uuid } from '../utils/format.js';

const STORE = 'exercises';

/** Get all exercises, sorted by name */
export async function getAllExercises() {
  return tx(STORE, 'readonly', ({ exercises }) => {
    return reqToPromise(exercises.getAll());
  });
}

/** Get exercises by category */
export async function getExercisesByCategory(category) {
  return tx(STORE, 'readonly', ({ exercises }) => {
    const index = exercises.index('category');
    return reqToPromise(index.getAll(category));
  });
}

/** Get single exercise by id */
export async function getExerciseById(id) {
  return tx(STORE, 'readonly', ({ exercises }) => {
    return reqToPromise(exercises.get(id));
  });
}

/** Create a new exercise */
export async function createExercise(data) {
  const exercise = {
    id:                 uuid(),
    name:               data.name,
    category:           data.category           || 'strength',
    type:               data.type               || 'weighted',
    muscleGroups:       data.muscleGroups        || [],
    isCustom:           true,
    defaultSets:        data.defaultSets         ?? 3,
    defaultReps:        data.defaultReps         ?? null,
    defaultWeightKg:    data.defaultWeightKg     ?? null,
    defaultRestSec:     data.defaultRestSec      ?? 90,
    defaultDurationSec: data.defaultDurationSec  ?? null,
    notes:              data.notes               || '',
    createdAt:          Date.now(),
  };
  await tx(STORE, 'readwrite', ({ exercises }) => {
    return reqToPromise(exercises.add(exercise));
  });
  return exercise;
}

/** Update an existing exercise (only custom ones should be edited) */
export async function updateExercise(id, data) {
  return tx(STORE, 'readwrite', ({ exercises }) => {
    return new Promise((resolve, reject) => {
      const getReq = exercises.get(id);
      getReq.onsuccess = (e) => {
        const existing = e.target.result;
        if (!existing) return reject(new Error('Exercise not found'));
        const updated = { ...existing, ...data, id, updatedAt: Date.now() };
        const putReq = exercises.put(updated);
        putReq.onsuccess = () => resolve(updated);
        putReq.onerror   = (e) => reject(e.target.error);
      };
      getReq.onerror = (e) => reject(e.target.error);
    });
  });
}

/** Delete a custom exercise */
export async function deleteExercise(id) {
  return tx(STORE, 'readwrite', ({ exercises }) => {
    return reqToPromise(exercises.delete(id));
  });
}

/**
 * Sync built-in exercises with the library on every startup.
 * Uses put (upsert) so new/updated built-ins always reflect latest library.
 * Custom exercises (different IDs) are unaffected.
 */
export async function seedBuiltinExercises(library) {
  await tx(STORE, 'readwrite', ({ exercises }) => {
    library.forEach(ex => exercises.put(ex));
    return Promise.resolve();
  });
}
