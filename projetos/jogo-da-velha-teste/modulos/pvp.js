let areas = Array.from(document.querySelectorAll('.area'));
let jogando = false;
let jogar = document.getElementById('jogar');
// possíveis sequências vitoriosas
let possVit = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
let isBolaOrX = true; // true é X e false é O
let quemJoga = true; // true para jogador e false para bot
let tipoDeJogo = document.querySelector('input[name="tipo"]:checked').value;

function resetAreas (areas) {
    areas.forEach(element => {
        element.innerText =  '';
    });
}
function resetPossVit(possVit) {
    possVit = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    return possVit;
}
function preencherPossVit(simbolo, indice) {
    for (let i = 0; i < possVit.length; i++) {
        for (let j = 0; j < possVit[i].length; j++) {
            if (possVit[i][j] == indice) {
                possVit[i][j] = simbolo;
            }
        }
    }
}


function criarJogo() {
    if (jogando) {
        document.addEventListener('click', function escreveSimbolos(event){
            let simbolo = isBolaOrX ? 'X' : 'O'; // true é X e false é O
            // verifica se é a área de jogo e se ela está vazia antes de atribuir um símbolo
            if (event.target.className == 'area' && event.target.innerText == '') {
                event.target.innerText = simbolo;
                preencherPossVit(simbolo, areas.indexOf(event.target));
                isBolaOrX = !isBolaOrX; // inverte o símbolo para a próxima jogada
                for (i in possVit) {
                    if (possVit[i].every(sblo => sblo == simbolo)){
                        alert(`Jogador '${simbolo}' GANHOU!!!`);
                        jogando = false;
                        criarJogo();
                        this.removeEventListener('click', escreveSimbolos);
                    }
                }
            }
        });
    } else {
        jogar.addEventListener('click', function criaJogo(){
            alert("O JOGO COMEÇOU");
            possVit = resetPossVit(possVit);
            resetAreas(areas);
            jogando = true;
            criarJogo();
            this.removeEventListener('click', criaJogo);
            tipoDeJogo = document.querySelector('input[name="tipo"]:checked').value;
        })
    }
}
criarJogo();