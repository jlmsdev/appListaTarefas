// pegando elementos

let elementoLista = document.querySelector('#app ul');
let elementoInput = document.querySelector('#app input');
let elementoBotao = document.querySelector('#app button');

let tarefas = JSON.parse(localStorage.getItem('@listaTarefas')) || [];

function renderizarTarefa() {
     elementoLista.innerHTML = ''
     let iconeTrash = 'fa-solid fa-trash';

    tarefas.map((item) => {
        let elementoLi = document.createElement('li');
        elementoLi.className = 'tarefa';

        let elementoTextoTarefa = document.createTextNode(item);

        let elementoLink = document.createElement('a');
        elementoLink.className = 'btnExcluir';
        
        elementoLink.setAttribute('href', '#');

        let textoElementoLink = document.createElement('i');
        textoElementoLink.className = 'fa-solid fa-trash icone'
        
        elementoLink.appendChild(textoElementoLink);

        posicaoItem = tarefas.indexOf(item);

        elementoLink.setAttribute('onclick', `deletarTarefa(${posicaoItem})`);


        elementoLi.appendChild(elementoTextoTarefa);
        elementoLi.appendChild(elementoLink);
        elementoLista.appendChild(elementoLi);
    })
    

}

renderizarTarefa();

function adicionarTarefas() {

    if(elementoInput.value.length === 0) {

        Toastify({
            text: "⚠️ Tarefa não pode ser em branco!",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true, 
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} 
          }).showToast();

        return false;

    }else {
        
        let novaTarefa = elementoInput.value;

        tarefas.push(novaTarefa);
        elementoInput.value = '';

        renderizarTarefa();
        salvarDados();

        Toastify({
            text: "✅ Tarefa Adicionada",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right", 
            stopOnFocus: true, 
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} 
          }).showToast();

    }

}

elementoBotao.onclick = adicionarTarefas;


function deletarTarefa(posicaoItem) {
    tarefas.splice(posicaoItem, 1);

    renderizarTarefa();
    salvarDados();

    Toastify({
        text: "❌ Tarefa Excluida",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} 
      }).showToast();
}


// Salvando lista no LocalStorage do navegador
function salvarDados() {
    localStorage.setItem('@listaTarefas', JSON.stringify(tarefas));
}