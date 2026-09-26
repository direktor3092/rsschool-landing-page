// ============================================================================
// Бургер-меню (работает на обеих страницах)
// ============================================================================

const DESKTOP_MIN = 769;

const initBurger = () => {
  const burger = document.querySelector('[data-burger]');
  const menu = document.querySelector('[data-mobile-menu]');

  if (!burger || !menu) return;

  const openMenu = () => {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Закрыть меню');
    document.body.classList.add('is-menu-open');
  };

  const closeMenu = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
    document.body.classList.remove('is-menu-open');
  };

  const toggleMenu = () => {
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  };

  // Клик по бургеру
  burger.addEventListener('click', toggleMenu);

  // Клик по любой ссылке в меню — закрываем
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Escape закрывает
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      burger.focus();
    }
  });

  // При ресайзе до десктопа — закрываем принудительно
  window.addEventListener('resize', () => {
    if (window.innerWidth >= DESKTOP_MIN && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });
};

initBurger();