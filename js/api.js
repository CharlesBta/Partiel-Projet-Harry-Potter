const API_URL = "https://hp-api.onrender.com/api/characters";

export async function fetchCharacters() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
    }
    const characters = await response.json();
    return characters.slice(0, 20);
}
