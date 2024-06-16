document.addEventListener('DOMContentLoaded', function() {
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const oceanos = [
        {
            nome: 'Oceano Atlântico',
            latlng: [14.5994, -28.6731],
            temperatura: '25°C',
            pH: '8.1',
            salinidade: '35 ppt',
            profundidade_media: '3.646 metros',
            extensao: '106.460.000 km²',
            biodiversidade: 'Rico em diversas espécies marinhas, incluindo tartarugas, golfinhos e atuns.',
            pressao_ambiental: 'Ameaçado pela poluição, pesca predatória e mudanças climáticas.'
        },
        {
            nome: 'Oceano Pacífico',
            latlng: [-8.7832, -124.5085],
            temperatura: '22°C',
            pH: '8.2',
            salinidade: '33 ppt',
            profundidade_media: '4.188 metros',
            extensao: '63.800.000 km²',
            biodiversidade: 'Casa de uma vasta diversidade de vida marinha, incluindo baleias, golfinhos e tubarões.',
            pressao_ambiental: 'Sob ameaça devido à sobrepesca, poluição plástica e mudanças climáticas.'
        },
        {
            nome: 'Oceano Índico',
            latlng: [-33.9249, 81.9549],
            temperatura: '28°C',
            pH: '8.0',
            salinidade: '36 ppt',
            profundidade_media: '3.741 metros',
            extensao: '73.556.000 km²',
            biodiversidade: 'Casa de espécies únicas, incluindo o dugongo e o tubarão-baleia.',
            pressao_ambiental: 'Sob risco devido à poluição, pesca predatória e mudanças climáticas.'
        },
        {
            nome: 'Oceano Antártico',
            latlng: [-65.0000, 0.0000],
            temperatura: '-2°C',
            pH: '7.9',
            salinidade: '32 ppt',
            profundidade_media: '4.000 metros',
            extensao: '20.327.000 km²',
            biodiversidade: 'Habitado por uma grande variedade de peixes, aves marinhas e focas.',
            pressao_ambiental: 'Ameaçado pelo derretimento do gelo, atividades pesqueiras e mudanças climáticas.'
        },
        {
            nome: 'Oceano Ártico',
            latlng: [72.0000, 0.0000],
            temperatura: '-1.5°C',
            pH: '8.3',
            salinidade: '30 ppt',
            profundidade_media: '1.038 metros',
            extensao: '14.056.000 km²',
            biodiversidade: 'Habitado por espécies adaptadas ao frio, incluindo ursos polares e morsas.',
            pressao_ambiental: 'Sob ameaça devido ao derretimento do gelo, mudanças climáticas e atividades industriais.'
        }
    ];

    // marcadores
    oceanos.forEach(oceano => {
        const marker = L.marker(oceano.latlng)
            .addTo(map)
            .bindPopup(`
                <b>${oceano.nome}</b><br><br>
                <b>Informações Gerais:</b><br>
                Temperatura: ${oceano.temperatura}<br>
                pH: ${oceano.pH}<br>
                Salinidade: ${oceano.salinidade}<br>
                Profundidade Média: ${oceano.profundidade_media}<br>
                Extensão: ${oceano.extensao}<br><br>
                <b>Biodiversidade:</b><br>
                ${oceano.biodiversidade}<br><br>
                <b>Pressões Ambientais:</b><br>
                ${oceano.pressao_ambiental}
            `);
    });

    const bounds = new L.LatLngBounds(
        oceanos.map(oceano => oceano.latlng)
    );
    map.fitBounds(bounds);

    // Popups
    const loginPopup = document.getElementById('loginPopup');
    const btnLogin = document.getElementById('btnLogin');
    const closeLogin = document.getElementById('closeLogin');
    const btnShowRegister = document.getElementById('btnShowRegister');
    const registerPopup = document.getElementById('registerPopup');
    const closeRegister = document.getElementById('closeRegister');
    const deletePopup = document.getElementById('deletePopup');
    const btnShowDelete = document.getElementById('btnShowDelete');
    const closeDelete = document.getElementById('closeDelete');

    // Mostrar e ocultar popups
    btnLogin.addEventListener('click', function() {
        loginPopup.style.display = 'block';
    });

    closeLogin.addEventListener('click', function() {
        loginPopup.style.display = 'none';
    });

    btnShowRegister.addEventListener('click', function() {
        loginPopup.style.display = 'none';
        registerPopup.style.display = 'block';
    });

    closeRegister.addEventListener('click', function() {
        registerPopup.style.display = 'none';
    });

    btnShowDelete.addEventListener('click', function() {
        loginPopup.style.display = 'none';
        deletePopup.style.display = 'block';
    });

    closeDelete.addEventListener('click', function() {
        deletePopup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == loginPopup) {
            loginPopup.style.display = 'none';
        }
    });

    window.addEventListener('click', function(event) {
        if (event.target == registerPopup) {
            registerPopup.style.display = 'none';
        }
    });

    window.addEventListener('click', function(event) {
        if (event.target == deletePopup) {
            deletePopup.style.display = 'none';
        }
    });

    // Formulário de login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            alert('Login bem-sucedido!');
            loginPopup.style.display = 'none';
        } else {
            alert('Usuário ou senha inválidos.');
        }
    });

    // Formulário de registro
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        if (!/^\d{5}$/.test(newUsername)) {
            alert('O nome de usuário deve conter exatamente 5 números.');
            return;
        }

        if (!/^\d{8}$/.test(newPassword)) {
            alert('A senha deve conter exatamente 8 números.');
            return;
        }

        localStorage.setItem(newUsername, newPassword);
        alert(`Usuário ${newUsername} registrado com sucesso!`);
        registerPopup.style.display = 'none';
    });

    // Formulário de exclusão
    const deleteForm = document.getElementById('deleteForm');
    deleteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const deleteUsername = document.getElementById('deleteUsername').value;

        if (localStorage.getItem(deleteUsername)) {
            localStorage.removeItem(deleteUsername);
            alert(`Usuário ${deleteUsername} excluído com sucesso!`);
            deletePopup.style.display = 'none';
        } else {
            alert('Usuário não encontrado.');
        }
    });
});
