//atribuindo ano atual ao copyright
window.addEventListener("load", ()=>{
  document.querySelector("footer>p").innerHTML = `&copy;${new Date().getFullYear()} RMS. Todos os direitos reservados.`;
});