function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username && password) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'flex';

        // Mostrar la imagen de perfil si existe en localStorage
        const profileImage = localStorage.getItem('profileImage');
        if (profileImage) {
            document.getElementById('profile-image').src = profileImage;
        }
    } else {
        alert('Por favor, ingrese usuario y contraseña');
    }
}

async function selectProfileImage() {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    
    const character = data.results[Math.floor(Math.random() * data.results.length)];
    document.getElementById('profile-image').src = character.image;

    // Guardar la URL de la imagen de perfil en localStorage
    localStorage.setItem('profileImage', character.image);
}

function deleteProfileImage() {
    document.getElementById('profile-image').src = 'https://via.placeholder.com/150';

    // Eliminar la URL de la imagen de perfil de localStorage
    localStorage.removeItem('profileImage');
}

function logout() {
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'flex';

    // Mostrar la imagen de perfil en la pantalla de inicio de sesión si existe en localStorage
    const profileImage = localStorage.getItem('profileImage');
    if (profileImage) {
        document.getElementById('login-profile-image').src = profileImage;
    }
}

function saveProfile() {
    // Guardar la URL de la imagen de perfil y abrir la nueva página
    window.location.href = 'profile.html';
}

function goBack() {
    window.location.href = 'index.html';
}

async function loadCharacters() {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();

    const container = document.getElementById('character-container');
    container.innerHTML = '';

    data.results.forEach(character => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${character.name}</h3>
            <img src="${character.image}" alt="${character.name}">
        `;
        container.appendChild(card);
    });
}

// Cargar la imagen de perfil y los personajes si existe en localStorage al cargar la página
window.onload = function() {
    const profileImage = localStorage.getItem('profileImage');
    if (profileImage) {
        const loginProfileImage = document.getElementById('login-profile-image');
        const profilePageImage = document.getElementById('profile-image');

        if (loginProfileImage) {
            loginProfileImage.src = profileImage;
        }

        if (profilePageImage) {
            profilePageImage.src = profileImage;
        }
    }
    // Cargar los personajes si estamos en profile.html
    if (window.location.pathname.endsWith('profile.html')) {
        loadCharacters();
    }
}
