// Pagefind search page functionality
/* global PagefindUI */

window.addEventListener("DOMContentLoaded", () => {
  new PagefindUI({ element: "#search", 
    showSubResults: true,
    showEmptyFilters: false,
    openFilters: ["tag", "content"]
  });
});
