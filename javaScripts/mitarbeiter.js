document.addEventListener("DOMContentLoaded", () => {
    initMitarbeiter();
});

const mitarbeiterListe = [
    {
        name: "Cansu",
        nachname: "Güler",
        personalnummer: "01",
        abteilung: "Managment",
        position: "Teamchef",
        eintrittsdatum: "2025-03-26",
        stundenlohn: "20",
        urlaubsanspruch: "30",
        arbeitszeitmodell: "Teilzeit"
    },
    {
        name: "Finn",
        nachname: "Thiele",
        personalnummer: "02",
        abteilung: "Managment",
        position: "Projektmanager",
        eintrittsdatum: "2025-03-24",
        stundenlohn: "20",
        urlaubsanspruch: "30",
        arbeitszeitmodell: "Teilzeit"
    },
    {
        name: "Nicolas",
        nachname: "Kunze",
        personalnummer: "03",
        abteilung: "Programmierer",
        position: "Chefprogrammierer",
        eintrittsdatum: "2025-03-25",
        stundenlohn: "20",
        urlaubsanspruch: "30",
        arbeitszeitmodell: "Teilzeit"
    },
    {
        name: "Yannik",
        nachname: "Hunger",
        personalnummer: "04",
        abteilung: "Programmierer",
        position: "Softwarearchitekt",
        eintrittsdatum: "2025-03-25",
        stundenlohn: "20",
        urlaubsanspruch: "30",
        arbeitszeitmodell: "Teilzeit"
    },
    {
        name: "Andreas",
        nachname: "Herti",
        personalnummer: "05",
        abteilung: "Programmierer",
        position: "Softwarearchitekt",
        eintrittsdatum: "2025-03-25",
        stundenlohn: "20",
        urlaubsanspruch: "30",
        arbeitszeitmodell: "Teilzeit"
    },
    {
        name: "Elias",
        nachname: "Hörmann",
        personalnummer: "06",
        abteilung: "Design",
        position: "Creative Content Design",
        eintrittsdatum: "2025-03-25",
        stundenlohn: "20",
        urlaubsanspruch: "30",
        arbeitszeitmodell: "Teilzeit"
    },
    {
        name: "Nele",
        nachname: "Muhr",
        personalnummer: "07",
        abteilung: "Design",
        position: "Creative Content Design",
        eintrittsdatum: "2025-03-25",
        stundenlohn: "20",
        urlaubsanspruch: "30",
        arbeitszeitmodell: "Teilzeit"
    },
    {
        name: "Angelina",
        nachname: "Gerlach",
        personalnummer: "08",
        abteilung: "Design",
        position: "Usability/UX",
        eintrittsdatum: "2025-03-25",
        stundenlohn: "20",
        urlaubsanspruch: "30",
        arbeitszeitmodell: "Teilzeit"
    },
    {
        name: "Pascal",
        nachname: "Hänsch",
        personalnummer: "09",
        abteilung: "Stakeholder",
        position: "Stakeholder",
        eintrittsdatum: "2025-03-25",
        stundenlohn: "20",
        urlaubsanspruch: "30",
        arbeitszeitmodell: "Teilzeit"
    },

];

function initMitarbeiter() {
    console.log("initMitarbeiter gestartet");

    initMitarbeiterListe();
    ScrollToTopButton();
}

function initMitarbeiterListe() {
    const listContainer = document.getElementById("employeeList");
    const detailContainer = document.getElementById("employeeDetails");

    if (!listContainer || !detailContainer) {
        console.warn("Container nicht gefunden");
        return;
    }

    mitarbeiterListe.forEach((m, index) => {
        const btn = document.createElement("button");
        btn.classList.add("employee-button");
        btn.textContent = `${m.name} ${m.nachname}`;

        btn.addEventListener("click", (event) => {
            const isMultiSelect = event.altKey;

            if (!isMultiSelect) {

                document.querySelectorAll(".employee-button").forEach(b => b.classList.remove("active"));
                detailContainer.innerHTML = "";
            }

            btn.classList.add("active");

            const card = createEmployeeCard(m);
            detailContainer.appendChild(card);
        });

        listContainer.appendChild(btn);
    });
}

function createEmployeeCard(m) {
    const card = document.createElement("div");
    card.classList.add("employee-card");

    card.innerHTML = `
        <div class="cardClose">
            <h3>${m.name} ${m.nachname}</h3>
        </div>
        <div class="input-box-employeeInputs">
            <div class="inputfield"><label>Name:</label><input type="text" value="${m.name}"></div>
            <div class="inputfield"><label>Nachname:</label><input type="text" value="${m.nachname}"></div>
            <div class="inputfield"><label>Personalnummer:</label><input type="text" value="${m.personalnummer}"></div>
            <div class="inputfield"><label>Abteilung/Team:</label><input type="text" value="${m.abteilung}"></div>
            <div class="inputfield"><label>Position/Jobtitel:</label><input type="text" value="${m.position}"></div>
            <div class="inputfield"><label>Eintrittsdatum:</label><input type="date" value="${m.eintrittsdatum}"></div>
            <div class="inputfield"><label>Stundenlohn:</label><input type="number" value="${m.stundenlohn}"></div>
            <div class="inputfield"><label>Urlaubsanspruch:</label><input type="number" value="${m.urlaubsanspruch}"></div>
            <div class="inputfield"><label>Arbeitszeitmodell:</label><input type="text" value="${m.arbeitszeitmodell}"></div>
        </div>
    `;

    return card;
}

function ScrollToTopButton() {
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (!backToTopBtn) return;

    window.addEventListener("scroll", () => {
        backToTopBtn.style.display =
            (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)
                ? "block"
                : "none";
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}