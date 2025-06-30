const lightThemeBtn = document.getElementById("lightTheme");
const darkThemeBtn = document.getElementById("darkTheme");
const html = document.querySelector("html");

function changeThemeToDark(){
    html.setAttribute("theme", "dark");
    switchButtonImagesForTheme('dark');
    //switchButtonImagesForThemeSimple('dark');
}
function changeThemeToLight() {
    html.setAttribute("theme", "light");
    switchButtonImagesForTheme('light');
    //switchButtonImagesForThemeSimple('light');
}
if (lightThemeBtn) {
    lightThemeBtn.onclick = changeThemeToLight;
}
if (darkThemeBtn) {
    darkThemeBtn.onclick = changeThemeToDark;
}



function switchButtonImagesForTheme(theme) {
    const allImgs = [
        ...document.querySelectorAll('.button-unselected-Menu'),
        ...document.querySelectorAll('.button-Hovered-Menu'),
        ...document.querySelectorAll('.button-Selected-Menu'),
        ...document.querySelectorAll('.button-unselected'),
        ...document.querySelectorAll('.button-Hovered'),        
        
    ];


    allImgs.forEach(img =>img.classList.add('button-img-fade'));


    // Nach der Transition Bildquelle wechseln und wieder einblenden
    setTimeout(() => {
        document.querySelectorAll('.button-unselected-Menu').forEach(img => {
            img.src = theme === 'light' ? 'img/ButtonUnselectedLightmode.svg' : 'img/ButtonUnselected.svg';
        });
        document.querySelectorAll('.button-Hovered-Menu').forEach(img => {
            img.src = theme === 'light' ? 'img/ButtonHoveredLightmode.svg' : 'img/ButtonHovered.svg';
        });
        document.querySelectorAll('.button-Selected-Menu').forEach(img => {
            img.src = theme === 'light' ? 'img/ButtonSelectedLightmode.svg' : 'img/ButtonSelected.svg';
        });
        document.querySelectorAll('.button-unselected').forEach(img => {
            img.src = theme === 'light' ? 'img/ButtonUnselectedLightmode.svg' : 'img/ButtonUnselected.svg';
        });
        document.querySelectorAll('.button-Hovered').forEach(img => {
            img.src = theme === 'light' ? 'img/ButtonHoveredLightmode.svg' : 'img/ButtonHovered.svg';
        });

        //Fade in
        setTimeout(() => {
            allImgs.forEach(img => img.classList.remove('button-img-fade'));
        }, 50); 
    }, 150); // entspricht der CSS-Transition-Dauer
}

/*function switchButtonImagesForThemeSimple(theme) {
    const unselectedImgs = document.querySelectorAll('.button-unselected');
    const hoveredImgs = document.querySelectorAll('.button-Hovered');
    const selectedImgs = document.querySelectorAll('.button-Selected');

    unselectedImgs.forEach(img => {
        img.src = theme === 'light' ? 'img/ButtonUnselectedLightmode.svg' : 'img/ButtonUnselected.svg';
    });
    hoveredImgs.forEach(img => {
        img.src = theme === 'light' ? 'img/ButtonHoveredLightmode.svg' : 'img/ButtonHovered.svg';
    });
    selectedImgs.forEach(img => {
        img.src = theme === 'light' ? 'img/ButtonSelectedLightmode.svg' : 'img/ButtonSelected.svg';
    });
}*/

// Event-Listener für Theme-Wechsel weil es sonst nicht geht manometer
const currentTheme = document.documentElement.getAttribute('theme') || 'dark';




