
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

function submitEmployeeInputsToDb (){
    const data = new formData();

    // Persönliche Angaben
    data.append("name", document.getElementById("name")?.value || "");
    data.append("mitarbeiter_id", document.getElementById("0")?.value || "");
    data.append("entgeltgruppe", document.getElementById("options")?.value || "");

    // Eingaben: Jahre + Wochenstunden
    data.append("jahr_2024_bis_10", document.getElementById("1")?.value || "");
    data.append("2024_ab_11_2024", document.getElementById("2")?.value || "");
    data.append("2025", document.getElementById("3")?.value || "");
    data.append("2026", document.getElementById("4")?.value || "");
    data.append("2027", document.getElementById("5")?.value || "");
    data.append("wochenstunden", document.getElementById("6")?.value || "");

    // Brutto-Werte
    data.append("brutto_bis_10_2024", document.getElementById("out1")?.value || "");
    data.append("brutto_ab_11_2024", document.getElementById("out2")?.value || "");
    data.append("brutto_2025", document.getElementById("out3")?.value || "");
    data.append("brutto_2026", document.getElementById("out4")?.value || "");
    data.append("brutto_2027", document.getElementById("out5")?.value || "");

    // Jahressonderzahlungen
    data.append("js_bis_10_2024", document.getElementById("shares01")?.value || "");
    data.append("js_ab_11_2024", document.getElementById("shares02") ?.value || "");
    data.append("js_2025", document.getElementById("shares03")?.value || "");
    data.append("js_2026", document.getElementById("shares04")?.value || "");
    data.append("js_2027", document.getElementById("shares05")?.value || "");

    // Gesamtsumme
    data.append("gesamtsumme", document.getElementById("gesamtsumme")?.value || "");

    // Anfrage senden
    fetch("speichern.php", {
        method: "POST",
        body: data
    })

        .then(res => res.text())
        .then(msg => alert("Antwort vom Server: " + msg))
        .catch(err => alert("Fehler beim Senden: " + err)
        );
}