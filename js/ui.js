export const charactersContainer = document.querySelector(".characters");

function createCard(character) {
    const name = character.name?.trim() || "Inconnu";
    const image = character.image || "./images/troll.jpg";
    const house = character.house?.trim().toLowerCase() || "";

    const card = document.createElement("div");
    if (house) {
        card.classList.add(`house-${house}`);
    }
    card.innerHTML = `
        <img src="${image}" alt="${name}" />
        <p>${name}</p>
    `;
    return card;
}

export function renderCharacters(list) {
    charactersContainer.innerHTML = "";
    if (list.length === 0) {
        charactersContainer.innerHTML = "<p>Aucun personnage de cette maison parmi les 20 premiers.</p>";
        return;
    }
    list.forEach((character) => charactersContainer.appendChild(createCard(character)));
}
