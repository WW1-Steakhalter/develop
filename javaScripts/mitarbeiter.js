document.addEventListener("DOMContentLoaded", () => {
    initMitarbeiter();
    initAddEmployeePopup();
});

const mitarbeiterListe = [
    { name: "Cansu Güler", personalnummer: "01", abteilung: "Managment", position: "Teamchef", kosten: 3000 },
    { name: "Finn Thiele", personalnummer: "02", abteilung: "Managment", position: "Projektmanager", kosten: 2950},
    { name: "Nicolas Kunze", personalnummer: "03", abteilung: "Programmierer", position: "Chefprogrammierer" , kosten: 4000},
    { name: "Yannik Hunger", personalnummer: "04", abteilung: "Programmierer", position: "Softwarearchitekt" , kosten: 3500},
    { name: "Andreas Herti", personalnummer: "05", abteilung: "Programmierer", position: "Softwarearchitekt" , kosten: 2500},
    { name: "Elias Hörmann", personalnummer: "06", abteilung: "Design", position: "Creative Content Design" , kosten: 5000},
    { name: "Nele Muhr", personalnummer: "07", abteilung: "Design", position: "Creative Content Design" , kosten: 3200},
    { name: "Angelina Gerlach", personalnummer: "08", abteilung: "Design", position: "Usability/UX" , kosten: 4320},
    { name: "Pascal Hänsch", personalnummer: "09", abteilung: "Stakeholder", position: "Stakeholder" , kosten: 3340}
];

function initMitarbeiter() {

    const listContainer = document.getElementById("employeeList");
    const detailContainer = document.getElementById("employeeDetails");

    listContainer.innerHTML = "";

    const searchInput = document.createElement("input");
    searchInput.id = "searchInput";
    searchInput.className = "search-input";
    searchInput.placeholder = "Suche nach Name, Personalnummer oder Abteilung...";
    listContainer.appendChild(searchInput);

    const listWrapper = document.createElement("div");
    listWrapper.id = "employeeButtons";
    listContainer.appendChild(listWrapper);

    function renderList(filteredList) {
        listWrapper.innerHTML = "";
        filteredList.forEach(m => {
            const btn = document.createElement("button");
            btn.className = "employee-button";
            btn.textContent = `${m.name}`;
            btn.addEventListener("click", (e) => {
                const cardId = `card-${m.personalnummer}`;
                const existingCard = document.getElementById(cardId);

                if (existingCard) {
                    existingCard.remove();
                    btn.classList.remove("active");
                    return;
                }

                if (!e.shiftKey) {
                    const allCards = detailContainer.querySelectorAll(".employee-card");
                    allCards.forEach(card => card.remove());

                    const allButtons = listWrapper.querySelectorAll(".employee-button");
                    allButtons.forEach(b => b.classList.remove("active"));
                }

                const card = createEmployeeCard(m);
                detailContainer.appendChild(card);
                btn.classList.add("active");
            });
            listWrapper.appendChild(btn);
        });
    }

    renderList(mitarbeiterListe);

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = mitarbeiterListe.filter(m =>
            `${m.name}`.toLowerCase().includes(query) ||
            m.personalnummer.includes(query) ||
            m.abteilung.toLowerCase().includes(query)
        );
        renderList(filtered);
    });
}

function createEmployeeCard(m) {
    const card = document.createElement("div");
    card.id = `card-${m.personalnummer}`;
    card.className = "employee-card";
    card.innerHTML = `
        <h3>${m.name} ${m.nachname}</h3>
        <div class="input-box-employeeInputs">
            <div class="inputfield"><label>Name:</label><input type="text" value="${m.name}"></div>
            <div class="inputfield"><label>Personalnummer:</label><input type="text" value="${m.personalnummer}"></div>
            <div class="inputfield"><label>Abteilung/Team:</label><input type="text" value="${m.abteilung}"></div>
            <div class="inputfield"><label>Position/Jobtitel:</label><input type="text" value="${m.position}"></div>
            <div class="inputfield"><label>Gesamtkosten:</label><input type="text" value="${m.kosten}"></div>
        </div>
    `;
    return card;
}

function initAddEmployeePopup() {
    const modal = document.getElementById("employeeModal");
    const openBtn = document.getElementById("addEmployeeBtn");
    const closeBtn = document.getElementById("closeModalBtn");
    const saveBtn = document.getElementById("saveEmployeeBtn");

    openBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
        clearModalInputs();
    });

    saveBtn.addEventListener("click", () => {
        const newMitarbeiter = {
            name: document.getElementById("newName").value.trim(),
            personalnummer: document.getElementById("newPersonalnummer").value.trim(),
            abteilung: document.getElementById("newAbteilung").value.trim(),
            position: document.getElementById("newPosition").value.trim(),
            kosten: document.getElementById("newKosten").value.trim()
        };

        if (!newMitarbeiter.name || !newMitarbeiter.personalnummer) {
            alert("Bitte mindestens Name, Nachname und Personalnummer angeben.");
            return;
        }

        if (mitarbeiterListe.some(m => m.personalnummer === newMitarbeiter.personalnummer)) {
            alert("Diese Personalnummer existiert bereits.");
            return;
        }

        mitarbeiterListe.push(newMitarbeiter);
        modal.classList.add("hidden");
        clearModalInputs();
        initMitarbeiter();
    });

    function clearModalInputs() {
        document.getElementById("newName").value = "";
        document.getElementById("newPersonalnummer").value = "";
        document.getElementById("newAbteilung").value = "";
        document.getElementById("newPosition").value = "";
        document.getElementById("newKosten").value = "";
    }

}

function initScrollToTopButton() {
    const scrollBtn = document.getElementById("scrollTopBtn");
    if (!scrollBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.remove("hidden");
        } else {
            scrollBtn.classList.add("hidden");
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
