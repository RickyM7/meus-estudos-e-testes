let area = document.querySelector("div#area");
let bola = document.querySelector("div#bola");
let interruptor = document.querySelector("input#interruptor");
let fundoBotao = document.querySelector("div#fundo-botao");
let check = document.querySelector("div#check");
//o onOff é responsável pelo texto que aparece no interruptor
let onOff = document.querySelector("div#fundo-botao>label");
let animado; //recebe a requisição de animação
//essas duas variáveis abaixo determinam a posição inicial da bola (em px, é claro)
let eixoX = area.offsetLeft;
let eixoY = area.offsetTop;
let velX = 9; //determina a velocidade de movimentação da bola (em px)
let velY = 6;
//essas duas variáveis abaixo determinam o lado para qual a bola vai. 1 é direita ou cima e -1 é esquerda ou baixo
let ladoX = 1;
let ladoY = 1;
let r,g,b,a; //variáveis das cores
let corBordaTop, corBordaBottom, corBordaLeft, corBordaRight; //variáveis das cores das bordas

function anima() {
  //gerando cores aleatorias
  r = parseInt(Math.random()*255);
  g = parseInt(Math.random()*255);
  b = parseInt(Math.random()*255);
  a = parseFloat(Math.random()*10);
  
  //parte responsável por movimentar a bola e alterar a cor das bordas e do fundo
  eixoX += velX*ladoX;
  
  if (eixoX >= area.offsetLeft+440) {
    ladoX = -1;
    area.style.borderRightColor = `rgb(${r},${g},${b})`;
    corBordaRight = `rgba(${r},${g},${b},${a})`;
  } else if (eixoX <= area.offsetLeft) {
    ladoX = 1;
    area.style.borderLeftColor = `rgb(${r},${g},${b})`;
    corBordaLeft = `rgba(${r},${g},${b},${a})`;
  }
  bola.style.left = `${eixoX}px`;
  
  eixoY += velY*ladoY;
  
  if (eixoY >= area.offsetTop+205) {
    ladoY = -1;
    area.style.borderBottomColor = `rgb(${r},${g},${b})`;
    corBordaBottom = `rgba(${r},${g},${b},${a})`;
  } else if (eixoY <= area.offsetTop) {
    ladoY = 1;
    area.style.borderTopColor = `rgb(${r},${g},${b})`;
    corBordaTop = `rgba(${r},${g},${b},${a})`;
  }
  //isso abaixo defineas cores de fundo de acordo com as corws das bordas
  area.style.background = `linear-gradient(${corBordaTop}, ${corBordaLeft}, ${corBordaRight}, ${corBordaBottom})`;
  
  bola.style.top = `${eixoY}px`;
  
  //primeiro a animação é cancelada, isso serve para evitar que a animação fique maisnrápida a cada clique
  animado = cancelAnimationFrame(animado);
  animado = requestAnimationFrame(anima);
  
  //configurações do interruptor
  interruptor.checked = true;
  interruptor.style.float = "right";
  fundoBotao.style.backgroundColor = "#1b8000";
  fundoBotao.style.color = "#F0F0F0";
  onOff.innerHTML = "Ligado";
  
  //configurações do check
  check.style.left = `68px`;
  check.style.backgroundColor = `#0ea000`;
  check.innerHTML = `✔`;
}

//função que para a animação quando chamada
function pararAnima() {
  cancelAnimationFrame(animado);
  
  //configurações do interruptor
  interruptor.checked = false;
  interruptor.style.float = "left";
  fundoBotao.style.backgroundColor = "#833333";
  fundoBotao.style.color = "#C1C1C1";
  onOff.innerHTML = "Desligado";
  
  //configurações do check
  check.style.left = `inherit`;
  check.style.backgroundColor = `#622323`;
  check.innerHTML = `❌`;
}
//atribuindo os eventos de clicar e soltar às respectivas funções
area.addEventListener("touchstart", anima);
area.addEventListener("touchend", pararAnima);
//evento e script para o interruptor
interruptor.addEventListener("click", function(){if(interruptor.checked==true){anima()}else{pararAnima()}});
//a div check ativa/desativa o interruptor ao clicar
check.addEventListener("click", function(){interruptor.checked = !interruptor.checked; if(interruptor.checked==true){anima()}else{pararAnima()}});