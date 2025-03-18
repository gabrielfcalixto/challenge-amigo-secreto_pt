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
        const span = document.createElement('span');
        span.textContent = amigo;
        li.appendChild(span);

        const btnEditar = document.createElement('button');
        btnEditar.textContent = '✏️';
        btnEditar.onclick = () => editarAmigo(index);

        const btnRemover = document.createElement('button');
        btnRemover.textContent = '❌';
        btnRemover.onclick = () => removerAmigo(index);

        li.appendChild(btnEditar);
        li.appendChild(btnRemover);
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

function editarAmigo(index) {
    const novoNome = prompt('Editar nome:', amigos[index]);
    if (novoNome && novoNome.trim() !== '' && !amigos.includes(novoNome.trim())) {
        amigos[index] = novoNome.trim();
        atualizarLista();
        showToast('Amigo editado com sucesso!');
    } else {
        showToast('Nome inválido ou já existe!');
    }
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
    showToast('Amigo removido!');
}

function sortearAmigo() {
    if (amigos.length < 3) {
        showToast('Adicione pelo menos 3 amigos para o sorteio!');
        return;
    }

    // Mostrar o modal de carregamento
    mostrarModal('loadingModal');

    // Limpar o resultado anterior
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    // Adicionar uma mensagem animada de "Sorteando..."
    for (let i = 0; i < amigos.length; i++) {
        const li = document.createElement('li');
        li.textContent = 'Sorteando...';
        li.classList.add('shake');
        resultado.appendChild(li);
    }

    // Fazer o sorteio com atraso para mostrar o modal de carregamento
    setTimeout(() => {
        const sorteio = [...amigos];
        for (let i = sorteio.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [sorteio[i], sorteio[j]] = [sorteio[j], sorteio[i]];
        }

        // Limpar a tela de sorteio
        resultado.innerHTML = '';

        // Exibir os amigos sorteados
        for (let i = 0; i < sorteio.length; i++) {
            const amigo = sorteio[i];
            const amigoSecreto = sorteio[(i + 1) % sorteio.length];
            const li = document.createElement('li');
            li.textContent = `${amigo} → ${amigoSecreto}`;
            resultado.appendChild(li);
        }

        // Fechar o modal de carregamento
        fecharModal('loadingModal');

        // Mostrar a mensagem de sucesso
        showToast('Sorteio realizado com sucesso!');
    }, 2500); // O sorteio leva 2.5 segundos para ser realizado
}


let indexToEdit = null; // Para armazenar o índice do amigo que será editado
let indexToDelete = null; // Para armazenar o índice do amigo que será excluído

function mostrarModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function fecharModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function editarAmigo(index) {
    indexToEdit = index;
    document.getElementById('editName').value = amigos[index];
    mostrarModal('editModal');
}

function salvarEdicao() {
    const novoNome = document.getElementById('editName').value.trim();
    if (novoNome && novoNome !== amigos[indexToEdit] && !amigos.includes(novoNome)) {
        amigos[indexToEdit] = novoNome;
        atualizarLista();
        showToast('Amigo editado com sucesso!');
        fecharModal('editModal');
    } else {
        showToast('Nome inválido ou já existe!');
    }
}

function removerAmigo(index) {
    indexToDelete = index;
    mostrarModal('confirmModal');
}

function confirmarExclusao() {
    amigos.splice(indexToDelete, 1);
    atualizarLista();
    showToast('Amigo removido!');
    fecharModal('confirmModal');
}


amigos.forEach((amigo, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = amigo;
    li.appendChild(span);

    const btnEditar = document.createElement('button');
    btnEditar.textContent = '✏️';
    btnEditar.onclick = () => editarAmigo(index); // Abre o modal de edição

    const btnRemover = document.createElement('button');
    btnRemover.textContent = '❌';
    btnRemover.onclick = () => removerAmigo(index); // Abre o modal de confirmação de exclusão

    li.appendChild(btnEditar);
    li.appendChild(btnRemover);
    listaAmigos.appendChild(li);
});

document.addEventListener('DOMContentLoaded', atualizarLista);
