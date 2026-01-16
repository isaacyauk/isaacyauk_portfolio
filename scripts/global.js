const bttnTheme = document.getElementById("themeButton");

const bttnSide = document.getElementById("sidebarButton");

const themeImg = bttnTheme.querySelector("img");

const sideImg = bttnSide.querySelector("img");

const sidebar = document.querySelector(".sidebar");

const main = document.querySelector(".main-content");



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

        document.body.style.backgroundColor = "black";

        document.documentElement.style.backgroundColor = "black";

        themeImg.src = "images/bright-mode.png";

    }

    else // Dark mode is false

    {

        document.body.style.backgroundColor = "white";

        document.documentElement.style.backgroundColor = "white";

        themeImg.src = "images/dark-mode.png";

    }



    // Set the color of the page elements to contrast with the theme

    document.querySelectorAll("p, h1").forEach(el => {

        el.style.color = isDarkMode ? "white" : "black";

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

        sidebar.style.opacity = "0";

        sidebar.style.transform = "translateX(-100%)";

        main.style.marginLeft = "0";

    }

    else // Hamburger Icon was clicked

    {

        if (isDarkMode) {

            sideImg.src = "images/close-white.png";

        } else {

            sideImg.src = "images/close.png";

        }



        // Un-hide the sidebar and offset the main content some

        sidebar.style.opacity = "1";

        sidebar.style.transform = "translateX(0)";

        main.style.marginLeft = "20vw";

    }

});