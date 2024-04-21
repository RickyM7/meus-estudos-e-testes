let jogo = document.getElementById("jogo");
let dino = document.getElementById("dino");
let pontos = document.getElementById('pontos');
let timer = 0; // Inicializa o timer
let jogoAtivo = false;
let pontuacao = 0;
let dinoPosY = jogo.offsetHeight - dino.clientHeight;
let dinoPosX = 0;

// Move o dino para baixo
dino.style.transform = `translate(${dinoPosX}px, ${dinoPosY}px)`;

function pular() {
    if (timer == 0) {
        let inicio = Date.now();
        timer = setInterval(() => {
            let tempoPassado = Date.now() - inicio;
            if (tempoPassado >= 250) {
                clearInterval(timer);
                let tempoRestante = 250;
                timer = setInterval(() => {
                    tempoRestante -= 10;
                    dino.style.transform = `translate(${dinoPosX}px, ${dinoPosY - tempoRestante / 3}px)`;
                    if (tempoRestante <= 0) {
                        clearInterval(timer);
                        timer = 0;
                    }
                }, 10);
            }
            dino.style.transform = `translate(${dinoPosX}px, ${dinoPosY - tempoPassado / 3}px)`;
        }, 10);
    }
}

function criarCactus() {
    let cactoDiv = document.createElement('div');
    cactoDiv.className = 'cacto';

    let cactoImg = document.createElement('img');
    cactoImg.src = './SmallCactus1.png';
    cactoImg.width = 20;
    cactoImg.height = 30;

    // Posicionar o cacto usando translate
    let posicaoInicial = jogo.offsetWidth - 21;
    cactoDiv.style.transform = `translate(${posicaoInicial}px, ${jogo.offsetHeight - dino.offsetHeight - 30}px)`;
    cactoDiv.style.position = 'absolute';
    cactoDiv.appendChild(cactoImg);
    jogo.appendChild(cactoDiv);

    return { element: cactoDiv, position: posicaoInicial };
}


function moverCactus() {
    let cactos = [];

    function criarCactos() {
        const intervaloCactos = setInterval(() => {
            let cacto = criarCactus();
            cactos.push(cacto);
            if (!jogoAtivo) {
                clearInterval(intervaloCactos);
            }
        }, 1000);
    }
    criarCactos();

    function animar() {
        if (jogoAtivo) {
            for (let index = 0; index < cactos.length; index++) {
                let cacto = cactos[index];
                cacto.position -= 3; // Velocidade dos cactos
                cacto.element.style.transform = `translate(${cacto.position}px, ${jogo.offsetHeight - dino.offsetHeight - 30}px)`;
                if (cacto.position <= -20) {
                    jogo.removeChild(cacto.element);
                    cactos.splice(index, 1);
                    index--;
                    pontuacao++;
                    pontos.innerText = `PONTUAÇÂO: ${pontuacao}`;
                }
                if (colisao(dino, cacto.element)) {
                    clearInterval(timer);
                    jogoAtivo = false;
                    pontos.innerText = `PERDEU!
                                        Você fez ${pontuacao} pontos, parabéns!
                                        Aperte Enter para reiniciar.`;
                    pontos.style.color = 'red';
                    pontos.style.backgroundColor = 'black';
                    window.addEventListener("keydown", (e) => {if (e.code == 'Enter' && !jogoAtivo) {reiniciarJogo();}});
                    break;
                }
            }
            requestAnimationFrame(animar);
        }
    }
    animar();
}

function colisao(dino, cacto) {
    let dinoRect = dino.getBoundingClientRect();
    let cactoRect = cacto.getBoundingClientRect();

    return !(
        dinoRect.top > cactoRect.bottom ||
        dinoRect.bottom -3 < cactoRect.top ||
        dinoRect.right -10 < cactoRect.left ||
        dinoRect.left +10 > cactoRect.right
    );
}

function limparTela() {
    // Remove apenas os elementos relacionados aos cactos
    let elementosCactos = jogo.querySelectorAll('.cacto');
    elementosCactos.forEach(cacto => jogo.removeChild(cacto));
    pontuacao = 0;
}

function reiniciarJogo() {
    limparTela();
    jogoAtivo = true;
    moverCactus();
    timer = 0;
    pontos.innerText = `PONTUAÇÂO: 0`;
    pontos.style.color = 'black';
    pontos.style.backgroundColor = 'transparent';

    // // Posiciona o dinossauro no início do jogo
    dinoPosY = jogo.offsetHeight - dino.clientHeight;
    // dinoPosX = 0;

    // Atualiza a posição do dinossauro
    dino.style.transform = `translateY(${dinoPosY}px)`;

    window.addEventListener("keydown", (e) => {if (e.code == 'Enter' && !jogoAtivo) {reiniciarJogo();}});
}


// Eventos 
window.addEventListener("keydown", (e) => {
    if (e.code == 'ArrowUp') {
        pular();
    }
});

window.addEventListener("keydown", (e) => {if (e.code == 'Enter' && !jogoAtivo) {reiniciarJogo();}});