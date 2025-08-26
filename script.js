const jogadoras = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/andressa.jpg",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false // favorita inicial
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
  }
]

window.onload = () => {
  displayPlayers()
}

// ==================== READ ====================
// verifica se já existe players no localStorage
const displayPlayers = () => {
  const playersLoad = JSON.parse(localStorage.getItem("playersLoaded?"))
  if (playersLoad === true) {
    console.log("existe players, alterados ou não")
    loadPlayers()
  } else {
    console.log("não existe players")
    localStorage.setItem("players", JSON.stringify(jogadoras))
    console.log("criada jogadoras padrões ao iniciar")
    localStorage.setItem("playersLoaded?", JSON.stringify(true))
    loadPlayers()
  }
}

// carregar players no main
const loadPlayers = () => {
  const itemLocal = JSON.parse(localStorage.getItem("players") || "[]")
  const main = document.querySelector("main")
  if (itemLocal.length > 0) {
    main.innerHTML = ""
    itemLocal.forEach((item, index) => {
      main.innerHTML += `
        <div class="card-players">
          <h1>${item.nome}</h1>
          <img src="${item.foto}" alt="imagem jogadora n°${index + 1}">
          <p>pos: ${item.posicao}</p>
          <p>clube: ${item.clube}</p>
          <p>gols: ${item.gols}</p>
          <p>Assistencias: ${item.assistencias}</p>
          <p>jogos: ${item.jogos}</p>
          <!-- botão favoritar -->
          <img 
            src="./Assets/star.png" 
            alt="Imagem Favorito" 
            class="btn-favorito" 
            style="width:40px; height:40px; cursor:pointer; opacity:${item.favorita ? 1 : 0.3}">
          
          <!-- botão editar -->
          <button class="btn-editar">Editar</button>
          
          <!-- botão excluir -->
          <button class="btn-deletar">Deletar</button>
        </div>
      `
    })
    console.log("jogadoras carregadas")

    // adicionar evento para favoritar
    document.querySelectorAll(".btn-favorito").forEach((btn, i) => {
      btn.addEventListener("click", () => toggleFavorito(i))
    })

    // adicionar evento para editar
    document.querySelectorAll(".btn-editar").forEach((btn, i) => {
      btn.addEventListener("click", () => editarJogadora(i))
    })

    // adicionar evento para deletar
    document.querySelectorAll(".btn-deletar").forEach((btn, i) => {
      btn.addEventListener("click", () => deletarJogadora(i))
    })

  } else {
    console.log("ERRO, não foi possivel acessar local Storage")
  }
}

// ==================== CREATE ====================
// form criar jogadora
const formCriar = document.querySelector("#form-create")

formCriar.addEventListener("submit", (e) => {
  e.preventDefault()

  const nome = document.getElementById("nome").value
  const imagem = document.getElementById("imagem").value
  const posicao = document.getElementById("posicao").value
  const clube = document.getElementById("clube").value
  const gols = Number(document.getElementById("gols").value)
  const assistencias = Number(document.getElementById("assistencias").value)
  const jogos = Number(document.getElementById("jogos").value)

  // validação
  if (!nome || !posicao || !clube || !imagem || isNaN(gols) || isNaN(assistencias) || isNaN(jogos)) {
    alert("prencha os campos corretamente")
  } else {
    criarJogadora(nome, imagem, posicao, clube, gols, assistencias, jogos)
  }
})

// criar jogadora
const criarJogadora = (nome, imagem, posicao, clube, gols, assistencias, jogos) => {
  const playerCriado = {
    "nome": nome,
    "posicao": posicao,
    "clube": clube,
    "foto": `${imagem}`,
    "gols": gols,
    "assistencias": assistencias,
    "jogos": jogos,
    "favorita": false // padrão sempre false
  }

  const localStorageAtual = JSON.parse(localStorage.getItem("players") || "[]")

  // verificar se já existe jogadora igual
  const verificarJogadoras = localStorageAtual.filter((e) => {
    return e.nome.toLowerCase() === playerCriado.nome.toLowerCase() &&
      e.clube.toLowerCase() === playerCriado.clube.toLowerCase() &&
      e.posicao.toLowerCase() === playerCriado.posicao.toLowerCase()
  })

  if (verificarJogadoras.length != 0) {
    alert("jogadora já existente")
  } else {
    localStorageAtual.push(playerCriado)
    localStorage.setItem("players", JSON.stringify(localStorageAtual))
    loadPlayers()
    console.log("criado", playerCriado)
    alert("Jogadora adicionada com sucesso!")
  }
}

// ==================== UPDATE ====================
// editar jogadora
const editarJogadora = (index) => {
  const localStorageAtual = JSON.parse(localStorage.getItem("players") || "[]")
  const jogadora = localStorageAtual[index]

  // abre prompt simples (pode trocar depois por modal/form)
  const novoNome = prompt("Novo nome:", jogadora.nome)
  const novaPosicao = prompt("Nova posição:", jogadora.posicao)
  const novoClube = prompt("Novo clube:", jogadora.clube)
  const novaImagem = prompt("Nova URL da imagem:", jogadora.foto)
  const novosGols = Number(prompt("Novos gols:", jogadora.gols))
  const novasAssistencias = Number(prompt("Novas assistências:", jogadora.assistencias))
  const novosJogos = Number(prompt("Novos jogos:", jogadora.jogos))

  // atualizar valores
  if (novoNome && novaPosicao && novoClube && novaImagem && !isNaN(novosGols) && !isNaN(novasAssistencias) && !isNaN(novosJogos)) {
    localStorageAtual[index] = {
      ...jogadora,
      nome: novoNome,
      posicao: novaPosicao,
      clube: novoClube,
      foto: novaImagem,
      gols: novosGols,
      assistencias: novasAssistencias,
      jogos: novosJogos
    }
    localStorage.setItem("players", JSON.stringify(localStorageAtual))
    loadPlayers()
    alert("Jogadora editada com sucesso!")
  } else {
    alert("Edição cancelada ou inválida")
  }
}

// ==================== DELETE ====================
// deletar jogadora
const deletarJogadora = (index) => {
  const localStorageAtual = JSON.parse(localStorage.getItem("players") || "[]")
  const confirmar = confirm(`Tem certeza que deseja deletar ${localStorageAtual[index].nome}?`)
  if (confirmar) {
    localStorageAtual.splice(index, 1)
    localStorage.setItem("players", JSON.stringify(localStorageAtual))
    loadPlayers()
    alert("Jogadora removida com sucesso!")
  }
}

// ==================== FAVORITO ====================
// alternar favorito
const toggleFavorito = (index) => {
  const localStorageAtual = JSON.parse(localStorage.getItem("players") || "[]")
  localStorageAtual[index].favorita = !localStorageAtual[index].favorita
  localStorage.setItem("players", JSON.stringify(localStorageAtual))
  loadPlayers()
}
