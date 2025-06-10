function initMitarbeiter() {
    console.log("initMitarbeiter gestartet");

    const addCardBtn = document.getElementById("addCardBtn");
    const cardsContainer = document.getElementById("cardsContainer");

    if (!addCardBtn || !cardsContainer) {
        console.warn("addCardBtn oder cardsContainer nicht gefunden.");
        return;
    }

    addCardBtn.addEventListener("click", function () {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3></h3>
            <button class="delete-btn">✖</button>
          </div>
          <div class="input-box-employeeInputs">
            <div class="inputfield"><label>Name:</label><input type="text"></div>
            <div class="inputfield"><label>Nachname:</label><input type="text"></div>
            <div class="inputfield"><label>Personalnummer:</label><input type="text"></div>
            <div class="inputfield"><label>Abteilung/Team:</label><input type="text"></div>
            <div class="inputfield"><label>Position/Jobtitel:</label><input type="text"></div>
            <div class="inputfield"><label>Eintrittsdatum:</label><input type="date"></div>
            <div class="inputfield"><label>Stundenlohn:</label><input type="number"></div>
            <div class="inputfield"><label>Urlaubsanspruch:</label><input type="number"></div>
            <div class="inputfield"><label>Arbeitszeitmodell:</label><input type="text"></div>
          </div>
        `;

        document.getElementById("searchInput").addEventListener("input", function (e) {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll("#cardsContainer .card");

            cards.forEach(card => {
                const name = card.querySelector(".inputfield:nth-of-type(1) input")?.value.toLowerCase() || "";
                const nachname = card.querySelector(".inputfield:nth-of-type(2) input")?.value.toLowerCase() || "";
                const personalnummer = card.querySelector(".inputfield:nth-of-type(3) input")?.value.toLowerCase() || "";
                const abteilung = card.querySelector(".inputfield:nth-of-type(4) input")?.value.toLowerCase() || "";
                const position = card.querySelector(".inputfield:nth-of-type(5) input")?.value.toLowerCase() || "";

                const match = [name, nachname, personalnummer, abteilung, position].some(field =>
                    field.includes(searchTerm)
                );

                card.style.display = match ? "block" : "none";
            });
        });
        card.querySelector(".delete-btn").addEventListener("click", function () {
            card.remove();
        });

        cardsContainer.prepend(card);
    });

    const backToTopBtn = document.getElementById("backToTopBtn");

    window.onscroll = function () {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    backToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}