let numero = window.document.querySelector("input#numero");
let resultado = window.document.querySelector("div#resultado");
let nums = [];
let hist = document.querySelector("details#hist>div");

function imparPar() {
  let n = Number(numero.value);
  
  if (numero.value.length == 0) {
    alert("Por favor digite um número!");
    resultado.innerHTML = ``;
  } else if (nums.indexOf(n) != -1) {
    alert(`O número ${n} já foi testado, veja no histórico.`);
    resultado.innerHTML = ``;
    document.querySelector("details#hist").setAttribute("open", true);
  } else {
    if (n%2 == 0) {
      resultado.innerHTML = `<p>O número <strong>${n}</strong> é par!</p>`;
      hist.innerHTML += `<p>${n} é par</p>`;
    } else {
      resultado.innerHTML = `<p>O número <strong>${n}</strong> é impar!</p>`;
      hist.innerHTML += `<p>${n} é impar</p>`;
    }
  }
  numero.value = ``;
  numero.focus();
  
  if (nums.indexOf(n) == -1) {
    nums.push(n);
  }
}