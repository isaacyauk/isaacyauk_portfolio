const themeButton = document.getElementById("themeButton");
const infoLink = document.querySelectorAll(".info");
const sidebarButton = document.getElementById("sidebarButton");
const sidebar = document.querySelector(".sidebar");
const mediaQuery = window.matchMedia('(max-width: 550px)');
const main = document.querySelector(".main-content");
const mobileCloseButton = document.getElementById("mobile_close");

const darkColor = "#141414";
const lightColor = "#f8f7f3";
const lightColorOpaque = "#f8f7f3e9";
const darkColorOpaque = "#141414f1";

const isDarkMode = document.documentElement.classList.contains("dark-mode");
let sidebarIsOpen = true;

/**
* Loads/applies the current theme settings to UI elements.
* (Site default is defined in "siteload.js")
*/  
function loadTheme() {
    const documentRoot = document.documentElement;
    const isDarkMode = documentRoot.classList.contains("dark-mode");
    
    // Set theme button image
    if (isDarkMode) {
        themeButton.querySelector("img").src = "/images/bright-mode.png";
        // Set mobile sidebar opacity and button for dark mode
        sidebar.style.backgroundColor = darkColorOpaque; 
        sidebarButton.querySelector("img").src = "/images/close-white.png";
    } else {
        themeButton.querySelector("img").src = "/images/dark-mode.png";
        sidebar.style.backgroundColor = lightColorOpaque; 
        // Set mobile sidebar opacity and button for light mode
        sidebarButton.querySelector("img").src = "/images/close.png";
    }

    // Reset all .info elements to remove any lingering inline styles
    infoLink.forEach(info => {
        info.style.backgroundColor = '';
        const link = info.querySelector("a");
        if (link) link.style.color = '';
    });
}

/**
* Toggles the sidebars open/closed site with resposive behavior. Matches scrolling behavior
* for mobile.
*/
function toggleSidebar() {
    const isDarkMode = document.documentElement.classList.contains("dark-mode");
    if (sidebarIsOpen) {
        // Close Sidebar
        sidebarIsOpen = false;
        
        if (!mediaQuery.matches) {
            sidebar.style.opacity = "0";
            sidebar.style.transform = "translateX(-100%)";
            main.style.marginLeft = "0";
        } else {
            sidebar.style.opacity = "0";
            sidebar.style.transform = "translateX(-100%)";
        }

        if (mediaQuery.matches) {
            document.body.style.overflow = '';
        }

        // Set to menu icon
        if (isDarkMode) {
            sidebarButton.querySelector("img").src = "/images/menu-white.png";
        } else {
            sidebarButton.querySelector("img").src = "/images/menu.png";
        }
    }
    else {
        // Open sidebar
        sidebarIsOpen = true;
        
        // Set to close icon
        if (isDarkMode) {
            sidebarButton.querySelector("img").src = "/images/close-white.png";
        } else {
            sidebarButton.querySelector("img").src = "/images/close.png";
        }

        if (!mediaQuery.matches) {
            sidebar.style.opacity = "1";
            sidebar.style.transform = "translateX(0)";
            main.style.marginLeft = "20vw";
        } else {
            sidebar.style.opacity = "1";
            sidebar.style.transform = "translateX(0)";
        }

        if (mediaQuery.matches) {
            document.body.style.overflow = 'hidden';
        }
    }

}

/**
* Toggles between the locally stored light or dark mode css class
*/
function toggleTheme() {
    const documentRoot = document.documentElement;
    const isDark = documentRoot.classList.toggle("dark-mode");
    
    if (isDark) {
        localStorage.setItem("theme", "dark");
        sidebar.style.backgroundColor = darkColorOpaque; // Style mobile sidebar opacity
        themeButton.querySelector("img").src = "/images/bright-mode.png";

        // Update sidebar button based on current state
        if (sidebarIsOpen) {
            sidebarButton.querySelector("img").src = "/images/close-white.png"            
        } else {
            sidebarButton.querySelector("img").src = "/images/menu-white.png";            
        }

    } else {
        localStorage.setItem("theme", "light");
        sidebar.style.backgroundColor = lightColorOpaque; // Style mobile sidebar opacity
        themeButton.querySelector("img").src = "/images/dark-mode.png";

        // Update sidebar button based on current state
        if (sidebarIsOpen) {
            sidebarButton.querySelector("img").src = "/images/close.png";
        } else {
            sidebarButton.querySelector("img").src = "/images/menu.png";
        }
    }

    // Reset all .info elements to remove inline styles
    infoLink.forEach(info => {
        info.style.backgroundColor = '';
        const link = info.querySelector("a");
        if (link) link.style.color = '';
    });
}

/**
* Logic for closing the sidebar on mobile screen dimenstions
*/
function mobileClose() {
    if (!mediaQuery.matches) {
        sidebar.style.opacity = "0"; // Define the transparency of the sidebar
        sidebar.style.transform = "translateX(-100%)"; // Move sidebar
        main.style.marginLeft = "0"; // Removes the left margin from the main content area and allow main content to expand
    } else {
        sidebar.style.opacity = "0";
        sidebar.style.transform = "translateX(-100%)";
    }

    // Re-enable scrolling (scrolling is prevented while sidebar is open in mobile) 
    if (mediaQuery.matches) {
        document.body.style.overflow = '';
    }

    toggleSidebar();
}

/**
*  If the info elements in the sidebar are clicked
*/
function handleClick(event) {
    const infoElement = event.currentTarget;
    const link = infoElement.querySelector("a");
    
    if (link && link.href) {
        window.location.href = link.href; // Make the whole area clickable
    }
}

/** 
* Styling logic for if a info element is hovered over (background color should be the opposite of theme)
*/
function handleMouseOver(event) {
    const infoElement = event.currentTarget;
    const isDarkMode = document.documentElement.classList.contains("dark-mode");

    if (isDarkMode) {
        infoElement.style.backgroundColor = lightColor;
        infoElement.querySelector("a").style.color = darkColor;
    } else {
        infoElement.style.backgroundColor = darkColor;
        infoElement.querySelector("a").style.color = lightColor;
    }
}

/**
* Styling logic for if a info element is no longer hovered over (background color should return to that of theme)
*/
function handleMouseLeave(event) {
    const infoElement = event.currentTarget;
    const isDarkMode = document.documentElement.classList.contains("dark-mode");
    
    if (isDarkMode) {
        infoElement.style.backgroundColor = darkColor;
        infoElement.querySelector("a").style.color = lightColor;
    } else {
        infoElement.style.backgroundColor = lightColor;
        infoElement.querySelector("a").style.color = darkColor;
    }
}

// Event listener for info blocks, setting style and interactability
infoLink.forEach(infoLink => {
    infoLink.addEventListener("click", handleClick);
    infoLink.addEventListener("mouseover", handleMouseOver);
    infoLink.addEventListener("mouseleave", handleMouseLeave);
});

// Event listened for webpage buttons
themeButton.addEventListener("click", toggleTheme);
sidebarButton.addEventListener("click", toggleSidebar);
mobileCloseButton.addEventListener("click", mobileClose)

//  Disable scrolling mobile for inital load, and whenever the sidebar is open
if (mediaQuery.matches) {
    document.body.style.overflow = 'hidden';
}

loadTheme();