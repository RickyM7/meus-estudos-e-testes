let nome = document.querySelector("input#nome");
let anoDeNasci = document.querySelector("input#nasci");
let anoAtual = new Date().getFullYear();
let botao = document.querySelectorAll("button")[0];
let res = document.querySelector("div#res");

function maioridade(name, anoNas, idade) {
  //Valores dos inputs atribuidos aos parâmetros da função
  name = nome.value;
  anoNas = Number(anoDeNasci.value);
  idade = anoAtual - anoNas;
  
  if (name.length == 0 || anoNas.length == 0) {
    alert("Por favor digite os valores antes!");
  } else if (idade < 0 || idade > 150) {
    alert(`Por favor digite um ano válido (entre ${anoAtual - 150} e ${anoAtual}).`);
  } else {
    if (idade < 18) {
      res.innerHTML += `<p>${name} têm/completará ${idade} anos e é menor de idade!</p>`;
    } else {
      res.innerHTML += `<p>${name} têm/completará ${idade} anos e é maior de idade!</p>`;
    }
  }
  //Limpeza dos inputs
  nome.value = '';
  anoDeNasci.value = '';
}
//Evento de click adicionado ao botão
botao.addEventListener("click", maioridade);