async function fetchCharacters() {
    const searchInput = document.getElementById('search-input').value;
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchInput}`);
    const data = await response.json();
    displayCharacters(data.results);
}

function displayCharacters(characters) {
    const container = document.getElementById('characters-container');
    container.innerHTML = '';
    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <h3>${character.name}</h3>
            <img src="${character.image}" alt="${character.name}">
        `;
        container.appendChild(card);
    });
}
