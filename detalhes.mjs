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
        display: flex;
        flex-direction: row; /* Layout padrão em linha */
        background-color: black;
        padding: 0.5rem;
        margin: 0.5rem;
        text-align: left; /* Ajusta para alinhamento à esquerda */
        box-sizing: border-box;
        gap: 1rem; /* Adiciona espaço entre imagem e detalhes */
        position: relative; /* Adiciona posição relativa para o posicionamento absoluto do botão */
    `;

    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            article {
                flex-direction: column; /* Layout em coluna para telas menores */
                align-items: center;
            }
            .detalhes {
                width: 100%; /* Largura total em telas menores */
                align-items: center;
            }
        }
    `;
    document.head.appendChild(style);

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
        color: #FFD700;
        text-align: center;
        margin: 0.5rem 0;
    `;

    const divDetalhes = document.createElement('div');
    divDetalhes.className = 'detalhes';
    divDetalhes.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* Alinha à esquerda */
        gap: 0.5rem;
        width: 50%; /* Ajusta a largura */
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
    bSair.textContent = 'Voltar';
    bSair.onclick = () => window.location.href = 'outra.html';
    bSair.style.cssText = `
        position: absolute;
        bottom: 5px; /* Distância do fundo */
        right: 5px; /* Distância da direita */
        color: white;
        padding: 0.25rem 0.5rem; /* Ajusta o padding para um tamanho fixo menor */
        background-color: black;
        color: #FFD700;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        width: 80px; /* Define uma largura fixa */
        height: 30px; /* Define uma altura fixa */
        text-align: center;
    `;

    bSair.addEventListener('mouseover', () => {
        bSair.style.backgroundColor = '#FFD700';
        bSair.style.color = 'black';
    });
    bSair.addEventListener('mouseout', () => {
        bSair.style.backgroundColor = 'black';
        bSair.style.color = '#FFD700';
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
