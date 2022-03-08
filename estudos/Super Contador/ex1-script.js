function contar() {
  let inicio = window.document.querySelector("input#inicio").value;
  let fim = window.document.querySelector("input#fim").value;
  let pular = window.document.querySelector("input#pular").value;
  let resultado = window.document.querySelector("div#resultado");
  
  if (inicio.length == 0 || fim.length == 0 || pular.length == 0) {
    alert("ERRO: Dados faltando!");
  } else {
    resultado.innerHTML = ``;
    
    let i = Number(inicio);
    let f = Number(fim);
    let p = Number(pular);
    
    if (p <= 0) {
      alert(`Impossivel calcular, alterando pular para 1!`);
      p = 1;
    }
    
    /*Tudo que começa com '&#x' é um símbolo ou emoji*/
    if (i < f) {
      for (let c = i; c <= f; c += p) {
      resultado.innerHTML += `${c} &#x1F449`;
    }
    } else {
      for (let c = i; c >= f; c -= p) {
        resultado.innerHTML += ` ${c} &#x1F449`;
      }
    }
    resultado.innerHTML += `&#x1F3C1`;
  }
}