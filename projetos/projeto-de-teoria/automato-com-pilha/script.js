// constantes que recebem os elementos da página html
const botaoTestar = document.getElementById('btn-testar')
const inputPalavra = document.getElementById('palavra')
const resultado = document.getElementById('resultado')

// Autômato com pilha da linguagem {aⁿbⁿ | n ≥ 0}
function automato(palavra) {
    // definição da pilha (ela começa vazia)
    let pilha = []
    // verifica se é a palavra vazia antes de tudo (a palavra vazia é aceita)
    if (palavra == '') {
        resultado.innerText = "A palavra vazia (ε) é aceita na linguagem."
    } else {
        // devolve os caracteres e os índices deles para cada palavra
        for (indice = 0; indice < palavra.length; indice++) {
            // palavra[indice] = caractere
            if (palavra[indice] == 'a') {
                // se o caractere é 'a' um 'X' é adicionado à pilha
                pilha.push('X')
            } else if (palavra[indice] == 'b') {
                if (pilha.length > 0) {
                    // se o caractere é 'b' e a pilha não está vazia um 'X' é removido da pilha
                    pilha.pop()
                } else {
                    // se o caractere é 'b' e a pilha está vazia então a palavra não é aceita
                    resultado.innerText = 'A palavra não é aceita.'
                    break;
                }
            } else {
                // se o caractere é diferente de 'ε', 'a' e 'b' a palavra não é aceita
                resultado.innerText = 'A palavra não é aceita.'
                break;
            }
            /* verifica se a palavra foi inteiramente lida e se a pilha está 
               vazia ou não para aceitar ou rejeitar a palavra */
            if ((indice == palavra.length - 1) && pilha.length == 0) {
                resultado.innerText = 'A palavra é aceita.'
            } else if ((indice == palavra.length - 1) && pilha.length > 0) {
                resultado.innerText = 'A palavra não é aceita.'
            }
        }
    }
}

// define o evento de clique para testar as palavras na página ao clicar no botão
botaoTestar.addEventListener('click', ()=>{automato(inputPalavra.value)})
// define o evento de clique no enter para testar as palavras na página ao clicar no botão
inputPalavra.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter') {
        automato(inputPalavra.value)
    }
})