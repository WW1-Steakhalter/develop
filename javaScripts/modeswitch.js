const lightThemeBtn = document.getElementById("lightTheme");
const darkThemeBtn = document.getElementById("darkTheme");
const html = document.querySelector("html");

function changeThemeToDark(){
    html.setAttribute("theme", "dark");
    switchButtonImagesForTheme('dark');
}
function changeThemeToLight() {
    html.setAttribute("theme", "light");
    switchButtonImagesForTheme('light');
}
lightThemeBtn.onclick = changeThemeToLight;
darkThemeBtn.onclick = changeThemeToDark;



function switchButtonImagesForTheme(theme) {
    const allImgs = [
        ...document.querySelectorAll('.button-unselected-Menu'),
        ...document.querySelectorAll('.button-Hovered-Menu'),
        ...document.querySelectorAll('.button-Selected-Menu')
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

        //Fade in
        setTimeout(() => {
            allImgs.forEach(img => img.classList.remove('button-img-fade'));
        }, 50); 
    }, 300); // entspricht der CSS-Transition-Dauer
}
// Beispiel: Theme-Wechsel-Handler
function setTheme(theme) {
    document.documentElement.setAttribute('theme', theme);
    switchButtonImagesForTheme(theme);
}

// Rufe setTheme('light') oder setTheme('dark') auf, wenn das Theme gewechselt wird.