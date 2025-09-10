// ---------------- CONFIGURAÇÃO DO JOGO ----------------
const personagens = [
  { nome: "Amazônia", img: "assets/amazon.png", vida: 90, agilidade: 70, inteligencia: 80, coragem: 85 },
  { nome: "Pampas", img: "assets/pampas.png", vida: 80, agilidade: 85, inteligencia: 70, coragem: 75 },
  { nome: "Cerrado", img: "assets/cerrado.png", vida: 85, agilidade: 80, inteligencia: 75, coragem: 80 },
  { nome: "Caatinga", img: "assets/caatinga.png", vida: 75, agilidade: 70, inteligencia: 85, coragem: 90 },
  { nome: "Pantanal", img: "assets/pantanal.png", vida: 95, agilidade: 65, inteligencia: 80, coragem: 85 },
  { nome: "Mata Atlântica", img: "assets/mata.png", vida: 88, agilidade: 78, inteligencia: 82, coragem: 80 },
];

const fases = [
  { bioma: "Amazônia", curiosidade: "A Amazônia abriga a maior biodiversidade do planeta.", img: "assets/amazon.png", aliado: "Onça-Pintada", inimigo: "Robo-Cortador", escolhas: [{ texto: "Salvar a árvore gigante", correto: true },{ texto: "Ignorar o problema", correto: false }] },
  { bioma: "Pampas", curiosidade: "Os Pampas são conhecidos por suas vastas planícies e campos.", img: "assets/pampas.png", aliado: "Tatu", inimigo: "Robo-Fazendeiro", escolhas: [{ texto: "Ajudar os animais a se esconder", correto: true },{ texto: "Fugir sozinho", correto: false }] },
  { bioma: "Cerrado", curiosidade: "O Cerrado é considerado a savana mais rica do mundo.", img: "assets/cerrado.png", aliado: "Lobo-Guará", inimigo: "Robo-Madeireiro", escolhas: [{ texto: "Apagar o incêndio com ajuda do Lobo-Guará", correto: true },{ texto: "Deixar o fogo se espalhar", correto: false }] },
  { bioma: "Caatinga", curiosidade: "A Caatinga é o único bioma exclusivamente brasileiro.", img: "assets/caatinga.png", aliado: "Asa Branca", inimigo: "Robo-Saqueador", escolhas: [{ texto: "Proteger as plantas resistentes", correto: true },{ texto: "Abandonar a região", correto: false }] },
  { bioma: "Pantanal", curiosidade: "O Pantanal é a maior planície alagável do mundo.", img: "assets/pantanal.png", aliado: "Jacaré", inimigo: "Robo-Caçador", escolhas: [{ texto: "Defender os animais aquáticos", correto: true },{ texto: "Atacar sem estratégia", correto: false }] },
  { bioma: "Mata Atlântica", curiosidade: "A Mata Atlântica já perdeu mais de 85% de sua vegetação original.", img: "assets/mata.png", aliado: "Mico-Leão-Dourado", inimigo: "Robo-Desmatador", escolhas: [{ texto: "Reflorestar com ajuda do mico", correto: true },{ texto: "Ignorar o desmatamento", correto: false }] }
];

let personagemSelecionado = null;
let vida = 100;
let faseAtual = 0;

// ---------------- SONS ----------------
const clickSound = document.getElementById("click-sound");
const victorySound = document.getElementById("victory-sound");
const defeatSound = document.getElementById("defeat-sound");

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

// ---------------- INTERFACE INICIAL ----------------
const containerChars = document.getElementById("characters");
personagens.forEach(p => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <img src="${p.img}" alt="${p.nome}">
        <h3>${p.nome}</h3>
      </div>
      <div class="card-back">
        <h3>${p.nome}</h3>
        <p>Vida: ${p.vida}</p>
        <p>Agilidade: ${p.agilidade}</p>
        <p>Inteligência: ${p.inteligencia}</p>
        <p>Coragem: ${p.coragem}</p>
        <button onclick="selectCharacter('${p.nome}')">Selecionar</button>
      </div>
    </div>
  `;
  card.onclick = () => card.classList.toggle("flipped");
  containerChars.appendChild(card);
});

// ---------------- FUNÇÕES ----------------
function selectCharacter(nome) {
  playSound(clickSound);
  personagemSelecionado = nome;
  document.getElementById("selected-character").innerHTML = `
    <h2>Você escolheu: ${nome} 🌿</h2>
    <p>Vida: ${vida}</p>
    <button onclick="startGame()">Iniciar Jogo</button>
  `;
}

function startGame() {
  playSound(clickSound);
  faseAtual = 0;
  vida = 100;
  mostrarFase();
}

function mostrarFase() {
  if (faseAtual >= fases.length) {
    victorySound.play();
    document.getElementById("game-phase").innerHTML = `<h2>🎉 Parabéns! Você completou o jogo!</h2>`;
    return;
  }

  const fase = fases[faseAtual];
  const gamePhase = document.getElementById("game-phase");
  gamePhase.style.display = "block";
  gamePhase.innerHTML = `
    <h2>Fase ${faseAtual + 1}: ${fase.bioma}</h2>
    <img src="${fase.img}" class="bioma-img">
    <p><b>Curiosidade:</b> ${fase.curiosidade}</p>
    <p><b>Aliado:</b> ${fase.aliado} 🐾</p>
    <p><b>Inimigo:</b> ${fase.inimigo} 🤖</p>
    <p><b>Sua vida:</b> ${vida}</p>
    <div class="decision-buttons">
      ${fase.escolhas.map((e,i)=>`<button onclick="decisao(${i})">${e.texto}</button>`).join("")}
    </div>
  `;
}

function decisao(indice) {
  playSound(clickSound);
  const fase = fases[faseAtual];
  if (fase.escolhas[indice].correto) {
    alert("Boa escolha! Você avançou com sucesso.");
    faseAtual++;
    mostrarFase();
  } else {
    vida -= 30;
    if (vida <= 0) {
      playSound(defeatSound);
      document.getElementById("game-phase").innerHTML = `<h2>💀 Você foi derrotado pelo ${fase.inimigo}!</h2>`;
    } else {
      alert("Escolha errada! Você perdeu vida.");
      mostrarFase();
    }
  }
}
