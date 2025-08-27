

## 🌐 Acesse o Projeto

Clique no botão abaixo para acessar a aplicação rodando no **GitHub Pages**:  

<a href="https://seu-usuario.github.io/seu-repositorio/" target="_blank">
  <img src="https://img.shields.io/badge/Abrir%20no-GitHub%20Pages-blue?style=for-the-badge&logo=github" alt="Abrir no GitHub Pages">
</a>

<a href="https://github.com/seu-usuario/seu-repositorio" target="_blank">
  <img src="https://img.shields.io/badge/Ver%20Repositório-black?style=for-the-badge&logo=github" alt="Ver Repositório">
</a>

## 👥 Integrantes do Projeto

- [Enzo Augusto: RM562249](https://github.com/Enzoo-August)
- [Pedro Marchese: RM563339](https://github.com/PedroMarchese01) 

# ⚽ Gerenciador de Jogadoras

Este projeto é uma aplicação simples em **JavaScript** que permite **cadastrar, editar, favoritar e deletar jogadoras de futebol**.  
Os dados são armazenados no **LocalStorage**, garantindo que as informações persistam mesmo após o recarregamento da página.

---

## 🚀 Funcionalidades

- **Adicionar jogadoras** com nome, posição, clube, imagem, gols, assistências e jogos.  
- **Listar jogadoras** cadastradas no LocalStorage.  
- **Editar informações** de uma jogadora já existente.  
- **Deletar jogadoras** com confirmação antes da exclusão.  
- **Favoritar jogadoras** clicando no ícone de estrela ⭐.  
- **Persistência de dados** no LocalStorage.

---

## 📂 Estrutura do Código

- **CRUD completo (Create, Read, Update, Delete)**:
  - `criarJogadora()` → adiciona novas jogadoras.  
  - `loadPlayers()` → carrega jogadoras armazenadas.  
  - `editarJogadora()` → atualiza os dados.  
  - `deletarJogadora()` → remove uma jogadora.  

- **Favoritar jogadoras**:
  - `toggleFavorito()` altera o estado de favorita.  

- **Armazenamento Local**:
  - Utiliza `localStorage` para salvar as jogadoras.  

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**  
- **CSS3**  
- **JavaScript (Vanilla JS)**  
- **LocalStorage**

---

## 📸 Exemplo de Card de Jogadora

Cada jogadora é exibida como um card com as seguintes informações:  
- Nome  
- Imagem  
- Posição  
- Clube  
- Estatísticas (gols, assistências e jogos)  
- Botões: **Favoritar**, **Editar** e **Deletar**

---

## 📦 Como Executar o Projeto

1. Clone o repositório:  
   ```bash
   git clone https://github.com/PedroMarchese01/web-dev-CRUD.git
