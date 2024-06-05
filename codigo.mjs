import { hex_sha256 } from "./sha256-min.mjs";

const alvo = "e521bd98978b370a013a7adff31b449bd5db13ec2962a54cb8feeaa254ab8618";


document.getElementById('btn-logar').onclick = () => {
    const entrada = document.getElementById('senha').value;
    
    if (hex_sha256(entrada) == alvo) {
        console.log('logado')
        localStorage.setItem("estado", "logado");
        window.location.href = "outra.html";

    } else {
        console.log('não logado')
        localStorage.setItem("estado", "deslogado");
        alert("Senha inválida");
    }
}

