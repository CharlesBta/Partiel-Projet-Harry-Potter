import { fetchCharacters } from "./api.js";
import { charactersContainer, renderCharacters } from "./ui.js";
import { initBurgerMenu } from "./burger.js";

const houseButtons = document.querySelectorAll(".houses > div");
const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll(".filters button");

let characters = [];
let selectedHouse = null;
let searchTerm = "";
let sortMode = null;
let aliveFilter = null;

function getVisibleCharacters() {
    let visible = characters;

    if (selectedHouse) {
        visible = visible.filter((character) => character.house?.trim().toLowerCase() === selectedHouse);
    }
    if (searchTerm) {
        visible = visible.filter((character) => character.name?.toLowerCase().includes(searchTerm));
    }
    if (aliveFilter !== null) {
        visible = visible.filter((character) => character.alive === aliveFilter);
    }

    if (sortMode === "age") {
        visible = [...visible].sort((a, b) => (a.yearOfBirth || Infinity) - (b.yearOfBirth || Infinity));
    } else if (sortMode === "name" || selectedHouse || searchTerm) {
        visible = [...visible].sort((a, b) => a.name.localeCompare(b.name));
    }

    return visible;
}

function updateFilterButtons() {
    filterButtons.forEach((button) => {
        if (button.dataset.sort) {
            button.classList.toggle("active", button.dataset.sort === sortMode);
        } else {
            button.classList.toggle("active", aliveFilter !== null && (button.dataset.alive === "true") === aliveFilter);
        }
    });
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

if (searchInput) {
    searchInput.addEventListener("input", (event) => {
        searchTerm = event.target.value.trim().toLowerCase();
        renderCharacters(getVisibleCharacters());
    });
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.dataset.sort) {
            sortMode = sortMode === button.dataset.sort ? null : button.dataset.sort;
        } else if (button.dataset.alive) {
            const alive = button.dataset.alive === "true";
            aliveFilter = aliveFilter === alive ? null : alive;
        }
        updateFilterButtons();
        renderCharacters(getVisibleCharacters());
    });
});

initBurgerMenu();
loadCharacters();
