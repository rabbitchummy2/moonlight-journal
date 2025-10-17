const entryEl = document.getElementById('entry'); 
const moonEl = document.getElementById('moon');
const feedbackEl = document.getElementById('feedback');
const btn = document.getElementById('submit');

// === Emotion-based responses ===
const responses = {
  happy: [
    "The moon smiles with you tonight :)",
    "Your light makes the stars jealous ✨",
    "The moon glows brighter because of you 🌙",
  ],
  sad: [
    "Everything will be alright, the moon’s still here for you 💙",
    "Even the stars rest on cloudy nights 🌧",
    "Your heart will find calm again 💫",
  ],
  angry: [
    "Let the night cool your fire 🔥",
    "The moon’s soft light forgives every storm",
    "You’re safe to let it go now 💨",
  ],
  anxious: [
    "Relax, the moon’s holding you 🌙",
    "You can rest here for a while",
    "The night is patient, so you can be too",
  ],
  unsure: [
    "You’re doing better than you think 💫",
    "Trust your heart, it knows more than fear 🌙",
    "The moon believes in you",
  ]
};

// === Stronger Color palette for moon by mood ===
const moodColors = {
  happy: ["#ffb347", "#ff66c4"],     // warm amber + vivid pink
  sad: ["#4f9dff", "#7c4dff"],       // deep blue + purple
  angry: ["#ff4b4b", "#ff8c42"],     // intense red + fiery orange
  anxious: ["#00e5ff", "#007bff"],   // bright cyan + electric blue
  unsure: ["#b066ff", "#e86fff"],    // strong violet + magenta
  neutral: ["#c6c6ff", "#a0d8ff"]    // brighter soft neutrals
};

// === Initial soft moon glow ===
moonEl.style.animation = "none";
moonEl.style.boxShadow = "0 0 60px rgba(255,255,255,0.4), 0 0 120px rgba(255,255,255,0.2)";
moonEl.style.transition = "box-shadow 2s ease";

// === Helper: Smoothly transition the moon glow ===
function smoothGlowTransition(fromColors, toColors, intensity = 1) {
  let step = 0;
  const steps = 40;
  const [from1, from2] = fromColors;
  const [to1, to2] = toColors;

  const interval = setInterval(() => {
    step++;
    const blend = step / steps;
    const mix = (c1, c2) => {
      const r = parseInt(c1.slice(1, 3), 16) * (1 - blend) + parseInt(c2.slice(1, 3), 16) * blend;
      const g = parseInt(c1.slice(3, 5), 16) * (1 - blend) + parseInt(c2.slice(3, 5), 16) * blend;
      const b = parseInt(c1.slice(5, 7), 16) * (1 - blend) + parseInt(c2.slice(5, 7), 16) * blend;
      return `rgb(${r}, ${g}, ${b})`;
    };

    const glow1 = mix(from1, to1);
    const glow2 = mix(from2, to2);
    const size = 90 + blend * 100 * intensity;

    moonEl.style.boxShadow = `
      0 0 ${size}px ${glow1},
      0 0 ${size * 1.8}px ${glow2}
    `;

    if (step >= steps) clearInterval(interval);
  }, 40);
}

// === Smarter Mood Detection ===
function detectMood(text) {
  const t = text.toLowerCase();

  const happyWords = [
    "happy", "joy", "excited", "grateful", "calm", "peaceful", "smile", "loved",
    "good", "great", "wonderful", "nice", "beautiful", "content", "thankful", "joyful", "pleasant"
  ];
  const sadWords = [
    "sad", "down", "lonely", "cry", "hurt", "upset", "depressed", "empty",
    "unhappy", "heartbroken", "bad", "pain", "tired", "exhausted"
  ];
  const angryWords = [
    "angry", "mad", "furious", "irritated", "frustrated", "annoyed", "rage", "upset", "hate"
  ];
  const anxiousWords = [
    "anxious", "nervous", "worried", "stressed", "uneasy", "tense", "panic", "afraid", "scared"
  ];
  const unsureWords = [
    "unsure", "confused", "lost", "mixed", "uncertain", "don't know", "don’t know", "iffy"
  ];

  let counts = { happy: 0, sad: 0, angry: 0, anxious: 0, unsure: 0 };
  for (const w of happyWords) if (t.includes(w)) counts.happy++;
  for (const w of sadWords) if (t.includes(w)) counts.sad++;
  for (const w of angryWords) if (t.includes(w)) counts.angry++;
  for (const w of anxiousWords) if (t.includes(w)) counts.anxious++;
  for (const w of unsureWords) if (t.includes(w)) counts.unsure++;

  const strongIntensityWords = ["very", "so", "really", "super", "extremely"];
  const mildIntensityWords = ["a bit", "slightly", "kind of", "somewhat"];
  let intensity = 1;
  for (const w of strongIntensityWords) if (t.includes(w)) intensity = 1.4;
  for (const w of mildIntensityWords) if (t.includes(w)) intensity = 0.7;

  const totalHits = Object.values(counts).reduce((a, b) => a + b, 0);
  if (totalHits === 0) return { mood: "neutral", intensity };

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const [topEmotion, topScore] = sorted[0];
  const [secondEmotion, secondScore] = sorted[1] || ["neutral", 0];
  if (topScore >= secondScore * 1.5 || secondScore === 0) {
    return { mood: topEmotion, intensity };
  }

  return { mood: "unsure", intensity };
}

