// ============================================================================
// Слайдер «Мои работы» — циклическое переключение с адаптацией под ширину
// ============================================================================

const initSlider = () => {
  const slider = document.querySelector('[data-slider]');
  if (!slider) return;

  const track = slider.querySelector('[data-slider-track]');
  const slides = slider.querySelectorAll('[data-slide]');
  const prevBtn = slider.querySelector('[data-slider-prev]');
  const nextBtn = slider.querySelector('[data-slider-next]');
  const dots = slider.querySelectorAll('[data-slider-dot]');

  if (!track || !slides.length || !prevBtn || !nextBtn) return;

  let slidesPerView = 1;
  let maxIndex = 0;
  let currentIndex = 0;

  const getSlidesPerView = () => {
    if (window.matchMedia('(min-width: 64em)').matches) return 3;
    if (window.matchMedia('(min-width: 40em)').matches) return 2;
    return 1;
  };

  const updateMetrics = () => {
    slidesPerView = getSlidesPerView();
    maxIndex = Math.max(0, slides.length - slidesPerView);

    // Если после resize currentIndex вышел за предел — прижмём
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    // Пересобираем ширину одной «страницы» слайдера
    moveTo(currentIndex, { animate: false });

    // Показываем/скрываем точки в зависимости от количества позиций
    dots.forEach((dot, i) => {
      dot.parentElement.hidden = i > maxIndex;
    });
  };

  const moveTo = (index, { animate = true } = {}) => {
    currentIndex = index;

    // Ширина viewport + gap между слайдами
    const trackStyle = getComputedStyle(track);
    const gap = parseFloat(trackStyle.columnGap || trackStyle.gap) || 0;

    // Реальная ширина одного слайда
    const slideWidth = slides[0].getBoundingClientRect().width + gap;

    if (!animate) {
      track.style.transition = 'none';
    } else {
      track.style.transition = '';
    }

    track.style.transform = `translate3d(-${slideWidth * currentIndex}px, 0, 0)`;

    if (!animate) {
      // форсируем reflow, чтобы transition вернулся
      void track.offsetWidth;
      track.style.transition = '';
    }

    // Обновляем индикаторы
    dots.forEach((dot, i) => {
      const active = i === currentIndex;
      dot.classList.toggle('is-active', active);
      if (active) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });
  };

  const next = () => {
    const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    moveTo(nextIndex);
  };

  const prev = () => {
    const prevIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    moveTo(prevIndex);
  };

  // --- Обработчики ---

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.sliderDot);
      if (Number.isInteger(index) && index >= 0 && index <= maxIndex) {
        moveTo(index);
      }
    });
  });
  // ---------- Свайп ----------

  const SWIPE_THRESHOLD = 50;   // минимум px для срабатывания

  let touchStartX = 0;
  let touchStartY = 0;
  let touchCurrentX = 0;
  let isSwiping = false;

  const viewport = slider.querySelector('.slider__viewport');

  const onTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchCurrentX = touchStartX;
    isSwiping = false;
  };

  const onTouchMove = (e) => {
    if (e.touches.length !== 1) return;

    touchCurrentX = e.touches[0].clientX;
    const deltaX = touchCurrentX - touchStartX;
    const deltaY = e.touches[0].clientY - touchStartY;

    // Если движение больше вертикальное — это скролл страницы, не мешаем
    if (!isSwiping && Math.abs(deltaY) > Math.abs(deltaX)) return;

    isSwiping = true;

    // Визуально тянем трек за пальцем (немного «резиново»)
    const trackStyle = getComputedStyle(track);
    const gap = parseFloat(trackStyle.columnGap || trackStyle.gap) || 0;
    const slideWidth = slides[0].getBoundingClientRect().width + gap;
    const baseOffset = -slideWidth * currentIndex;
    const rubber = deltaX * 0.6;   // 0.6 — коэффициент «сопротивления»

    track.style.transition = 'none';
    track.style.transform = `translate3d(${baseOffset + rubber}px, 0, 0)`;
  };

  const onTouchEnd = () => {
    if (!isSwiping) return;

    const delta = touchCurrentX - touchStartX;
    track.style.transition = '';

    if (delta > SWIPE_THRESHOLD) {
      prev();
    } else if (delta < -SWIPE_THRESHOLD) {
      next();
    } else {
      // Не дотянули — возвращаемся на место
      moveTo(currentIndex);
    }

    isSwiping = false;
  };

  viewport.addEventListener('touchstart', onTouchStart, { passive: true });
  viewport.addEventListener('touchmove', onTouchMove, { passive: true });
  viewport.addEventListener('touchend', onTouchEnd);
  viewport.addEventListener('touchcancel', onTouchEnd);
  // --- Инициализация и адаптация ---

  updateMetrics();

  // Пересчёт при изменении размера окна
  let lastWidth = window.innerWidth;
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;
    if (currentWidth === lastWidth) return;
    lastWidth = currentWidth;

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateMetrics, 150);
  });
};

initSlider();