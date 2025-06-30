function loadProjectData() {
    const projektTabelle = document.querySelector("#projectTable");
    const tbody = projektTabelle?.querySelector("tbody");
    const projectList = document.getElementById("project-list");
    const mitarbeiterTBody = document.getElementById("mitarbeiterTBody");
    const projektNameZelle = document.querySelector("#projektTabelle thead tr th:first-child");
    const kostenZelle = document.querySelector("#projektTabelle thead tr th:nth-child(2)");
    const mitarbeiterId = document.getElementById("mitarbeiter_id");

    if (!projektTabelle || !tbody || !projectList || !mitarbeiterTBody) {
        console.warn("❗ HTML-Elemente fehlen.");
        return;
    }

    // Alles leeren
    tbody.innerHTML = "";
    projectList.innerHTML = "";
    mitarbeiterTBody.innerHTML = "";

    // Projekte laden
    fetch("/PHP/getProjectList.php")
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) return;

            data.forEach(row => {
                const name = row.projektname || "Unbekannt";
                const kosten = parseFloat(row.gesamtkosten || 0).toFixed(2);

                const li = document.createElement("li");
                li.classList.add("project-item");

                const spanName = document.createElement("span");
                spanName.textContent = name;
                spanName.style.cursor = "pointer";
                spanName.onclick = () => loadDetails(name, parseFloat(kosten));

                const deleteBtn = document.createElement("img");
                deleteBtn.src = "/img/ButtonBack.svg";  // oder ggf. relativer Pfad
                deleteBtn.alt = "Projekt löschen";
                deleteBtn.className = "delete-btn";
                deleteBtn.onclick = (e) => {
                    e.stopPropagation(); // verhindert Detail-Ansicht
                    if (confirm(`Projekt "${name}" wirklich löschen?`)) {
                        deleteProject(name);
                    }
                };

                li.appendChild(spanName);
                li.appendChild(deleteBtn);
                projectList.appendChild(li);

            });
            getDropdownMenu(data);
        })
        .catch(err => console.error("❌ Fehler beim Laden der Projekte:", err));

}

