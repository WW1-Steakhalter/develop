function rotatePointer(degrees) {
    const pointer = document.querySelector('.pointer');
    if(pointer) {
        pointer.style.transform = `rotate(${degrees}deg)`;
    }
}

// Beispiel: Pointer auf 45 Grad drehen
rotatePointer(-80);


