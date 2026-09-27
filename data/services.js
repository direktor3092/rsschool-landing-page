// ============================================================================
// Каталог услуг ZIZITOP
// ----------------------------------------------------------------------------
// price — надбавка к basePrice в BYN
// duration — надбавка к baseDuration в минутах
// ============================================================================

export const CATEGORIES = [
  { id: 'afro',   title: 'Афрокосички' },
  { id: 'dreads', title: 'Дреды' },
  { id: 'kids',   title: 'Детям и уход' },
];

// Общие наборы опций по категориям -------------------------------------------

const AFRO_OPTIONS = [
  {
    id: 'length',
    label: 'Длина',
    type: 'radio',
    default: 'medium',
    values: [
      { id: 'short',  label: 'До плеч',    price: 0,  duration: 0 },
      { id: 'medium', label: 'До лопаток', price: 40, duration: 60 },
      { id: 'long',   label: 'До пояса',   price: 80, duration: 120 },
    ],
  },
  {
    id: 'extras',
    label: 'Дополнительно',
    type: 'checkbox',
    default: [],
    values: [
      { id: 'tone', label: 'Тонирование',         price: 60, duration: 45 },
      { id: 'care', label: 'Уход после плетения', price: 40, duration: 30 },
    ],
  },
];

const DREADS_OPTIONS = [
  {
    id: 'length',
    label: 'Длина',
    type: 'radio',
    default: 'medium',
    values: [
      { id: 'short',  label: 'До плеч',    price: 0,   duration: 0 },
      { id: 'medium', label: 'До лопаток', price: 60,  duration: 120 },
      { id: 'long',   label: 'До пояса',   price: 120, duration: 240 },
    ],
  },
  {
    id: 'extras',
    label: 'Дополнительно',
    type: 'checkbox',
    default: [],
    values: [
      { id: 'tone', label: 'Тонирование',         price: 80, duration: 60 },
      { id: 'care', label: 'Уход после плетения', price: 50, duration: 40 },
    ],
  },
];

const KIDS_OPTIONS = [
  {
    id: 'length',
    label: 'Длина',
    type: 'radio',
    default: 'medium',
    values: [
      { id: 'short',  label: 'Короткие', price: 0,  duration: 0 },
      { id: 'medium', label: 'Средние',  price: 30, duration: 30 },
      { id: 'long',   label: 'Длинные',  price: 50, duration: 60 },
    ],
  },
  {
    id: 'extras',
    label: 'Дополнительно',
    type: 'checkbox',
    default: [],
    values: [
      { id: 'beads', label: 'Бусины',              price: 20, duration: 15 },
      { id: 'care',  label: 'Уход после плетения', price: 30, duration: 20 },
    ],
  },
];

// Каталог услуг --------------------------------------------------------------

