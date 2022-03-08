let area = document.querySelector("#area");
let bola = document.querySelector("#bola");
//configurações da bola
let velX = 5;
let velY = 4;
let xIniBola;
let yIniBola;
let xMaxBola;
let yMaxBola;
let posXBola;
let posYBola;
let animaBola;
//configurações de cores das bordas
let r,g,b,a;
//configurações gerais
let jogando = false;

function moverBola() {
  if (posXBola <= 0 || posXBola >= xMaxBola) {
    velX *= -1;
    r = parseInt(Math.random()*255);
    g = parseInt(Math.random()*255);
    b = parseInt(Math.random()*255);
    a = parseFloat(Math.random()*10);
    area.style.outlineColor = `RGBA(${r},${g},${b},${a})`;
    area.style.background = `linear-gradient(RGBA(${r},${g},${b},${a}),RGBA(${b},${g},${r},${a}),RGBA(${r},${b},${g},${a}))`;
  }
  posXBola += velX;
  if (posYBola <= 0 || posYBola >= yMaxBola) {
    velY *= -1;
    r = parseInt(Math.random()*255);
    g = parseInt(Math.random()*255);
    b = parseInt(Math.random()*255);
    a = parseFloat(Math.random()*10);
    area.style.outlineColor = `RGBA(${r},${g},${b},${a})`;
    area.style.background = `linear-gradient(RGBA(${r},${g},${b},${a}),RGBA(${b},${g},${r},${a}),RGBA(${r},${b},${g},${a}))`;
  }
  posYBola += velY;
  bola.style.transform = `translate(${posXBola}px, ${posYBola}px)`;
  cancelAnimationFrame(animaBola);
  animaBola = requestAnimationFrame(moverBola);
}

function jogo() {
  jogando = !jogando; //inverte o valor de jogando
  if (jogando) {
    moverBola();
  } else {
    carregaJogo();
    cancelAnimationFrame(animaBola);
    posXBola = xIniBola;
    posYBola = yIniBola;
    bola.style.transform = `translate(${posXBola}px, ${posYBola}px)`;
    r = 255;
    g = 255;
    b = 255;
    a = 10;
    area.style.outlineColor = `RGBA(${r},${g},${b},${a})`;
    area.style.background = `#333`;
  }
}

area.addEventListener("click", jogo);

//evento para Alinhar a bola no centro e carregsr infos
function carregaJogo() {
  xIniBola = (area.offsetWidth/2)-(bola.offsetWidth/2);
  yIniBola = (area.offsetHeight/2)-(bola.offsetHeight/2);
  xMaxBola = (area.offsetWidth)-(bola.offsetWidth);
  yMaxBola = (area.offsetHeight)-(bola.offsetHeight);
  posXBola = xIniBola;
  posYBola = yIniBola;
  bola.style.transform = `translate(${xIniBola}px, ${yIniBola}px)`;
}
window.addEventListener("load", carregaJogo);