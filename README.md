# Sobre

Desenvolvi um clone simples do famoso jogo [Termo](https://term.ooo). Utilizei para praticar os meus conhecimentos em JavaScript e aprender sobre o Tailwind CSS, estava curioso sobre o framework e  esse foi meu primeiro contato.

O projeto simula o funcionamento do jogo original: o jogador tem 6 tentativas para adivinhar uma palavra de 5 letras, recebendo feedback visual a cada tentativa sobre quais letras estão corretas, deslocadas ou ausentes.

Desenvolvi com: <code>React · JavaScript · Tailwind CSS</code>

## Estrutura

```
src/
├── components/
│   └── Game.jsx            # Componente principal que renderiza o jogo por completo
│   └── ResetButton.jsx     # Componente do botão responsável pelo reload na página e reiniciar o jogo 
├── constants/
│   └── game-constants.js   # Constantes de propriedas do jogo, ex: quantidade de colunas e linhas, estilos e teclas do teclado
├── hooks/
│   └── use-game.js         # Hook com toda a lógica do jogo
├── lib/
│   └── words.js            # Lista de palavras
│   └── sound.js            # Funções que tocam sons para ações do jogo
└── styles/
    └── global.css          # Definições globais de estilização
```
