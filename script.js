(function () {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  const initial = saved || (prefersDark ? 'dark' : 'light');
  setTheme(initial);

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const icon = toggle.querySelector('.icon');

    function updateIcon(mode) {
      icon.textContent = mode === 'dark' ? '🌙' : '🌞';
    }

    updateIcon(getTheme());

    toggle.addEventListener('click', () => {
      const mode = getTheme() === 'dark' ? 'light' : 'dark';
      setTheme(mode);
      localStorage.setItem('theme', mode);
      updateIcon(mode);
    });

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  });

  function setTheme(mode) {
    document.documentElement.setAttribute('data-theme', mode === 'dark' ? 'dark' : 'light');
  }

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
})();
