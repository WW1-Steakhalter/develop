window.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.clock-menu-btn-Start');
    if (startButton) {
        startButton.click();
    } else {
        loadPage('HTML/startPage.html');
        rotatePointer(-77);
    }
});