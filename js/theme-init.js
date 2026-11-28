(function () {
  const root = document.documentElement;
  const storageKey = 'medfa.theme';
  let theme = null;

  try {
    const savedTheme = window.localStorage.getItem(storageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      theme = savedTheme;
    }
  } catch {
    // Fall back to the system preference when browser storage is unavailable.
  }

  if (!theme) {
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  root.dataset.theme = theme;
  root.style.colorScheme = theme;
})();