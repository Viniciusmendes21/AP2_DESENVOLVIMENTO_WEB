document.addEventListener('DOMContentLoaded', () => {
    const estado = sessionStorage.getItem('estado');
    
    if (estado !== 'logado') {
        alert('Você não está logado!');
        window.location.href = 'index.html';
    }
});



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
    pNome.style.textTransform = 'uppercase';
    pNome.style.fontWeight = 'bold';
    pNome.style.margin = '0.5rem 0';
    pNome.style.color = 'white';

    divImagem.appendChild(imagem);
    card.appendChild(divImagem);
    card.appendChild(pNome);



    return card;
}

let obj = {}

const params = new URLSearchParams(window.location.search);

for (const [key, valor] of params.entries()) {
    obj[key] = valor;
    console.log(obj[key]);
}

// Adicionando o código para pegar o id do queryparam
let id = params.get('id'); // Substitua 'id' pelo nome real do seu parâmetro
console.log(id); // Agora você pode usar o 'id' para buscar os dados armazenados

document.body.appendChild(montaCard(obj));
