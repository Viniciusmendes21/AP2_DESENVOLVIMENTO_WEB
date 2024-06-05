document.addEventListener('DOMContentLoaded', () => {
    const estado = localStorage.getItem('estado');
    
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

divPesquisa.appendChild(inputPesquisa);
document.body.appendChild(divPesquisa);

const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexWrap = 'wrap';
container.style.justifyContent = 'center';
container.style.gap = '1rem';

document.body.appendChild(container);

const handleClick = (evento) => {
    const id = evento.target.closest('article').dataset.id;
    const params = new URLSearchParams();

    if (id) {
        document.cookie = `id=${id}`;
        params.append('id', id);
        localStorage.setItem('id', id);
        localStorage.setItem('atleta', JSON.stringify({ id }));
    }

    const queryString = params.toString();
    const novaURL = `detalhes.html?${queryString}`;

    window.location.href = novaURL;
}

const achaCookie = (chave) => {
    const arrayCookies = document.cookie.split("; ");
    const procurado = arrayCookies.find(
        (e) => e.startsWith(`${chave}=`)
    )
    return procurado?.split("=")[1];
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
    card.onclick = handleClick;

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
    pNome.style.textTransform = 'uppercase';
    pNome.style.fontWeight = 'bold';
    pNome.style.margin = '0.5rem 0';
    pNome.style.color = 'white';

    const divSpan = document.createElement('div');
    divSpan.style.gridArea = 'span';
    divSpan.style.display = 'flex';
    divSpan.style.alignItems = 'center';
    divSpan.style.justifyContent = 'center';
    divSpan.style.height = '3rem'; // Define a altura do contêiner do botão

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

        container.innerHTML = ''; // Limpa o container antes de adicionar novos cards

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
    localStorage.clear();
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
        // Atualiza a variável global 'dados' e monta os cards
        window.dados = dados;
        container.innerHTML = ''; // Limpa o container antes de adicionar novos cards
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
