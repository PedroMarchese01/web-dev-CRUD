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
    const playersLoad = JSON.parse(localStorage.getItem("playersLoaded?")) //pega playersLoaded? caso tenha no localstorage
    if (playersLoad === true){ //verifica se é = true para realizar a ação de carregarv corretamente
        console.log("existe players, alterados ou não")
        loadPlayers()//carrega jogadoras (se dados já foram alterados não é necessário mexer, pois já houve alguma interação com CRUD)

    }else{
        console.log("não existe players")
        localStorage.setItem("players" , JSON.stringify(jogadoras)) //guarda as jogadoras já existentes
        console.log("criada jogadoras padrões ao iniciar")
        localStorage.setItem("playersLoaded?",JSON.stringify(true))
        loadPlayers() //carrega jogadoras
    }
}

//função para recarregar os players(cards)

const loadPlayers = () => { 
    const itemLocal = JSON.parse(localStorage.getItem("players") || "[]") //precisei colocar || [] caso não retorne nada
    const main = document.querySelector("main") //seleciona main para adicionar as divs das jogadoras
    if(itemLocal != []){           //se o local storage existir ele carrega na main o conteudo
         main.innerHTML = ""      //apaga caso já existente
        itemLocal.forEach((item , index)=>{ //adiciona percorrendo a lista
          if(item.favorita == true){
          main.innerHTML +=`
            <div class = "card-players">
            <h1>${item.nome}</h1>
            <img src="${item.foto}" alt="imagem jogadora n°${index + 1}"
            <p>pos:${item.posicao}</p>
            <p>clube:${item.clube}</p>
            <p>gols:${item.gols}</p>
            <p>Assitencias:${item.assistencias}</p>
            <p>jogos:${item.jogos}</p>
            <p>favorita:${item.favorita}</p>
            <img src="./Assets/star.png" alt="Imagem Favorito" style="width: 200px; height: 200px;">

            </div>
            `
          }else{
            main.innerHTML +=`
          <div class = "card-players">
          <h1>${item.nome}</h1>
          <img src="${item.foto}" alt="imagem jogadora n°${index + 1}"
          <p>pos:${item.posicao}</p>
          <p>clube:${item.clube}</p>
          <p>gols:${item.gols}</p>
          <p>Assitencias:${item.assistencias}</p>
          <p>jogos:${item.jogos}</p>
          <p>favorita:${item.favorita}</p>
          <button>favoritar</button>
          </div>
          `
          }
        })
        console.log("jogadoras carregadas")
        
    }else{
        console.log("ERRO, não foi possivel acessar local Storage")
    }
}
//
//==================================
//Metodo Create

const formCriar = document.querySelector("#form-create")

//Evento ao enviar

formCriar.addEventListener("submit" , (e) => {
  e.preventDefault() //não deixa recarregar e perder as informações colocadas

    //pega as informações das jogadoras
    const nome = document.getElementById("nome").value
    const posicao = document.getElementById("posicao").value
    const clube = document.getElementById("clube").value
    const gols = Number(document.getElementById("gols").value)
    const assistencias = Number(document.getElementById("assistencias").value)
    const jogos = Number(document.getElementById("jogos").value)
    if(!nome || !posicao || !clube || isNaN(gols) || isNaN(assistencias) || isNaN(jogos)){
      alert("prencha os campos corretamente")
    }else{
      criarJogadora(nome, posicao,clube,gols,assistencias,jogos) // cria jogadora
    }
})

const criarJogadora = (nome, posicao,clube,gols,assistencias,jogos) =>{
  
  const playerCriado ={ //cria objeto player
    "nome": nome,
    "posicao": posicao,
    "clube": clube,
    "foto": `https://example.com/${nome}.jpg`,
    "gols": gols,
    "assistencias": assistencias,
    "jogos": jogos,
    "favorita": false
  }

  const verificarJogadoras = jogadoras.filter((e) => {
    return e.nome === playerCriado.nome && e.clube === playerCriado.clube
  })

  if(verificarJogadoras.length != 0){
    alert("jogadora já existente")
  }else{
    const localStorageAtual = JSON.parse(localStorage.getItem("players"))
    localStorage.removeItem("players") //jogadoras antigas deletadas
    localStorageAtual.push(playerCriado)
    localStorage.setItem("players" , JSON.stringify(localStorageAtual)) // jogadoras novas salvas
    //recarrega a lista para atualizar os cards
    loadPlayers() // UPDATE
    console.log("criado" , jogadoras)//jogador(a) criada :)
    alert("Jogadora adicionada com sucesso!")
  }

}