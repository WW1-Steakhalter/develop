function loadProjectData() {
    const projektTabelle = document.querySelector("#projektTabelle");
    if (!projektTabelle) return;

    fetch("/php/fetchProjectFromDb.php")
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector("#projektTabelle tbody");
            const projectList = document.getElementById("project-list");

            data.forEach(row => {
                const tr = document.createElement("tr");
                tr.innerHTML = `<td>${row.projektname}</td><td>${parseFloat(row.gesamtkosten).toFixed(2)} €</td>`;
                tbody.appendChild(tr);

                const li = document.createElement("li");
                li.textContent = row.projektname;
                projectList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("❌ Fehler beim Laden der Projektdaten:", error);
        });
}
