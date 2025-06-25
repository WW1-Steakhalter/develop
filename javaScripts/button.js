function selectClockMenuBtn(btn) {
    document.querySelectorAll('.clock-menu-btn').forEach(b => {
        b.classList.remove('selected');
    });
    btn.classList.add('selected');
}
