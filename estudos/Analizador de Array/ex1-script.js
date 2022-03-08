let adicionar = window.document.querySelector("button#adicionar");
let resultado = window.document.querySelector("select#res");
let numeros = [];


function add() {
  //pega os numeros do inpui, converte para numeros e depois escreve as mensagens nos locaid corretos
  let numero = window.document.querySelector("input#num").value;
  let num = Number(numero);
  info.innerHTML = ``;
  
  if (numero.length == 0) {
    alert("Por favor digite um número!");
  } else if (num < 1 || num > 100) {
    alert("Por favor digite um número entre 1 e 100!");
  } else {
    if (numeros.indexOf(num) == -1) {
      resultado.innerHTML += `<option value="n${num}" selected="true">N° ${num} adicionado!</option>`;
      numeros.push(num);
      numeros.sort(function(a,b){return a-b}); //classifica os números em ordem numerica correta
    } else {
      alert("Este número já existe! Por favor digite um número diferente.");
    }
  }
}
adicionar.addEventListener("click", add);
let labelAdd = window.document.querySelectorAll("label")[0];
labelAdd.addEventListener("dblclick", add);


function limpar() {
  let numero = window.document.querySelector("input#num");
  numero.value = ``;
  numero.focus();
}
adicionar.addEventListener("click", limpar);
labelAdd.addEventListener("dblclick", limpar);

let fim = window.document.querySelector("button#finalizar");
let info = window.document.querySelector("div#infos"); 

function final() {
  if (numeros.length == 0) {
    alert(`Nenhum valor informado ainda, por favor digite pelo menos 1 (um) número!`);
    let numero = window.document.querySelector("input#num");
    numero.focus();
  } else {
    let total = 0;
  
    info.innerHTML = ``;
    info.innerHTML += `<p>Esse array têm <span>${numeros.length}</span> elementos e os seus valores são <span>${numeros}</span>!</p>`;
    info.innerHTML += `<p>O menor valor desse array é <span>${numeros[0]}</span>!</p>`;
    info.innerHTML += `<p>O maior valor desse array é <span>${numeros[numeros.length-1]}</span>!</p>`;
  
    for (let i = 0; i < numeros.length; i++) {
      total = total + numeros[i];
    }
  
    info.innerHTML += `<p>A soma total desses valores é igual a <span>${total}</span> e a média entre estes valores é <span>${total / numeros.length}</span>!</p>`;
  }
}
fim.addEventListener("click", final);
let labelFim = window.document.querySelectorAll("label")[1];
labelFim.addEventListener("dblclick", final);

let reset = window.document.querySelector("button#reset");

function resetar() {
  let numero = window.document.querySelector("input#num").value = ``;
  resultado.innerHTML = ``;
  info.innerHTML = ``;
  numeros = [];
}
reset.addEventListener("click", resetar);