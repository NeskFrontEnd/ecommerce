/**
 * Built-in exercise library.
 * type: 'weighted' | 'bodyweight' | 'timed' | 'cardio'
 * defaultDurationSec: seconds per set (timed/cardio only, null otherwise)
 */

export const EXERCISE_LIBRARY = [
  // ── СИЛА — Ноги ──────────────────────────────────
  { id: 'bi-squat',         name: 'Присідання',                  category: 'strength', type: 'weighted',   muscleGroups: ['quads','glutes'],             isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 90,  defaultDurationSec: null, notes: '' },
  { id: 'bi-rdl',           name: 'Румунська тяга',              category: 'strength', type: 'weighted',   muscleGroups: ['hamstrings','glutes'],         isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 90,  defaultDurationSec: null, notes: '' },
  { id: 'bi-glute-bridge',  name: 'Ягодичний міст',              category: 'strength', type: 'weighted',   muscleGroups: ['glutes'],                     isCustom: false, defaultSets: 3, defaultReps: 15, defaultWeightKg: null, defaultRestSec: 60,  defaultDurationSec: null, notes: '1 сек пауза зверху' },
  { id: 'bi-hip-thrust',    name: 'Хіп траст',                   category: 'strength', type: 'weighted',   muscleGroups: ['glutes','hamstrings'],         isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 90,  defaultDurationSec: null, notes: '' },
  { id: 'bi-lunges',        name: 'Випади',                      category: 'strength', type: 'bodyweight', muscleGroups: ['quads','glutes'],             isCustom: false, defaultSets: 3, defaultReps: 10, defaultWeightKg: null, defaultRestSec: 60,  defaultDurationSec: null, notes: 'На кожну ногу' },
  { id: 'bi-leg-press',     name: 'Жим ногами',                  category: 'strength', type: 'weighted',   muscleGroups: ['quads','glutes'],             isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 90,  defaultDurationSec: null, notes: '' },
  { id: 'bi-leg-curl',      name: 'Сгинання ніг лежачи',         category: 'strength', type: 'weighted',   muscleGroups: ['hamstrings'],                 isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 60,  defaultDurationSec: null, notes: '' },
  { id: 'bi-calf-raise',    name: 'Підйом на носки',             category: 'strength', type: 'weighted',   muscleGroups: ['calves'],                     isCustom: false, defaultSets: 3, defaultReps: 20, defaultWeightKg: null, defaultRestSec: 45,  defaultDurationSec: null, notes: '' },
  { id: 'bi-sumo-squat',    name: 'Сумо присідання',             category: 'strength', type: 'weighted',   muscleGroups: ['quads','glutes','adductors'], isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 90,  defaultDurationSec: null, notes: '' },
  { id: 'bi-step-up',       name: 'Підйом на платформу',         category: 'strength', type: 'bodyweight', muscleGroups: ['quads','glutes'],             isCustom: false, defaultSets: 3, defaultReps: 10, defaultWeightKg: null, defaultRestSec: 60,  defaultDurationSec: null, notes: 'На кожну ногу' },
  { id: 'bi-goblet-squat',  name: 'Goblet squat',                category: 'strength', type: 'weighted',   muscleGroups: ['quads','glutes'],             isCustom: false, defaultSets: 3, defaultReps: 10, defaultWeightKg: null, defaultRestSec: 90,  defaultDurationSec: null, notes: 'Гантель або гиря до грудей' },
  { id: 'bi-bulgarian-ssq', name: 'Болгарські випади',           category: 'strength', type: 'weighted',   muscleGroups: ['quads','glutes'],             isCustom: false, defaultSets: 3, defaultReps: 10, defaultWeightKg: null, defaultRestSec: 90,  defaultDurationSec: null, notes: 'На кожну ногу' },
  { id: 'bi-sumo-dl',       name: 'Сумо тяга',                   category: 'strength', type: 'weighted',   muscleGroups: ['glutes','hamstrings'],         isCustom: false, defaultSets: 3, defaultReps: 8,  defaultWeightKg: null, defaultRestSec: 120, defaultDurationSec: null, notes: '' },

  // ── СИЛА — Спина ─────────────────────────────────
  { id: 'bi-pullup',        name: 'Підтягування',                category: 'strength', type: 'bodyweight', muscleGroups: ['lats','biceps'],               isCustom: false, defaultSets: 3, defaultReps: 6,  defaultWeightKg: null, defaultRestSec: 120, defaultDurationSec: null, notes: '' },
  { id: 'bi-band-pull',     name: 'Тяга резинки',                category: 'strength', type: 'weighted',   muscleGroups: ['lats','rhomboids'],           isCustom: false, defaultSets: 3, defaultReps: 15, defaultWeightKg: null, defaultRestSec: 60,  defaultDurationSec: null, notes: '' },
  { id: 'bi-row-db',        name: 'Тяга гантелі в нахилі',       category: 'strength', type: 'weighted',   muscleGroups: ['lats','rhomboids'],           isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 90,  defaultDurationSec: null, notes: '' },
  { id: 'bi-row-cable',     name: 'Горизонтальна тяга',          category: 'strength', type: 'weighted',   muscleGroups: ['lats','rhomboids'],           isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 90,  defaultDurationSec: null, notes: '' },
  { id: 'bi-lat-pulldown',  name: 'Тяга до грудей',              category: 'strength', type: 'weighted',   muscleGroups: ['lats'],                       isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 90,  defaultDurationSec: null, notes: '' },
  { id: 'bi-back-ext',      name: 'Гіперекстензія',              category: 'strength', type: 'bodyweight', muscleGroups: ['erectors','glutes'],           isCustom: false, defaultSets: 3, defaultReps: 15, defaultWeightKg: null, defaultRestSec: 60,  defaultDurationSec: null, notes: '' },
  { id: 'bi-hang',          name: 'Вис на турніку',              category: 'strength', type: 'timed',      muscleGroups: ['lats','grip'],                 isCustom: false, defaultSets: 3, defaultReps: null, defaultWeightKg: null, defaultRestSec: 60, defaultDurationSec: 30,   notes: '' },
  { id: 'bi-active-hang',   name: 'Активний вис',                category: 'strength', type: 'timed',      muscleGroups: ['lats','grip'],                 isCustom: false, defaultSets: 3, defaultReps: null, defaultWeightKg: null, defaultRestSec: 60, defaultDurationSec: 25,   notes: 'Лопатки вниз і назад' },
  { id: 'bi-passive-hang',  name: 'Пасивний вис',                category: 'strength', type: 'timed',      muscleGroups: ['lats','grip','spine'],         isCustom: false, defaultSets: 3, defaultReps: null, defaultWeightKg: null, defaultRestSec: 45, defaultDurationSec: 20,   notes: 'Повне розслаблення' },

  // ── СИЛА — Груди ─────────────────────────────────
  { id: 'bi-pushup',        name: 'Віджимання',                  category: 'strength', type: 'bodyweight', muscleGroups: ['chest','triceps'],             isCustom: false, defaultSets: 3, defaultReps: 15, defaultWeightKg: null, defaultRestSec: 60,  defaultDurationSec: null, notes: '' },
  { id: 'bi-bench-db',      name: 'Жим гантелей лежачи',         category: 'strength', type: 'weighted',   muscleGroups: ['chest','triceps'],             isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 90,  defaultDurationSec: null, notes: '' },
  { id: 'bi-incline-db',    name: 'Жим на похилій лавці',        category: 'strength', type: 'weighted',   muscleGroups: ['chest','triceps'],             isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 90,  defaultDurationSec: null, notes: '' },
  { id: 'bi-flyes',         name: 'Розведення гантелей',         category: 'strength', type: 'weighted',   muscleGroups: ['chest'],                     isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 60,  defaultDurationSec: null, notes: '' },
  { id: 'bi-dips',          name: 'Віджимання на брусах',        category: 'strength', type: 'bodyweight', muscleGroups: ['chest','triceps'],             isCustom: false, defaultSets: 3, defaultReps: 8,  defaultWeightKg: null, defaultRestSec: 90,  defaultDurationSec: null, notes: '' },

  // ── СИЛА — Плечі ─────────────────────────────────
  { id: 'bi-ohp-db',        name: 'Жим гантелей стоячи',         category: 'strength', type: 'weighted',   muscleGroups: ['shoulders','triceps'],         isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 90,  defaultDurationSec: null, notes: '' },
  { id: 'bi-lateral-raise', name: 'Розведення на плечі',         category: 'strength', type: 'weighted',   muscleGroups: ['shoulders'],                 isCustom: false, defaultSets: 3, defaultReps: 15, defaultWeightKg: null, defaultRestSec: 60,  defaultDurationSec: null, notes: '' },
  { id: 'bi-front-raise',   name: 'Підйом гантелей вперед',      category: 'strength', type: 'weighted',   muscleGroups: ['shoulders'],                 isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 60,  defaultDurationSec: null, notes: '' },
  { id: 'bi-face-pull',     name: 'Face pull',                   category: 'strength', type: 'weighted',   muscleGroups: ['shoulders','rhomboids'],       isCustom: false, defaultSets: 3, defaultReps: 15, defaultWeightKg: null, defaultRestSec: 60,  defaultDurationSec: null, notes: '' },

  // ── СИЛА — Руки ──────────────────────────────────
  { id: 'bi-bicep-curl',    name: 'Підйом на біцепс',            category: 'strength', type: 'weighted',   muscleGroups: ['biceps'],                     isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 60,  defaultDurationSec: null, notes: '' },
  { id: 'bi-hammer-curl',   name: 'Молотковий підйом',           category: 'strength', type: 'weighted',   muscleGroups: ['biceps','brachialis'],         isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 60,  defaultDurationSec: null, notes: '' },
  { id: 'bi-tricep-ext',    name: 'Розгинання на трицепс',       category: 'strength', type: 'weighted',   muscleGroups: ['triceps'],                   isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 60,  defaultDurationSec: null, notes: '' },
  { id: 'bi-skullcrusher',  name: 'Французький жим',             category: 'strength', type: 'weighted',   muscleGroups: ['triceps'],                   isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 60,  defaultDurationSec: null, notes: '' },

  // ── СИЛА — Кор ───────────────────────────────────
  { id: 'bi-plank',         name: 'Планка',                      category: 'strength', type: 'timed',      muscleGroups: ['core'],                       isCustom: false, defaultSets: 3, defaultReps: null, defaultWeightKg: null, defaultRestSec: 45, defaultDurationSec: 40,   notes: '' },
  { id: 'bi-side-plank',    name: 'Бокова планка',               category: 'strength', type: 'timed',      muscleGroups: ['core','obliques'],             isCustom: false, defaultSets: 2, defaultReps: null, defaultWeightKg: null, defaultRestSec: 30, defaultDurationSec: 30,   notes: 'На кожну сторону' },
  { id: 'bi-wall-sit',      name: 'Присідання біля стіни',       category: 'strength', type: 'timed',      muscleGroups: ['quads'],                     isCustom: false, defaultSets: 3, defaultReps: null, defaultWeightKg: null, defaultRestSec: 60, defaultDurationSec: 30,   notes: '' },
  { id: 'bi-dead-bug',      name: 'Dead bug',                    category: 'strength', type: 'bodyweight', muscleGroups: ['core'],                       isCustom: false, defaultSets: 3, defaultReps: 10, defaultWeightKg: null, defaultRestSec: 45,  defaultDurationSec: null, notes: 'Повільний темп' },
  { id: 'bi-crunch',        name: 'Кранчі',                      category: 'strength', type: 'bodyweight', muscleGroups: ['core'],                       isCustom: false, defaultSets: 3, defaultReps: 20, defaultWeightKg: null, defaultRestSec: 45,  defaultDurationSec: null, notes: '' },
  { id: 'bi-leg-raise',     name: 'Підйом ніг лежачи',           category: 'strength', type: 'bodyweight', muscleGroups: ['core','hip-flexors'],           isCustom: false, defaultSets: 3, defaultReps: 15, defaultWeightKg: null, defaultRestSec: 45,  defaultDurationSec: null, notes: '' },
  { id: 'bi-russian-twist', name: 'Russian Twist',               category: 'strength', type: 'bodyweight', muscleGroups: ['core','obliques'],             isCustom: false, defaultSets: 3, defaultReps: 20, defaultWeightKg: null, defaultRestSec: 45,  defaultDurationSec: null, notes: '' },
  { id: 'bi-pallof-press',  name: 'Pallof press',                category: 'strength', type: 'weighted',   muscleGroups: ['core'],                       isCustom: false, defaultSets: 3, defaultReps: 12, defaultWeightKg: null, defaultRestSec: 45,  defaultDurationSec: null, notes: '' },

  // ── КАРДІО ───────────────────────────────────────
  { id: 'bi-bike',          name: 'Велотренажер',                category: 'cardio',   type: 'cardio',     muscleGroups: ['cardio'],                     isCustom: false, defaultSets: 1, defaultReps: null, defaultWeightKg: null, defaultRestSec: 0,  defaultDurationSec: 1200, notes: '120–140 bpm · каденс 75–90' },
  { id: 'bi-treadmill',     name: 'Бігова доріжка',              category: 'cardio',   type: 'cardio',     muscleGroups: ['cardio'],                     isCustom: false, defaultSets: 1, defaultReps: null, defaultWeightKg: null, defaultRestSec: 0,  defaultDurationSec: 1200, notes: '' },
  { id: 'bi-rowing',        name: 'Гребний тренажер',            category: 'cardio',   type: 'cardio',     muscleGroups: ['cardio','back'],               isCustom: false, defaultSets: 1, defaultReps: null, defaultWeightKg: null, defaultRestSec: 0,  defaultDurationSec: 1200, notes: '' },
  { id: 'bi-jump-rope',     name: 'Скакалка',                    category: 'cardio',   type: 'timed',      muscleGroups: ['cardio'],                     isCustom: false, defaultSets: 3, defaultReps: null, defaultWeightKg: null, defaultRestSec: 60, defaultDurationSec: 60,   notes: '' },
  { id: 'bi-burpee',        name: 'Берпі',                       category: 'cardio',   type: 'bodyweight', muscleGroups: ['cardio','full-body'],           isCustom: false, defaultSets: 3, defaultReps: 10, defaultWeightKg: null, defaultRestSec: 60,  defaultDurationSec: null, notes: '' },
  { id: 'bi-mountain-climb',name: 'Mountain climbers',           category: 'cardio',   type: 'bodyweight', muscleGroups: ['cardio','core'],               isCustom: false, defaultSets: 3, defaultReps: 20, defaultWeightKg: null, defaultRestSec: 45,  defaultDurationSec: null, notes: '' },

  // ── МОБІЛЬНІСТЬ / РОЗТЯЖКА ───────────────────────
  { id: 'bi-hip-flexor',    name: 'Розтяжка згиначів стегна',    category: 'mobility', type: 'timed',      muscleGroups: ['hip-flexors'],                 isCustom: false, defaultSets: 2, defaultReps: null, defaultWeightKg: null, defaultRestSec: 30, defaultDurationSec: 45,   notes: 'На кожну ногу' },
  { id: 'bi-hamstring-str', name: 'Розтяжка задньої поверхні',   category: 'mobility', type: 'timed',      muscleGroups: ['hamstrings'],                 isCustom: false, defaultSets: 2, defaultReps: null, defaultWeightKg: null, defaultRestSec: 30, defaultDurationSec: 45,   notes: 'На кожну ногу' },
  { id: 'bi-pigeon',        name: 'Поза голуба',                 category: 'mobility', type: 'timed',      muscleGroups: ['glutes','hip-flexors'],         isCustom: false, defaultSets: 2, defaultReps: null, defaultWeightKg: null, defaultRestSec: 30, defaultDurationSec: 60,   notes: 'На кожну ногу' },
  { id: 'bi-cat-cow',       name: 'Кіт-корова',                  category: 'mobility', type: 'bodyweight', muscleGroups: ['spine'],                     isCustom: false, defaultSets: 1, defaultReps: 10, defaultWeightKg: null, defaultRestSec: 0,   defaultDurationSec: null, notes: 'Повільно' },
  { id: 'bi-worlds-gr',     name: "World's greatest stretch",    category: 'mobility', type: 'bodyweight', muscleGroups: ['full-body'],                 isCustom: false, defaultSets: 2, defaultReps: 5,  defaultWeightKg: null, defaultRestSec: 30,  defaultDurationSec: null, notes: 'На кожну ногу' },
  { id: 'bi-shoulder-str',  name: 'Розтяжка плечей',             category: 'mobility', type: 'timed',      muscleGroups: ['shoulders'],                 isCustom: false, defaultSets: 2, defaultReps: null, defaultWeightKg: null, defaultRestSec: 20, defaultDurationSec: 30,   notes: 'На кожну руку' },
  { id: 'bi-thoracic-rot',  name: 'Ротація грудного відділу',    category: 'mobility', type: 'bodyweight', muscleGroups: ['spine','thoracic'],           isCustom: false, defaultSets: 2, defaultReps: 10, defaultWeightKg: null, defaultRestSec: 30,  defaultDurationSec: null, notes: 'На кожну сторону' },
  { id: 'bi-ankle-mob',     name: 'Мобільність гомілкостопа',    category: 'mobility', type: 'bodyweight', muscleGroups: ['ankles'],                     isCustom: false, defaultSets: 2, defaultReps: 10, defaultWeightKg: null, defaultRestSec: 20,  defaultDurationSec: null, notes: 'На кожну ногу' },
  { id: 'bi-foam-roll',     name: 'Масаж роликом',               category: 'mobility', type: 'timed',      muscleGroups: ['full-body'],                 isCustom: false, defaultSets: 1, defaultReps: null, defaultWeightKg: null, defaultRestSec: 0,  defaultDurationSec: 90,   notes: '1–2 хв на групу' },
  { id: 'bi-childs-pose',   name: 'Поза дитини',                 category: 'mobility', type: 'timed',      muscleGroups: ['lats','spine'],               isCustom: false, defaultSets: 1, defaultReps: null, defaultWeightKg: null, defaultRestSec: 0,  defaultDurationSec: 60,   notes: '' },
];

/** Category labels */
export const CATEGORIES = {
  strength: 'Сила',
  cardio:   'Кардіо',
  mobility: 'Мобільність',
};

/** Exercise type labels */
export const EXERCISE_TYPES = {
  weighted:   'Зважена',
  bodyweight: 'Власна вага',
  timed:      'За часом',
  cardio:     'Кардіо',
};

/** Muscle group labels */
export const MUSCLE_GROUPS = {
  quads:         'Квадрицепс',
  hamstrings:    'Задня стегна',
  glutes:        'Сідниці',
  calves:        'Литки',
  adductors:     'Привідні',
  'hip-flexors': 'Згиначі стегна',
  lats:          'Широкий спини',
  rhomboids:     'Ромбоподібні',
  erectors:      'Розгиначі спини',
  chest:         'Груди',
  shoulders:     'Плечі',
  biceps:        'Біцепс',
  triceps:       'Трицепс',
  brachialis:    'Плечовий м\'яз',
  core:          'Кор',
  obliques:      'Косий прес',
  'full-body':   'Все тіло',
  cardio:        'Кардіо',
  grip:          'Хват',
  spine:         'Хребет',
  thoracic:      'Грудний відділ',
  ankles:        'Гомілкостоп',
  back:          'Спина',
};
