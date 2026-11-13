const LINHAS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const statusEl = document.getElementById("status");
const tabuleiroEl = document.getElementById("tabuleiro");
const reiniciarBtn = document.getElementById("reiniciar");

let tabuleiro = [];
let vez = "X";
let vencedor = "";
let linhaVencedora = [];
let jogadas = 0;

function reiniciar() {
  tabuleiro = ["", "", "", "", "", "", "", "", ""];
  vez = "X";
  vencedor = "";
  linhaVencedora = [];
  jogadas = 0;
  desenhar();
}

function linhaVencedoraDe(simbolo) {
  for (const linha of LINHAS) {
    if (linha.every((i) => tabuleiro[i] === simbolo)) {
      return linha;
    }
  }
  return [];
}

function empate() {
  return !vencedor && jogadas === 9;
}

function terminado() {
  return Boolean(vencedor) || empate();
}

function jogar(posicao) {
  if (terminado() || posicao < 0 || posicao > 8 || tabuleiro[posicao]) {
    return false;
  }

  tabuleiro[posicao] = vez;
  jogadas += 1;

  const linha = linhaVencedoraDe(vez);
  if (linha.length) {
    vencedor = vez;
    linhaVencedora = linha;
  } else if (!empate()) {
    vez = vez === "X" ? "O" : "X";
  }

  desenhar();
  return true;
}

function desenhar() {
  tabuleiroEl.innerHTML = "";

  tabuleiro.forEach((marca, posicao) => {
    const casa = document.createElement("div");
    casa.className = "casa";
    if (marca === "X") casa.classList.add("casa--x");
    if (marca === "O") casa.classList.add("casa--o");
    if (linhaVencedora.includes(posicao)) casa.classList.add("casa--vencedora");

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "casa__botao";
    botao.textContent = marca;
    botao.disabled = Boolean(marca) || terminado();
    botao.setAttribute(
      "aria-label",
      marca ? `Casa ${posicao + 1}: ${marca}` : `Jogar na casa ${posicao + 1}`
    );
    botao.addEventListener("click", () => jogar(posicao));
    casa.appendChild(botao);
    tabuleiroEl.appendChild(casa);
  });

  if (vencedor) {
    statusEl.textContent = `${vencedor} venceu!`;
    statusEl.className = `status status--vitoria-${vencedor.toLowerCase()}`;
  } else if (empate()) {
    statusEl.textContent = "Deu velha! Empate.";
    statusEl.className = "status status--empate";
  } else {
    statusEl.textContent = `Vez de ${vez}`;
    statusEl.className = `status status--vez-${vez.toLowerCase()}`;
  }
}

reiniciarBtn.addEventListener("click", reiniciar);

reiniciar();
