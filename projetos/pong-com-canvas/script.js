let opcoes = document.querySelector("#opcoes");
let pontos = document.querySelector("#pontos");
let area = document.querySelector("#area");
let botaoIniciar = document.querySelector("#iniciar");
let botaoCima = document.querySelector("#cima");
let botaoBaixo = document.querySelector("#baixo");
//contexto = 2D. Especifica o estilo do jogo
let ctx = area.getContext('2d', {alpha:false});
//configurações gerais
let jogando = false;
let ganhou = false;
let pontosParaGanhar;
//configurações da area do jogo
let alturaArea = area.height;
let larguraArea = area.width;
//configurações da bola
let larguraBola = 15;
let alturaBola = 15;
let velXBola = 6;
let velYBola = 0;
let xIniBola = (larguraArea/2)-(larguraBola/2);
let yIniBola = (alturaArea/2)-(alturaBola/2);
let posXBola = xIniBola;
let posYBola = yIniBola;
let animaBola;
//configurações da barra1
let larguraBarra1 = larguraBola;
let alturaBarra1 = 50;
let velBarra1 = 3;
let yIniBarra1 = (alturaArea/2)-(alturaBarra1/2);
let posYBarra1 = yIniBarra1;
let pontosBarra1 = 0;
let animaBarra1;
//configurações da barra2
let larguraBarra2 = larguraBola;
let alturaBarra2 = 50;
let velBarra2 = 3;
let yIniBarra2 = (alturaArea/2)-(alturaBarra2/2);
let posYBarra2 = yIniBarra2;
let pontosBarra2 = 0;
let animaBarra2;


//configura a bola
function bola() {
  ctx.fillStyle = '#fff'; //estilo da bola
  ctx.beginPath();
  ctx.arc(posXBola+larguraBola/2, posYBola+alturaBola/2, larguraBola/2, 0, 2*Math.PI);
  ctx.fill();
}

//configura a barra1
function barra1() {
  ctx.fillStyle = '#0f0'; //estilo da placa1
  let placa1 = ctx.fillRect(5,posYBarra1,larguraBarra1,alturaBarra1);
}

//configura a barra2
function barra2() {
  ctx.fillStyle = '#f00'; //estilo da placa2
  let placa2 = ctx.fillRect(380,posYBarra2,larguraBarra2,alturaBarra2);
}


//configura o meio da area
function meio() {
  ctx.fillStyle = '#fff'; //estilo da placa2
  let placa2 = ctx.fillRect(200,0,1,200);
}

//placares
function placarB1() {
  ctx.fillStyle = 'rgba(0,255,0,0.6)'; //estilo da placa1
  ctx.font = `3.5em sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${pontosBarra1}`,100, 100);
}
function placarB2() {
  ctx.fillStyle = 'rgba(255,0,0,0.6)'; //estilo da placa1
  ctx.font = `3.5em sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${pontosBarra2}`,300, 100);
}


//responsável por mover a bola e verificar impactos
function moverBola() {
  if (jogando) {
    //configuração inicial (limpa e atualiza bola e barras)
    ctx.clearRect(0,0,400,200);
    carregarJogo();
    //controle eixo X
    posXBola+=velXBola;
    if ((posXBola > 5 && posXBola < larguraBarra1+5) && (posYBola+alturaBola >= posYBarra1 && posYBola <= posYBarra1+alturaBarra1)) {
      velYBola=((posYBola+(alturaBola/2))-(posYBarra1+(alturaBarra1/2)))/4;
      velXBola*=-1;
    } else if ((posXBola+larguraBola > larguraArea-larguraBola-5 && posXBola+larguraBola < larguraArea-5) && (posYBola+alturaBola >= posYBarra2 && posYBola <= posYBarra2+alturaBarra2)) {
      velYBola=((posYBola+(alturaBola/2))-(posYBarra2+(alturaBarra2/2)))/4;
      velXBola*=-1;
    } else if (posXBola <= 0) {
      pontosBarra2++;
      if (pontosBarra2 == pontosParaGanhar) {
        alert(`Jogador Vermelho Ganhou!`);
        ganhou = true;
      }
      iniciarJogo();
    } else if (posXBola >= larguraArea-larguraBola) {
      pontosBarra1++;
      if (pontosBarra1 == pontosParaGanhar) {
        alert(`Jogador Verde Ganhou!`);
        ganhou = true;
      }
      iniciarJogo();
    }
    //controle eixo Y
    posYBola+=velYBola;
    if (posYBola >= alturaArea-alturaBola || posYBola <= 0) {
      velYBola*=-1;
    }
    cancelAnimationFrame(animaBola);
    animaBola = requestAnimationFrame(moverBola);
  }
}


