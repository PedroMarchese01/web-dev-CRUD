const jogadoras = [
  {
    nome: "Andressa Alves",
    posicao: "Meio-campo",
    clube: "Corinthians",
    foto: "https://example.com/andressa.jpg",
    gols: 15,
    assistencias: 10,
    jogos: 28,
    favorita: false, // favorita inicial
  },
  {
    nome: "Dayana Rodríguez",
    posicao: "Meio-campo",
    clube: "Corinthians",
    foto: "https://example.com/dayana.jpg",
    gols: 5,
    assistencias: 12,
    jogos: 30,
    favorita: false,
  },
  {
    nome: "Mariza",
    posicao: "Zagueira",
    clube: "Corinthians",
    foto: "https://example.com/mariza.jpg",
    gols: 2,
    assistencias: 1,
    jogos: 32,
    favorita: false,
  },
]

window.onload = () => {
  //quando carregar, verifica se já inicializou
  const loaded = localStorage.getItem("loaded") // pega loaded caso exista

  if (!loaded || loaded === "false") { //verifica se loaded não existe ou = false

    localStorage.setItem("players", JSON.stringify(jogadoras)) // adiciona jogadoras padrão
    localStorage.setItem("loaded", "true") //coloca como true para falar (olha já foi carregado!)
    console.log("Jogadoras padrão adicionadas ao localStorage") //menssagem 
  }

  //se existir ou não existir (passando pelo if) vai carregar
  loadPlayers()
}

// ==================== READ ====================

// função para carregar players
const loadPlayers = () => {
  const itemLocal = JSON.parse(localStorage.getItem("players") || "[]") // recebe os itens locais ou [] em caso de falha
  const main = document.querySelector("main") // pega a main
  if (itemLocal.length > 0) {
    // se o tamanho dos items locais for maior que 0 ele carrega
    main.innerHTML = "" // limpa anterior
    itemLocal.forEach((item, index) => {
      //percorre item local
      main.innerHTML += `
        <div class="card-players" data-index="${index}"> 
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
            style="width:40px; height:40px; cursor:pointer; opacity:${
              item.favorita ? 1 : 0.3
            }">
          
          <!-- botão editar -->
          <button class="btn-editar">Editar</button>
          
          <!-- botão excluir -->
          <button class="btn-deletar">Deletar</button>
        </div>
      `
    })
    console.log("jogadoras carregadas") // menssagem de carregamento
  } else {
    console.log("ERRO, não foi possivel acessar local Storage ou não há jogadoras")
    main.innerHTML = ""

    const recarregar = confirm("Deseja recarregar as jogadoras iniciais?")
    if (recarregar) {
      localStorage.setItem("players", JSON.stringify(jogadoras))
      loadPlayers()
}
  }
}

document.querySelector("main").addEventListener("click", (e) => {
  //asiciona um evento de click na main
  const card = e.target.closest(".card-players") // pega o card clicado
  if (!card) return // se clicou fora do card, não faz nada

  const index = card.dataset.index // pega o index da jogadora pelo atributo data-index

  // se clicou no botão de favorito
  if (e.target.classList.contains("btn-favorito")) {
    toggleFavorito(index)
  }

  // se clicou no botão de editar
  if (e.target.classList.contains("btn-editar")) {
    editarJogadora(index)
  }

  // se clicou no botão de deletar
  if (e.target.classList.contains("btn-deletar")) {
    deletarJogadora(index)
  }
})

// ==================== CREATE ====================

const formCriar = document.querySelector("#form-create") // pega o form

formCriar.addEventListener("submit", (e) => {
  //adicona um evento de submit
  e.preventDefault() //não deixa fazer o "Padrão (Default)"

  //Pegando os elementos que o usuário digitou
  const nome = document.getElementById("nome").value
  const imagem = document.getElementById("imagem").value
  const posicao = document.getElementById("posicao").value
  const clube = document.getElementById("clube").value
  const gols = Number(document.getElementById("gols").value)
  const assistencias = Number(document.getElementById("assistencias").value)
  const jogos = Number(document.getElementById("jogos").value)

  if (
    !nome ||
    !posicao ||
    !clube ||
    !imagem ||
    isNaN(gols) ||
    isNaN(assistencias) ||
    isNaN(jogos)
  ) {
    //Existe?
    alert("prencha os campos corretamente") //Não existe algum
  } else {
    criarJogadora(nome, imagem, posicao, clube, gols, assistencias, jogos) //Existe e cria uma jogadora por essa função
  }
})

