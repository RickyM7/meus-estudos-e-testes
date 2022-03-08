let num1 = window.document.querySelector("input#num1");
let num2 = window.document.querySelector("input#num2");
let res = window.document.querySelector("div#res");
let menu = window.document.querySelector("div#menu");

/*Essa função recebe o dia, mes, ano, hora e minuto atuais e organiza para que quando a função for chamada a uma string com esses valores seja retornada*/
function data() {
  let date = {
  dia: new Date().getDate(),
  mes: new Date().getMonth(),
  ano: new Date().getFullYear(),
  hora: new Date().getHours(),
  minuto: new Date().getMinutes()
};
  /*Esse switch transforma o mês numérico no nome do mês*/
  switch (date.mes) {
    case 0:
      date.mes = `Jan`;
      break;
    case 1:
      date.mes = `Fev`;
      break;
    case 2:
      date.mes = `Mar`;
      break;
    case 3:
      date.mes = `Abr`;
      break;
    case 4:
      date.mes = `Mai`;
      break;
    case 5:
      date.mes = `Jun`;
      break;
    case 6:
      date.mes = `Jul`;
      break;
    case 7:
      date.mes = `Ago`;
      break;
    case 8:
      date.mes = `Set`;
      break;
    case 9:
      date.mes = `Out`;
      break;
    case 10:
      date.mes = `Nov`;
      break;
    case 11:
      date.mes = `Dez`;
      break;
    default:
      date.mes = `Mês Inválido`;
      break;
};

  /*If apenas para organizar e retornar o horario de acordo com o momento do dia, assim mostrando o AM ou PM. Provavelmente a parte mais importante dessa função*/
  if (date.hora == 0) {
    return `${date.dia}-${date.mes}-${date.ano}, ${date.hora + 12}:${date.minuto} AM`;
  } else if (date.hora > 0 && date.hora < 12 ) {
    return `${date.dia}-${date.mes}-${date.ano}, ${date.hora}:${date.minuto} AM`;
  } else if (date.hora == 12 ) {
    return `${date.dia}-${date.mes}-${date.ano}, ${date.hora}:${date.minuto} PM`;
  } else {
    return `${date.dia}-${date.mes}-${date.ano}, ${date.hora % 12}:${date.minuto} PM`;
  };
};

/*Todas as funções que realizam uma equação aqui retornam um array, isso para que multiplos valores sejam retornados*/
function somar(a,b) {
  a = Number(num1.value);
  b = Number(num2.value);
  if (num1.value.length == 0 || num2.value.length == 0) {
    alert(`Uma ou mais áreas vazias, por favor digite um número antes!`);
  } else {
    return [res.innerHTML = `<p>O resultado de ${a} + ${b} é igual a ${a+b}</p>`, menu.innerHTML += `<div class='res-menu'><p>${data()}</p> <p>${a} + ${b} = ${a+b}</p></div>`];
  };
};

function subtrair(a,b) {
  a = Number(num1.value);
  b = Number(num2.value);
  if (num1.value.length == 0 || num2.value.length == 0) {
    alert(`Uma ou mais áreas vazias, por favor digite um número antes!`);
  } else {
    return [res.innerHTML = `O resultado de ${a} - ${b} é igual a ${a-b}`, menu.innerHTML += `<div class='res-menu'><p>${data()}</p> <p>${a} - ${b} = ${a-b}</p></div>`];
  };
};

function multi(a,b) {
  a = Number(num1.value);
  b = Number(num2.value);
  if (num1.value.length == 0 || num2.value.length == 0) {
    alert(`Uma ou mais áreas vazias, por favor digite um número antes!`);
  } else {
    return [res.innerHTML = `O resultado de ${a} x ${b} é igual a ${a*b}`, menu.innerHTML += `<div class='res-menu'><p>${data()}</p> <p>${a} x ${b} = ${a*b}</p></div>`];
  };
};

function div(a,b) {
  a = Number(num1.value);
  b = Number(num2.value);
  if (num1.value.length == 0 || num2.value.length == 0) {
    alert(`Uma ou mais áreas vazias, por favor digite um número antes!`);
  } else if (a == 0 || b == 0) {
    alert(`Impossível dividir por 0, por favor digite um número diferente.`);
  } else {
    return [res.innerHTML = `O resultado de ${a} ÷ ${b} é igual a ${a/b}`, menu.innerHTML += `<div class='res-menu'><p>${data()}</p> <p>${a} ÷ ${b} = ${a/b}</p></div>`];
  };
};


/*Função criada especificamente para criar um efeito dropdown no html. Essa função usa uma contagem de impar e par para saber quando o elemento deve aparecer, e para isso foi criada uma variável que soma '+1' sempre que a função dropdown é chamada*/
let i = 1;
function dropdown() {
  if (i%2 == 0) {
    document.querySelector("div#menu").setAttribute("hidden", "true");
    i++;
  } else {
    document.querySelector("div#menu").removeAttribute("hidden", "true");
    i++;
  };
};
window.document.querySelector("button#abre-o-menu").addEventListener("click", dropdown);