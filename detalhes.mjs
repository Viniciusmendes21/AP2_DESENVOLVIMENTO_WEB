document.addEventListener('DOMContentLoaded', () => {
    const estado = localStorage.getItem('estado');
    
    if (estado !== 'logado') {
        alert('Você não está logado!');
        window.location.href = 'index.html';
    }
});