// ============================================================================
// UI-эффекты: sticky header, счётчики, fade-in, кнопка «наверх»
// ============================================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------------------
// 1. Sticky header: тень при скролле
// ---------------------------------------------------------------------------

const initHeaderScroll = () => {
  const header = document.querySelector('.header');
  if (!header) return;

  const SCROLL_THRESHOLD = 20;

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
};

// ---------------------------------------------------------------------------
// 2. Счётчики в hero: «набегающие» цифры один раз
// ---------------------------------------------------------------------------

const initCounters = () => {
  const counters = document.querySelectorAll('.hero__stat-value');
  if (!counters.length || prefersReducedMotion) return;

  const animate = (el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/^([\d\s.,]+)(.*)$/);
    if (!match) return;

    const numberPart = match[1].replace(/\s/g, '').replace(',', '.');
    const suffix = match[2] || '';
    const target = parseFloat(numberPart);
    if (Number.isNaN(target)) return;

    const isFloat = numberPart.includes('.');
    const duration = 1200;
    const start = performance.now();

    const format = (n) => {
      if (isFloat) return n.toFixed(1);
      return Math.round(n).toLocaleString('ru-RU').replace(/,/g, ' ');
    };

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = format(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = format(target) + suffix;
    };

    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => io.observe(el));
};

// ---------------------------------------------------------------------------
// 3. Fade-in секций при скролле
// ---------------------------------------------------------------------------

const initReveal = () => {
  if (prefersReducedMotion) return;

  const targets = document.querySelectorAll(
    '.section__head, .process__step, .review, .about__feature, .slider__slide, .cta'
  );
  if (!targets.length) return;

  targets.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => io.observe(el));
};

// ---------------------------------------------------------------------------
// 4. Кнопка «Наверх»
// ---------------------------------------------------------------------------

const initToTop = () => {
  const btn = document.querySelector('[data-to-top]');
  if (!btn) return;

  const SHOW_AFTER = window.innerHeight * 1.5;

  const update = () => {
    btn.classList.toggle('is-visible', window.scrollY > SHOW_AFTER);
  };

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  });

  update();
  window.addEventListener('scroll', update, { passive: true });
};

// ---------------------------------------------------------------------------

initHeaderScroll();
initCounters();
initReveal();
initToTop();