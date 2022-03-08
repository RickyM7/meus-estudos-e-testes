let oNome = document.querySelector("#nome");
let aNota1 = document.querySelector("#nota1");
let aNota2 = document.querySelector("#nota2");
let osDados = document.querySelector("#osDados");
let aprovOuReprov = document.querySelector("#aprovOuReprov");
let aluno = document.querySelector("#aluno");
let n1 = document.querySelector("#n1");
let n2 = document.querySelector("#n2");
let m = document.querySelector("#m");
let nome;
let nota1;
let nota2;
let notaMedia;
let aprovadoOuReprovado;
let chaveAluno = localStorage.getItem("nome");


function media() {
  //recebe os valores dos inputs
  nome = oNome.value;
  nota1 = aNota1.value;
  nota2 = aNota2.value;
  localStorage.setItem("nome", nome);
  
  //configurações quando não tiver nada escrito nos inputs
  if (nome.length == 0) {
    nome = 'Aluno';
  }
  if (nota1.length == 0) {
    nota1 = 10;
  }
  if (nota2.length == 0) {
    nota2 = 10;
  }
  
  //limita o tamanho das notas
  if (Number(nota1) <= 0) {
    nota1 = 0;
    aNota1.value = nota1;
  } else if (Number(nota1) > 10) {
    nota1 = 10;
    aNota1.value = nota1;
  } else if (Number(nota2) <= 0) {
    nota2 = 0;
    aNota2.value = nota2;
  } else if (Number(nota2) > 10) {
    nota2 = 10;
    aNota2.value = nota2;
  }
  
  //personaliza a mensagem de aprovação/reprovação
  notaMedia = (Number(nota1) + Number(nota2))/2;
  if (notaMedia <= 3) {
    aprovadoOuReprovado = 'Reprovado';
    aprovOuReprov.style.backgroundColor = '#cc0000';
    n1.style.backgroundColor = '#cc0000c0';
    n2.style.backgroundColor = '#cc0000c0';
    m.style.backgroundColor = '#cc0000c0';
  } else if (notaMedia <= 6) {
    aprovadoOuReprovado = 'Recuperação';
    aprovOuReprov.style.backgroundColor = '#a3a328';
    n1.style.backgroundColor = '#a3a328c0';
    n2.style.backgroundColor = '#a3a328c0';
    m.style.backgroundColor = '#a3a328c0';
  } else if (notaMedia > 6) {
    aprovadoOuReprovado = 'Aprovado';
    aprovOuReprov.style.backgroundColor = '#008000';
    n1.style.backgroundColor = '#008000c0';
    n2.style.backgroundColor = '#008000c0';
    m.style.backgroundColor = '#008000c0';
  }
  
  //escreve os dados no documento
  aluno.innerHTML = `${nome}`;
  n1.innerHTML = `${nota1}`;
  n2.innerHTML = `${nota2}`;
  m.innerHTML = `${notaMedia}`;
  aprovOuReprov.innerHTML = aprovadoOuReprovado;
}

//eventos para escrever os dados dinamicamente
oNome.addEventListener("keydown", media);
aNota1.addEventListener("keydown", media);
aNota2.addEventListener("keydown", media);
oNome.addEventListener("keyup", media);
aNota1.addEventListener("keyup", media);
aNota2.addEventListener("keyup", media);

//atribuindo o nome do aluno salvo no localStorage
function salvaNome() {
  if (chaveAluno.length == 0) {
    localStorage.setItem("nome", 'Aluno');
    aluno.innerHTML = chaveAluno;
  } else {
    aluno.innerHTML = chaveAluno;
    oNome.value = chaveAluno;
  }
}
window.addEventListener("load", salvaNome);