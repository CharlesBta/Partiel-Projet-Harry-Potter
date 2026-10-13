const API_URL = "https://hp-api.onrender.com/api/characters";
const CHARACTER_URL = "https://hp-api.onrender.com/api/character";

export async function fetchCharacters() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
    }
    return response.json();
}

export async function fetchCharacter(id) {
    const response = await fetch(`${CHARACTER_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
    }
    const data = await response.json();
    const character = data[0];
    if (!character) {
        throw new Error("personnage introuvable");
    }
    return character;
}
