const matrix = [
    ["E1°1", ]
];

function fetchSalaryStepTable () {
    fetch('entgeldstufen.json')
    .then(response => response.json())
    .then(data => {
        const datalist = document.getElementById('Optionen');
        datalist.innerHTML = '';
        data.gruppen.forEach(gruppe => {
            data.stufen.forEach(stufe => {
                const option = document.createElement('option');
                option.value = gruppe + "°" + stufe;
                datalist.appendChild(option);
            });
        });
    })
        .catch(error => console.log("Fehler beim laden der Entgeldstufe", error));

}


function calculateWithIncludedAgShares (){


}