//responsável por mover a barra1 para cima
function moverCimaBarra1() {
  //configuração inicial (limpa e atualiza bola e barras)
  ctx.clearRect(0,0,larguraArea,alturaArea);
  carregarJogo();
  //configuração de movimento
  posYBarra1-=velBarra1;
  
  if (posYBarra1 <= 0) {
    posYBarra1=0;
  }
  cancelAnimationFrame(animaBarra1);
  animaBarra1 = requestAnimationFrame(moverCimaBarra1);
}
//responsável por mover a barra1 para baico
function moverBaixoBarra1() {
  //configuração inicial (limpa e atualiza bola e barras)
  ctx.clearRect(0,0,larguraArea,alturaArea);
  carregarJogo();
  //configuração de movimento
  posYBarra1+=velBarra1;
  
  if (posYBarra1 >= alturaArea-alturaBarra1) {
    posYBarra1=(alturaArea/2+alturaBarra1);
  }
  cancelAnimationFrame(animaBarra1);
  animaBarra1 = requestAnimationFrame(moverBaixoBarra1);
}
//responsável por mover a barra1 nos PCS
function moverBarra1PC() {
  if (event.keyCode==38) {
    moverCimaBarra1();
  } else if (event.keyCode==40) {
    moverBaixoBarra1();
  }
}
//responsável por parar a barra 1
function pararBarra1(){cancelAnimationFrame(animaBarra1)}

//responsável por mover a barra2
function moverBarra2() {
  //configuração inicial (limpa e atualiza bola e barras)
  ctx.clearRect(0,0,larguraArea,alturaArea);
  carregarJogo();
  //configuração de movimento
  if ((posYBarra2+alturaBarra2/2) < (posYBola+alturaBola/2)) {
    posYBarra2+=velBarra2;
  } else if ((posYBarra2+alturaBarra2/2) > (posYBola+alturaBola/2)) {
    posYBarra2-=velBarra2;
  }
  
  if (posYBarra2 <= 0) {
    posYBarra2=0;
  } else if (posYBarra2 >= alturaArea-alturaBarra2) {
    posYBarra2=(alturaArea/2+alturaBarra2);
  }
  cancelAnimationFrame(animaBarra2);
  animaBarra2 = requestAnimationFrame(moverBarra2);
}

//responsável por carregar os elementos do joho
function carregarJogo() {
  //ordem de importancia de baixo pra cima (o mais importante fica em baixo)
  placarB1();
  placarB2();
  meio();
  barra1();
  barra2();
  bola();
}
window.addEventListener("load", carregarJogo);


