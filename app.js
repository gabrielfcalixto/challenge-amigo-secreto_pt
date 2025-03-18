//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
let amigos = JSON.parse(localStorage.getItem('amigos')) || [];

function atualizarLista() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        const btnRemover = document.createElement('button');
        btnRemover.textContent = '❌';
        btnRemover.onclick = () => removerAmigo(index);
        li.appendChild(btnRemover);
        listaAmigos.appendChild(li);
    });
    localStorage.setItem('amigos', JSON.stringify(amigos));
}

function adicionarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nome = inputAmigo.value.trim();
    if (nome === '' || amigos.includes(nome)) {
        alert('Nome inválido ou já adicionado!');
        return;
    }
    amigos.push(nome);
    inputAmigo.value = '';
    atualizarLista();
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
}

function sortearAmigo() {
    if (amigos.length < 3) {
        alert('Adicione pelo menos 3 amigos para o sorteio!');
        return;
    }

    const sorteio = [...amigos];
    for (let i = sorteio.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sorteio[i], sorteio[j]] = [sorteio[j], sorteio[i]];
    }

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    for (let i = 0; i < sorteio.length; i++) {
        const amigo = sorteio[i];
        const amigoSecreto = sorteio[(i + 1) % sorteio.length];
        const li = document.createElement('li');
        li.textContent = `${amigo} → ${amigoSecreto}`;
        resultado.appendChild(li);
    }
}

function resetarAmigos() {
    amigos = [];
    localStorage.removeItem('amigos');
    atualizarLista();
    document.getElementById('resultado').innerHTML = '';
}

document.addEventListener('DOMContentLoaded', atualizarLista);
