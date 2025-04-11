// importa a variável palavras do destino expecificado
import {temaPalavras} from "./palavras.js";

let temas = Object.keys(temaPalavras);
let tema;
let palavras;
let botaoNovoJogo = document.querySelector("#iniciar");
// para obter as coordenadas da tag section
let section = document.querySelectorAll("section")[0];
let boneco = document.querySelector("#boneco");
let caixasLetras = document.querySelector("#caixasLetras");
let dicas = document.querySelector("#dicas");
let palavra;
let palavraSemAcento;
let letra = document.querySelector("#letra");
let idLetra; // recebe o id de cada letra
let botaoEnviar = document.querySelector("#enviar");
// em dados fica o botão de enviar letra, o input, etc.
let dados = document.querySelector("#dados");
// ganhaPerde mostra a palavra correta no lugar dos dados
let ganhaPerde = document.querySelector("#ganhaPerde");
let digitadas = document.querySelector("#digitadas");
let tentativas = document.querySelector("#tentativas");
let letrasDigitadas = [];
let letrasAcertadas = [];
let letrasCertas = 0;
let erros = 0;
let jogando = 0; // 0 = pausado, 1 = jogando
let ganhouPerdeu = 0; // 0 = nada acontece, 1 = rotina de vitoria/derrota ocorre
// configurações dos alertas/popups
let alertas = document.querySelector("#alertas");
let tempoAlerta;

function jogo() {
  if (jogando == 1 && ganhouPerdeu == 0) {
    let tamanhoPalavra = palavra.length;
    // letraMin = letra minúscula, e o normalize serve pra tirar os acentos
    let letraMin = letra.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    
    if (letra.value.length == 0) {
      // cria um alerta/popup
      alertas.innerHTML = `<p>Por favor digite uma letra!</p>`;
      alertas.style.display = `block`;
      clearTimeout(tempoAlerta);
      tempoAlerta = setTimeout(()=>{alertas.style.display = `none`; clearTimeout(tempoAlerta); alertas.innerHTML=``;}, 2000);
    } else {
      if (palavraSemAcento.match(letraMin) == letraMin && letrasAcertadas.indexOf(letraMin) == -1) {
        letrasAcertadas.push(letraMin);
        
        // adiciona as letras aos seus lugares corretos
        for (let i = 0; i < tamanhoPalavra; i++) {
          if (palavraSemAcento.charAt(i) == letraMin) {
            idLetra = `#letra${i}`;
            document.querySelector(idLetra).innerHTML = palavra.charAt(i).toUpperCase();
            letrasCertas++;
          }
        }

      // Verifica se já acertou a letra
      } else if (letrasAcertadas.indexOf(letraMin) != -1) {
        // cria um alerta/popup
        alertas.innerHTML = `<p>Você já digitou e acertou essa letra!</p>`;
        alertas.style.display = `block`;
        clearTimeout(tempoAlerta);
        tempoAlerta = setTimeout(()=>{alertas.style.display = `none`; clearTimeout(tempoAlerta); alertas.innerHTML=``;}, 2000);
      }

      // Verifica se já foi digitada e se foi acertada
      if (letrasDigitadas.indexOf(letraMin.toUpperCase()) == -1) {
        letrasDigitadas.push(letraMin.toUpperCase());
        if (letrasAcertadas.indexOf(letraMin) == -1) {
          erros++;
        }
      } else {
        alertas.innerHTML = `<p>Você já digitou essa letra!</p>`;
          alertas.style.display = `block`;
          clearTimeout(tempoAlerta);
          tempoAlerta = setTimeout(()=>{alertas.style.display = `none`; clearTimeout(tempoAlerta); alertas.innerHTML=``;}, 2000);
      }
      digitadas.innerHTML = `Letras Digitadas: ${letrasDigitadas}`;
      
      // criando o boneco de acordo com a quantidade de erros
      switch (erros) {
        case 1:
          boneco.style.backgroundImage = "url('./imgs/forca1.png')";
          tentativas.innerHTML = 'Tentativas Restantes: 5';
          break;
        
        case 2:
          boneco.style.backgroundImage = "url('./imgs/forca2.png')";
          tentativas.innerHTML = 'Tentativas Restantes: 4';
          break;
        
        case 3:
          boneco.style.backgroundImage = "url('./imgs/forca3.png')";
          tentativas.innerHTML = 'Tentativas Restantes: 3';
          break;
        
        case 4:
          boneco.style.backgroundImage = "url('./imgs/forca4.png')";
          tentativas.innerHTML = 'Tentativas Restantes: 2';
          break;
        
        case 5:
          boneco.style.backgroundImage = "url('./imgs/forca5.png')";
          tentativas.innerHTML = 'Tentativas Restantes: 1';
          break;
        
        case 6:
          boneco.style.backgroundImage = "url('./imgs/forca6.png')";
          tentativas.innerHTML = 'Tentativas Restantes: 0';
          break;
      }
      
      // código de quando se ganha
      if (letrasCertas == tamanhoPalavra) {
        dados.style.display = `none`;
        ganhaPerde.innerHTML = `<h2>Você Ganhou!</h2><p>Palavra: ${palavra}</p><p>Tema: ${tema}</p><p>Quantidade de Letras: ${palavra.length}</p><p>Erros Cometidos: ${erros}</p>`;
        ganhaPerde.style.display = `inherit`;
        ganhaPerde.style.width = `${section.offsetWidth-boneco.offsetWidth}px`;
        ganhaPerde.style.transform = `translate(${section.offsetWidth-ganhaPerde.offsetWidth}px, ${-boneco.offsetHeight}px)`;
        dicas.style.display = 'none';
        ganhouPerdeu = 1;
      }
      
      // código de quando se perde
      if (erros >= 6) {
        dados.style.display = `none`;
        ganhaPerde.innerHTML = `<h2>Você Perdeu!</h2><p>Palavra: ${palavra}</p><p>Tema: ${tema}</p><p>Quantidade de Letras: ${palavra.length}</p><p>Erros Cometidos: ${erros}</p>`;
        ganhaPerde.style.display = `inherit`;
        ganhaPerde.style.width = `${section.offsetWidth-boneco.offsetWidth}px`;
        ganhaPerde.style.transform = `translate(${section.offsetWidth-ganhaPerde.offsetWidth}px, ${-boneco.offsetHeight}px)`;
        dicas.style.display = 'none';
        ganhouPerdeu = 1;
      }
    }
      letra.focus();
      letra.value = ``;
  }
}

