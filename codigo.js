import { hex_sha256 } from "./sha256-min.mjs";

const alvo = "e521bd98978b370a013a7adff31b449bd5db13ec2962a54cb8feeaa254ab8618";


document.getElementById('btn-logar').onclick = () => {
    const entrada = document.getElementById('senha').value;
    
    if (hex_sha256(entrada) == alvo) {
        console.log('logado')
        sessionStorage.setItem("estado", "logado");
        document.getElementById('tela-login').style.display = 'none'; // Esconde tela-login
        document.getElementById('pos-login').style.display = 'block'; // Mostra pos-login
    } else {
        console.log('não logado')
        sessionStorage.setItem("estado", "deslogado");
    }
}

