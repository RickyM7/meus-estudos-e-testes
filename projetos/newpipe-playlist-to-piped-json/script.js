//Variáveis
let n = document.querySelector("#nome")
let l = document.querySelector("#links")
let reg = document.querySelector("#registrar")
let ps = document.querySelector("#playlists")
let copiar = document.querySelector("#copiar")
let limpar = document.querySelector("#limpar")
let nome, links, stringPlaylists
let playlists = []

//recuperando os dados com o localStorage
if(localStorage.getItem('playlists')) {
	playlists = JSON.parse(localStorage.getItem('playlists'))
	stringPlaylists = playlists.toString()
	ps.value = `{"format":"Piped","version":1,"playlists":[${stringPlaylists}]}`
}

function registrar() {
	//pega as infos
	nome = n.value
	links = JSON.stringify(l.value.trim().split('\n'))
	//armazena as infos como uma string no array
	playlists.push(`{"name":"${nome}","type":"playlist","visibility":"private","videos":${links}}`)
	//transforma oa rray em string
	stringPlaylists = playlists.toString()
	//mostra a strinv na tela
	ps.value = `{"format":"Piped","version":1,"playlists":[${stringPlaylists}]}`
	//salva a string no localStorage
	localStorage.setItem('playlists', JSON.stringify(playlists))
}

//EVENTOS
//Registrar Playlist:
reg.addEventListener("click",()=>{
	if ((n.value && l.value) != '') {
		registrar()
		n.value = l.value = ''
	} else {
		alert('Dados Incompletos!')
	}
})
//Copiar Texto das Playlists
copiar.addEventListener("click", ()=>{
	ps.select()
	navigator.clipboard.writeText(ps.value).then(alert('Copiado!'))
})

//Limpar Armazenamento e Dados
limpar.addEventListener("click", ()=>{
	n.value = l.value = ps.value = ''
	playlists = []
	localStorage.clear()
	alert('Dados Excluídos!')
})