function escolherPalavra() {
  // configurações principais daqui pra baixo
  if (jogando == 1) {
    // se novoJogo receber true (o botao Ok for clicado) um novo jogo é criado
    let novoJogo = confirm("Deseja apagar o jogo atual e criar um novo jogo?");
    if (novoJogo) {
      // organizando após gamhar ou perded
      letrasDigitadas.length = 0;
      letrasAcertadas.length = 0;
      letrasCertas = 0;
      erros = 0;
      boneco.style.backgroundImage = "url('./imgs/forca0.png')";
      tentativas.innerHTML = 'Tentativas Restantes: 6';
      letra.value = ``;
      letra.focus();
      caixasLetras.innerHTML = ``;
      digitadas.innerHTML = `Letras Digitadas:`;
      letra.focus();
      letra.value = ``;
      dicas.style.display = `inherit`;
      dados.style.display = `inherit`;
      ganhaPerde.style.display = `none`;
      jogando = 0;
      ganhouPerdeu = 0;
    }
  }
  
  if (jogando == 0) {
    // coloca o tentativas no local espertado
    tentativas.style.transform = `translate(${section.offsetWidth-tentativas.offsetWidth}px, ${-digitadas.offsetHeight}px)`;
    jogando = 1;
    // escolhe um tema e uma palavra aleatória
    tema = temas[parseInt(Math.random()*(temas.length))];
    palavras = temaPalavras[tema];
    palavra = `${palavras[parseInt(Math.random()*(palavras.length))].toLowerCase()}`;
    
    // remover os acentos da palavra escolhida
    palavraSemAcento = palavra.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    
    // cria os espaços que recebem as letras certas
    for (let i = 0; i < palavra.length; i++) {
        caixasLetras.innerHTML += `<div id='letra${i}'>&nbsp;</div>`;
    }

    // Atribuir espaços e hífens no início
    for (let i = 0; i < palavra.length; i++) {
      if (letrasDigitadas.indexOf(' ') == -1) {
        letrasDigitadas.push(' ');
      }
      digitadas.innerHTML = `Letras Digitadas: ${letrasDigitadas}`;
      if (palavraSemAcento.match(' ') == ' ' && letrasAcertadas.indexOf(' ') == -1) {
        letrasAcertadas.push(' ');
      }
      if (letrasDigitadas.indexOf('-') == -1) {
        letrasDigitadas.push('-');
      }
      digitadas.innerHTML = `Letras Digitadas: ${letrasDigitadas}`;
      if (palavraSemAcento.match('-') == '-' && letrasAcertadas.indexOf('-') == -1) {
        letrasAcertadas.push('-');
      }

      if (palavraSemAcento.charAt(i) == ' ') {
        idLetra = `#letra${i}`;
        document.querySelector(idLetra).innerHTML = '&nbsp;';
        document.querySelector(idLetra).style.backgroundColor = '#777777';
        letrasCertas++;
      }
      else if (palavraSemAcento.charAt(i) == '-') {
        idLetra = `#letra${i}`;
        document.querySelector(idLetra).innerHTML = '&mdash;';
        document.querySelector(idLetra).style.backgroundColor = '#777777';
        letrasCertas++;
      } 
    }
    
    // oferecendo uma letra e o tamanho da palavra como dicas
    let letraAleatoria = Math.floor(Math.random() * palavra.length);
    dicas.innerHTML = `Dicas:<br />Tema: ${tema}<br />Quantidade de Letras: ${palavra.length}<br/>${letraAleatoria+1}ª Letra: ${palavra.charAt(letraAleatoria).toUpperCase()}<br /><p>(Clique para esconder/Duplo clique para abrir)</p>`;
    dicas.style.transform = `translate(${section.offsetWidth-dicas.offsetWidth}px, ${-boneco.offsetHeight}px)`;
    letra.focus();
  }
}

// Eventos
botaoEnviar.addEventListener("click", jogo);
//  faz o botão enter testar a letra
document.addEventListener("keydown", function(event){
  if(event.key === 'Enter'){
    jogo();
  }
});

botaoNovoJogo.addEventListener("click", escolherPalavra);
document.addEventListener('keydown', function(event){
  if(event.key === 'Tab'){
    event.preventDefault();
    escolherPalavra();
  }
});
window.addEventListener("load", escolherPalavra);
// eventos para fechar/abrir a dica ao clicar nela
dicas.addEventListener("click", ()=>{dicas.style.display = 'none'});
window.addEventListener("dblclick", ()=>{dicas.style.display = 'block'});