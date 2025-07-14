// Description: This script is used to toggle dark mode on the website. It listens for system theme changes and allows manual override.

document.addEventListener("DOMContentLoaded", function () {
  const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
    
  function applyTheme(isDark) {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }
  
  // Listen for system theme changes if no manual preference
  systemDarkMode.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches);
    }
  });
    
  // Add click handler for the toggle button
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", function() {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const isDark = currentTheme === "dark";
      applyTheme(!isDark);
    });
  }
});
