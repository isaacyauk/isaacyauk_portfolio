/**
 * Immediately invoked function that initializes the theme on page load.
 * Checks localStorage for saved theme preference and applies dark mode if:
 * - User previously selected dark mode, OR
 * - No theme preference exists (dark mode is the default)
 * 
 * Prevents flash of unstyled content by applying theme before page renders.
 * 
 * @returns {void}
 */
(function() {
    const savedTheme = localStorage.getItem("theme");
    
    // Default to dark mode if no preference is saved
    if (savedTheme === "dark" || !savedTheme) {
        document.documentElement.classList.add("dark-mode");
        if (!savedTheme) {
            localStorage.setItem("theme", "dark");
        }
    }
})();