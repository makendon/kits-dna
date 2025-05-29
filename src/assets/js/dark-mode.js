// Description: This script is used to toggle dark mode on the website. It listens for system theme changes and allows manual override. Local storage is not used.

document.addEventListener("DOMContentLoaded", function () {
  const darkModeElements = [
    document.body,
    ...document.querySelectorAll(".site-header, .site-nav, .homepage, #homeImage, #search, .icon-link, .dark-mode-toggle, .header-anchor, .card")
  ];
  
  const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
  
  function applyTheme(isDark) {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    darkModeElements.forEach(element => {
      element.classList[isDark ? "add" : "remove"]("dark-mode");
    });
    sessionStorage.setItem("theme", isDark ? "dark" : "light");
  }

  // Initial setup
  const sessionTheme = sessionStorage.getItem("theme");
  if (sessionTheme) {
    applyTheme(sessionTheme === "dark");
  } else {
    applyTheme(systemDarkMode.matches);
  }

  // Listen for system theme changes
  systemDarkMode.addEventListener("change", (e) => {
    if (!sessionStorage.getItem("theme")) {
      applyTheme(e.matches);
    }
  });

  // Handle manual toggle
  document.getElementById("darkModeToggle").addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    applyTheme(currentTheme === "light");
  });
});
