let area;
let derrota;
let tempoDerrota;
let carro;
let obsts; //obsts = obstaculos
let obst0;
let pontuacao;
let botaoInicia;
let jogador;
let recordes;
let alertas;
let tempoAlerta;
let cliquePulo;
let cliquePuloLargura;
let cliquePuloAltura;
let inicialX;
let finalX = 0;
let alturaPulo = 50;
let animaPulo;
let tempoPulo = 0;
let velMov = 5; //velocidade do movimento
let animaObst;
let pontos = 0;
let pontosAumentaVel = 0;
let listaRecordes = []; //para evitar recordes repetidos
let listaJogadores = []; //para evitar recordes repetidos
let n = 0; //numero adicionado ao nomes repetidos;
let listaNomePontos = {}; //nome e os pontos do jogador
let nomesJogadores;
let jogando = 0;
let pulando = 0;
let faixaPulo = 0;
let cimaBaixo = 0;


//função que faz o carro pular
function pulo() {
  faixaPulo++;
  if (faixaPulo % 2 == 1) {
    pulando = 1;
    carro.style.top = 0;
    carro.style.bottom = 'inherit';
  } else {
    pulando = 0;
    carro.style.top = 'inherit';
    carro.style.bottom = 0;
  }
}

//função da parte que você clica para o carro mudar de.faixa
function areaCliquePulo() {
  cliquePuloLargura = window.document.body.offsetWidth;
  cliquePuloAltura = window.innerHeight-window.document.body.offsetHeight-35;
  cliquePulo.style.width = `${cliquePuloLargura}px`;
  cliquePulo.style.height = `${cliquePuloAltura}px`;
}

