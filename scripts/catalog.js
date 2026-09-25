// ============================================================================
// Каталог: рендер карточек, переключение категорий, «Показать ещё»
// ============================================================================

import { CATEGORIES, SERVICES } from '../data/services.js';

const catalog = document.querySelector('.catalog__categories');
if (catalog) initCatalog();

function initCatalog() {
  const tabs = document.querySelectorAll('[data-category]');
  const panels = document.querySelectorAll('[data-panel]');

  // Сколько карточек показывать изначально в зависимости от ширины
  const getInitialCount = () => {
  if (window.matchMedia('(min-width: 40em)').matches) return 4;   // ≥640
  return 2;                                                        // <640
  };

  // ---------- Генерация одной карточки ----------

  const renderCard = (service) => {
    const li = document.createElement('li');
    li.className = 'card';
    li.dataset.id = service.id;

    li.innerHTML = `
      <article data-card>
        <picture class="card__media">
          <source type="image/avif"
            srcset="${service.image}-480.avif 480w, ${service.image}-960.avif 960w"
            sizes="(max-width: 30em) 100vw, (max-width: 64em) 50vw, 25vw">
          <source type="image/webp"
            srcset="${service.image}-480.webp 480w, ${service.image}-960.webp 960w"
            sizes="(max-width: 30em) 100vw, (max-width: 64em) 50vw, 25vw">
          <img class="card__image"
            src="${service.image}-960.jpg"
            alt="${service.alt}"
            width="960" height="1280"
            loading="lazy" decoding="async">
        </picture>
        <div class="card__body">
          <h3 class="card__title">${service.title}</h3>
          <p class="card__text">${service.short}</p>
          <dl class="card__meta">
            <div><dt>Цена</dt><dd>от ${service.basePrice} BYN</dd></div>
            <div><dt>Время</dt><dd>${formatDuration(service.baseDuration)}</dd></div>
          </dl>
        </div>
      </article>
    `;
    return li;
  };

  const formatDuration = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h && m) return `${h} ч ${m} мин`;
    if (h) return `${h} ч`;
    return `${m} мин`;
  };

  // ---------- Рендер категории ----------

  const renderCategory = (categoryId) => {
    const panel = document.querySelector(`[data-panel="${categoryId}"]`);
    if (!panel) return;

    const grid = panel.querySelector('[data-grid]');
    const moreBtn = panel.querySelector('[data-show-more]');
    const services = SERVICES.filter((s) => s.category === categoryId);
    const initialCount = getInitialCount();

    grid.innerHTML = '';
    services.forEach((s) => grid.appendChild(renderCard(s)));

    // Показываем только первые N
    const cards = grid.querySelectorAll('.card');
    cards.forEach((card, i) => {
      card.hidden = i >= initialCount;
    });

    // Кнопка «Показать ещё» видна, только если есть скрытые
    const hasHidden = cards.length > initialCount;
    moreBtn.hidden = !hasHidden;

    // Сбрасываем состояние кнопки (если до этого была нажата)
    moreBtn.dataset.expanded = 'false';
  };

  // ---------- Переключение категорий ----------

  const activateCategory = (categoryId) => {
    // Табы
    tabs.forEach((tab) => {
      const isActive = tab.dataset.category === categoryId;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    // Панели
    panels.forEach((panel) => {
      const isActive = panel.dataset.panel === categoryId;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });

    renderCategory(categoryId);
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activateCategory(tab.dataset.category));
  });

  // ---------- «Показать ещё» ----------

  panels.forEach((panel) => {
    const moreBtn = panel.querySelector('[data-show-more]');
    const grid = panel.querySelector('[data-grid]');

    moreBtn.addEventListener('click', () => {
      grid.querySelectorAll('.card').forEach((card) => {
        card.hidden = false;
      });
      moreBtn.hidden = true;
      moreBtn.dataset.expanded = 'true';
    });
  });

  // ---------- Ресайз ----------

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const activeTab = document.querySelector('[data-category].is-active');
      if (activeTab) renderCategory(activeTab.dataset.category);
    }, 150);
  });

  // ---------- Первый рендер ----------
  const firstCategory = CATEGORIES[0].id;
  activateCategory(firstCategory);
}