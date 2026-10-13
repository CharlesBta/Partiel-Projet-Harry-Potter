import { fetchCharacters } from "./api.js";
import { charactersContainer, renderCharacters } from "./ui.js";
import { initBurgerMenu } from "./burger.js";

const houseButtons = document.querySelectorAll(".houses > div");

let characters = [];
let selectedHouse = null;

function getVisibleCharacters() {
    if (!selectedHouse) {
        return characters;
    }
    return characters
        .filter((character) => character.house?.trim().toLowerCase() === selectedHouse)
        .sort((a, b) => a.name.localeCompare(b.name));
}

function selectHouse(house) {
    selectedHouse = selectedHouse === house ? null : house;

    houseButtons.forEach((button) => {
        const buttonHouse = button.querySelector("img")?.alt.trim().toLowerCase() || "";
        if (buttonHouse === house) {
            button.classList.toggle("active");
        } else {
            button.classList.remove("active");
        }
    });

    renderCharacters(getVisibleCharacters());
}

async function loadCharacters() {
    try {
        characters = await fetchCharacters();

        if (characters.length === 0) {
            charactersContainer.innerHTML = "<p>Aucun personnage disponible.</p>";
            return;
        }

        renderCharacters(characters);
    } catch (error) {
        charactersContainer.innerHTML = `<p>Impossible de charger les personnages : ${error.message}</p>`;
    }
}

houseButtons.forEach((button) => {
    const house = button.querySelector("img")?.alt.trim().toLowerCase() || "";
    if (house) {
        button.addEventListener("click", () => selectHouse(house));
    }
});

initBurgerMenu();
loadCharacters();
