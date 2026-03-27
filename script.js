let fase = 0;

const fases = [
  {
    pergunta: "Onde foi nosso primeiro encontro?",
    resposta: "shopping",
    sucesso: "💖 Boa! Procure no guarda-roupa..."
  },
  {
    pergunta: "Qual comida eu sempre peço?",
    resposta: "pizza",
    sucesso: "🍕 Acertou! Olha na cozinha..."
  },
  {
    pergunta: "Qual filme vimos juntos?",
    resposta: "titanic",
    sucesso: "🎬 Perfeito! Veja perto da TV..."
  },
  {
    pergunta: "Quem te ama muito? 😏",
    resposta: "seu nome",
    sucesso: "❤️ Última pista: olha na cama..."
  }
];

function atualizarUI() {
  const total = fases.length;

  if (fase < total) {
    document.getElementById("pergunta").innerText = fases[fase].pergunta;
    document.getElementById("fase-info").innerText = `Fase ${fase + 1} de ${total}`;

    let progresso = ((fase) / total) * 100;
    document.getElementById("progresso").style.width = progresso + "%";
  } else {
    document.querySelector(".card").innerHTML = `
      <h1>💖 Parabéns!</h1>
      <p>Você completou tudo...</p>
      <p>Agora vem a melhor parte 😍</p>
    `;
    mostrarFinal();
  }
}

function verificar() {
  const input = document.getElementById("resposta").value.toLowerCase();
  const feedback = document.getElementById("feedback");

  if (input === fases[fase].resposta) {
    document.getElementById("som-acerto").play();
    if (navigator.vibrate) {
        navigator.vibrate(200);
    }
    feedback.innerText = fases[fase].sucesso;
    feedback.style.color = "#fff";
    explodirCoracoes();
    
    fase++;
    
    setTimeout(() => {
        document.getElementById("resposta").value = "";
        feedback.innerText = "";
        atualizarUI();
    }, 1800);
    
} else {
    feedback.innerText = "❌ Tenta de novo 😜";
    feedback.style.color = "#ffd1d1";
    document.getElementById("som-erro").play();
  }
}

// iniciar
atualizarUI();


const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function criarCoracao() {
  hearts.push({
    x: Math.random() * canvas.width,
    y: canvas.height,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 2 + 1
  });
}

function desenharCoracao(x, y, size) {
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size, y - size, x - size * 2, y + size/2, x, y + size * 2);
  ctx.bezierCurveTo(x + size * 2, y + size/2, x + size, y - size, x, y);
  ctx.fill();
}

function explodirCoracoes() {
  for (let i = 0; i < 20; i++) {
    criarCoracaoExplosao();
  }
}

function criarCoracaoExplosao() {
  const heart = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    size: Math.random() * 15 + 10,
    speedX: (Math.random() - 0.5) * 8,
    speedY: (Math.random() - 0.5) * 8,
    life: 60
  };

  heartsExplosao.push(heart);
}

let heartsExplosao = [];

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // corações flutuando
  if (Math.random() < 0.05) criarCoracao();

  hearts.forEach((h, i) => {
    h.y -= h.speed;
    desenharCoracao(h.x, h.y, h.size);
    if (h.y < -20) hearts.splice(i, 1);
  });

  // 💥 explosão
  heartsExplosao.forEach((h, i) => {
    h.x += h.speedX;
    h.y += h.speedY;
    h.life--;

    desenharCoracao(h.x, h.y, h.size);

    if (h.life <= 0) heartsExplosao.splice(i, 1);
  });

  requestAnimationFrame(animar);
}

animar();

function mostrarFinal() {
  document.body.innerHTML = `
    <div class="final-screen">
      <h1 class="fade">💖 Feliz Aniversário 💖</h1>
      <p class="fade delay1">Essa foi só uma forma de te fazer sorrir...</p>
      <p class="fade delay2">Porque você merece tudo isso e muito mais</p>
      <p class="fade delay3">Eu te amo ❤️</p>
    </div>
  `;
}