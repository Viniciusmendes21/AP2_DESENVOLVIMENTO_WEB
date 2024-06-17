document.addEventListener('DOMContentLoaded', () => {
    const estado = sessionStorage.getItem('estado');

    if (estado !== 'logado') {
        alert('Você não está logado!');
        window.location.href = 'index.html';
    }
});

const divPesquisa = document.createElement('div');
divPesquisa.classList.add('divPesquisa');

const inputPesquisa = document.createElement('input');
inputPesquisa.type = 'search';
inputPesquisa.placeholder = 'BUSQUE POR NOME';
inputPesquisa.classList.add('inputPesquisa');

divPesquisa.appendChild(inputPesquisa);
document.body.appendChild(divPesquisa);

const container = document.createElement('div');
container.className ='container';

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
    card.classList.add('card');

    card.dataset.id = entrada.id;
    card.dataset.urlDetalhes = entrada.url_detalhes;
    card.dataset.elenco = entrada.elenco;
    card.dataset.imagem = entrada.imagem;
    card.dataset.n_jogos = entrada.n_jogos;
    card.dataset.nome = entrada.nome;
    card.dataset.posicao = entrada.posicao;
    card.dataset.naturalidade = entrada.naturalidade;
    card.dataset.nascimento = entrada.nascimento;
    card.dataset.altura = entrada.altura;
    card.dataset.desde = entrada.no_botafogo_desde;
    card.dataset.detalhes = entrada.detalhes;

    card.onclick = handleClick;

    const divImagem = document.createElement('div');
    divImagem.classList.add('divImagem');

    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;
    imagem.alt = `Foto de ${entrada.imagem}`;
    imagem.classList.add('imagem');

    const pNome = document.createElement('p');
    pNome.className = 'nome';
    pNome.innerHTML = `${entrada.nome}`;
    pNome.classList.add('nome');


    const divSpan = document.createElement('div');
    divSpan.classList.add('divSpan');


    const spanSaibaMais = document.createElement('span');
    spanSaibaMais.innerHTML = 'Saiba mais';
    spanSaibaMais.classList.add('spanSaibaMais');
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

        if (filtrado.length > 0) {
            container.classList.add('flex');
        } else {
            container.classList.remove('flex');
        }

        filtrado.forEach((atleta) => {
            container.appendChild(montaCard(atleta));
        });
    } else {
        container.classList.remove('flex');
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


