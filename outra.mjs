let dados;

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
container.style.gap = '.5rem';


document.body.appendChild(container);

const handleClick = (evento) => {
    const dados = evento.target.closest('article').dataset;
    const params = new URLSearchParams();

    for(const propriedade in dados) {
        document.cookie = `${propriedade}=${dados[propriedade]}`;

        params.append(propriedade, dados[propriedade]);
        localStorage.setItem(propriedade, dados[propriedade]);

        localStorage.setItem('atleta', JSON.stringify(dados))
    }

    const queryString = params.toString();
    const novaURL = `detalhes.html?${queryString}`;

    window.location.href = novaURL;
}

const achaCookie = ( chave ) => {
    const arrayCookies = document.cookie.split("; ");
    const procurado = arrayCookies.find(
        ( e ) => e.startsWith(`${chave}=`)
    )
    return procurado?.split("=")[1];
}

const montaCard =  (entrada) => {
    const card = document.createElement('article');
    card.style.cssText = `
    width: 30rem;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
    "a1 a2"
    "a1 a3"
    "a4 a4"
    "a5 a5";
    border: solid black;
    padding: .3rem;
    margin: .5rem;
    `

    card.onclick = handleClick

    const divImagem = document.createElement('div');
    divImagem.className = 'imagem';
    divImagem.style.gridArea = 'a1';
    divImagem.style.display = 'flex';
    divImagem.style.alignItems = 'center';
    divImagem.style.justifyContent = 'center';

    const imagem = document.createElement('img');
    imagem.src = entrada.imagem;
    imagem.alt = `Foto de ${entrada.nome}`;
    imagem.style.width = '7rem';
    imagem.style.height = '7rem';
    imagem.style.borderRadius = '50%';
    imagem.style.objectFit = 'cover'
    imagem.style.objectPosition = '20% 20%'
    imagem.style.margin = '20px';

    const pNome = document.createElement('p');
    pNome.className = 'nome';
    pNome.innerHTML = `Nome: ${entrada.nome}`;
    pNome.style.gridArea = 'a3';
    pNome.style.display = 'flex';
    pNome.style.justifyContent = 'center';
    pNome.style.alignItems = 'center';
    pNome.style.textTransform = 'uppercase';
    pNome.style.fontWeight = 'bold';
    

    card.appendChild(divImagem);
    divImagem.appendChild(imagem);
    card.appendChild(pNome);


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

