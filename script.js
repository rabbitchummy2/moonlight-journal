const entryEl = document.getElementById('entry');
const moonEl = document.getElementById('moon');
const feedbackEl = document.getElementById('feedback');
const btn = document.getElementById('submit');

const responses = {
  happy: [
    "The moon smiles with you tonight :)",
    "Your light makes the stars jealous ✨",
    "The moon glows brighter because of you 🌙",
    "The night feels alive with your joy.",
    "Even the stars seem to dance tonight.",
    "Happiness hums softly in the moonlight.",
    "You bring warmth even to the dark sky.",
    "The moon reflects your calm glow."
  ],
  sad: [
    "Everything will be alright, the moon’s still here for you 💙",
    "Even the stars rest on cloudy nights 🌧",
    "Your heart will find calm again 💫",
    "The night holds your tears gently.",
    "The moon doesn’t rush your healing.",
    "There’s beauty even in quiet sadness.",
    "The stars dim a little, just to keep you company.",
    "You are allowed to rest in the silence."
  ],
  angry: [
    "Let the night cool your fire 🔥",
    "The moon’s soft light forgives every storm",
    "You’re safe to let it go now 💨",
    "The stars will wait until your storm has passed.",
    "Anger burns, but the night endures it softly.",
    "Even the moon once knew fire before it learned peace.",
    "The world quiets, waiting for you to breathe again."
  ],
  anxious: [
    "Relax, the moon’s holding you 🌙",
    "You can rest here for a while",
    "The night is patient, so you can be too",
    "Breathe, even the stars shimmer when they’re unsure.",
    "You don’t have to hold everything together right now.",
    "The stillness doesn’t demand anything from you.",
    "Even the moon wanes and waxes—it’s okay to shift."
  ],
  unsure: [
    "You’re doing better than you think 💫",
    "Trust your heart, it knows more than fear 🌙",
    "The moon believes in you",
    "Uncertainty is just the beginning of discovery.",
    "It’s okay to wander for a while.",
    "The stars don’t always know where they’re going either.",
    "Not knowing can still be beautiful."
  ],
  love: [
    "The moon blushes in your warmth.",
    "Love hums quietly through the air.",
    "Even the stars envy what you feel tonight.",
    "The night glows softly around your heart.",
    "The moon bends its light just for you.",
    "Love doesn’t need to speak when it can shine.",
    "Your tenderness fills the sky."
  ],
  hate: [
    "The moon will not take sides, only listen.",
    "Even rage fades beneath the stars.",
    "Your heart deserves peace more than anger.",
    "Let the night hold your sharp edges until they dull.",
    "Even fire needs rest.",
    "Hatred burns bright but dies fast; calm lasts longer.",
    "The sky listens, but it does not burn back."
  ],
  fear: [
    "The night is vast, but so are you.",
    "Fear only means your heart is alive.",
    "The moon lights a path even in the darkest hour.",
    "You’ve already survived so much.",
    "The shadows are smaller than you think.",
    "The dark doesn’t win when you keep walking.",
    "You are made of the same light that fills the stars."
  ],
  lonely: [
    "The moon knows loneliness well.",
    "Even when you’re alone, you are seen.",
    "The silence of the night is not empty; it’s listening.",
    "Someone, somewhere, is looking at this same moon.",
    "You’re never truly alone beneath this sky.",
    "The night keeps company in its own quiet way.",
    "Loneliness fades where patience grows."
  ],
  reflective: [
    "The moon reflects what you carry within.",
    "Stillness brings clarity, not absence.",
    "The night listens without judgment.",
    "Every thought ripples softly in the dark.",
    "Reflection is the moon’s favorite language.",
    "The stars are memories, waiting for your thoughts.",
    "You’re growing in the quiet places."
  ],
  inspired: [
    "The night is your canvas, paint something new.",
    "The moonlight sharpens dreams once blurry.",
    "You carry ideas even the stars wonder at.",
    "The universe hums with your energy tonight.",
    "Inspiration drifts like starlight, follow where it lands.",
    "Your thoughts shimmer with potential.",
    "Creation begins where silence ends."
  ]
};

