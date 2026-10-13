import { fetchCharacter } from "./api.js";
import { initBurgerMenu } from "./burger.js";

const id = new URLSearchParams(window.location.search).get("id");

const showAttr = (label, value) =>
    value ? `<div><p>${label}</p><p class="attr">${value}</p></div>` : "";

function showError(message) {
    document.getElementById("perso-name").textContent = message;
    document.querySelector(".perso").style.display = "none";
    document.querySelector(".house__perso").style.display = "none";
}

async function loadCharacter() {
    if (!id) {
        showError("Aucun personnage sélectionné");
        return;
    }

    try {
        const character = await fetchCharacter(id);

        document.getElementById("perso-name").textContent = character.name || "Unknown";

        const photo = document.getElementById("perso-photo");
        photo.src = character.image || "./images/troll.jpg";
        photo.alt = character.name || "Unknown";
        if (!character.alive) {
            photo.style.filter = "grayscale(100%)";
        }

        document.getElementById("perso-actor").textContent = character.actor || "Unknown";

        document.querySelector(".perso__right").innerHTML +=
        showAttr("Nicknames", character.alternate_names?.[0]) +
        showAttr("Gender", character.gender) +
        showAttr("Date of birth", character.dateOfBirth) +
        showAttr("Eye", character.eyeColour) +
        showAttr("Hair", character.hairColour) +
        showAttr("Patronus", character.patronus);

        if (character.house) {
            const houseImg = document.getElementById("perso-house");
            houseImg.src = `./images/houses/${character.house}.png`;
            houseImg.alt = `Blason ${character.house}`;
        } else {
            document.querySelector(".house__perso").style.display = "none";
        }
    } catch (error) {
        showError(`Impossible de charger le personnage : ${error.message}`);
    }
}

initBurgerMenu();
loadCharacter();
