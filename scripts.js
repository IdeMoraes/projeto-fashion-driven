const nome = prompt("Qual é o seu nome?");

let pedido = {
  model: "",
  neck: "",
  material: "",
  image: "",
  owner: "",
  author: ""
};

pedido.owner = nome;
pedido.author = nome;

function escolherModelo(escolhido) {
  let anteriormenteSelecionado = document.querySelector(".modelo.selecionado");
  if (anteriormenteSelecionado === null) {
    escolhido.classList.add("selecionado");
  } else {
    anteriormenteSelecionado.classList.remove("selecionado");
    escolhido.classList.add("selecionado");
  }
  let arrayClasses = escolhido.getAttribute("class").split(" ");
  pedido.model = arrayClasses[1];
  ativaConfirmarPedido();
}

function escolherGola(escolhido) {
  let anteriormenteSelecionado = document.querySelector(".gola.selecionado");
  if (anteriormenteSelecionado === null) {
    escolhido.classList.add("selecionado");
  } else {
    anteriormenteSelecionado.classList.remove("selecionado");
    escolhido.classList.add("selecionado");
  }
  let arrayClasses = escolhido.getAttribute("class").split(" ");
  pedido.neck = arrayClasses[1];
  ativaConfirmarPedido();
}

function escolherTecido(escolhido) {
  let anteriormenteSelecionado = document.querySelector(".tecido.selecionado");
  if (anteriormenteSelecionado === null) {
    escolhido.classList.add("selecionado");
  } else {
    anteriormenteSelecionado.classList.remove("selecionado");
    escolhido.classList.add("selecionado");
  }
  let arrayClasses = escolhido.getAttribute("class").split(" ");
  pedido.material = arrayClasses[1];
  ativaConfirmarPedido();
}

function inserirImagem() {
  let imagem = document.querySelector("#input-imagem").value;
  pedido.image = imagem;
  ativaConfirmarPedido();
}
function ativaConfirmarPedido() {
  let botao = document.querySelector("button");
  if (
    isValidHttpUrl(pedido.image) &&
    pedido.model != "" &&
    pedido.neck != "" &&
    pedido.material != "" &&
    pedido.image != "" &&
    pedido.owner != "" &&
    pedido.author != ""
  ) {
    botao.classList.add("liberado");
  } else {
    botao.classList.remove("liberado");
  }
}
function confirmarPedido() {
  const promessa = axios.post(
    "https://mock-api.driven.com.br/api/v4/shirts-api/shirts",
    pedido
  );
  promessa.then(tratarSucesso);
  promessa.catch(tratarErro);
  function tratarSucesso(sucesso) {
    alert("Encomenda confirmada");
    carregarUltimosPedidos();
  }
  function tratarErro(erro) {
    alert("Ops, não conseguimos processar sua encomenda");
  }
}
function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
    console.log(url);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
function carregarUltimosPedidos() {
  const ultimos = document.querySelector(".pedidos");
  const promessa = axios.get(
    "https://mock-api.driven.com.br/api/v4/shirts-api/shirts"
  );
  promessa.then(tratarSucesso);
  function tratarSucesso(sucesso) {
    ultimos.innerHTML = "";
    for (let i = 0; i < sucesso.data.length; i++) {
      ultimos.innerHTML += `
      <div class="pedido" onclick="pedirUltimoPedido('${sucesso.data[i].model}','${sucesso.data[i].neck}','${sucesso.data[i].material}','${sucesso.data[i].image}','${sucesso.data[i].owner}')">
        <img src="${sucesso.data[i].image}"/>
      <p><b>Criador:</b> ${sucesso.data[i].owner}</p>
    </div>
    `;
    }
  }
}
function pedirUltimoPedido(modelo, gola, material, imagem, proprietario) {
  pedido.model = modelo;
  pedido.neck = gola;
  pedido.material = material;
  pedido.image = imagem;
  pedido.owner = proprietario;
  pedido.author = nome;
  if (window.confirm("Você realmente quer fazer esse pedido?")) {
    confirmarPedido();
  }
}
carregarUltimosPedidos();