export const SERVICES = [

  // ------------------------------------------------------------------ Афрокосички
  {
    id: 'afro-01',
    category: 'afro',
    title: 'Классические афрокосички',
    short: 'Аккуратные косички по всей голове. Носятся 2–3 месяца.',
    image: 'assets/images/catalog/afro-01',
    alt: 'Классические афрокосички с канекалоном омбре',
    basePrice: 250,
    baseDuration: 300,
    options: AFRO_OPTIONS,
  },
  {
    id: 'afro-02',
    category: 'afro',
    title: 'Косички зизи',
    short: 'Мягкие объёмные косички, дают густоту и длину.',
    image: 'assets/images/catalog/afro-02',
    alt: 'Косички зизи, объёмная причёска',
    basePrice: 200,
    baseDuration: 240,
    options: AFRO_OPTIONS,
  },
  {
    id: 'afro-03',
    category: 'afro',
    title: 'Афрокосички с пони-тейл',
    short: 'Плетение с собранным хвостом, аккуратный силуэт.',
    image: 'assets/images/catalog/afro-03',
    alt: 'Афрокосички с пони-тейл и тонированием',
    basePrice: 280,
    baseDuration: 360,
    options: AFRO_OPTIONS,
  },
  {
    id: 'afro-04',
    category: 'afro',
    title: 'Косички омбре',
    short: 'Плавный переход оттенков от корней к концам.',
    image: 'assets/images/catalog/afro-04',
    alt: 'Косички омбре с плавным переходом цвета',
    basePrice: 320,
    baseDuration: 360,
    options: AFRO_OPTIONS,
  },
  {
    id: 'afro-05',
    category: 'afro',
    title: 'Сенегальские косички',
    short: 'Лёгкие тонкие косички, почти не ощущаются на голове.',
    image: 'assets/images/catalog/afro-05',
    alt: 'Сенегальские косички тонкого плетения',
    basePrice: 240,
    baseDuration: 300,
    options: AFRO_OPTIONS,
  },
  {
    id: 'afro-06',
    category: 'afro',
    title: 'Жгуты с канекалоном',
    short: 'Двухпрядные жгуты с объёмом и плотной текстурой.',
    image: 'assets/images/catalog/afro-06',
    alt: 'Жгуты с канекалоном, плотная текстура',
    basePrice: 220,
    baseDuration: 240,
    options: AFRO_OPTIONS,
  },
  {
    id: 'afro-07',
    category: 'afro',
    title: 'Афрокосички с тонированием',
    short: 'Классика с окрашиванием для глубокого цвета.',
    image: 'assets/images/catalog/afro-07',
    alt: 'Афрокосички с тонированием насыщенного цвета',
    basePrice: 340,
    baseDuration: 420,
    options: AFRO_OPTIONS,
  },
  {
    id: 'afro-08',
    category: 'afro',
    title: 'Косы на андеркат',
    short: 'Мужская укладка с выбритыми висками и косой назад.',
    image: 'assets/images/catalog/afro-08',
    alt: 'Мужские косы на андеркат с выбритыми висками',
    basePrice: 180,
    baseDuration: 180,
    options: AFRO_OPTIONS,
  },

  // ------------------------------------------------------------------ Дреды
  {
    id: 'dreads-01',
    category: 'dreads',
    title: 'Классические дреды',
    short: 'Плотные дреды по всей голове, носятся от полугода.',
    image: 'assets/images/catalog/dreads-01',
    alt: 'Классические дреды по всей голове',
    basePrice: 400,
    baseDuration: 480,
    options: DREADS_OPTIONS,
  },
  {
    id: 'dreads-02',
    category: 'dreads',
    title: 'Дреды с тонированием',
    short: 'Дреды с окрашиванием для насыщенного оттенка.',
    image: 'assets/images/catalog/dreads-02',
    alt: 'Дреды с тонированием насыщенного цвета',
    basePrice: 480,
    baseDuration: 540,
    options: DREADS_OPTIONS,
  },
  {
    id: 'dreads-03',
    category: 'dreads',
    title: 'Дреды с омбре',
    short: 'Плавный переход цвета — от тёмных корней к светлым концам.',
    image: 'assets/images/catalog/dreads-03',
    alt: 'Дреды с эффектом омбре',
    basePrice: 520,
    baseDuration: 600,
    options: DREADS_OPTIONS,
  },
  {
    id: 'dreads-04',
    category: 'dreads',
    title: 'Зизи-дреды',
    short: 'Мягкие синтетические дреды с эффектом естественности.',
    image: 'assets/images/catalog/dreads-04',
    alt: 'Зизи-дреды с мягкой текстурой',
    basePrice: 380,
    baseDuration: 420,
    options: DREADS_OPTIONS,
  },
  {
    id: 'dreads-05',
    category: 'dreads',
    title: 'Короткие мужские дреды',
    short: 'Аккуратные дреды средней длины, под мужской образ.',
    image: 'assets/images/catalog/dreads-05',
    alt: 'Короткие мужские дреды средней длины',
    basePrice: 300,
    baseDuration: 360,
    options: DREADS_OPTIONS,
  },
  {
    id: 'dreads-06',
    category: 'dreads',
    title: 'Длинные дреды с омбре',
    short: 'Максимальная длина с глубоким градиентом цвета.',
    image: 'assets/images/catalog/dreads-06',
    alt: 'Длинные дреды с глубоким градиентом омбре',
    basePrice: 560,
    baseDuration: 660,
    options: DREADS_OPTIONS,
  },

  // ------------------------------------------------------------------ Детям
  {
    id: 'kids-01',
    category: 'kids',
    title: 'Детские косички с бусинами',
    short: 'Аккуратные косички с бусинами и яркими резинками.',
    image: 'assets/images/catalog/kids-01',
    alt: 'Детские косички с бусинами и резинками',
    basePrice: 150,
    baseDuration: 180,
    options: KIDS_OPTIONS,
  },
  {
    id: 'kids-02',
    category: 'kids',
    title: 'Детские зизи',
    short: 'Мягкие косички для девочек, не тянут кожу.',
    image: 'assets/images/catalog/kids-02',
    alt: 'Детские косички зизи',
    basePrice: 130,
    baseDuration: 120,
    options: KIDS_OPTIONS,
  },
  {
    id: 'kids-03',
    category: 'kids',
    title: 'Детские дреды',
    short: 'Безопасные дреды для подростков, без натяжения.',
    image: 'assets/images/catalog/kids-03',
    alt: 'Подростковые дреды без натяжения кожи',
    basePrice: 180,
    baseDuration: 240,
    options: KIDS_OPTIONS,
  },

  // ------------------------------------------------------------------ Уход
  {
    id: 'kids-04',
    category: 'kids',
    title: 'Коррекция плетения',
    short: 'Обновление корней и зон роста для продления носки.',
    image: 'assets/images/catalog/kids-04',
    alt: 'Коррекция плетения у корней',
    basePrice: 120,
    baseDuration: 120,
    options: [
      {
        id: 'scope',
        label: 'Объём работ',
        type: 'radio',
        default: 'base',
        values: [
          { id: 'base', label: 'Базовая зона',     price: 0,  duration: 0 },
          { id: 'full', label: 'Полная коррекция', price: 60, duration: 60 },
        ],
      },
      {
        id: 'extras',
        label: 'Дополнительно',
        type: 'checkbox',
        default: [],
        values: [
          { id: 'wash', label: 'Мытьё головы', price: 30, duration: 20 },
        ],
      },
    ],
  },
  {
    id: 'kids-05',
    category: 'kids',
    title: 'Снятие плетения',
    short: 'Аккуратное снятие без повреждения родных волос.',
    image: 'assets/images/catalog/kids-05',
    alt: 'Аккуратное снятие плетения',
    basePrice: 80,
    baseDuration: 60,
    options: [
      {
        id: 'length',
        label: 'Длина',
        type: 'radio',
        default: 'medium',
        values: [
          { id: 'short',  label: 'Короткая', price: 0,  duration: 0 },
          { id: 'medium', label: 'Средняя',  price: 30, duration: 30 },
          { id: 'long',   label: 'Длинная',  price: 60, duration: 60 },
        ],
      },
      {
        id: 'extras',
        label: 'Дополнительно',
        type: 'checkbox',
        default: [],
        values: [
          { id: 'care', label: 'Уход после снятия', price: 40, duration: 30 },
        ],
      },
    ],
  },
  {
    id: 'kids-06',
    category: 'kids',
    title: 'Уход после плетения',
    short: 'Мытьё, увлажнение и обработка кожи головы.',
    image: 'assets/images/catalog/kids-06',
    alt: 'Уход за кожей головы после плетения',
    basePrice: 60,
    baseDuration: 30,
    options: [
      {
        id: 'type',
        label: 'Тип ухода',
        type: 'radio',
        default: 'base',
        values: [
          { id: 'base', label: 'Базовый',  price: 0,  duration: 0 },
          { id: 'deep', label: 'Глубокий', price: 40, duration: 20 },
        ],
      },
      {
        id: 'extras',
        label: 'Дополнительно',
        type: 'checkbox',
        default: [],
        values: [
          { id: 'mask',    label: 'Маска для волос', price: 30, duration: 20 },
          { id: 'massage', label: 'Массаж головы',   price: 20, duration: 15 },
        ],
      },
    ],
  },
];

// Хелперы --------------------------------------------------------------------

export const getServiceById = (id) => SERVICES.find((s) => s.id === id);

export const getServicesByCategory = (categoryId) =>
  SERVICES.filter((s) => s.category === categoryId);