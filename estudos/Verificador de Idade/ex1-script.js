function verificar() {
  let anoAtual = Number(new Date().getFullYear());
  let anoDeNascimento = window.document.querySelector("input#ano").value;
  let idade = anoAtual - anoDeNascimento;
  let sexo = window.document.getElementsByName("sexo");
  let genero = sexo[0].checked ? "homem" : "mulher";
  let result = window.document.querySelector("div#resultado");
  let imagem = document.createElement("img");
  
  if (anoDeNascimento > anoAtual || anoDeNascimento <= 0 || idade > 150) {
    alert("ERRO: Dados Inválidos, tente novamente!");
  } else if (idade >= 0 && idade <= 12) {
    if (genero == "homem") {
      result.innerHTML = `<p>Você é um ${genero} e tem/completará ${idade} anos! Que porra tu tá fazendo na internet?</p>`;
      imagem.setAttribute("src", "/imgs/criancahomem.jpg");
    } else {
      result.innerHTML = `<p>Você é uma ${genero} e tem/completará ${idade} anos! Que porra tu tá fazendo na internet?</p>`;
      imagem.setAttribute("src", "/imgs/criancamulher.jpg");
    }
  } else if (idade > 12 && idade <= 22) {
    if (genero == "homem") {
      result.innerHTML = `<p>Você é um ${genero} e tem/completará ${idade} anos! Saiba que o mundo todo te odeia!</p>`;
      imagem.setAttribute("src", "/imgs/jovemhomem.jpg");
    } else {
      result.innerHTML = `<p>Você é uma ${genero} e tem/completará ${idade} anos! Saiba que o mundo todo te odeia!</p>`;
      imagem.setAttribute("src", "/imgs/jovemmulher.jpg");
    }
  } else if (idade > 22 && idade <= 50) {
    if (genero == "homem") {
      result.innerHTML = `<p>Você é um ${genero} e tem/completará ${idade} anos! Tu pode me dar dinheiro?</p>`;
      imagem.setAttribute("src", "/imgs/adulto.jpg");
    } else {
      result.innerHTML = `<p>Você é uma ${genero} e tem/completará ${idade} anos! Tu pode me dar dinheiro?</p>`;
      imagem.setAttribute("src", "/imgs/adulta.jpg");
    }
  } else {
    if (genero == "homem") {
      result.innerHTML = `<p>Você é um ${genero} e tem/completará ${idade} anos! Tá com o plano em dias?</p>`;
      imagem.setAttribute("src", "/imgs/idoso.jpg");
    } else {
      result.innerHTML = `<p>Você é uma ${genero} e tem/completará ${idade} anos! Tá com o plano em dias?</p>`;
      imagem.setAttribute("src", "/imgs/idosa.jpg");
    }
  }
  result.appendChild(imagem);
};

function modoNoturno() {
  let hora = Number(new Date().getHours());
  let corpo = window.document.querySelector("body");
  
  if (hora < 6 || hora > 17) {
    corpo.style.background = "#333333";
    corpo.style.color = "white";
  } else {
    corpo.style.background = "rgb(050, 100, 222)";
    corpo.style.color = "white";
  }
};