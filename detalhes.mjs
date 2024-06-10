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
        if (!atleta || atleta === `Não há atleta com o id ${id}.`) {
            exibirAtletaNaoEncontrado();
            return;
        }
    }

    if (atleta) {
        document.body.appendChild(montaCard(atleta));
    } else {
        exibirAtletaNaoEncontrado();
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
        flex-direction: row;
        align-items: center;
        background-color: black;
        padding: 0.5rem;
        margin: 0.5rem;
        text-align: left;
        box-sizing: border-box;
        gap: 1rem;
        position: relative;
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
        padding: 0.25rem 0.5rem;
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

function exibirAtletaNaoEncontrado() {
    document.body.innerHTML = '';

    const div = document.createElement('div');
    div.textContent = 'Atleta não encontrado';
    div.style.color = '#FFD700';
    div.style.textAlign = 'center';
    div.style.marginTop = '1rem';
    document.body.appendChild(div);

    const bVoltar = document.createElement('button');
    bVoltar.textContent = 'Voltar';
    bVoltar.onclick = () => window.location.href = 'outra.html';
    bVoltar.style.cssText = `
        display: block;
        margin: 1rem auto;
        padding: 0.5rem 1rem;
        background-color: #FFD700;
        color: black;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
    `;

    bVoltar.addEventListener('mouseover', () => {
        bVoltar.style.backgroundColor = 'black';
        bVoltar.style.color = '#FFD700';
    });
    bVoltar.addEventListener('mouseout', () => {
        bVoltar.style.backgroundColor = '#FFD700';
        bVoltar.style.color = 'black';
    });

    document.body.appendChild(bVoltar);
}
