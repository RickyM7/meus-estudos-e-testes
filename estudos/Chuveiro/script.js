let botao = document.querySelector("#botao");
let gasto = document.querySelector("#gasto");
let aguaGasta = 0;
let vazao = 0;
let chuveiroLigado;

//controle do botao e nivel de vazão da água
botao.addEventListener("click", ()=>{
  if (vazao == 0) {
    vazao = 1;
    botao.innerText = "↗";
    clearInterval(chuveiroLigado);
    chuveiroLigado = setInterval(()=>{
      if (vazao != 0) {
      aguaGasta += vazao;
      gasto.innerText = `Gasto de Água: ${aguaGasta}L`;
      }
    },1000);
  } else if (vazao == 1) {
    vazao = 2;
    botao.innerText = "➡";
    clearInterval(chuveiroLigado);
    chuveiroLigado = setInterval(()=>{
      if (vazao != 0) {
      aguaGasta += vazao;
      gasto.innerText = `Gasto de Água: ${aguaGasta}L`;
      }
    },1000);
  } else if (vazao == 2) {
    vazao = 0;
    botao.innerText = "⬆";
    clearInterval(chuveiroLigado);
    aguaGasta = vazao;
    gasto.innerText = `Gasto de Água: ${aguaGasta}L`;
  }
});