// criar jogadora
const criarJogadora = (
  nome,
  imagem,
  posicao,
  clube,
  gols,
  assistencias,
  jogos
) => {
  const playerCriado = {
    //armazena  a informação em um objeto
    nome: nome,
    posicao: posicao,
    clube: clube,
    foto: `${imagem}`,
    gols: gols,
    assistencias: assistencias,
    jogos: jogos,
    favorita: false, // padrão sempre false
  }

  const localStorageAtual = JSON.parse(localStorage.getItem("players") || "[]") // pega o local storage atual

  // verificar se já existe jogadora igual
  const verificarJogadoras = localStorageAtual.filter((e) => {
    return (
      e.nome.toLowerCase() === playerCriado.nome.toLowerCase() && //as 3 informações não podem ser a mesma, mas se contem alguma diferente passa
      e.clube.toLowerCase() === playerCriado.clube.toLowerCase() &&
      e.posicao.toLowerCase() === playerCriado.posicao.toLowerCase()
    )
  })

  if (verificarJogadoras.length != 0) {
    //caso o filter retorne alguma cairá para jogadora exitente
    alert("jogadora já existente")
  } else {
    localStorageAtual.push(playerCriado) //
    localStorage.setItem("players", JSON.stringify(localStorageAtual))
    loadPlayers()
    console.log("criado", playerCriado)
    alert("Jogadora adicionada com sucesso!")
  }
}

// ==================== UPDATE ====================
// editar jogadora
const editarJogadora = (index) => {
  const localStorageAtual = JSON.parse(localStorage.getItem("players") || "[]") //pega  o local storage atual
  const jogadora = localStorageAtual[index] // pega o objeto do local storage pelo index

  // perguntas
  const novoNome = prompt("Novo nome:", jogadora.nome)
  const novaPosicao = prompt("Nova posição:", jogadora.posicao)
  const novoClube = prompt("Novo clube:", jogadora.clube)
  const novaImagem = prompt("Nova URL da imagem:", jogadora.foto)
  const novosGols = Number(prompt("Novos gols:", jogadora.gols))
  const novasAssistencias = Number(prompt("Novas assistências:", jogadora.assistencias))
  const novosJogos = Number(prompt("Novos jogos:", jogadora.jogos))

  if (novoNome && novaPosicao && novoClube && novaImagem && !isNaN(novosGols) && !isNaN(novasAssistencias) && !isNaN(novosJogos)) {
    
    const jogadoraAntiga = localStorageAtual[index]

    // cria um novo objeto "juntando" dados novos
    localStorageAtual[index] = {
      nome: novoNome,
      posicao: novaPosicao,
      clube: novoClube,
      foto: novaImagem,
      gols: novosGols,
      assistencias: novasAssistencias,
      jogos: novosJogos,
      favorita: jogadoraAntiga.favorita, 
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
  const localStorageAtual = JSON.parse(localStorage.getItem("players") || "[]") //pega o local storage atual ou [] se der errado
  if (!localStorageAtual[index]) return //se não existe, sai da função

  const confirmar = confirm(
    `Tem certeza que deseja deletar ${localStorageAtual[index].nome}?` //confirmação
  )
  if (confirmar) {
    localStorageAtual.splice(index, 1) //retira do array
    localStorage.setItem("players", JSON.stringify(localStorageAtual)) //atualiza localStorage
    loadPlayers() //atualiza a exibição na tela
    alert("Jogadora removida com sucesso!") //mensagem de sucesso
  }
}

// ==================== FAVORITO ====================
const toggleFavorito = (index) => {
  const localStorageAtual = JSON.parse(localStorage.getItem("players") || "[]")
  
  if (!localStorageAtual[index]) return // se não existe, sai da função
  
  // alterna a propriedade favorita
  localStorageAtual[index].favorita = !localStorageAtual[index].favorita
  
  // atualiza no localStorage
  localStorage.setItem("players", JSON.stringify(localStorageAtual))
  
  // atualiza a exibição
  loadPlayers()
}