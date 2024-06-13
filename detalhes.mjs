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
    card.classList.add('card');

    const divImagem = document.createElement('div');
    divImagem.classList.add('divImagem');

    const imagem = document.createElement('img');
    imagem.src = atleta.imagem;
    imagem.alt = `Foto de ${atleta.nome}`;
    imagem.classList.add('imagem');

    const pNome = document.createElement('p');
    pNome.textContent = atleta.nome;
    pNome.classList.add('nome');

    const divDetalhes = document.createElement('div');
    divDetalhes.className = 'detalhes';

    const pDesc = document.createElement('p');
    pDesc.textContent = atleta.detalhes;
    pDesc.classList.add('desc');

    const pJogos = document.createElement('p');
    pJogos.textContent = `Jogos: ${atleta.n_jogos}`;
    pJogos.classList.add('jogos');

    const pNascimento = document.createElement('p');
    pNascimento.textContent = `Nascimento: ${atleta.nascimento}`;
    pNascimento.classList.add('nascimento');

    const pAltura = document.createElement('p');
    pAltura.textContent = `Altura: ${atleta.altura}`;
    pAltura.classList.add('altura');

    const pNaturalidade = document.createElement('p');
    pNaturalidade.textContent = `Naturalidade: ${atleta.naturalidade}`;
    pNaturalidade.classList.add('naturalidade');

    const bSair = document.createElement('button');
    bSair.textContent = 'Voltar';
    bSair.onclick = () => window.location.href = 'outra.html';
    bSair.classList.add('bSair');

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
    div.classList.add('naoEncontrado');
    document.body.appendChild(div);

    const bVoltar = document.createElement('button');
    bVoltar.textContent = 'Voltar';
    bVoltar.onclick = () => window.location.href = 'outra.html';
    bVoltar.classList.add('bVoltar');

    document.body.appendChild(bVoltar);
}
