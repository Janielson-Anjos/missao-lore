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
    }, 8000);
    
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

const fotos = [
  "foto1.jpeg",
  "foto2.jpeg",
  "foto3.jpeg",
  "foto4.jpeg",
  "foto5.jpeg",
  "foto6.jpeg",
  "foto7.jpeg",
  "foto8.jpeg",
  "foto9.jpeg",
  "foto10.jpeg",
  "foto11.jpeg",
  "foto12.jpeg"
];
let indexSlide = 0;

const mensagem = [
  "Feliz aniversário ❤️",
  "Essa foi só uma pequena surpresa...",
  "Porque você merece o mundo inteiro",
  "Eu te amo 💖"
];

let linha = 0;
let letra = 0;

function iniciarSlideshow() {
  setInterval(() => {
    indexSlide = (indexSlide + 1) % fotos.length;
    const img = document.getElementById("slide1");
    if (img) img.src = fotos[indexSlide];
  }, 3000);
}

function escreverTexto() {
  const el = document.getElementById("type1");
  if (!el) return;

  if (linha < mensagem.length) {
    if (letra < mensagem[linha].length) {
      el.innerHTML += mensagem[linha][letra];
      letra++;
      setTimeout(escreverTexto, 50);
    } else {
      el.innerHTML += "<br><br>";
      linha++;
      letra = 0;
      setTimeout(escreverTexto, 800);
    }
  }
}

function esconderBotaoMusica() {
  const btn = document.getElementById("btn-musica");
  if (btn) btn.hidden = true;
}

function ligarBotaoMusica() {
  const btn = document.getElementById("btn-musica");
  const audio = document.getElementById("music1");
  if (!btn || !audio) return;
  btn.addEventListener("click", function onMusicaClick() {
    audio.volume = 0.5;
    audio.play().then(function () {
      esconderBotaoMusica();
    }).catch(function () {});
    btn.removeEventListener("click", onMusicaClick);
  });
  audio.addEventListener("playing", function () {
    esconderBotaoMusica();
  });
}

function tocarMusica() {
  const audio = document.getElementById("music1");
  if (!audio) return;
  audio.volume = 0.5;
  audio.play().then(function () {
    esconderBotaoMusica();
  }).catch(function () {});
}

function mostrarFinal() {
  linha = 0;
  letra = 0;
  indexSlide = 0;

  document.body.innerHTML = `
    <div class="final-screen">
      <audio id="music1" src="musica.mp3" preload="auto" loop></audio>

      <div id="slideshow">
        <img id="slide1" src="${fotos[0]}" alt="">
      </div>

      <div id="texto-final">
        <div id="type1"></div>
      </div>

      <button type="button" id="btn-musica" class="btn-musica">Tocar música</button>
    </div>
  `;

  iniciarSlideshow();
  escreverTexto();
  ligarBotaoMusica();
  tocarMusica();
}


function entrar() {
  const senha = document.getElementById("senha").value.toLowerCase();

  if (senha === "amor") { // MUDE ISSO
    document.getElementById("login").style.display = "none";
    document.getElementById("app").style.display = "block";
  } else {
    document.getElementById("erro").innerText = "❌ Senha errada";
  }
}
