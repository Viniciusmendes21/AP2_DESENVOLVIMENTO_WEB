document.addEventListener('DOMContentLoaded', async () => {
    const estado = sessionStorage.getItem('estado');
    
    if (estado !== 'logado') {
        alert('Você não está logado!');
        window.location.href = 'index.html';
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // Tenta recuperar o atleta da sessionStorage
    let atleta = JSON.parse(sessionStorage.getItem('atleta'));

    // Se o atleta não estiver na sessionStorage ou se o id não corresponder,
    // busca os dados do atleta usando o id da URL.
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
    try {
        const url = `https://botafogo-atletas.mange.li/2024-1/${id}`;
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error('Atleta não encontrado');
        }
        const dadosAtleta = await resposta.json();
        return dadosAtleta;
    } catch (erro) {
        console.error(erro);
        return null;
    }
}

// Função montaCard() permanece a mesma



const montaCard = (entrada) => {
    const card = document.createElement('article');
    card.style.cssText = `
    width: 15rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-direction: row;
    background-color: #FFD700;
    padding: .5rem;
    margin: .5rem;
    text-align: center;
    box-sizing: border-box;
    `;

    const divImagem = document.createElement('div');
    divImagem.style.display = 'block';
    divImagem.style.alignItems = 'center';
    divImagem.style.justifyContent = 'center';
    divImagem.style.width = 'fit-content';
    divImagem.style.margin = 'auto';

    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;
    imagem.alt = `Foto de ${entrada.nome}`;
    imagem.style.overflowClipMargin = 'content-box';
    imagem.style.overflow = 'clip';
    imagem.style.height = 'auto';
    imagem.style.objectFit = 'cover';
    imagem.style.borderRadius = '0.5rem';

    const pNome = document.createElement('p');
    pNome.className = 'nome';
    pNome.innerHTML = `${entrada.nome}`;
    pNome.style.textAlign = 'center';
    pNome.style.fontWeight = 'bold';
    pNome.style.margin = '0.5rem 0';
    pNome.style.color = 'white';

    const divDetalhes = document.createElement('div');
    divDetalhes.style.display = 'block';

    const pDesc = document.createElement('p');
    pDesc.style.display = 'block';
    pDesc.style.marginBlockStart = '1em';
    pDesc.style.marginBlockEnd = '1em';
    pDesc.style.marginInlineStart = '0px';
    pDesc.style.marginInlineEnd = '0px';
    pDesc.className = 'desc';
    pDesc.innerHTML = `${entrada.detalhes}`;
    pDesc.style.textAlign = 'center';
    pDesc.style.fontWeight = 'bold';
    pDesc.style.margin = '0.5rem 0';
    pDesc.style.color = 'white';

    const divStats = document.createElement('div');
    divStats.style.display = 'block';
    divStats.style.marginBlockStart = '1em';
    divStats.style.marginBlockEnd = '1em';
    divStats.style.marginInlineStart = '0px';
    divStats.style.marginInlineEnd = '0px';

    const pJogos = document.createElement('p');
    pJogos.className = 'jogos';
    pJogos.innerHTML = `Jogos: ${entrada.n_jogos}`;
    pJogos.style.textAlign = 'center';
    pJogos.style.fontWeight = 'bold';
    pJogos.style.margin = '0.5rem 0';
    pJogos.style.color = 'white';

    const pNascimento = document.createElement('p');
    pNascimento.className = 'nascimento';
    pNascimento.innerHTML = `Nascimento: ${entrada.nascimento}`;
    pNascimento.style.textAlign = 'center';
    pNascimento.style.fontWeight = 'bold';
    pNascimento.style.margin = '0.5rem 0';
    pNascimento.style.color = 'white';

    const pAltura = document.createElement('p');
    pAltura.className = 'altura';
    pAltura.innerHTML = `Altura: ${entrada.altura}`;
    pAltura.style.textAlign = 'center';
    pAltura.style.fontWeight = 'bold';
    pAltura.style.margin = '0.5rem 0';
    pAltura.style.color = 'white';

    const pNaturalidade = document.createElement('p');
    pNaturalidade.className = 'naturalidade';
    pNaturalidade.innerHTML = `Naturalidade: ${entrada.naturalidade}`;
    pNaturalidade.style.textAlign = 'center';
    pNaturalidade.style.fontWeight = 'bold';
    pNaturalidade.style.margin = '0.5rem 0';
    pNaturalidade.style.color = 'white';

    bSair = document.createElement('button');
    bSair.innerHTML = 'Sair';
    bSair.onclick = () => {
        window.location.href = 'outra.html';
    }

    divImagem.appendChild(imagem);
    divImagem.appendChild(pNome);
    card.appendChild(divImagem);
    divDetalhes.appendChild(pDesc);
    divDetalhes.appendChild(divStats);
    divStats.appendChild(pJogos);
    divStats.appendChild(pNascimento);
    divStats.appendChild(pAltura);
    divStats.appendChild(pNaturalidade);
    card.appendChild(divDetalhes);
    card.appendChild(bSair);

    return card;
}
