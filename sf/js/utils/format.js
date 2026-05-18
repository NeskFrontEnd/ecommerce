/**
 * Formatting utilities — time, dates, numbers.
 * All pure functions, no side effects.
 */

/** Seconds → "MM:SS" */
export function formatTime(totalSec) {
  const s = Math.max(0, Math.floor(totalSec));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

/** Seconds → "X хв Y сек" (human readable) */
export function formatDuration(totalSec) {
  const s = Math.max(0, Math.floor(totalSec));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  if (m === 0) return `${sec} сек`;
  if (sec === 0) return `${m} хв`;
  return `${m} хв ${sec} сек`;
}

/** Seconds → "1г 5хв" for longer durations */
export function formatDurationLong(totalSec) {
  const s = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}г ${m}хв`;
  if (m > 0) return `${m}хв ${sec}с`;
  return `${sec}с`;
}

/** timestamp → "14 трав" */
export function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
}

/** timestamp → "Пн, 14 трав 2025" */
export function formatDateFull(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('uk-UA', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

/** timestamp → "14:35" */
export function formatTimeOfDay(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
}

/** ISO date string "YYYY-MM-DD" for a timestamp */
export function toDateKey(ts) {
  return new Date(ts).toISOString().slice(0, 10);
}

/** Today's date key */
export function todayKey() {
  return toDateKey(Date.now());
}

/** Kilograms formatted: 10 → "10 кг", 10.5 → "10.5 кг" */
export function formatWeight(kg) {
  if (!kg && kg !== 0) return '—';
  return `${kg % 1 === 0 ? kg : kg.toFixed(1)} кг`;
}

/** Volume = sets × reps × weight, in kg */
export function calcVolume(sets) {
  return sets.reduce((sum, s) => sum + (s.reps || 0) * (s.weightKg || 0), 0);
}

/** Average of array of numbers */
export function average(arr) {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

/** Ordinal: 1 → "1-й", 2 → "2-й" */
export function ordinal(n) {
  return `${n}-й`;
}

/** Generate a simple UUID v4 */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