const moodColors = {
  happy: ["#ffe066", "#ff33b8"],
  sad: ["#0047ff", "#0088ff"],
  angry: ["#ff0000", "#ff8000"],
  anxious: ["#00ffff", "#0077ff"],
  unsure: ["#c266ff", "#ff80ff"],
  love: ["#ff4da6", "#ff0055"],
  hate: ["#800000", "#ff3300"],
  fear: ["#224aff", "#001060"],
  lonely: ["#8266ff", "#2a0066"],
  reflective: ["#a8caff", "#6f9cff"],
  inspired: ["#33ffe0", "#b300ff"],
  neutral: ["#d6d6ff", "#99e0ff"]
};

const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
const glowBoost = isMobile ? 1.8 : 1.0;
const alphaBoost = isMobile ? 1.3 : 1.0;

moonEl.style.animation = "none";
moonEl.style.boxShadow =
  `0 0 ${120 * glowBoost}px rgba(255,255,255,${0.8 * alphaBoost}),
   0 0 ${240 * glowBoost}px rgba(255,255,255,${0.6 * alphaBoost})`;
moonEl.style.transition = "box-shadow 2s ease";

function smoothGlowTransition(fromColors, toColors, intensity = 1, duration = 5000) {
  let step = 0;
  const steps = duration / 30;
  const [from1, from2] = fromColors;
  const [to1, to2] = toColors;

  const interval = setInterval(() => {
    step++;
    const blend = step / steps;

    const mix = (c1, c2) => {
      const r = parseInt(c1.slice(1,3),16)*(1-blend)+parseInt(c2.slice(1,3),16)*blend;
      const g = parseInt(c1.slice(3,5),16)*(1-blend)+parseInt(c2.slice(3,5),16)*blend;
      const b = parseInt(c1.slice(5,7),16)*(1-blend)+parseInt(c2.slice(5,7),16)*blend;
      return `rgb(${r},${g},${b})`;
    };

    const glow1 = mix(from1,to1);
    const glow2 = mix(from2,to2);
    const size = (130 + blend * 180 * intensity) * glowBoost;

    moonEl.style.boxShadow = `
      0 0 ${size}px rgba(255,255,255,${0.3 * alphaBoost}),
      0 0 ${size * 1.2}px ${glow1},
      0 0 ${size * 1.8}px ${glow2}
    `;

    if (step >= steps) clearInterval(interval);
  }, 30);
}

const moods = {
  happy: ["happy","joy","joyful","excited","grateful","smile","peaceful","great","content","delighted","cheerful","ecstatic","calm","radiant","serene","hopeful","playful","bright","satisfied","uplifted","thankful"],
  sad: ["sad","down","lonely","hurt","cry","heartbroken","tired","blue","depressed","melancholy","weary","sorrow","pain","loss","defeated","tearful","aching","hopeless","heavy","empty"],
  angry: ["angry","mad","furious","hate","annoyed","rage","frustrated","irritated","bitter","resentful","outraged","hostile","offended","boiling","snapping","displeased"],
  anxious: ["anxious","nervous","worried","stressed","tense","panic","uneasy","fearful","overwhelmed","restless","jittery","doubtful","concerned","unsettled","fidgety","trembling"],
  unsure: ["unsure","confused","lost","uncertain","iffy","hesitant","indecisive","mixed","puzzled","unclear","ambivalent","blurred","stuck"],
  love: ["love","adore","cherish","affection","romance","heart","fond","devotion","care","admire","infatuated","compassion","intimacy","warm","longing","passion","softness"],
  hate: ["hate","dislike","resent","anger","furious","disgust","detest","loathe","spiteful","enraged","vindictive","contempt","irate"],
  fear: ["fear","afraid","terrified","scared","nervous","worried","shaken","uneasy","startled","timid","apprehensive","dread","horrified","spooked"],
  lonely: ["alone","lonely","isolated","empty","abandoned","forgotten","secluded","disconnected","apart","quiet","detached","forsaken","invisible"],
  reflective: ["thinking","remember","ponder","reflect","quiet","meditate","recall","nostalgic","consider","contemplate","wonder","daydream","evaluate","analyze"],
  inspired: ["dream","hope","create","idea","inspire","motivated","driven","ambitious","curious","inventive","energized","aspire","vision","spark","innovate"]
};