//função que move o obstaculo e diz se você perdeu
function obstaculo() {
  inicialX = area.offsetWidth-carro.offsetWidth;
  let yAleatorio = cimaBaixo == 0 ? 0 : 50;
  if (jogando%2==1) {
    //atribuindo pulo
    areaCliquePulo();
    cliquePulo.addEventListener("touchstart", pulo);
    /*-----------------------*/
    animaObst = requestAnimationFrame(obstaculo);
    jogador.setAttribute("disabled", "true");
    area.style.animationDuration = '0.5s';
    derrota.style.display = `none`;
    botaoInicia.style.backgroundColor = `#9a0505`;
    botaoInicia.innerText = `Parar Jogo`;
  } else {
    faixaPulo = 0;
    pulando = 0;
    cimaBaixo = 0;
    finalX = 0;
    obst0.style.bottom = `${yAleatorio}%`;
    obst0.style.right = `${finalX}px`;
    //removendo e resetando pulo
    cliquePulo.removeEventListener("touchstart", pulo);
    carro.style.top = 'inherit';
    carro.style.bottom = 0;
    /*-----------------------*/
    cancelAnimationFrame(animaObst);
    jogador.removeAttribute("disabled");
    area.style.backgroundImage = `url('./pistas/pista1.jpg')`;
    area.style.animationDuration = '0s';
    botaoInicia.style.backgroundColor = `#0e7115`;
    botaoInicia.innerText = `Iniciar Jogo`;
  }
  //parte importante, que faz o obst correr
  finalX += velMov;
  obst0.style.bottom = `${yAleatorio}%`;
  obst0.style.right = `${finalX}px`;
  if (finalX >= inicialX-carro.offsetWidth && pulando==0 && cimaBaixo==0) {
    //cria um alerta/popup
    derrota.innerHTML = `<p>Você perdeu! Pontos: ${pontos}</p>`;
    derrota.style.display = `block`;
    clearTimeout(tempoDerrota);
    tempoDerrota = setTimeout(()=>{derrota.style.display = `none`; clearTimeout(tempoDerrota); derrota.innerHTML=``;}, 4000);
    jogando=0;
    velMov=5;
    pontosAumentaVel=0;
    //configurações de pontos e recordes
    if (listaRecordes.indexOf(pontos) == -1) {
      if (pontos > Math.max.apply(Math, listaRecordes)) {
        //cria um alerta/popup
        alertas.innerHTML += `<p>Novo recorde! Pontos: ${pontos}</p>`;
        alertas.style.display = `block`;
        clearTimeout(tempoAlerta);
        tempoAlerta = setTimeout(()=>{alertas.style.display = `none`; clearTimeout(tempoAlerta); alertas.innerHTML=``;}, 3500);
      }
      listaRecordes.push(pontos);
      listaRecordes.sort(function(a, b){return b-a});
      if (jogador.value.length <= 0) {
        jogador.value='SemNome';
      }
      if (listaJogadores.indexOf(jogador.value) != -1) {
        n++;
        listaJogadores.push(`${jogador.value}${n}`);
      } else {
        n=0;
        listaJogadores.push(jogador.value);
      }
      listaNomePontos[listaJogadores[listaJogadores.length-1]] = pontos;
      nomesJogadores = Object.entries(listaNomePontos).sort(function(a,b){return b[1]-a[1]});
      recordes.innerHTML = `<tr><th>Posição</th><th>Jogador</th><th>Pontos</th></tr>`;
      for (let i = 0; i < nomesJogadores.length; i++) {
        recordes.innerHTML += `<tr><td>${i+1}</td><td>${nomesJogadores[i][0]}</td><td>${nomesJogadores[i][1]}</td></tr>`;
      }
    }
    pontos=0;
    pontuacao.innerHTML = `Pontos: ${pontos}`;
  } else if (finalX >= inicialX-carro.offsetWidth && pulando==1 && cimaBaixo==1) {
    //cria um alerta/popup
    derrota.innerHTML = `<p>Você perdeu! Pontos: ${pontos}</p>`;
    derrota.style.display = `block`;
    clearTimeout(tempoDerrota);
    tempoDerrota = setTimeout(()=>{derrota.style.display = `none`; clearTimeout(tempoDerrota); derrota.innerHTML=``;}, 4000);
    jogando=0;
    velMov=5;
    pontosAumentaVel=0;
    //configurações de pontos e recordes
    if (listaRecordes.indexOf(pontos) == -1) {
      if (pontos > Math.max.apply(Math, listaRecordes)) {
        //cria um alerta/popup
        alertas.innerHTML = `<p>Novo recorde! Pontos: ${pontos}</p>`;
        alertas.style.display = `block`;
        clearTimeout(tempoAlerta);
        tempoAlerta = setTimeout(()=>{alertas.style.display = `none`; clearTimeout(tempoAlerta); alertas.innerHTML=``;}, 3500);
      }
      listaRecordes.push(pontos);
      listaRecordes.sort(function(a, b){return b-a});
      if (jogador.value.length <= 0) {
        jogador.value='SemNome';
      }
      if (listaJogadores.indexOf(jogador.value) != -1) {
        n++;
        listaJogadores.push(`${jogador.value}${n}`);
      } else {
        listaJogadores.push(jogador.value);
      }
      listaNomePontos[listaJogadores[listaJogadores.length-1]] = pontos;
      nomesJogadores = Object.entries(listaNomePontos).sort(function(a,b){return b[1]-a[1]});
      recordes.innerHTML = `<tr><th>Posição</th><th>Jogador</th><th>Pontos</th></tr>`;
      for (let i = 0; i < nomesJogadores.length; i++) {
        recordes.innerHTML += `<tr><td>${i+1}</td><td>${nomesJogadores[i][0]}</td><td>${nomesJogadores[i][1]}</td></tr>`;
      }
    }
    pontos=0;
    pontuacao.innerHTML = `Pontos: ${pontos}`;
  } else if (finalX > inicialX) {
    cimaBaixo = parseInt(Math.random()*2);
    finalX = 0;
    obst0.style.bottom = `${yAleatorio}%`;
    obst0.style.right = `${finalX}px`;
    pontos++;
    pontuacao.innerHTML = `Pontos: ${pontos}`;
    if (pontos - pontosAumentaVel == 10) {
      pontosAumentaVel+=10;
      velMov++;
    }
  }
}

//função que carrega tudo do jogo
function carrega() {
  //carregar variáveis
  area = document.querySelector("#area");
  derrota = document.querySelector("#derrota");
  carro = document.querySelector("#carro");
  obsts = document.querySelectorAll(".obstaculo");
  obst0 = document.querySelector("#obst0");
  pontuacao = document.querySelector("#pontos");
  botaoInicia = document.querySelector("#iniciar");
  jogador = document.querySelector("#jogador");
  recordes = document.querySelector("#recordes");
  cliquePulo = document.querySelector("#cliquePulo");
  alertas = document.querySelector("#alertas");
  
  //carregar eventos
  botaoInicia.addEventListener("click", function(){jogando++;obstaculo();});
  //cliquePulo.addEventListener("touchstart", pulo);
}
window.addEventListener("load", carrega);
window.addEventListener("load", areaCliquePulo);