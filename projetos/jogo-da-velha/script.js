let areas = document.querySelectorAll("#jogo>div");
let opcoes = document.querySelector("#ops");
let botaoIniciar = document.querySelector("#iniciar");
let tipo = document.getElementsByName("tipo");
let tipoDeJogo; //0 é vs cpu e 1 é jogador vs jogador
let nivel = document.getElementsByName("nivel");
let dificuldade; //0 é fácil e 1 é difícil
let simbolo = document.getElementsByName("simbolo");
let alertas = document.querySelector("#alertas");
let jogadorAtual = document.querySelector("#jogador");
let jogador, cpu; //recebem os simbolos selecionados
let jogando = 0;
let numXouBola = 0; //faz o xBola mudar pra X ou O
let xOuBola; //retorna o simbolo de cada jogador
let areasVazias = 9;
let ale; //area aleatória vazia para a cpu
let jogadaCpu; //faz a jogada da cpu
//a=Areas: Serve pra verifcar se você ganhou ou pedeu vendo quaisb areas esyão preenchidas
let a = {0:1,1:2,2:3,3:4,4:5,5:6,6:7,7:8,8:9};
//Eventos: responsável por adicionar o simbolo a area e remover o evento de click logo depois
let eventos = {
0:function area0(){xBola(0);areas[0].removeEventListener("click", eventos[0])},
1:function area1(){xBola(1);areas[1].removeEventListener("click", eventos[1])},
2:function area2(){xBola(2);areas[2].removeEventListener("click", eventos[2])},
3:function area3(){xBola(3);areas[3].removeEventListener("click", eventos[3])},
4:function area4(){xBola(4);areas[4].removeEventListener("click", eventos[4])},
5:function area5(){xBola(5);areas[5].removeEventListener("click", eventos[5])},
6:function area6(){xBola(6);areas[6].removeEventListener("click", eventos[6])},
7:function area7(){xBola(7);areas[7].removeEventListener("click", eventos[7])},
8:function area8(){xBola(8);areas[8].removeEventListener("click", eventos[8])}
};

//adiciona os eventos de click e restaura os dados a cada novo jogo
function jogo() {
  if (jogando == 0) {
    //reiniciando valores das areas
    for (let i = 0; i < 9; i++) {
      a[i]=i;
      areas[i].innerHTML = '';
      areas[i].removeEventListener("click", eventos[i]);
    }
    alertas.innerHTML = ``;
    alertas.style.display ='none';
    jogadorAtual.style.display='inline-block';
    areasVazias=9;
  } else {
    for (let i = 0; i < 9; i++) {
      areas[i].addEventListener("click", eventos[i]);
    }
  }
}

//gera areas aleatórias vazias
function geraAreaAle(){ale = parseInt(Math.random()*9)}
//responsável por fazer a jogaada da cpu
function fazJogadaDaCpuFacil() {
  if(numXouBola%2==1) {
    if(areasVazias > 0) {
      do {
        geraAreaAle();
      } while(typeof(a[ale])=='string');
    }
    eventos[ale]();
  }
}

