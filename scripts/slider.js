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

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.sliderDot);
      if (Number.isInteger(index) && index >= 0 && index <= maxIndex) {
        moveTo(index);
      }
    });
  });

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