//controle de inicio/pausa e fim de jogo
function iniciarJogo() {
  jogando = !jogando;
  if (jogando) {
    //configurando atributos
    botaoIniciar.setAttribute('disabled', 'true');
    opcoes.removeAttribute('open', 'true');
    //configurando pontuação necessária para ganhar
    pontosParaGanhar = parseInt(pontos.value);
    if (isNaN(pontosParaGanhar) || pontosParaGanhar <= 0) {
      alert('A pontuação para ganhar digitada é inválida, definindo pontuação necessária para 10!');
      pontos.value = 10;
      pontosParaGanhar = 10;
    }
    //escolhendo posição aleatoria para a bola ir
    if (parseInt(Math.random()*2) == 1){velXBola*=-1}
    //criando as animações
    moverBola();
    animaBarra2 = requestAnimationFrame(moverBarra2);
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      //atribuindo eventos
      botaoCima.addEventListener("touchstart", moverCimaBarra1);
      botaoBaixo.addEventListener("touchstart", moverBaixoBarra1);
      botaoCima.addEventListener("touchend", pararBarra1);
      botaoBaixo.addEventListener("touchend", pararBarra1);
    } else {
      //atribui funções as teclas up, down e enter do PC
      document.addEventListener("keydown", moverBarra1PC);
      document.addEventListener("keyup", pararBarra1);
      botaoCima.addEventListener("mousedown", moverCimaBarra1);
      botaoBaixo.addEventListener("mousedown", moverBaixoBarra1);
      botaoCima.addEventListener("mouseup", pararBarra1);
      botaoBaixo.addEventListener("mouseup", pararBarra1);
    }
    //estilizando botão iniciar
    botaoIniciar.style.backgroundColor = '#bb0000';
    botaoIniciar.style.color = '#f0f0f0';
    botaoIniciar.innerHTML = 'Jogo Em Andamento';
    pontos.setAttribute('disabled', 'true');
  } else if (!jogando && !ganhou) {
    //configurando atributos
    botaoIniciar.removeAttribute('disabled', 'true');
    //limpando tudo
    cancelAnimationFrame(animaBola);
    cancelAnimationFrame(animaBarra1);
    cancelAnimationFrame(animaBarra2);
    posXBola = xIniBola;
    posYBola = yIniBola;
    posYBarra1 = yIniBarra1;
    posYBarra2 = yIniBarra2;
    velXBola = 5;
    velYBola = 0;
    ctx.clearRect(0,0,larguraArea,alturaArea);
    carregarJogo();
    //removendo eventos
    botaoCima.removeEventListener("touchstart", moverCimaBarra1);
    botaoBaixo.removeEventListener("touchstart", moverBaixoBarra1);
    botaoCima.removeEventListener("touchend", pararBarra1);
    botaoBaixo.removeEventListener("touchend", pararBarra1);
    //remove funções as teclas up, down e enter do PC
    document.removeEventListener("keydown", moverBarra1PC);
    document.removeEventListener("keyup", pararBarra1);
    botaoCima.removeEventListener("mousedown", moverCimaBarra1);
    botaoBaixo.removeEventListener("mousedown", moverBaixoBarra1);
    botaoCima.removeEventListener("mouseup", pararBarra1);
    botaoBaixo.removeEventListener("mouseup", pararBarra1);
    //estilizando botão iniciar
    botaoIniciar.style.backgroundColor = '#119202';
    botaoIniciar.style.color = '#f0f0f0';
    botaoIniciar.innerHTML = 'Continuar Jogo';
  } else {
    //configurando atributos
    botaoIniciar.removeAttribute('disabled', 'true');
    opcoes.setAttribute('open', 'true');
    //limpando tudo
    cancelAnimationFrame(animaBola);
    cancelAnimationFrame(animaBarra1);
    cancelAnimationFrame(animaBarra2);
    posXBola = xIniBola;
    posYBola = yIniBola;
    posYBarra1 = yIniBarra1;
    posYBarra2 = yIniBarra2;
    velXBola = 5;
    velYBola = 0;
    pontosBarra1=0;
    pontosBarra2=0;
    ganhou = false;
    ctx.clearRect(0,0,larguraArea,alturaArea);
    carregarJogo();
    //removendo eventos
    botaoCima.removeEventListener("touchstart", moverCimaBarra1);
    botaoBaixo.removeEventListener("touchstart", moverBaixoBarra1);
    botaoCima.removeEventListener("touchend", pararBarra1);
    botaoBaixo.removeEventListener("touchend", pararBarra1);
    //remove funções as teclas up, down e enter do PC
    document.removeEventListener("keydown", moverBarra1PC);
    document.removeEventListener("keyup", pararBarra1);
    botaoCima.removeEventListener("mousedown", moverCimaBarra1);
    botaoBaixo.removeEventListener("mousedown", moverBaixoBarra1);
    botaoCima.removeEventListener("mouseup", pararBarra1);
    botaoBaixo.removeEventListener("mouseup", pararBarra1);
    //estilizando botão iniciar
    botaoIniciar.style.backgroundColor = '#119202';
    botaoIniciar.style.color = '#f0f0f0';
    botaoIniciar.innerHTML = 'Iniciar Jogo';
    pontos.removeAttribute('disabled', 'true');
  }
}
botaoIniciar.addEventListener("click", iniciarJogo);
document.addEventListener("keydown", ()=>{if(event.keyCode==13){if(!jogando){iniciarJogo()}}});