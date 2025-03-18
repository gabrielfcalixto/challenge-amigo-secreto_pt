//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

let amigos = JSON.parse(localStorage.getItem('amigos')) || [];

function atualizarLista() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        listaAmigos.appendChild(li);
    });
    localStorage.setItem('amigos', JSON.stringify(amigos));
}

function adicionarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nome = inputAmigo.value.trim();
    if (nome === '' || amigos.includes(nome)) {
        showToast('Nome inválido ou já adicionado!');
        return;
    }
    amigos.push(nome);
    inputAmigo.value = '';
    atualizarLista();
    showToast('Amigo adicionado!');
}

function sortearAmigo() {
    if (amigos.length < 3) {
        showToast('Adicione pelo menos 3 amigos para o sorteio!');
        return;
    }

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    for (let i = 0; i < amigos.length; i++) {
        const li = document.createElement('li');
        li.textContent = 'Sorteando...';
        li.classList.add('shake');
        resultado.appendChild(li);
    }

    setTimeout(() => {
        const sorteio = [...amigos];
        for (let i = sorteio.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [sorteio[i], sorteio[j]] = [sorteio[j], sorteio[i]];
        }
        resultado.innerHTML = '';
        for (let i = 0; i < sorteio.length; i++) {
            const amigo = sorteio[i];
            const amigoSecreto = sorteio[(i + 1) % sorteio.length];
            const li = document.createElement('li');
            li.textContent = `${amigo} → ${amigoSecreto}`;
            resultado.appendChild(li);
        }
        showToast('Sorteio realizado com sucesso!');
    }, 1500);
}

document.addEventListener('DOMContentLoaded', atualizarLista);