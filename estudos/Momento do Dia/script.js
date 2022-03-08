let body = window.document.querySelector("body");
let momento = window.document.querySelector("div#momento");
let progresso = document.querySelector("#prog");
let horario = window.document.querySelector("div#controla-hora>div#horas>div#relogio");
let botaoControle = window.document.querySelector("div#controla-hora>button");
let foto = window.document.querySelector("img#imagem");
let mostrarRelogio;


//Função responsável pela barra de progresso
let barra = 0;
let intervaloBarra;
function barraDeProgresso() {
  barra++;
  if (barra <= 100) {
    progresso.value = barra;
  } else {
    clearInterval(intervaloBarra);
    barra = 0;
    horario.style.display = "inline-block";
    progresso.style.display = "none";
  }
}


function relogio() {
/*Usei o parâmetro 'en-us' aqui pois assim o 'Am e Pm' são mostrados no final do horário*/
  let horas = new Date().toLocaleTimeString("en-us");

  horario.innerHTML = `<p>Agora são <strong>${horas}</strong>!</p>`;
}


//Quando o interruptor é impar o relógio liga é quando é par o relógio desliga.
let interruptor = 0;
function ligaDesligaRelogio() {
  interruptor++;
  if (interruptor%2 == 1) {
    clearInterval(mostrarRelogio);
    clearInterval(intervaloBarra);
    botaoControle.innerHTML = 'Iniciar Relógio';
    botaoControle.style.backgroundColor = `#1d7000`;
    botaoControle.style.color = `f1f1f1`;
  } else {
    progresso.style.display = "inline-block";
    horario.style.display = "none";
    barra = 0;
    mostrarRelogio = setInterval(relogio, 1000);
    intervaloBarra = setInterval(barraDeProgresso, 10);
    botaoControle.innerHTML = 'Parar Relógio';
    botaoControle.style.backgroundColor = `#9c1111`;
    botaoControle.style.color = `e1e1e1`;
  }
}
botaoControle.addEventListener("click", ligaDesligaRelogio);


function momentoDoDia() {
  intervaloBarra = setInterval(barraDeProgresso, 10);
  mostrarRelogio = setInterval(relogio, 1000);
  let hora = parseInt(new Date().getHours());
  if (hora > 0 && hora < 12) {
    momento.innerHTML = `<h2>Bom dia!</h2>`;
    foto.src = "/imgs/manha.jpg";
    foto.alt = "Foto da Manhã";
    body.style.background = "linear-gradient(#1359b8, #0A90CF)";
  } else if (hora >= 12 && hora <= 18) {
    momento.innerHTML = `<h2>Boa tarde!</h2>`;
    foto.src = "/imgs/tarde.jpg";
    foto.alt = "Foto da Tarde";
    body.style.background = "linear-gradient(#9a5a0b, #B07604)";
  } else {
    momento.innerHTML = `<h2>Boa noite!</h2>`;
    foto.src = "/imgs/noite.jpg";
    foto.alt = "Foto da Noite";
    body.style.background = "linear-gradient(#333333, #4A4743)";
  }
}
window.addEventListener("load", momentoDoDia);