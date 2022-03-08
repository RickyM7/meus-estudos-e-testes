//Função feita com o uso da instrução while/do while
/*function comerPizza() {
  let fatias = ["1ª Fatia", "2ª Fatia", "3ª Fatia", "4ª Fatia"];
  let quantidade = 0;
  let corpo = window.document.querySelector("body");
  let paragrafo = window.document.createElement("p");
  
  do {
    paragrafo.innerHTML += `<p>${fatias[quantidade]}</p>`;
    quantidade++;
  } while(quantidade < fatias.length);
  
  if (quantidade == fatias.length) {
    paragrafo.innerHTML += `<p style="background-color:blue; color:white">A pizza acabou :(</p>`;
  }
  
  corpo.appendChild(paragrafo);
  corpo.style.textAlign = "center";
}*/

//FUnçào feita com o uso da instrução for
function comerPizza() {
  let fatias = 4;
  let paragrafo = window.document.createElement("p");
  let corpo = window.document.querySelector("body");
  for (let quantidade = 1; fatias >= quantidade; quantidade++) {
    paragrafo.innerHTML += `<p>${quantidade}ª Fatia Comida</p>`;
    if (quantidade == fatias) {
    paragrafo.innerHTML += `<p style="background-color:blue; color:white">A piza acabou :(</p>`;
    }
  }
  corpo.appendChild(paragrafo);
  corpo.style.textAlign = "center";
}


function desligar() {
  let botao = window.document.querySelector("button");
  botao.setAttribute("disabled", "true");
}

//Código do dia, mês e ano atuais
var data = new Date();
var dia = data.getDate();
var mes = data.getMonth()
var nomeDoMes = "";
var ano = data.getFullYear();
var horas = data.getHours();
var minutos = data.getMinutes();
var segundos = data.getSeconds();
var dataCompleta = window.document.querySelector("p#data-e-hora");

switch (mes) {
  case 0:
    nomeDoMes = "Janeiro";
    break;
  
  case 1:
    nomeDoMes = "Fevereiro";
    break;
  
  case 2:
    nomeDoMes = "Março";
    break;
  
  case 3:
    nomeDoMes = "Abril";
    break;
  
  case 4:
    nomeDoMes = "Maio";
    break;
  
  case 5:
    nomeDoMes = "Junho";
    break;
  
  case 6:
    nomeDoMes = "Julho";
    break;
    
  case 7:
    nomeDoMes = "Agosto";
    break;
  
  case 8:
    nomeDoMes = "Setembro";
    break;
  
  case 9:
    nomeDoMes = "Outubro";
    break;
  
  case 10:
    nomeDoMes = "Novembro";
    break;
  
  case 11:
    nomeDoMes = "Dezembro";
    break;
  
  default:
    if (mes > 11) {
      window.alert("[ERRO]: Mês inválido!");
    }
    break;
}

dataCompleta.innerHTML = `A data de hoje é: ${dia} de ${nomeDoMes} de ${ano}`;
dataCompleta.innerHTML += `<p>Hora atual: ${horas} Horas, ${minutos} Minutos e ${segundos} Segundos.</p>`