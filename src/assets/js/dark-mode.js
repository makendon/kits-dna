// Description: This script is used to toggle dark mode on the website. It listens for system theme changes and allows manual override.

document.addEventListener("DOMContentLoaded", function () {
  const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
    
  function applyTheme(isDark) {
    // Set data-theme attribute for Pico CSS and our custom styles
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    // Store user preference in session storage
    sessionStorage.setItem("theme", isDark ? "dark" : "light");
  }
  
  // Initial setup based on session storage or system preference
  const sessionTheme = sessionStorage.getItem("theme");
  if (sessionTheme) {
    applyTheme(sessionTheme === "dark");
  } else {
    applyTheme(systemDarkMode.matches);
  }
  
  // Listen for system theme changes if no manual preference
  systemDarkMode.addEventListener("change", (e) => {
    if (!sessionStorage.getItem("theme")) {
      applyTheme(e.matches);
    }
  });
    
  // Add click handler for the toggle button
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      // Toggle to opposite of current theme
      const currentTheme = document.documentElement.getAttribute("data-theme") || 
                           (systemDarkMode.matches ? "dark" : "light");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
        
      applyTheme(newTheme === "dark");
    });
  }
});
