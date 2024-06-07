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
    card.className = 'card';
    card.style.cssText = `
        display: flex;
        flex-direction: row; /* Layout padrão em linha */
        align-items: center; /* Centraliza os elementos verticalmente */
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
        @media (max-width: 767px) {
            .card {
                flex-direction: column !important;
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

    const pDesc = document.createElement('p');
    pDesc.textContent = atleta.detalhes;
    pDesc.style.cssText = `
        color: #FFD700;
        text-align: left;
        margin: 0.5rem 0;
    `;

    const pJogos = document.createElement('p');
    pJogos.textContent = `Jogos: ${atleta.n_jogos}`;
    pJogos.style.cssText = pDesc.style.cssText;

    const pNascimento = document.createElement('p');
    pNascimento.textContent = `Nascimento: ${atleta.nascimento}`;
    pNascimento.style.cssText = pDesc.style.cssText;

    const pAltura = document.createElement('p');
    pAltura.textContent = `Altura: ${atleta.altura}`;
    pAltura.style.cssText = pDesc.style.cssText;

    const pNaturalidade = document.createElement('p');
    pNaturalidade.textContent = `Naturalidade: ${atleta.naturalidade}`;
    pNaturalidade.style.cssText = pDesc.style.cssText;

    const bSair = document.createElement('button');
    bSair.textContent = 'Voltar';
    bSair.onclick = () => window.location.href = 'outra.html';
    bSair.style.cssText = `
        color: white;
        padding: 0.25rem 0.5rem; /* Ajusta o padding para um tamanho fixo menor */
        background-color: black;
        color: #FFD700;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
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

    divDetalhes.appendChild(pDesc);
    divDetalhes.appendChild(pJogos);
    divDetalhes.appendChild(pNascimento);
    divDetalhes.appendChild(pAltura);
    divDetalhes.appendChild(pNaturalidade);

    card.appendChild(divImagem);
    card.appendChild(divDetalhes);
    card.appendChild(bSair);

    return card;
}
