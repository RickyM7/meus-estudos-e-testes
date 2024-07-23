(function() {
let jogo = document.getElementById("jogo");
let dinoAS = document.getElementById("dinoAS");
let pontosAS = document.getElementById('pontosAS');
let timerAS = 0; // Inicializa o timerAS
let jogoAtivoAS = false;
let pontuacaoAS = 0;
let dinoASPosY = 0;
let dinoASPosX = 0;
let velocidadeCactoAS = 3; // Velocidade inicial dos cactos
let intervaloCactosAS = 1000; // Intervalo inicial para criar cactos

function pularAS() {
    if (timerAS == 0) {
        let inicio = Date.now();
        timerAS = setInterval(() => {
            let tempoPassado = Date.now() - inicio;
            if (tempoPassado >= 250) {
                clearInterval(timerAS);
                let tempoRestante = 250;
                timerAS = setInterval(() => {
                    tempoRestante -= 10;
                    dinoAS.style.transform = `translateY(${tempoRestante / 3}px) rotate(180deg) scaleX(-1)`;
                    if (tempoRestante <= 0) {
                        clearInterval(timerAS);
                        timerAS = 0;
                    }
                }, 10);
            }
            dinoAS.style.transform = `translateY(${tempoPassado / 3}px) rotate(180deg) scaleX(-1)`;
        }, 10);
    }
}

function criarCactusAS() {
    let cactoASDiv = document.createElement('div');
    cactoASDiv.className = 'cactoAS';

    let cactoASImg = document.createElement('img');
    cactoASImg.src = './SmallCactus1.png';
    cactoASImg.width = 20;
    cactoASImg.height = 30;

    // Posicionar o cacto usando translate
    let posicaoInicial = jogo.offsetWidth - 21;
    cactoASDiv.style.transform = `translate(${posicaoInicial}px, ${-45}px) rotate(180deg) scaleX(-1)`;
    cactoASDiv.style.position = 'absolute';
    cactoASDiv.appendChild(cactoASImg);
    jogo.appendChild(cactoASDiv);

    return { element: cactoASDiv, position: posicaoInicial };
}

function moverCactusAS() {
    let cactosAS = [];
    let ultimoTempo = 0;

    function criarCactosAS() {
        if (!jogoAtivoAS) return;
        let tempoAtual = Date.now();
        if (tempoAtual - ultimoTempo >= intervaloCactosAS) {
            let cactoAS = criarCactusAS();
            cactosAS.push(cactoAS);
            ultimoTempo = tempoAtual;
        }
        requestAnimationFrame(criarCactosAS);
    }

    function animarAS() {
        if (jogoAtivoAS) {
            for (let index = 0; index < cactosAS.length; index++) {
                let cactoAS = cactosAS[index];
                cactoAS.position -= velocidadeCactoAS; // Velocidade dos cactos
                cactoAS.element.style.transform = `translate(${cactoAS.position}px, ${-45}px) rotate(180deg) scaleX(-1)`;
                if (cactoAS.position <= 0) {
                    jogo.removeChild(cactoAS.element);
                    cactosAS.splice(index, 1);
                    index--;
                    pontuacaoAS++;
                    pontosAS.style.color = 'red';
                    pontosAS.innerText = `PONTUAÇÃO (Agente Simples): ${pontuacaoAS}`;

                    if (pontuacaoAS % 10 === 0) {
                        velocidadeCactoAS += 0.5; // Aumenta a velocidade dos cactos a cada 10 pontos
                        intervaloCactosAS = Math.max(200, intervaloCactosAS - 50); // Diminui o intervalo de criação dos cactos, até um mínimo de 200ms
                    }
                }
                if (colisaoAS(dinoAS, cactoAS.element)) {
                    clearInterval(timerAS);
                    jogoAtivoAS = false;
                    pontosAS.innerText = `PERDEU!
                                        Você fez ${pontuacaoAS} pontos, parabéns!
                                        Aperte Enter para reiniciar.`;
                    pontosAS.style.color = 'red';
                    pontosAS.style.backgroundColor = 'black';
                    window.addEventListener("keydown", (e) => {if (e.code == 'Enter' && !jogoAtivoAS) {reiniciarJogoAS();}});
                    break;
                }
            }
            requestAnimationFrame(animarAS);
        }
    }
    criarCactosAS();
    animarAS();
}

function colisaoAS(dinoAS, cactoAS) {
    let dinoASRect = dinoAS.getBoundingClientRect();
    let cactoASRect = cactoAS.getBoundingClientRect();

    return !(
        dinoASRect.top > cactoASRect.bottom ||
        dinoASRect.bottom -3 < cactoASRect.top ||
        dinoASRect.right -10 < cactoASRect.left ||
        dinoASRect.left +10 > cactoASRect.right
    );
}

function limparTelaAS() {
    // Remove apenas os elementos relacionados aos cactos
    let elementosCactosAS = jogo.querySelectorAll('.cactoAS');
    elementosCactosAS.forEach(cactoAS => jogo.removeChild(cactoAS));
    pontuacaoAS = 0;
}

function reiniciarJogoAS() {
    limparTelaAS();
    jogoAtivoAS = true;
    velocidadeCactoAS = 3; // Reseta a velocidade dos cactos
    intervaloCactosAS = 1000; // Reseta o intervalo de criação dos cactos
    moverCactusAS();
    timerAS = 0;
    pontosAS.innerText = `PONTUAÇÃO (Agente Simples): 0`;
    pontosAS.style.color = 'red';
    pontosAS.style.backgroundColor = 'transparent';

    // Posiciona o dinossauro no início do jogo
    dinoASPosY = jogo.offsetHeight - dinoAS.clientHeight;
    dinoASPosX = 0;

    // Atualiza a posição do dinossauro
    dinoAS.style.transform = `translateY(0px) rotate(180deg) scaleX(-1)`;

    window.addEventListener("keydown", (e) => {if (e.code == 'Enter' && !jogoAtivoAS) {reiniciarJogoAS();}});
}

function iniciarAgenteAS(sensor) {
    agente_timerAS = setInterval(() => {
        if(sensor()) {
            acionadorAS();
        }
        if (!jogoAtivoAS) {
            clearInterval(agente_timerAS);
        }
    }, 50);
}

// Agente Reativo Simples
function agenteSimplesAS() {
    iniciarAgenteAS(sensorASAS);
}

// Agente Reativo Baseado em Modelo
function agenteModeloAS() {
    iniciarAgenteAS(sensorAMAS);
}

function sensorASAS() {
    let dinoASRect = dinoAS.getBoundingClientRect();
    let cactoAS = document.getElementsByClassName('cactoAS')[0];
    let cactoASRect = cactoAS.getBoundingClientRect();

    return (dinoASRect.right + 20) >= cactoASRect.left; 
}

function sensorAMAS(){
    let dinoASRect = dinoAS.getBoundingClientRect();
    let cactoAS = document.getElementsByClassName('cactoAS')[0];
    let cactoASRect = cactoAS.getBoundingClientRect();
    let estado = velocidadeCactoAS;
    let modelo = (estado - 3) * 12; 

    return (dinoASRect.right + 20 + modelo) >= cactoASRect.left; 
}

function acionadorAS(){
    window.dispatchEvent(new KeyboardEvent('keydown', {code: 'ArrowDown'}));
}

// Eventos 
window.addEventListener("keydown", (e) => {
    if (e.code == 'ArrowDown') {
        pularAS();
    }
});

// Início no PC
window.addEventListener("keydown", (e) => {if (e.code == 'Enter' && !jogoAtivoAS) {
    reiniciarJogoAS();
    agenteSimplesAS();
    // agenteModelo();
}});
// Início no celular
window.addEventListener("click", () => {if (!jogoAtivoAS) {
    reiniciarJogoAS();
    agenteSimplesAS();
    // agenteModelo();
}});
})();