function fazJogadaDaCpuDificil() {
  if(numXouBola%2==1) {
    if (a[1]==a[2] || a[6]==a[3] || a[4]==a[8]) {
      if (typeof(a[0])=='number') {
        eventos[0]();
      } else {
        if(areasVazias > 0) {
          do {geraAreaAle();} while(typeof(a[ale])=='string');
        }
        eventos[ale]();
      }
    } else if (a[0]==a[2] || a[4]==a[7]) {
      if (typeof(a[1])=='number') {
        eventos[1]();
      } else {
        if(areasVazias > 0) {
          do {geraAreaAle();} while(typeof(a[ale])=='string');
        }
        eventos[ale]();
      }
    } else if (a[0]==a[1] || a[4]==a[6] || a[5]==a[8]) {
      if (typeof(a[2])=='number') {
        eventos[2]();
      } else {
        if(areasVazias > 0) {
          do {geraAreaAle();} while(typeof(a[ale])=='string');
        }
        eventos[ale]();
      }
    } else if (a[0]==a[6] || a[4]==a[5]) {
      if (typeof(a[3])=='number') {
        eventos[3]();
      } else {
        if(areasVazias > 0) {
          do {geraAreaAle();} while(typeof(a[ale])=='string');
        }
        eventos[ale]();
      }
    } else if (a[0]==a[8] || a[1]==a[7] || a[2]==a[6] || a[3]==a[5]) {
      if (typeof(a[4])=='number') {
        eventos[4]();
      } else {
        if(areasVazias > 0) {
          do {geraAreaAle();} while(typeof(a[ale])=='string');
        }
        eventos[ale]();
      }
    } else if (a[2]==a[8] || a[3]==a[4]) {
      if (typeof(a[5])=='number') {
        eventos[5]();
      } else {
        if(areasVazias > 0) {
          do {geraAreaAle();} while(typeof(a[ale])=='string');
        }
        eventos[ale]();
      }
    } else if (a[0]==a[3] || a[2]==a[4] || a[7]==a[8]) {
      if (typeof(a[6])=='number') {
        eventos[6]();
      } else {
        if(areasVazias > 0) {
          do {geraAreaAle();} while(typeof(a[ale])=='string');
        }
        eventos[ale]();
      }
    } else if (a[1]==a[4] || a[6]==a[8]) {
      if (typeof(a[7])=='number') {
        eventos[7]();
      } else {
        if(areasVazias > 0) {
          do {geraAreaAle();} while(typeof(a[ale])=='string');
        }
        eventos[ale]();
      }
    } else if (a[0]==a[3] || a[2]==a[5] || a[6]==a[7]) {
      if (typeof(a[8])=='number') {
        eventos[8]();
      } else {
        if(areasVazias > 0) {
          do {geraAreaAle();} while(typeof(a[ale])=='string');
        }
        eventos[ale]();
      }
    } else {
      if(areasVazias > 0) {
        do {
          geraAreaAle();
        } while(typeof(a[ale])=='string');
      }
      eventos[ale]();
    }
  }
}


//controla o inicio e reinicio do jogo
function novoJogo() {
  //defiine o tipo de jogo
  tipo[0].checked ? tipoDeJogo = 0 : tipoDeJogo = 1;
  nivel[0].checked ? dificuldade = 0 : dificuldade = 1;
  
  if (jogando==1) {
    let novoJogo = confirm("Apagar jogo atual e iniciar um novo jogo?");
    if (novoJogo) {
      jogando=0;jogo();jogando=1;jogo();
      alertas.innerHTML=`Jogo iniciado!`;
      alertas.style.display='inline-block';
      jogadorAtual.style.display='inline-block';
      
      if (tipoDeJogo==0) {
        //responsável por achar a area vazia e fazer a jogada da cpu
        if (dificuldade==0) {
          jogadaCpu = setInterval(()=>{fazJogadaDaCpuFacil()},1);
        } else {
          jogadaCpu = setInterval(()=>{fazJogadaDaCpuDificil()},1);
        }
      } else {
        clearInterval(jogadaCpu);
      }
      //configura o simbolo do jogador e cpu
      if (simbolo[0].checked) {
        jogador = 'X';cpu = 'O';
      } else {
        jogador = 'O';cpu = 'X';
      }
      escolheSimbolo();
      opcoes.removeAttribute("open");
    }
  } else {
    jogando=1;jogo();alertas.innerHTML=`Jogo iniciado!`;alertas.style.display='inline-block';
    jogadorAtual.style.display='inline-block';
    
    if (tipoDeJogo==0) {
      //responsável por achar a area vazia e fazer a jogada da cpu
      if (dificuldade==0) {
        jogadaCpu = setInterval(()=>{fazJogadaDaCpuFacil()},1);
      } else {
        jogadaCpu = setInterval(()=>{fazJogadaDaCpuDificil()},1);
      }
    } else {
      clearInterval(jogadaCpu);
    }
    //configura o simbolo do jogador e cpu
    if (simbolo[0].checked) {
      jogador = 'X';cpu = 'O';
    } else {
      jogador = 'O';cpu = 'X';
    }
    escolheSimbolo();
    opcoes.removeAttribute("open");
  }
}
botaoIniciar.addEventListener("click", novoJogo);


