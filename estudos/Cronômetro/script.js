let horas = document.querySelector('#h');
let h = 0;
let min = document.querySelector('#min');
let m = 0;
let seg = document.querySelector('#seg');
let s = 0;
let mseg = document.querySelector('#ms');
let ms = 0;
let botaoInicia = document.querySelector('#inicia');
let botaoPausa = document.querySelector('#pausa');
let botaoZera = document.querySelector('#zera');
let controleTimer;
let pausado = true;

//função que controla o cronômetro
function timer() {
  ms++;
  if (ms > 99) {
    s++;
    ms = 0;
  }
  if (s > 59) {
    m++;
    s = 0;
  }
  if (m > 59) {
    h++;
    m = 0;
  }
  if (ms < 10) {
    mseg.innerHTML = `0${ms}`;
  } else {
    mseg.innerHTML = ms;
  }
  if (s < 10) {
    seg.innerHTML = `0${s}:`;
  } else {
    seg.innerHTML = `${s}:`;
  }
  if (m < 10) {
    min.innerHTML = `0${m}:`;
  } else {
    min.innerHTML = `${m}:`;
  }
  if (h < 10) {
    horas.innerHTML = `0${h}:`;
  } else {
    horas.innerHTML = `${h}:`;
  }
}

//Eventos que fazem os botoes e o cronômetro funcionarem
botaoInicia.addEventListener('click', ()=>{
  if (pausado) {
    pausado = !pausado;
    botaoInicia.innerText = 'Pausar';
    botaoInicia.style.backgroundColor = '#e80000';
    botaoInicia.style.color = '#FFF';
    controleTimer = setInterval(timer, 10);
  } else {
    pausado = !pausado;
    botaoInicia.innerText = 'Continuar';
    botaoInicia.style.backgroundColor = '#00e31b';
    botaoInicia.style.color = '#FFF';
    clearInterval(controleTimer);
  }
});

botaoZera.addEventListener('click', ()=>{
  clearInterval(controleTimer);
  ms = 0;
  s = 0;
  m = 0;
  h = 0;
  mseg.innerHTML = `0${ms}`;
  seg.innerHTML = `0${s}:`;
  min.innerHTML = `0${m}:`;
  horas.innerHTML = `0${h}:`;
  pausado = true;
  botaoInicia.innerText = 'Iniciar';
  botaoInicia.style.backgroundColor = '#008910';
  botaoInicia.style.color = '#FFF';
});