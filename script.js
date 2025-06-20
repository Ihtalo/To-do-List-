let lista = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarLista() {
  localStorage.setItem("tarefas", JSON.stringify(lista));
}

function renderizarLista() {
  const ul = document.getElementById("lista");
  ul.innerHTML = "";
  lista.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.textContent = tarefa.texto;

    if (tarefa.feito) {
      li.classList.add("feito");
    }

    li.addEventListener("click", () => {
      lista[index].feito = !lista[index].feito;
      salvarLista();
      renderizarLista();
    });

    const btn = document.createElement("button");
    btn.textContent = "🗑";
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      lista.splice(index, 1);
      salvarLista();
      renderizarLista();
    });

    li.appendChild(btn);
    ul.appendChild(li);
  });
}

function adicionarTarefa() {
  const input = document.getElementById("novaTarefa");
  const texto = input.value.trim();
  if (texto !== "") {
    lista.push({ texto: texto, feito: false });
    salvarLista();
    renderizarLista();
    input.value = "";
  }
}

renderizarLista();


const btnTema = document.getElementById("temaBtn");
btnTema.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
