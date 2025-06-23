function openMatrixPopup() {
    document.getElementById('matrixPopup').style.display = 'block';

    // Nur Entgeltgruppe und Wert in der Tabelle
    let html = '<table><tr><th>Entgeltgruppe</th><th>Wert</th></tr>';
    for (let i = 0; i < matrix.length; i++) {
        html += `<tr>
            <td>${matrix[i][0]}</td>
            <td><input type="number" step="0.01" value="${matrix[i][1]}" id="matrixval_${i}"></td>
        </tr>`;
    }
    html += '</table>';
    document.getElementById('matrixEditor').innerHTML = html;

    // Setze die aktuellen Werte der globalen Variablen in die Inputfelder
    document.getElementById('folgejahr_1_input').value = typeof folgejahr_1 !== "undefined" ? folgejahr_1 : 200;
    document.getElementById('folgejahr_2_input').value = typeof folgejahr_2 !== "undefined" ? folgejahr_2 : 1.055;
}

function saveMatrix() {
    for (let i = 0; i < matrix.length; i++) {
        const val = parseFloat(document.getElementById('matrixval_' + i).value);
        if (!isNaN(val)) {
            matrix[i][1] = val;
        }
    }
    // Neue Werte für die globalen Variablen übernehmen
    folgejahr_1 = parseFloat(document.getElementById('folgejahr_1_input').value) || 200;
    folgejahr_2 = parseFloat(document.getElementById('folgejahr_2_input').value) || 1.055;

    closeMatrixPopup();
    alert('Matrix gespeichert!');
}
function closeMatrixPopup() {
    document.getElementById('matrixPopup').style.display = 'none';
}