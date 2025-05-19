 function loadPage(url) {
     fetch(url)
         .then(response => {
             if (!response.ok) throw new Error("Fehler beim Laden der Seite");
             return response.text();
         })
         .then(html => {
             document.getElementById("main-content").innerHTML = html;

        if (url === "HTML/mainPage.html") {
            fetchSalaryStepTable('entgeldstufen.json', 'Optionen');
        }

        if(document.getElementById("workingType")) {
            selectedEmployeeType();
        }
        })
        .catch(error => {
            document.getElementById("main-content").innerHTML = "<p>Seite konnte nicht geladen werden.</p>";
            console.error(error);
        });

}


