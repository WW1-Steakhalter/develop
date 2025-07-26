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
                if (typeof afterMainPageLoad === 'function') {
                    afterMainPageLoad();
                }
            }

            if (document.getElementById("workingType")) {
                selectedEmployeeType();
            }

            if (url === "HTML/employeePage.html") {
                requestAnimationFrame(() => {
                    loadEmployeeScript().then(() => {
                        initEmployeePage();
                        createEmployeeCard();
                        initScrollToTopButton();
                    });
                });
            }
            if (url === "HTML/settingsPage.html") {
                if (typeof openMatrixPopup !== 'undefined') {
                    // optional: initialer Code für Einstellungen
                    console.log("Settings page geladen");
                }
            }



            const currentTheme = document.documentElement.getAttribute('theme') || 'dark';
        if (typeof switchButtonImagesForTheme === 'function') {
            switchButtonImagesForTheme(currentTheme);
        }


            if (url === "HTML/projectPage.html") {
                if (typeof loadProjectData === "function") {
                    loadProjectData();
                }
            }

        })
        .catch(error => {
            document.getElementById("main-content").innerHTML = "<p>Seite konnte nicht geladen werden.</p>";
            console.error(error);
        });
}

function loadEmployeeScript() {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "javaScripts/mitarbeiter.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}
