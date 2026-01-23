const bttnTheme = document.getElementById("themeButton");
const bttnSide = document.getElementById("sidebarButton");
const themeImg = bttnTheme.querySelector("img");
const sideImg = bttnSide.querySelector("img");
const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main-content");
const mediaQuery = window.matchMedia('(max-width: 400px)');
 
const lightColor = "#f8f7f3"
const darkColor = "#111111"
const lightColorOpaque = "#f8f7f3e9"
const darkColorOpaque = "#111111e9"
 
let isDarkMode = true;
 
// Logic for if the theme button is clicked and the resulting changes
bttnTheme.addEventListener("click", () => {
    if (themeImg.src.includes("bright-mode")) {
        isDarkMode = false;
    } else {
        isDarkMode = true;
    }
 
    if (isDarkMode)
    {
        // Set page elements to a "darkmode/nightmode" theme
        document.body.style.backgroundColor = darkColor;
        document.documentElement.style.backgroundColor = darkColor;
        themeImg.src = "images/bright-mode.png";
        sidebar.style.backgroundColor = darkColorOpaque;
    }
    else // Dark mode is false
    {
        document.body.style.backgroundColor = lightColor;
        document.documentElement.style.backgroundColor = lightColor;
        themeImg.src = "images/dark-mode.png";
        sidebar.style.backgroundColor = lightColorOpaque;
       
    }
 
    // Set the color of the page elements to contrast with the theme
    document.querySelectorAll("p, h1, h3, li").forEach(el => {
        el.style.color = isDarkMode ? lightColor : darkColor;
    });
 
    // Logic for image changes if the close button was clicked
    if (sideImg.src.includes("close")) {
        // Set the sidebar image according to theme
        if (isDarkMode) {
            sideImg.src = "images/close-white.png";
        } else {
            sideImg.src = "images/close.png";
        }
    }
    else // Logic for image changes if the hamburger menu button was clicked
    {
        if (isDarkMode) {
            sideImg.src = "images/menu-white.png";
        } else {
            sideImg.src = "images/menu.png";
        }
    }
});
 
// Logic for changing icons based on what is active and which icon is displayed
bttnSide.addEventListener("click", () => {
    // If close button was clicked
    if (sideImg.src.includes("close"))
    {
        // Check to see if darkmode is enabled and swap icons accordingly
        if (isDarkMode) {
            sideImg.src = "images/menu-white.png";
        } else {
            sideImg.src = "images/menu.png";
        }
 
        // Hide the sidebar and push the center main content
        if (!mediaQuery.matches) {
            sidebar.style.opacity = "0";
            sidebar.style.transform = "translateX(-100%)";
            main.style.marginLeft = "0";
        } else {
            sidebar.style.opacity = "0";
            sidebar.style.transform = "translateX(-100%)";
           
        }
       
    }
    else // Hamburger Icon was clicked
    {
        if (isDarkMode) {
            sideImg.src = "images/close-white.png";
        } else {
            sideImg.src = "images/close.png";
        }
 
        // Un-hide the sidebar and offset the main content some
        if (!mediaQuery.matches) {
            sidebar.style.opacity = "1";
            sidebar.style.transform = "translateX(0)";
            main.style.marginLeft = "20vw";
        } else {
            sidebar.style.opacity = "1";
            sidebar.style.transform = "translateX(0)";
        }
    }
});