
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

function selectedEmployeeType (){
    document.getElementById("workingType").addEventListener("change", function(){
        const selectedValue =  this.value;

        if(selectedValue === "SHK/WHK"){
           loadPage("HTML/shkMainPage.html");
        }else if(selectedValue === "Mitarbeiter"){
            loadPage("HTML/mainPage.html");
        }
    });
}

function calculateWithIncludedAgShares (){


}