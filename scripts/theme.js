const STORAGE_KEY = 'theme';
const root = document.documentElement;
const toggle = document.querySelector('[data-theme-toggle]');

if (toggle) {
  const sync = () => {
    const isDark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute(
      'aria-label',
      isDark ? 'Включить светлую тему' : 'Включить тёмную тему'
    );
  };

  toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem(STORAGE_KEY, next);
    sync();
  });

  sync();
}