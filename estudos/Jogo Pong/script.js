let area = document.querySelector("#area");
let placa1 = document.querySelector("#placa1");
let placa2 = document.querySelector("#placa2");
let bola = document.querySelector("#bola");
let pontos1 = document.querySelector("#pontos1");
let pontosPlaca1 = 0;
let pontos2 = document.querySelector("#pontos2");
let pontosPlaca2 = 0;
let botaoCima = document.querySelector("#cima");
let botaoBaixo = document.querySelector("#baixo");
let botaoIniciar = document.querySelector("#iniciar");
//controle da bola
let animaBola;
let velX = 6;
let velY = 0;
let larguraMin = area.clientLeft;
let larguraMax = area.clientWidth;
let alturaMin = area.clientTop;
let alturaMax = area.clientHeight;
let posXIniBola = larguraMax/2;
let posYIniBola = alturaMax/2;
//controle da placa1
let animaMovPlaca1;
let yPlaca1 = 100; //100px
let velMovPlaca1 = 3;
//controle da placa2
let animaMovPlaca2;
let yPlaca2 = 100; //100px
let velMovPlaca2 = 3;
//controle do jogo (false = jogo parado, true = jogando)
let jogando = false;

//configurações da placa1
function moverCimaPlaca1() {
  yPlaca1-=velMovPlaca1;
  if (yPlaca1<=0) {
    yPlaca1=0;
    cancelAnimationFrame(animaMovPlaca1);
  }
  placa1.style.transform = `translate(0px, ${yPlaca1}px)`;
  animaMovPlaca1 = requestAnimationFrame(moverCimaPlaca1);
}
function moverBaixoPlaca1() {
  yPlaca1+=velMovPlaca1;
  if (yPlaca1>=100) {
    yPlaca1=100;
    cancelAnimationFrame(animaMovPlaca1);
  }
  placa1.style.transform = `translate(0px, ${yPlaca1}px)`;
  animaMovPlaca1 = requestAnimationFrame(moverBaixoPlaca1);
}

//configurações da placa2
function moverPlaca2() {
  if (yPlaca2 != posYIniBola-10) {
    if (yPlaca2>=posYIniBola-10) {
      yPlaca2-=velMovPlaca2;
    } else if (yPlaca2<=posYIniBola-10) {
      yPlaca2+=velMovPlaca2;
    }
  }
  if (yPlaca2<=0) {
    yPlaca2=0;
  } else if (yPlaca2>=100) {
    yPlaca2=100;
  }
  placa2.style.transform = `translate(385px, ${yPlaca2}px)`;
  animaMovPlaca2 = requestAnimationFrame(moverPlaca2);
}

//configurações da bola, pontuação, etc
function moveBola() {
  //cria a animação de movimento da bola
  animaBola = requestAnimationFrame(moveBola);
  
  //controle do eixo x e area de impacto das placas
  //placa1
  if (posXIniBola < larguraMin+15 && posXIniBola > larguraMin && posYIniBola+15 > yPlaca1-1 && posYIniBola+1 < yPlaca1+50) {
    velY = ((bola.offsetHeight/2)-(yPlaca1/2))/6;
    velX*=-1; //inverte o valor de velX
    pontosPlaca1++;
    pontos1.innerHTML = pontosPlaca1;
  } else if (posXIniBola <= larguraMin) {
    alert('Jogador 2 Ganhou!');
    iniciar();
  }
  
  //placa2
  if (posXIniBola > larguraMax-30 && posXIniBola < larguraMax-15 && posYIniBola+15 > yPlaca2-1 && posYIniBola+1 < yPlaca2+50) {
    velY = ((bola.offsetHeight/2)-(yPlaca2/2))/16;
    velX*=-1; //inverte o valor de velX
    pontosPlaca2++;
    pontos2.innerHTML = pontosPlaca2;
  } else if (posXIniBola >= larguraMax-15) {
    alert('Jogador 1 Ganhou!');
    iniciar();
  }
  
  posXIniBola+=velX;
  
  //controle do eixo y
  if (posYIniBola >= alturaMax-15) {
    velY*=-1; //inverte o valor de velY
  } else if (posYIniBola <= alturaMin) {
    velY*=-1; //inverte o valor de velY
  }
  posYIniBola+=velY;
  
  //controle total da bola
  bola.style.transform = `translate(${posXIniBola}px, ${posYIniBola}px)`;
}


//inicia/pausa/para o jogo e atribui/remove os eventos
function iniciar() {
  jogando = !jogando;
  if (jogando) {
    animaBola = requestAnimationFrame(moveBola);
    animaMovPlaca2 = requestAnimationFrame(moverPlaca2);
    botaoCima.addEventListener("touchstart", moverCimaPlaca1);
    botaoCima.addEventListener("touchend", ()=>{cancelAnimationFrame(animaMovPlaca1)});
    botaoBaixo.addEventListener("touchstart", moverBaixoPlaca1);
    botaoBaixo.addEventListener("touchend", ()=>{cancelAnimationFrame(animaMovPlaca1)});
  } else {
    cancelAnimationFrame(animaBola);
    cancelAnimationFrame(animaMovPlaca1);
    cancelAnimationFrame(animaMovPlaca2);
    botaoCima.removeEventListener("touchstart", moverCimaPlaca1);
    botaoCima.removeEventListener("touchend", ()=>{cancelAnimationFrame(animaMovPlaca1)});
    botaoBaixo.removeEventListener("touchstart", moverBaixoPlaca1);
    botaoBaixo.removeEventListener("touchend", ()=>{cancelAnimationFrame(animaMovPlaca1)});
    pontosPlaca1=0;
    pontosPlaca2=0;
    pontos1.innerHTML = pontosPlaca1;
    pontos2.innerHTML = pontosPlaca2;
    posXIniBola = larguraMax/2;
    posYIniBola = alturaMax/2;
    velX = 6;
    velY = 0;
    bola.style.transform = `translate(${posXIniBola}px, ${posYIniBola}px)`;
    yPlaca1=100;
    yPlaca2=100;
    placa1.style.transform = `translate(0, ${yPlaca1}px)`;
    placa2.style.transform = `translate(385px, ${yPlaca2}px)`;
  }
}
botaoIniciar.addEventListener("click", iniciar);