// === Handle journal submission ===
btn.addEventListener('click', () => {
  const entry = entryEl.value.trim();
  if (!entry) {
    feedbackEl.textContent = "whisper a thought first ✨";
    return;
  }

  const moodInfo = detectMood(entry);
  const sentiment = moodInfo.mood || "neutral";
  const intensity = moodInfo.intensity || 1;

  const toColors = moodColors[sentiment] || moodColors.neutral;
  const fromColors = ["#ffffff", "#ccccff"];
  smoothGlowTransition(fromColors, toColors, intensity);

  const msgs = responses[sentiment] || responses.unsure;
  const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];

  feedbackEl.classList.remove("show");
  void feedbackEl.offsetWidth;
  feedbackEl.textContent = randomMsg;
  setTimeout(() => feedbackEl.classList.add("show"), 50);

  entryEl.value = "";

  // 🌙 Fade back to neutral 15 seconds later
  setTimeout(() => {
    smoothGlowTransition(toColors, moodColors.neutral, 0.8);
  }, 15000);
});

// === Dynamic starfield with twinkling + shooting stars ===
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [], shootingStars = [];
const STAR_COUNT = 250;
const SHOOT_CHANCE = 0.008;
const DPR = Math.min(window.devicePixelRatio || 1, 2);

function resize() {
  canvas.width = innerWidth * DPR;
  canvas.height = innerHeight * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}

function rand(min, max) { return Math.random() * (max - min) + min; }

function makeStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: rand(0, innerWidth),
      y: rand(0, innerHeight),
      r: rand(0.8, 2.6),
      twinkleSpeed: rand(1, 3),
      baseAlpha: rand(0.5, 1),
      hue: rand(180, 320)
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  const t = performance.now() / 1000;

  // Twinkling stars
  for (const s of stars) {
    const flicker = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.x);
    const alpha = s.baseAlpha * flicker;
    ctx.beginPath();
    ctx.fillStyle = `hsla(${s.hue}, 100%, 85%, ${alpha})`;
    ctx.shadowColor = `hsla(${s.hue}, 100%, 75%, ${alpha * 1.8})`;
    ctx.shadowBlur = 12 + 8 * Math.sin(t * 3 + s.x);
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Shooting stars
  if (Math.random() < SHOOT_CHANCE) {
    shootingStars.push({
      x: rand(0, innerWidth),
      y: rand(0, innerHeight * 0.5),
      len: rand(100, 200),
      speed: rand(15, 22),
      life: 0,
      hue: rand(180, 260)
    });
  }

  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const s = shootingStars[i];
    s.x += s.speed;
    s.y += s.speed * 0.25;
    s.life++;
    const fade = 1 - s.life / 35;
    ctx.strokeStyle = `hsla(${s.hue}, 100%, 85%, ${fade})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.len, s.y - s.len * 0.3);
    ctx.stroke();
    if (s.life > 35) shootingStars.splice(i, 1);
  }

  requestAnimationFrame(draw);
}

// === Resize & orientation fixes ===
window.addEventListener('resize', () => { resize(); makeStars(); });
window.addEventListener('orientationchange', () => {
  setTimeout(() => { resize(); makeStars(); }, 500);
});

resize();
makeStars();
draw();

