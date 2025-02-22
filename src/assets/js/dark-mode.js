// Description: This script (jQuery) is used to toggle dark mode on the website. It listens for system theme changes and allows manual override. Local storage is not used.

$(document).ready(function () {
  const darkModeElements = 'body, .site-header, .site-nav, .homepage, #homeImage, #search, .icon-link, .fa-search, .dark-mode-toggle';
  
  // Check system dark mode preference
  const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  
  function applyTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    $(darkModeElements)[isDark ? 'addClass' : 'removeClass']('dark-mode');
    // Store in session
    sessionStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  // Initial setup - check session storage first, then system preference
  const sessionTheme = sessionStorage.getItem('theme');
  if (sessionTheme) {
    applyTheme(sessionTheme === 'dark');
  } else {
    applyTheme(systemDarkMode.matches);
  }

  // Listen for system theme changes - only if no session preference
  systemDarkMode.addEventListener('change', (e) => {
    if (!sessionStorage.getItem('theme')) {
      applyTheme(e.matches);
    }
  });

  // Handle manual toggle
  $('#darkModeToggle').on('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    applyTheme(currentTheme === 'light');
  });
});
