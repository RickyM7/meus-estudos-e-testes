// obtém as áreas que recebem os símbolos
let areas = Array.from(document.querySelectorAll('.area'));
// botão para iniciar/reiniciar jogo
let jogar = document.getElementById('jogar');
// recebe o tipo de jogo
let tipoDeJogo = document.querySelector('input[name="tipo"]:checked').value;
// cria o evento de clique na primeira iteração
let criarEvento = true;
let ganhou = false;
// possíveis sequências vitoriosas
let possVit = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
let isBolaOrX = true; // true é X e false é O
let quemJoga = true; // true para jogador e false para bot

// reseta as áreas que recebem os síbolos
function resetAreas (areas) {
    areas.forEach(element => {
        element.innerText =  '';
    });
}
// preenche os índices das possíveis vitórias
function preencherPossVit(simbolo, indice) {
    for (let i = 0; i < possVit.length; i++) {
        for (let j = 0; j < possVit[i].length; j++) {
            if (possVit[i][j] == indice) {
                possVit[i][j] = simbolo;
            }
        }
    }
}
// reseta a matriz de possíveis vitórias
function resetPossVit(possVit) {
    possVit = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    return possVit;
}

// criação e execução do jogo
function criarJogo() {
    // cria o evento de clique apenas uma vez
    if (criarEvento) {
        document.addEventListener('click', escreveSimbolos);
        criarEvento = false;
    }
    // verifica se o jogador ou bot ganhou
    function verificaSeGanhou(simbolo) {
        for (i in possVit) {
            if (possVit[i].every(sblo => sblo == simbolo)){
                alert(`Jogador '${simbolo}' GANHOU!!!`);
                ganhou = true;
                possVit = resetPossVit(possVit);
                jogar.disabled = false;
                break;
            } else {
                if (i >= possVit.length - 1 && areas.every(pos => pos.innerText != '')) {
                    alert('EMPATE, DEU VELHA!!!');
                    ganhou = true;
                    possVit = resetPossVit(possVit);
                    jogar.disabled = false;
                    break;
                    
                }
            }
        }
    }
    // função para o eventListener que serve para jogador e bot jogarem
    function escreveSimbolos(event){
        let simbolo = isBolaOrX ? 'X' : 'O'; // true é X e false é O
        if (!ganhou) {
            // verifica se é a área de jogo e se ela está vazia antes de atribuir um símbolo
            if (event.target.className == 'area' && event.target.innerText == '') {
                event.target.innerHTML = simbolo;
                preencherPossVit(simbolo, areas.indexOf(event.target));
                verificaSeGanhou(simbolo);
                if (ganhou) {
                    return;
                } else {
                    if (tipoDeJogo == 'pvp') {
                        isBolaOrX = !isBolaOrX; // inverte o símbolo para a próxima jogada
                    } else { // tipo de jogo = jogador vs bot
                        isBolaOrX = !isBolaOrX; // inverte o símbolo para a próxima jogada
                        quemJoga = !quemJoga; // muda a jogada para o bot
                        simbolo = isBolaOrX ? 'X' : 'O';
                        criarJogo();
                    }
                }
            }
            if (tipoDeJogo == 'bot' && !quemJoga) {
                for (i in possVit) {
                    let indiceNum = possVit[i].findIndex(elemento => typeof elemento == 'number');
                    let indiceArea = possVit[i][indiceNum];
                    if ((possVit[i].filter(o => o == simbolo).length == 2) && indiceNum > -1) {
                        preencherPossVit(simbolo, indiceArea);
                        areas[indiceArea].innerText = simbolo;
                        verificaSeGanhou(simbolo);
                        return;
                    }
                }
                for (i in possVit) {
                    let indiceNum = possVit[i].findIndex(elemento => typeof elemento == 'number');
                    let indiceArea = possVit[i][indiceNum];
                    if ((possVit[i].filter(x => x == 'X').length == 2) && indiceNum > -1) {
                        preencherPossVit(simbolo, indiceArea);
                        areas[indiceArea].innerText = simbolo;
                        verificaSeGanhou(simbolo);
                        if (ganhou) {
                            return;
                        } else {
                            isBolaOrX = !isBolaOrX; // inverte o símbolo para a próxima jogada
                            quemJoga = !quemJoga; // muda a jogada para o jogador
                            break;
                        }
                    }
                }
                if (!quemJoga) {
                    for (i in possVit) {
                        let indiceNum = possVit[i].findIndex(elemento => typeof elemento == 'number');
                        let indiceArea = possVit[i][indiceNum];
                        if ((possVit[i].filter(x => x == 'X').length == 1) && indiceNum > -1) {
                            preencherPossVit(simbolo, indiceArea);
                            areas[indiceArea].innerText = simbolo;
                            verificaSeGanhou(simbolo);
                            if (ganhou) {
                                return;
                            } else {
                                isBolaOrX = !isBolaOrX; // inverte o símbolo para a próxima jogada
                                quemJoga = !quemJoga; // muda a jogada para o jogador
                                break;
                            }
                        } else {
                            preencherPossVit(simbolo, indiceArea);
                            areas[indiceArea].innerText = simbolo;
                            verificaSeGanhou(simbolo);
                            if (ganhou) {
                                return;
                            } else {
                                isBolaOrX = !isBolaOrX; // inverte o símbolo para a próxima jogada
                                quemJoga = !quemJoga; // muda a jogada para o jogador
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
}

// evento que serve para iniciar ou reiniciar o jogo
jogar.addEventListener('click', function criaJogo(){
    alert("O JOGO COMEÇOU!");
    possVit = resetPossVit(possVit);
    resetAreas(areas);
    isBolaOrX = true;
    quemJoga = true;
    ganhou = false;
    jogar.disabled = true;
    tipoDeJogo = document.querySelector('input[name="tipo"]:checked').value;
    criarJogo();
});