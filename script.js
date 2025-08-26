//arquivo inicial de jogadoras

const jogadoras = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/andressa.jpg",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/dayana.jpg",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/mariza.jpg",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/thais.jpg",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/leticia.jpg",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
]

//precisamos que ao carregar realize alguma ação

window.onload = () => {
    displayPlayers()  // mostrar jogadoras
}

const displayPlayers = () => {
    //verificar se contem algo guardado no local storage

    if (localStorage.getItem("players")){
        console.log("existe players, alterados ou não")
        loadPlayers()//carrega jogadoras (se dados já foram alterados não é necessário mexer, pois já houve alguma interação com CRUD)

    }else{
        console.log("não existe players")
        localStorage.setItem("players" , JSON.stringify(jogadoras)) //guarda as jogadoras já existentes
        loadPlayers() //carrega jogadoras
    }
}

const loadPlayers = () => {
    const itemLocal = JSON.parse(localStorage.getItem("players") || "[]") //precisei colocar || [] caso não retorne nada
    const main = document.querySelector("main")
    if(itemLocal != []){
         main.innerHTML = ""
        itemLocal.forEach((item , index)=>{
          main.innerHTML +=`<h1>${item.nome}</h1>`
        })
        console.log("jogadoras carregadas")
    }else{
        console.log("ERRO, não foi possivel acessar local Storage")
    }
}