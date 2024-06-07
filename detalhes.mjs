document.addEventListener('DOMContentLoaded', async () => {
    const estado = sessionStorage.getItem('estado');
    
    if (estado !== 'logado') {
        alert('Você não está logado!');
        window.location.href = 'index.html';
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    let atleta = JSON.parse(sessionStorage.getItem('atleta'));

    if (!atleta || atleta.id !== id) {
        atleta = await buscarAtletaPorId(id);
    }

    if (atleta) {
        document.body.appendChild(montaCard(atleta));
    } else {
        alert('Atleta não encontrado!');
    }
});

async function buscarAtletaPorId(id) {
    const url = `https://botafogo-atletas.mange.li/2024-1/${id}`;
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error('Atleta não encontrado');
        return await resposta.json();
    } catch (erro) {
        console.error(erro);
        return null;
    }
}

function montaCard(atleta) {
    const card = document.createElement('article');
    card.style.cssText = `
        width: 15rem;
        display: flex;
        flex-direction: column;
        background-color: #FFD700;
        padding: 0.5rem;
        margin: 0.5rem;
        text-align: center;
        box-sizing: border-box;
    `;

    const divImagem = document.createElement('div');
    divImagem.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    `;

    const imagem = document.createElement('img');
    imagem.src = atleta.imagem;
    imagem.alt = `Foto de ${atleta.nome}`;
    imagem.style.cssText = `
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 0.5rem;
    `;

    const pNome = document.createElement('p');
    pNome.textContent = atleta.nome;
    pNome.style.cssText = `
        font-weight: bold;
        color: white;
        text-align: center;
        margin: 0.5rem 0;
    `;

    const divDetalhes = document.createElement('div');
    divDetalhes.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    `;

    const pDesc = document.createElement('p');
    pDesc.textContent = atleta.detalhes;
    pDesc.style.cssText = pNome.style.cssText;

    const divStats = document.createElement('div');
    divStats.style.cssText = divDetalhes.style.cssText;

    const pJogos = document.createElement('p');
    pJogos.textContent = `Jogos: ${atleta.n_jogos}`;
    pJogos.style.cssText = pNome.style.cssText;

    const pNascimento = document.createElement('p');
    pNascimento.textContent = `Nascimento: ${atleta.nascimento}`;
    pNascimento.style.cssText = pNome.style.cssText;

    const pAltura = document.createElement('p');
    pAltura.textContent = `Altura: ${atleta.altura}`;
    pAltura.style.cssText = pNome.style.cssText;

    const pNaturalidade = document.createElement('p');
    pNaturalidade.textContent = `Naturalidade: ${atleta.naturalidade}`;
    pNaturalidade.style.cssText = pNome.style.cssText;

    const bSair = document.createElement('button');
    bSair.textContent = 'Sair';
    bSair.onclick = () => window.location.href = 'outra.html';
    bSair.style.cssText = `
        color: white;
        margin-top: 0.5rem;
        padding: 0.5rem;
        background-color: #FFD700;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
    `;

    bSair.addEventListener('mouseover', () => {
        bSair.style.backgroundColor = 'black';
    });
    bSair.addEventListener('mouseout', () => {
        bSair.style.backgroundColor = '#FFD700';
    });


    divImagem.appendChild(imagem);
    divImagem.appendChild(pNome);

    divStats.appendChild(pJogos);
    divStats.appendChild(pNascimento);
    divStats.appendChild(pAltura);
    divStats.appendChild(pNaturalidade);

    divDetalhes.appendChild(pDesc);
    divDetalhes.appendChild(divStats);

    card.appendChild(divImagem);
    card.appendChild(divDetalhes);
    card.appendChild(bSair);

    return card;
}