//basicamente escolhe o simbolo e retorna pro jogador
function escolheSimbolo() {
  if (tipoDeJogo == 0) {
    xOuBola = numXouBola%2==1 ? jogador : cpu;
    jogadorAtual.innerHTML = `Vez ${numXouBola%2==1 ? 'da Cpu ⟨' + cpu + '⟩' : 'do Jogador 1 ⟨' + jogador + `⟩`}`;
  } else {
    xOuBola = numXouBola%2==1 ? jogador : cpu;
    jogadorAtual.innerHTML = `Vez ${numXouBola%2==1 ? 'do Jogador 2 ⟨' + cpu + '⟩' : 'do Jogador 1 ⟨' + jogador + '⟩'}`;
  }
}


//responsável por atribuir os simbolos e verificar erros e acertos
function xBola(area) {
  areasVazias--;
  if (tipoDeJogo == 0) {
    //isso controla qual simbolo (X ou O) aparecerá
    if (areas[area].innerHTML.length == 0) {
      numXouBola++;
      escolheSimbolo();
      a[area]=xOuBola;
      areas[area].innerHTML = xOuBola;
      alertas.innerHTML = ``;
      alertas.style.display ='none';
    }
    
    //verificando se ganhou ou deu velha
    if (a[0]==a[1] && a[1]==a[2] || a[0]==a[3] && a[3]==a[6] || a[0]==a[4] && a[4]==a[8]) {
      alertas.innerHTML = `${a[0]==jogador?'Jogador 1':'Cpu'} ganhou!`;
      alertas.style.display ='inline-block';
      jogadorAtual.style.display='none';
      opcoes.setAttribute("open", "");
      for (let i = 0; i < 9; i++) {
        areas[i].removeEventListener("click", eventos[i]);
      }
    } else if (a[1]==a[4] && a[4]==a[7]) {
      alertas.innerHTML = `${a[1]==jogador?'Jogador 1':'Cpu'} ganhou!`;
      alertas.style.display ='inline-block';
      jogadorAtual.style.display='none';
      opcoes.setAttribute("open", "");
      for (let i = 0; i < 9; i++) {
        areas[i].removeEventListener("click", eventos[i]);
      }
    } else if (a[2]==a[4] && a[4]==a[6] || a[2]==a[5] && a[5]==a[8]) {
      alertas.innerHTML = `${a[2]==jogador?'Jogador 1':'Cpu'} ganhou!`;
      alertas.style.display ='inline-block';
      jogadorAtual.style.display='none';
      opcoes.setAttribute("open", "");
      for (let i = 0; i < 9; i++) {
        areas[i].removeEventListener("click", eventos[i]);
      }
    } else if (a[3]==a[4] && a[4]==a[5]) {
      alertas.innerHTML = `${a[3]==jogador?'Jogador 1':'Cpu'} ganhou!`;
      alertas.style.display ='inline-block';
      jogadorAtual.style.display='none';
      opcoes.setAttribute("open", "");
      for (let i = 0; i < 9; i++) {
        areas[i].removeEventListener("click", eventos[i]);
      }
    } else if (a[6]==a[7] && a[7]==a[8]) {
      alertas.innerHTML = `${a[6]==jogador?'Jogador 1':'Cpu'} ganhou!`;
      alertas.style.display ='inline-block';
      jogadorAtual.style.display='none';
      opcoes.setAttribute("open", "");
      for (let i = 0; i < 9; i++) {
        areas[i].removeEventListener("click", eventos[i]);
      }
    } else if (typeof(a[0])!='number' && typeof(a[1])!='number' && typeof(a[2])!='number' && typeof(a[3])!='number' && typeof(a[4])!='number' && typeof(a[5])!='number' && typeof(a[6])!='number' && typeof(a[7])!='number' && typeof(a[8])!='number') {
      alertas.innerHTML = `Deu velha! (Empate)`;
      alertas.style.display ='inline-block';
      jogadorAtual.style.display='none';
      opcoes.setAttribute("open", "");
      for (let i = 0; i < 9; i++) {
        areas[i].removeEventListener("click", eventos[i]);
      }
    }
  } else {
    //isso controla qual simbolo (X ou O) aparecerá
    if (areas[area].innerHTML.length == 0) {
      numXouBola++;
      escolheSimbolo();
      a[area]=xOuBola;
      areas[area].innerHTML = xOuBola;
      alertas.innerHTML = ``;
      alertas.style.display ='none';
    }
    
    //verificando se ganhou ou deu velha
    if (a[0]==a[1] && a[1]==a[2] || a[0]==a[3] && a[3]==a[6] || a[0]==a[4] && a[4]==a[8]) {
      alertas.innerHTML = `${a[0]==jogador?'Jogador 1':'Jogador 2'} ganhou!`;
      alertas.style.display ='inline-block';
      jogadorAtual.style.display='none';
      opcoes.setAttribute("open", "");
      for (let i = 0; i < 9; i++) {
        areas[i].removeEventListener("click", eventos[i]);
      }
    } else if (a[1]==a[4] && a[4]==a[7]) {
      alertas.innerHTML = `${a[1]==jogador?'Jogador 1':'Jogador 2'} ganhou!`;
      alertas.style.display ='inline-block';
      jogadorAtual.style.display='none';
      opcoes.setAttribute("open", "");
      for (let i = 0; i < 9; i++) {
        areas[i].removeEventListener("click", eventos[i]);
      }
    } else if (a[2]==a[4] && a[4]==a[6] || a[2]==a[5] && a[5]==a[8]) {
      alertas.innerHTML = `${a[2]==jogador?'Jogador 1':'Jogador 2'} ganhou!`;
      alertas.style.display ='inline-block';
      jogadorAtual.style.display='none';
      opcoes.setAttribute("open", "");
      for (let i = 0; i < 9; i++) {
        areas[i].removeEventListener("click", eventos[i]);
      }
    } else if (a[3]==a[4] && a[4]==a[5]) {
      alertas.innerHTML = `${a[3]==jogador?'Jogador 1':'Jogador 2'} ganhou!`;
      alertas.style.display ='inline-block';
      jogadorAtual.style.display='none';
      opcoes.setAttribute("open", "");
      for (let i = 0; i < 9; i++) {
        areas[i].removeEventListener("click", eventos[i]);
      }
    } else if (a[6]==a[7] && a[7]==a[8]) {
      alertas.innerHTML = `${a[6]==jogador?'Jogador 1':'Jogador 2'} ganhou!`;
      alertas.style.display ='inline-block';
      jogadorAtual.style.display='none';
      opcoes.setAttribute("open", "");
      for (let i = 0; i < 9; i++) {
        areas[i].removeEventListener("click", eventos[i]);
      }
    } else if (typeof(a[0])!='number' && typeof(a[1])!='number' && typeof(a[2])!='number' && typeof(a[3])!='number' && typeof(a[4])!='number' && typeof(a[5])!='number' && typeof(a[6])!='number' && typeof(a[7])!='number' && typeof(a[8])!='number') {
      alertas.innerHTML = `Deu velha! (Empate)`;
      alertas.style.display ='inline-block';
      jogadorAtual.style.display='none';
      opcoes.setAttribute("open", "");
      for (let i = 0; i < 9; i++) {
        areas[i].removeEventListener("click", eventos[i]);
      }
    }
  }
}