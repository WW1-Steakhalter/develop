
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
        .catch(error => console.log("Fehler beim Laden der Entgeltstufe", error));

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
    const data = new FormData();

    const entgeltgruppeWert = document.getElementById("entgeltgruppe")?.value || "";// Persönliche Angaben
    data.append("name", document.getElementById("name")?.value || "");
    data.append("mitarbeiter_id", document.getElementById("mitarbeiter_id")?.value || "");
    data.append("entgeltgruppe", document.getElementById("entgeltgruppe")?.value || "");

    // Eingaben: Jahre + Wochenstunden
    data.append("2024_bis_10_2024", document.getElementById("2024_bis_10_2024")?.value || "");
    data.append("2024_ab_11_2024", document.getElementById("2024_ab_11_2024")?.value || "");
    data.append("2025", document.getElementById("2025")?.value || "");
    data.append("2026", document.getElementById("2026")?.value || "");
    data.append("2027", document.getElementById("2027")?.value || "");
    data.append("wochenstunden", document.getElementById("wochenstunden")?.value || "");

    // Brutto-Werte
    data.append("brutto_bis_10_2024", document.getElementById("brutto_bis_10_2024")?.value || "");
    data.append("brutto_ab_11_2024", document.getElementById("brutto_ab_11_2024")?.value || "");
    data.append("brutto_2025", document.getElementById("brutto_2025")?.value || "");
    data.append("brutto_2026", document.getElementById("brutto_2026")?.value || "");
    data.append("brutto_2027", document.getElementById("brutto_2027")?.value || "");

    // Jahressonderzahlungen

    data.append("jsz_2024_bis_10_2024", document.getElementById("jsz_2024_bis_10_2024")?.value || "");
    data.append("jsz_2024_ab_11_2024", document.getElementById("jsz_2024_ab_11_2024") ?.value || "");
    data.append("jsz_2025", document.getElementById("jsz_2025")?.value || "");
    data.append("jsz_2026", document.getElementById("jsz_2026")?.value || "");
    data.append("jsz_2027", document.getElementById("jsz_2027")?.value || "");


    //Jahressumme
    data.append("js_bis_10_2024", document.getElementById("js_bis_10_2024")?.value || "");
    data.append("js_ab_11_2024", document.getElementById("js_ab_11_2024") ?.value || "");
    data.append("js_2025", document.getElementById("js_2025")?.value || "");
    data.append("js_2026", document.getElementById("js_2026")?.value || "");
    data.append("js_2027", document.getElementById("js_2027")?.value || "");

    // Gesamtsumme
    data.append("gesamtsumme", document.getElementById("gesamtsumme")?.value || "");

    // Anfrage senden
    fetch("PHP/insertMitarbeiter.php", {
        method: "POST",
        body: data
    })

        .then(res => res.text())
        .then(msg => alert("Antwort vom Server: " + msg))
        .catch(err => alert("Fehler beim Senden: " + err)
        );
}