document.addEventListener('DOMContentLoaded', () => {
    const estado = sessionStorage.getItem('estado');
    
    if (estado !== 'logado') {
        alert('Você não está logado!');
        window.location.href = 'index.html';
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const atleta = JSON.parse(sessionStorage.getItem('atleta'));

    if (atleta && atleta.id === id) {
        document.body.appendChild(montaCard(atleta));
    } else {
        alert('Atleta não encontrado!');
    }
});


const montaCard = (entrada) => {
    const card = document.createElement('article');
    card.style.cssText = `
    width: 15rem;
    display: grid;
    grid-template-areas:
    "image desc desc"
    "image desc desc"
    "name jogos a"
    "name nascimento a"
    "name altura a"
    "name naturalidade a";
    border: 1px solid black;
    background-color: #FFD700;
    padding: .5rem;
    margin: .5rem;
    text-align: center;
    box-sizing: border-box;
    `;

    const divImagem = document.createElement('div');
    divImagem.style.gridArea = 'image';
    divImagem.style.display = 'flex';
    divImagem.style.alignItems = 'center';
    divImagem.style.justifyContent = 'center';

    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;
    imagem.alt = `Foto de ${entrada.nome}`;
    imagem.style.width = '100%';
    imagem.style.height = 'auto';
    imagem.style.objectFit = 'cover';
    imagem.style.borderRadius = '0.5rem';

    const pNome = document.createElement('p');
    pNome.className = 'nome';
    pNome.innerHTML = `${entrada.nome}`;
    pNome.style.gridArea = 'name';
    pNome.style.textAlign = 'center';
    pNome.style.fontWeight = 'bold';
    pNome.style.margin = '0.5rem 0';
    pNome.style.color = 'black';

    const pDesc = document.createElement('p');
    pDesc.className = 'desc';
    pDesc.innerHTML = `${entrada.detalhes}`;
    pDesc.style.gridArea = 'desc';
    //pDesc.style.textAlign = 'center';
    pDesc.style.fontWeight = 'bold';
    pDesc.style.margin = '0.5rem 0';
    pDesc.style.color = 'black';

    const pJogos = document.createElement('p');
    pJogos.className = 'jogos';
    pJogos.innerHTML = `Jogos: ${entrada.nJogos}`;
    pJogos.style.gridArea = 'jogos';
    //pJogos.style.textAlign = 'center';
    pJogos.style.fontWeight = 'bold';
    pJogos.style.margin = '0.5rem 0';
    pJogos.style.color = 'black';

    const pNascimento = document.createElement('p');
    pNascimento.className = 'nascimento';
    pNascimento.innerHTML = `Nascimento: ${entrada.nascimento}`;
    pNascimento.style.gridArea = 'nascimento';
    //pNascimento.style.textAlign = 'center';
    pNascimento.style.fontWeight = 'bold';
    pNascimento.style.margin = '0.5rem 0';
    pNascimento.style.color = 'black';

    const pAltura = document.createElement('p');
    pAltura.className = 'altura';
    pAltura.innerHTML = `Altura: ${entrada.altura}`;
    pAltura.style.gridArea = 'altura';
    //pAltura.style.textAlign = 'center';
    pAltura.style.fontWeight = 'bold';
    pAltura.style.margin = '0.5rem 0';
    pAltura.style.color = 'black';

    const pNaturalidade = document.createElement('p');
    pNaturalidade.className = 'naturalidade';
    pNaturalidade.innerHTML = `Naturalidade: ${entrada.naturalidade}`;
    pNaturalidade.style.gridArea = 'naturalidade';
    //pNaturalidade.style.textAlign = 'center';
    pNaturalidade.style.fontWeight = 'bold';
    pNaturalidade.style.margin = '0.5rem 0';
    pNaturalidade.style.color = 'black';

    divImagem.appendChild(imagem);
    card.appendChild(divImagem);
    card.appendChild(pNome);
    card.appendChild(pDesc);
    card.appendChild(pJogos);
    card.appendChild(pNascimento);
    card.appendChild(pAltura);
    card.appendChild(pNaturalidade);

    return card;
}
