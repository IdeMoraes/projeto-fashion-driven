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
  if (
    pedido.model != "" &&
    pedido.neck != "" &&
    pedido.material != "" &&
    pedido.image != "" &&
    pedido.owner != "" &&
    pedido.author != ""
  ) {
    let botao = document.querySelector("button");
    botao.classList.add("liberado");
  }
}
function confirmarPedido() {
    console.log(pedido);
    const promessa=axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", pedido);
    promessa.then(tratarSucesso);
    promessa.catch(tratarErro);
    function tratarSucesso(sucesso){
        console.log(sucesso);
        alert("Encomenda confirmada");
    }
    function tratarErro(erro){
        console.log(erro);
    }
}
