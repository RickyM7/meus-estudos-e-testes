let perso = document.querySelector("div#perso");
let area = document.querySelector("div#area");
let cima = document.querySelector("button#cima");
let baixo = document.querySelector("button#baixo");
let esquerda = document.querySelector("button#esquerda");
let direita = document.querySelector("button#direita");
//Variáveis eixo que pegam os valores (em pixels) das posiçõwsiniciais de perso
let eixoX = area.offsetLeft;
let eixoY = area.offsetTop;

/*
Função responsável pelo trackpad
Aqui eu usei o 'event.changedTouches', mas eu poderia
passar um parâmetro na função e usar esse parâmetro
no lugar de 'event.'
*/
function trackpad() {
  //coord é uma abreviação de coordenada
  //infosToque porque essa variável fornece diversas infromações diferentes acerca dos toques na tela
  let infosToque = event.changedTouches[0];
  let coordToqueX = parseInt(infosToque.clientX);
  let coordToqueY = parseInt(infosToque.clientY);
  
  perso.style.left = `${coordToqueX}px`;
  perso.style.top = `${coordToqueY}px`;
  
  if (coordToqueX >= area.offsetLeft+270) {
    perso.style.left = `${area.offsetLeft+270}px`;
  }
  if (coordToqueX <= area.offsetLeft) {
    perso.style.left = `${area.offsetLeft}px`;
  }
  if (coordToqueY >= area.offsetTop+270) {
    perso.style.top = `${area.offsetTop+270}px`;
  }
  if (coordToqueY <= area.offsetTop) {
    perso.style.top = `${area.offsetTop}px`;
  }
  //isso abaixo serve para sincronizar a posiçào do trackpad e dos botões
  eixoX = coordToqueX;
  eixoY = coordToqueY;
}
area.addEventListener("touchmove", trackpad);


/////////////// SEPARAÇÃO DE FUNÇÕES /////////////////////


//Variáveis para receber o intervalo de repetição do clique do botão, responsável pela opção de apertar e segurar os botões
let cimaSegura;
let baixoSegura;
let esquerdaSegura;
let direitaSegura;

//Fubções dos botões
function bDireita() {
  if (eixoX >= area.offsetLeft+255) {
    eixoX = area.offsetLeft+255;
  } else if (eixoX <= area.offsetLeft) {
    eixoX = area.offsetLeft;
  }
  
  eixoX += 15;
  perso.style.left = `${eixoX}px`;
}

function bEsquerda() {
  if (eixoX <= area.offsetLeft+15) {
    eixoX = area.offsetLeft+15;
  } else if (eixoX >= area.offsetLeft+270) {
    eixoX = area.offsetLeft+270;
  }
  
  eixoX -= 15;
  perso.style.left = `${eixoX}px`;
}

function bCima() {
  if (eixoY <= area.offsetTop+15) {
    eixoY = area.offsetTop+15;
  } else if (eixoY >= area.offsetTop+270) {
    eixoY = area.offsetTop+270;
  }
  
  eixoY -= 15;
  perso.style.top = `${eixoY}px`;
}

function bBaixo() {
  if (eixoY >= area.offsetTop+255) {
    eixoY = area.offsetTop+255;
  } else if (eixoY <= area.offsetTop) {
    eixoY = area.offsetTop;
  }
  
  eixoY += 15;
  perso.style.top = `${eixoY}px`;
}

//Funções para apertar e segurar os botões
function seguraCima() {
  cimaSegura = setInterval(bCima, 33);
}

function seguraBaixo() {
  baixoSegura = setInterval(bBaixo, 33);
}

function seguraEsquerda() {
  esquerdaSegura = setInterval(bEsquerda, 33);
}

function seguraDireita() {
  direitaSegura = setInterval(bDireita, 33);
}

//Função para quando soltar o botão a perso parar
function solta() {
  clearInterval(cimaSegura);
  clearInterval(baixoSegura);
  clearInterval(esquerdaSegura);
  clearInterval(direitaSegura);
}

 // Eventos dos botões
cima.addEventListener("click", bCima);
cima.addEventListener("touchstart", seguraCima);
cima.addEventListener("touchend", solta);
baixo.addEventListener("click", bBaixo);
baixo.addEventListener("touchstart", seguraBaixo);
baixo.addEventListener("touchend", solta);
esquerda.addEventListener("click", bEsquerda);
esquerda.addEventListener("touchstart", seguraEsquerda);
esquerda.addEventListener("touchend", solta);
direita.addEventListener("click", bDireita);
direita.addEventListener("touchstart", seguraDireita);
direita.addEventListener("touchend", solta);