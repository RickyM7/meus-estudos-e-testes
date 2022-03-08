function multiplicar() {
  let multiplicando = window.document.querySelector("input#multiplicando").value;
  let inicio = window.document.querySelector("input#inicio").value;
  let final = window.document.querySelector("input#final").value;
  let resultado = window.document.querySelector("select#resultado");
  resultado.innerHTML = ``;
  
  if (multiplicando.length == 0 || inicio.length == 0 || final.length == 0) {
    resultado.innerHTML = `<option>ERRO: Dados faltando!</option>`;
  } else {
    let multi = Number(multiplicando);
    let ini = Number(inicio);
    let fim = Number(final);
    
    if (ini < fim) {
      for (let r = ini; r <= fim; r++) {
      resultado.innerHTML += `<option value="v${r}">${multi} x ${r} = ${multi * r}</option>`;
      }
    } else {
      for (let r = ini; r >= fim; r--) {
      resultado.innerHTML += `<option value="v${r}">${multi} x ${r} = ${multi * r}</option>`;
      }
    }
  }
}