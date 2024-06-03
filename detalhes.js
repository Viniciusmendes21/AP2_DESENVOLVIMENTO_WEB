window.onload = function() {
    const authorized = localStorage.getItem('authorized');
    if (!authorized) {
        window.location.href = 'index.html'; // Redireciona para a página de login se não estiver autenticado
    } else {
        const athleteId = window.location.pathname.split('/').pop(); // Obtém o ID do atleta da URL
        fetchAthleteDetails(athleteId);
    }
}

function fetchAthleteDetails(athleteId) {
    const url = `https://botafogo-atletas.mange.li/2024-1/${athleteId}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter detalhes do atleta');
            }
            return response.json();
        })
        .then(data => {
            // Exibe os detalhes do atleta na página
            displayAthleteDetails(data);
        })
        .catch(error => {
            console.error('Erro:', error);
            // Exibe uma mensagem de erro na página
            const container = document.querySelector('.container');
            container.innerHTML = '<p>Ocorreu um erro ao obter os detalhes do atleta.</p>';
        });
}

function displayAthleteDetails(athlete) {
    // Exibe os detalhes do atleta na página, por exemplo:
    const container = document.querySelector('.container');
    container.innerHTML = `
        <h2>${athlete.name}</h2>
        <p>Idade: ${athlete.age}</p>
        <p>Posição: ${athlete.position}</p>
        <p>Número da camisa: ${athlete.shirtNumber}</p>
        <!-- Adicione mais detalhes conforme necessário -->
    `;
}
