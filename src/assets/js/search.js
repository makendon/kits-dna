// Pagefind search page functionality

window.addEventListener('DOMContentLoaded', (event) => {
    new PagefindUI({ element: "#search", 
    showSubResults: true,
    showEmptyFilters: false,
    openFilters: ['tag']
    });
});