function loadDetails(name, kosten) {
    const tbody = document.querySelector("#projectTable tbody");
    const mitarbeiterTBody = document.getElementById("mitarbeiterTBody");

    if (!tbody || !mitarbeiterTBody) return;

    tbody.innerHTML = "";
    mitarbeiterTBody.innerHTML = "";

    // Projektdetails anzeigen
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${name}</td><td>${kosten.toFixed(2)} €</td>`;
    tbody.appendChild(tr);

    // Mitarbeiterdaten nachladen
    fetch(`/PHP/getProjectDetails.php?projektname=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) return;
            data.forEach(m => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${m.name}</td>
                    <td>${m.typ}</td>
                    <td>${parseFloat(m.kosten).toFixed(2)} €</td>
                `;
                mitarbeiterTBody.appendChild(row);
            });
        })
        .catch(err => {
            console.error(" Fehler beim Laden der Mitarbeiterdaten:", err);
            mitarbeiterTBody.innerHTML = `<tr><td colspan="4">Fehler beim Laden</td></tr>`;
        });
}

function getDropdownMenu(data) {
    const projekt1Select = document.getElementById("projekt1Select");
    const projekt2Select = document.getElementById("projekt2Select");

    projekt1Select.innerHTML = '<option disabled selected>Projekt wählen</option>';
    projekt2Select.innerHTML = '<option disabled selected>Projekt wählen</option>';

    data.forEach(project => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        option1.value = option2.value = project.projektname;
        option1.textContent = project.projektname;
        option2.textContent = project.projektname;
        projekt1Select.appendChild(option1);
        projekt2Select.appendChild(option2);
    });

    projekt1Select.onchange = projekt2Select.onchange = () => compareProjects(data);
}

function compareProjects(data) {
    const p1 = document.getElementById("projekt1Select").value;
    const p2 = document.getElementById("projekt2Select").value;
    const resultBox = document.getElementById("vergleichsErgebnis");

    const proj1 = data.find(p => p.projektname === p1);
    const proj2 = data.find(p => p.projektname === p2);

    if (!proj1 || !proj2 || p1 === "Projekt wählen" || p2 === "Projekt wählen") {
        resultBox.textContent = "";
        return;
    }

    const kosten1 = parseFloat(proj1.gesamtkosten || 0);
    const kosten2 = parseFloat(proj2.gesamtkosten || 0);
    const diff = Math.abs(kosten1 - kosten2).toFixed(2);
    const teurer = kosten1 > kosten2 ? p1 : kosten1 < kosten2 ? p2 : "Beide gleich teuer";

    resultBox.innerHTML = `
        <div><strong>${p1}:</strong> ${kosten1.toFixed(2)} €</div>
        <div><strong>${p2}:</strong> ${kosten2.toFixed(2)} €</div>
        <div><strong>Unterschied:</strong> ${diff} €</div>
        <div><strong>Teureres Projekt:</strong> ${teurer}</div>
    `;
}

function deleteProject(name) {
    const formData = new FormData();
    formData.append("projektname", name);

    fetch("/PHP/deleteProject.php", {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Projekt erfolgreich gelöscht.");
                loadProjectData();
            } else {
                alert("Fehler: " + data.message);
            }
        })
        .catch(err => {
            console.error(" Netzwerkfehler:", err);
            alert("Netzwerkfehler beim Löschen");
        });
}

function openProjektModal() {
    document.getElementById("projektModal").style.display = "flex";

    fetch("/PHP/getProjectList.php")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("projektListe");
            list.innerHTML = "";

            data.forEach(projekt => {
                const li = document.createElement("li");
                li.textContent = projekt.projektname;
                li.style.cursor = "pointer";

                li.onclick = () => {
                    const mitarbeiterId = document.getElementById("mitarbeiter_id")?.value || "";
                    const name = document.getElementById("name")?.value || "";
                    const typ = document.getElementById("workingType02")?.value || "fest"; // default zu 'fest'

                    if (!mitarbeiterId || !name || !typ) {
                        alert("❗ Bitte zuerst Name, Typ und Mitarbeiter-ID eingeben.");
                        return;
                    }

                    // Formulardaten vorbereiten (SHK oder FEST)
                    const formData = new FormData();
                    let url = "";

                    if (typ === "shk") {
                        url = "/PHP/insertShkAndWhk.php";

                        const ids = [
                            "name", "mitarbeiter_id", "workingType02",
                            "salary", "month2024", "month2025", "month2026", "month2027",
                            "hoursPerWeek",
                            "yearSum2024", "yearSum2025", "yearSum2026", "yearSum2027",
                            "shkEmployeeSum"
                        ];
                        ids.forEach(id => {
                            const el = document.getElementById(id);
                            if (el) formData.append(id, el.value);
                        });
                    } else {
                        url = "/PHP/insertMitarbeiter.php";

                        const ids = [
                            "mitarbeiter_id", "name", "entgeltgruppe",
                            "2024_bis_10_2024", "2024_ab_11_2024", "2025", "2026", "2027",
                            "wochenstunden",
                            "brutto_bis_10_2024", "brutto_ab_11_2024", "brutto_2025", "brutto_2026", "brutto_2027",
                            "jsz_2024_bis_10_2024", "jsz_2024_ab_11_2024", "jsz_2025", "jsz_2026", "jsz_2027",
                            "js_bis_10_2024", "js_ab_11_2024", "js_2025", "js_2026", "js_2027",
                            "gesamtsumme"
                        ];
                        ids.forEach(id => {
                            const el = document.getElementById(id);
                            if (el) formData.append(id, el.value);
                        });
                    }

                    // ➕ Mitarbeiter speichern (abhängig von Typ) und dann zum Projekt hinzufügen
                    fetch(url, {
                        method: "POST",
                        body: formData
                    })
                        .then(res => res.text())
                        .then(response => {
                            if (response.includes("erfolgreich") || response.includes("OK")) {
                                zuProjektHinzufuegen(mitarbeiterId, projekt.projekt_id);
                                closeProjektModal();
                            } else {
                                alert("❌ Fehler beim Speichern: " + response);
                            }
                        })
                        .catch(error => {
                            console.error("❌ Netzwerkfehler:", error);
                            alert("Netzwerkfehler beim Speichern");
                        });
                };


                list.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Fehler beim Laden der Projekte:", error);
            alert("Projekte konnten nicht geladen werden.");
        });
}

function closeProjektModal() {
    document.getElementById("projektModal").style.display = "none";
}

function zuProjektHinzufuegen(mitarbeiterId, projektId) {
    const formData = new FormData();
    formData.append("mitarbeiter_id", mitarbeiterId);
    formData.append("projekt_id", projektId);

    fetch("/PHP/insertEmployeeIntoProject.php", {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert("Mitarbeiter wurde dem Projekt zugeordnet.");
            } else {
                alert("Fehler: " + data.message);
            }
        })
        .catch(err => {
            console.error("❌ Fehler bei der Zuordnung:", err);
        });
}


loadProjectData();
