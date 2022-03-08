let texto = document.querySelector("#texto");
let digitado = document.querySelector("#digitado");

function teclas() {
  let tecla = event.key;
  let codTecla = event.keyCode;
  if (codTecla == 13 || codTecla == 8) {
    document.getElementsByTagName("header")[0].innerHTML = `<pre>${texto.value}</pre>`;
  }
  digitado.innerHTML = `<p>Tecla pressionada: ${tecla}<br/>Código da Tecla: ${codTecla}</p>`;
}

window.addEventListener("keydown", teclas);
window.addEventListener("keyup", teclas);