function detectMood(text) {
  const t = text.toLowerCase();
  let counts = {};
  for (const mood in moods)
    counts[mood] = moods[mood].reduce((s,w)=>s+(t.includes(w)?1:0),0);

  const strong = ["very","so","really","super","extremely","deeply","completely"];
  const mild = ["a bit","slightly","kind of","somewhat","partly"];
  let intensity = 1;
  for (const w of strong) if (t.includes(w)) intensity = 1.6;
  for (const w of mild) if (t.includes(w)) intensity = 0.8;

  const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
  const [mood,score] = sorted[0];
  return score===0?{mood:"neutral",intensity}:{mood,intensity};
}

btn.addEventListener('click', () => {
  const entry = entryEl.value.trim();
  if (!entry) {
    feedbackEl.textContent = "whisper a thought first ✨";
    return;
  }

  const { mood:sentiment, intensity } = detectMood(entry);
  const toColors = moodColors[sentiment] || moodColors.neutral;
  const fromColors = ["#ffffff", "#ccccff"];
  smoothGlowTransition(fromColors,toColors,intensity,3000);

  const msgs = responses[sentiment] || responses.unsure;
  feedbackEl.classList.remove("show");
  void feedbackEl.offsetWidth;
  feedbackEl.textContent = msgs[Math.floor(Math.random()*msgs.length)];
  setTimeout(()=>feedbackEl.classList.add("show"),50);

  entryEl.value = "";

  setTimeout(()=>{
    smoothGlowTransition(toColors,moodColors.neutral,0.9,10000);
  },30000);
});

const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [], shootingStars = [];
const STAR_COUNT = isMobile ? 180 : 250;
const SHOOT_CHANCE = 0.008;
const DPR = Math.min(window.devicePixelRatio || 1, 2);

function resize() {
  canvas.width = innerWidth * DPR;
  canvas.height = innerHeight * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}

function rand(min,max){return Math.random()*(max-min)+min;}

function makeStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: rand(0, innerWidth),
      y: rand(0, innerHeight),
      r: rand(1.2, 3.0) * glowBoost,
      twinkleSpeed: rand(1, 3),
      baseAlpha: rand(0.6, 1) * alphaBoost,
      hue: rand(180, 320)
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  const t = performance.now() / 1000;

  for (const s of stars) {
    const flicker = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.x);
    const alpha = s.baseAlpha * flicker;
    ctx.beginPath();
    ctx.fillStyle = `hsla(${s.hue}, 100%, 85%, ${alpha})`;
    ctx.shadowColor = `hsla(${s.hue}, 100%, 75%, ${alpha * 2})`;
    ctx.shadowBlur = (20 + 10 * Math.sin(t * 3 + s.x)) * glowBoost;
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }

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
    ctx.lineWidth = 2 * glowBoost;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.len, s.y - s.len * 0.3);
    ctx.stroke();
    if (s.life > 35) shootingStars.splice(i, 1);
  }

  requestAnimationFrame(draw);
}

window.addEventListener('resize', () => { resize(); makeStars(); });
window.addEventListener('orientationchange', () => {
  setTimeout(() => { resize(); makeStars(); }, 500);
});

resize();
makeStars();
draw();



