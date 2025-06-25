function loadProjectData() {
    const projektTabelle = document.querySelector("#projectTable");
    const tbody = projektTabelle?.querySelector("tbody");
    const projectList = document.getElementById("project-list");
    const mitarbeiterTBody = document.getElementById("mitarbeiterTBody");
    const projektNameZelle = document.querySelector("#projektTabelle thead tr th:first-child");
    const kostenZelle = document.querySelector("#projektTabelle thead tr th:nth-child(2)");

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
                li.textContent = name;
                li.style.cursor = "pointer";
                li.onclick = () => {
                    loadDetails(name, parseFloat(kosten));
                };
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

loadProjectData();
