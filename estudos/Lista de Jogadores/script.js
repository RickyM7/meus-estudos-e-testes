let nome = document.querySelector("input#nome");
let jogos = document.querySelector("input#jogos");
let gols = document.querySelector("input#gols");
let resultado = document.querySelector("div#res");
let jogador;
let jogadorFormat;
let todosOsJogadores = [];

/*Exemplo de classe*/
class Boleiro {
  constructor(Nome, Jogos, Gols) {
    this.Nome = Nome;
    this.Jogos = Jogos;
    this.Gols = Gols;
  }
}


function jogadores() {
  if (nome.value.length == 0 || jogos.value.length == 0 || gols.value.length == 0) {
    alert(`Dados faltando! Por favor digite todos os dados antes!`);
  } else if (Number(jogos.value) < 0 || Number(gols.value) < 0) {
    alert(`Os números de jogos e gols devem ser maiores ou iguais a zero(0)!`);
  } else {
    jogador = new Boleiro(nome.value, Number(jogos.value), Number(gols.value));
    jogadorFormat = ``;
    
    if (todosOsJogadores.indexOf(nome.value.toUpperCase()) != -1) {
      alert(`O Jogador ${nome.value} já foi adicionado antes, por favor adicione um jogador diferente!`);
      nome.value = ``;
      nome.focus();
    } else {
      todosOsJogadores.push(jogador.Nome.toUpperCase());
      
      for (let i = 0; i < Object.keys(jogador).length && Object.values(jogador).length; i++) {
        jogadorFormat += `<li>${Object.keys(jogador)[i]}: ${Object.values(jogador)[i]}</li>`;
      }
      resultado.innerHTML += `<div><ul>${jogadorFormat}</ul></div>`;
      nome.value = ``;
      nome.focus();
      jogos.value = ``;
      gols.value = ``;
    }
  }
}
document.querySelector("button#add").addEventListener("click", jogadores);

/*
class Goleiro extends Boleiro {
  constructor(Nome, Jogos, Gols, Defesas) {
    super(Nome, Jogos, Gols);
    this.Defesas = Defesas;
  }
}
let ue = new Goleiro("Ue", 10, 20, 100);
console.log(ue);
*/