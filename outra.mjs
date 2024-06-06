
document.addEventListener('DOMContentLoaded', () => {
    const estado = sessionStorage.getItem('estado');
    
    if (estado !== 'logado') {
        alert('Você não está logado!');
        window.location.href = 'index.html';
    }
});

const divPesquisa = document.createElement('div');
divPesquisa.style.textAlign = 'center';

const inputPesquisa = document.createElement('input');
inputPesquisa.type = 'text';
inputPesquisa.placeholder = 'BUSQUE POR NOME';
inputPesquisa.style.textAlign = 'center';
inputPesquisa.style.lineHeight = '3em';
inputPesquisa.style.maxWidth = '80%';
inputPesquisa.style.width = '30em';

divPesquisa.appendChild(inputPesquisa);
document.body.appendChild(divPesquisa);

const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexWrap = 'wrap';
container.style.justifyContent = 'center';
container.style.gap = '1rem';

document.body.appendChild(container);

const handleClick = (evento) => {
    const dados = evento.target.closest('article').dataset;
    const id = dados.id;
    const params = new URLSearchParams();

    for (const propriedade in dados) {
        document.cookie = `${propriedade}=${dados[propriedade]}`;
        params.append(propriedade, dados[propriedade]);
        sessionStorage.setItem(propriedade, dados[propriedade]);
    }

    sessionStorage.setItem('atleta', JSON.stringify(dados));

    const queryString = params.toString();
    const novaURL = `detalhes.html?id=${id}`;

    window.location.href = novaURL;
}

const montaCard = (entrada) => {
    const card = document.createElement('article');
    card.style.cssText = `
    width: 15rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
    "image"
    "span"
    "name";
    border: 1px solid black;
    background-color: #FFD700;
    padding: .5rem;
    margin: .5rem;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer; /* Mãozinha ao passar o mouse */
    `;
    card.dataset.id = entrada.id;
    card.dataset.urlDetalhes = entrada.url_detalhes;
    card.dataset.elenco = entrada.elenco;
    card.dataset.imagem = entrada.imagem;
    card.dataset.nJogos = entrada.n_jogos;
    card.dataset.nome = entrada.nome;
    card.dataset.posicao = entrada.posicao;
    card.dataset.naturalidade = entrada.naturalidade;
    card.dataset.nascimento = entrada.nascimento;
    card.dataset.altura = entrada.altura;
    card.dataset.desde = entrada.no_botafogo_desde;
    card.dataset.detalhes = entrada.detalhes;

    card.onclick = handleClick;

    const divImagem = document.createElement('div');
    divImagem.style.gridArea = 'image';
    divImagem.style.display = 'flex';
    divImagem.style.alignItems = 'center';
    divImagem.style.justifyContent = 'center';

    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;
    imagem.alt = `Foto de ${entrada.imagem}`;
    imagem.style.width = '100%';
    imagem.style.height = 'auto';
    imagem.style.objectFit = 'cover';
    imagem.style.borderRadius = '0.5rem';

    const pNome = document.createElement('p');
    pNome.className = 'nome';
    pNome.innerHTML = `${entrada.nome}`;
    pNome.style.gridArea = 'name';
    pNome.style.textAlign = 'center';
    pNome.style.textTransform = 'uppercase';
    pNome.style.fontWeight = 'bold';
    pNome.style.margin = '0.5rem 0';
    pNome.style.color = 'white';

    const divSpan = document.createElement('div');
    divSpan.style.gridArea = 'span';
    divSpan.style.display = 'flex';
    divSpan.style.alignItems = 'center';
    divSpan.style.justifyContent = 'center';
    divSpan.style.height = '3rem';

    const spanSaibaMais = document.createElement('span');
    spanSaibaMais.innerHTML = 'Saiba mais';
    spanSaibaMais.style.backgroundColor = 'black';
    spanSaibaMais.style.color = 'white';
    spanSaibaMais.style.padding = '0.5rem';
    spanSaibaMais.style.display = 'inline-block';
    spanSaibaMais.style.width = '100%';
    spanSaibaMais.style.fontWeight = 'bold';
    spanSaibaMais.style.textAlign = 'center';
    spanSaibaMais.style.boxSizing = 'border-box';
    spanSaibaMais.style.borderRadius = '0.5rem';
    divImagem.appendChild(imagem);
    card.appendChild(divImagem);
    card.appendChild(pNome);
    divSpan.appendChild(spanSaibaMais);
    card.appendChild(divSpan);

    return card;
}

inputPesquisa.onkeyup = (ev) => {
    const valorPesquisa = ev.target.value.toLowerCase();

    if (valorPesquisa.length > 2 || valorPesquisa.length == 0) {
        const filtrado = window.dados.filter((ele) => {
            const noNome = ele.nome.toLowerCase().includes(valorPesquisa);
            return noNome;
        });

        container.innerHTML = '';

        filtrado.forEach((atleta) => {
            container.appendChild(montaCard(atleta));
        });
    }
};

const pegaDados = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

btn_deslogar.onclick = () => {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

let banco;

btn_masculino.onclick = () => {
    banco = "https://botafogo-atletas.mange.li/2024-1/masculino"
    pegaDados(banco).then(dados => {
        window.dados = dados;
        container.innerHTML = '';
        dados.forEach(atleta => {
            container.appendChild(montaCard(atleta));
        });
    });
}
btn_feminino.onclick = () => {
    banco = "https://botafogo-atletas.mange.li/2024-1/feminino"
    pegaDados(banco).then(dados => {
        window.dados = dados;
        container.innerHTML = '';
        dados.forEach(atleta => {
            container.appendChild(montaCard(atleta));
        });
    });
}
btn_elenco_completo.onclick = () => {
    banco = "https://botafogo-atletas.mange.li/2024-1/all"
    pegaDados(banco).then(dados => {
        window.dados = dados;
        container.innerHTML = '';
        dados.forEach(atleta => {
            container.appendChild(montaCard(atleta));
        });
    });
}

const selectElenco = document.getElementById('opçoes');

selectElenco.onchange = (evento) => {
    const valorSelecionado = evento.target.value;

    switch (valorSelecionado) {
        case 'masculino':
            btn_masculino.click();
            break;
        case 'feminino':
            btn_feminino.click();
            break;
        case 'completo':
            btn_elenco_completo.click();
            break;
        default:
            console.log('Opção inválida');
    }
};
