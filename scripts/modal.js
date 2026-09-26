// ============================================================================
// Модальное окно услуги + параметры (radio/checkbox) с динамическим пересчётом
// ============================================================================

import { getServiceById } from '../data/services.js';

const initModal = () => {
  const modal = document.querySelector('[data-modal]');
  if (!modal) return;

  const dialog = modal.querySelector('.modal__dialog');

  const overlay = modal.querySelector('[data-modal-overlay]');
  const closeBtn = modal.querySelector('[data-modal-close]');
  const optionsForm = modal.querySelector('[data-modal-options]');

  const els = {
    image: modal.querySelector('[data-modal-image]'),
    sourceAvif: modal.querySelector('[data-modal-source-avif]'),
    sourceWebp: modal.querySelector('[data-modal-source-webp]'),
    title: modal.querySelector('[data-modal-title]'),
    text: modal.querySelector('[data-modal-text]'),
    price: modal.querySelector('[data-modal-price]'),
    duration: modal.querySelector('[data-modal-duration]'),
  };

  let currentService = null;
  let lastFocused = null;

  // ---------- Форматирование ----------

  const formatPrice = (v) => `${v} BYN`;
  const formatDuration = (min) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h && m) return `${h} ч ${m} мин`;
    if (h) return `${h} ч`;
    return `${m} мин`;
  };

  // ---------- Сбор выбранных значений ----------

  const readSelection = () => {
    const result = {};
    optionsForm.querySelectorAll('.option-group').forEach((group) => {
      const key = group.dataset.optionId;
      const type = group.dataset.optionType;

      if (type === 'radio') {
        const checked = group.querySelector('input[type="radio"]:checked');
        result[key] = checked ? [checked.value] : [];
      } else {
        const checked = group.querySelectorAll('input[type="checkbox"]:checked');
        result[key] = Array.from(checked).map((i) => i.value);
      }
    });
    return result;
  };

  // ---------- Пересчёт итога ----------

  const recalcSummary = () => {
    if (!currentService) return;

    const selection = readSelection();
    let price = currentService.basePrice;
    let duration = currentService.baseDuration;

    currentService.options.forEach((opt) => {
      const chosenIds = selection[opt.id] || [];
      opt.values.forEach((val) => {
        if (chosenIds.includes(val.id)) {
          price += val.price;
          duration += val.duration;
        }
      });
    });

    els.price.textContent = formatPrice(price);
    els.duration.textContent = formatDuration(duration);
  };

  // ---------- Рендер параметров ----------

  const renderOptions = (service) => {
    optionsForm.innerHTML = '';

    service.options.forEach((opt) => {
      const group = document.createElement('fieldset');
      group.className = 'option-group';
      group.dataset.optionId = opt.id;
      group.dataset.optionType = opt.type;

      const legend = document.createElement('legend');
      legend.className = 'option-group__legend';
      legend.textContent = opt.label;
      group.appendChild(legend);

      const list = document.createElement('div');
      list.className = 'option-group__list';

      opt.values.forEach((val) => {
        const label = document.createElement('label');
        label.className = 'option';

        const input = document.createElement('input');
        input.type = opt.type;
        input.name = `${service.id}-${opt.id}`;
        input.value = val.id;

        if (opt.type === 'radio' && opt.default === val.id) {
          input.checked = true;
        } else if (opt.type === 'checkbox' && Array.isArray(opt.default) && opt.default.includes(val.id)) {
          input.checked = true;
        }

        const text = document.createElement('span');
        text.textContent = val.label;

        label.appendChild(input);
        label.appendChild(text);

        // Надбавки — показываем, если есть
        if (val.price || val.duration) {
          const price = document.createElement('span');
          price.className = 'option__price';
          const parts = [];
          if (val.price) parts.push(`+${val.price} BYN`);
          if (val.duration) parts.push(`+${formatDuration(val.duration)}`);
          price.textContent = parts.join(' · ');
          label.appendChild(price);
        }

        list.appendChild(label);
      });

      group.appendChild(list);
      optionsForm.appendChild(group);
    });
  };

  // ---------- Заполнение модалки ----------

  const fillModal = (service) => {
    currentService = service;

    els.sourceAvif.srcset =
      `${service.image}-480.avif 480w, ${service.image}-960.avif 960w`;
    els.sourceWebp.srcset =
      `${service.image}-480.webp 480w, ${service.image}-960.webp 960w`;
    els.image.src = `${service.image}-960.jpg`;
    els.image.alt = service.alt;

    els.title.textContent = service.title;
    els.text.textContent = service.short;

    renderOptions(service);
    recalcSummary();
  };

  // ---------- Открытие / закрытие ----------

  const openModal = (serviceId) => {
    const service = getServiceById(serviceId);
    if (!service) return;

    lastFocused = document.activeElement;

    fillModal(service);

    modal.hidden = false;
    document.body.classList.add('is-modal-open');

    // Фокус на кнопку закрытия
    dialog.focus();

    // Ловим фокус внутри модалки (простая версия focus trap)
    modal.addEventListener('keydown', trapFocus);
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove('is-modal-open');
    modal.removeEventListener('keydown', trapFocus);

    // Убираем state параметров
    optionsForm.innerHTML = '';
    currentService = null;

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  };

  // ---------- Focus trap ----------

  const trapFocus = (e) => {
    if (e.key !== 'Tab') return;

    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  // ---------- Обработчики ----------

  document.addEventListener('click', (e) => {
    const card = e.target.closest('[data-card]');
    if (!card) return;

    const li = card.closest('[data-id]');
    if (!li) return;

    openModal(li.dataset.id);
  });

  // Клавиатурная доступность карточки (Enter/Space)
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('[data-card]');
    if (!card) return;
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;

    e.preventDefault();
    const li = card.closest('[data-id]');
    if (li) openModal(li.dataset.id);
  });
  
  optionsForm.addEventListener('change', recalcSummary);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
};

initModal();