/* ============================================================
   CANDRA'S ROOM — content data
   Edit the text below anytime — nothing else needs to change.
   ============================================================ */
const CONTENT = {

  about: {
    eyebrow: "About me",
    title: "It's me, Candra ♡",
    html: `
      <img class="panel-portrait" src="assets/character-look.png" alt="Candra">
      <p>I look up from my book for a second — hi, I'm glad you found your way in.</p>
      <ul class="panel-list">
        <li>Dental student</li>
        <li>Creative girl</li>
        <li>Web &amp; design enthusiast</li>
        <li>Dreamer &amp; builder</li>
      </ul>
      <p>Most days you'll find me somewhere between a textbook and a design file — this little room is where both sides of me live.</p>
    `
  },

  profile: {
    eyebrow: "Profile",
    title: "Get to know me ♡",
    html: `
      <p><strong>Biography.</strong> A dental student by day, a builder of small cozy corners of the internet by night. I like things that feel handmade, warm, and a little imperfect.</p>
      <p><strong>Personality.</strong> Soft-spoken but stubborn about the things I care about. Curious, detail-obsessed, easily delighted by pastel things.</p>
      <p><strong>Interests.</strong> UI design, journaling, slow mornings, tiny illustrations, rearranging my room in my head before I ever touch the furniture.</p>
      <p><strong>Things I love.</strong> Warm light, handwritten notes, soft fabrics, a well-made cup of tea, and rooms that feel like a hug.</p>
    `
  },

  projects: {
    eyebrow: "Projects",
    title: "My Little Projects",
    html: `
      <div class="project-cards">
        <div class="project-card">
          <span class="p-tag">Website</span>
          <p class="p-name">Cozy corners of the web</p>
          <p class="p-desc">Small interactive sites and pages, built one section at a time.</p>
        </div>
        <div class="project-card">
          <span class="p-tag">Design</span>
          <p class="p-name">Soft visual systems</p>
          <p class="p-desc">Palettes, layouts, and little details that make a page feel like somewhere, not just something.</p>
        </div>
        <div class="project-card">
          <span class="p-tag">Content</span>
          <p class="p-name">Notes &amp; journaling</p>
          <p class="p-desc">Bits of writing and visuals I make just because I want to.</p>
        </div>
        <div class="project-card">
          <span class="p-tag">Other</span>
          <p class="p-name">Little experiments</p>
          <p class="p-desc">Whatever idea is currently living rent-free in my head.</p>
        </div>
      </div>
    `
  },

  journey: {
    eyebrow: "My Journey",
    title: "Pages so far",
    html: `
      <div class="timeline">
        <div class="timeline-item"><span class="yr">2023</span><p>Started really paying attention to the small things I wanted to build.</p></div>
        <div class="timeline-item"><span class="yr">2024</span><p>Learning, studying, and slowly finding a style that felt like mine.</p></div>
        <div class="timeline-item"><span class="yr">2025</span><p>Making more, sharing more, becoming less afraid to try.</p></div>
        <div class="timeline-item"><span class="yr">2026</span><p>Building this room — and everything else, one gentle step at a time.</p></div>
        <div class="timeline-item"><span class="yr">Future</span><p>Still being written. I'm looking forward to it.</p></div>
      </div>
    `
  },

  growth: {
    eyebrow: "Growth",
    title: "Things I'm growing 🌱",
    html: `
      <ul class="panel-list">
        <li>Dentistry</li>
        <li>Web development</li>
        <li>Design</li>
        <li>Knowledge</li>
        <li>Business</li>
        <li>Personal growth</li>
      </ul>
      <p>Slowly, one small leaf at a time.</p>
    `
  },

  dreams: {
    eyebrow: "Dreams",
    title: "Things I'm dreaming about…",
    html: `
      <ul class="panel-list">
        <li>Building something people genuinely love using</li>
        <li>A studio-slash-clinic that feels as warm as this room</li>
        <li>Traveling somewhere new and quiet</li>
        <li>A home with a reading corner just like this one</li>
        <li>Learning to be patient with how long good things take</li>
      </ul>
    `
  },

  world: {
    eyebrow: "My World",
    title: "There's a whole world outside.",
    html: `
      <p><strong>Places I want to visit</strong> — quiet coastal towns, old libraries, somewhere it snows at least once.</p>
      <p><strong>Things I want to experience</strong> — a proper studio residency, a market at sunrise, a language learned just for fun.</p>
      <p><strong>Wishlist</strong> — a good film camera, more time, a desk exactly like the one in this room.</p>
      <p><strong>Inspirations</strong> — cozy interiors, hand-drawn animation, people who build slowly and kindly.</p>
    `
  },

  mood: {
    eyebrow: "Music / Mood",
    title: "Currently listening…",
    playerHtml: true,
    html: `
      <div class="mood-player" id="mood-player">
        <div class="disc"></div>
        <div class="info">
          <p class="track">soft rain, softer thoughts</p>
          <p class="artist">lofi study mix</p>
        </div>
        <button class="play-btn" id="mood-play" aria-label="Play">▶</button>
      </div>
      <p><strong>Current mood:</strong> unhurried, a little sleepy, quietly content.</p>
    `
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's sit and talk ♡",
    html: `
      <div class="contact-grid">
        <a class="contact-btn" href="#" target="_blank" rel="noopener"><span class="ic">📷</span> Instagram</a>
        <a class="contact-btn" href="#" target="_blank" rel="noopener"><span class="ic">🎵</span> TikTok</a>
        <a class="contact-btn" href="mailto:hello@candra.com"><span class="ic">✉️</span> Email</a>
        <a class="contact-btn" href="#" target="_blank" rel="noopener"><span class="ic">💬</span> WhatsApp</a>
      </div>
      <p style="margin-top:1rem;">Pull up a chair, I'd love to hear from you.</p>
    `
  }
};

/* ============================================================
   DOM refs
   ============================================================ */
const stage       = document.getElementById('stage');
const overlay     = document.getElementById('overlay');
const panel       = document.getElementById('panel');
const panelInner  = document.getElementById('panel-inner');
const panelClose  = document.getElementById('panel-close');
const speechBubble= document.getElementById('speech-bubble');
const hint        = document.getElementById('hint');
const loader      = document.getElementById('loader');
const lampGlow    = document.getElementById('lamp-glow');
const duskToggle  = document.getElementById('ambience-toggle');

/* ============================================================
   LOADER — wait for the room photo to be ready
   ============================================================ */
const roomPhoto = document.getElementById('room-photo');
function hideLoader(){
  loader.classList.add('hidden');
}
if (roomPhoto.complete) {
  setTimeout(hideLoader, 400);
} else {
  roomPhoto.addEventListener('load', () => setTimeout(hideLoader, 300));
  roomPhoto.addEventListener('error', hideLoader);
}

/* ============================================================
   HOTSPOTS
   ============================================================ */
let panelOpen = false;

document.querySelectorAll('.hotspot').forEach(spot => {
  spot.setAttribute('tabindex', '0');
  spot.setAttribute('role', 'button');

  spot.addEventListener('click', () => onHotspotActivate(spot));
  spot.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onHotspotActivate(spot);
    }
  });
  // subtle touch feedback on mobile (since :hover barely fires there)
  spot.addEventListener('touchstart', () => spot.classList.add('touched'), { passive:true });
  spot.addEventListener('touchend', () => setTimeout(() => spot.classList.remove('touched'), 400));
});

function onHotspotActivate(spot){
  dismissHint();
  const key = spot.dataset.target;

  if (key === 'about') {
    showSpeechBubble();
  }
  if (key === 'mood') {
    lampGlow.classList.add('bright');
  }

  openPanel(key);
}

function dismissHint(){
  hint.classList.add('gone');
}

/* ============================================================
   SPEECH BUBBLE (character says hi before the panel opens)
   ============================================================ */
let bubbleTimer = null;
function showSpeechBubble(){
  clearTimeout(bubbleTimer);
  speechBubble.classList.add('show');
  bubbleTimer = setTimeout(() => speechBubble.classList.remove('show'), 2600);
}

/* ============================================================
   PANEL / MODAL
   ============================================================ */
function openPanel(key){
  const data = CONTENT[key];
  if (!data) return;

  panelInner.innerHTML = `
    <p class="panel-eyebrow">${data.eyebrow}</p>
    <h2 class="panel-title">${data.title}</h2>
    <div class="panel-body">${data.html}</div>
  `;

  overlay.classList.remove('hidden');
  panel.classList.remove('hidden');
  // force reflow so the transition plays
  void panel.offsetWidth;
  overlay.classList.add('show');
  panel.classList.add('show');
  panelOpen = true;
  document.body.style.overflow = 'hidden';

  // wire up the mini music player if this is the mood panel
  if (key === 'mood') {
    const playBtn = document.getElementById('mood-play');
    const player  = document.getElementById('mood-player');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        const playing = player.classList.toggle('playing');
        playBtn.textContent = playing ? '❚❚' : '▶';
      });
    }
  }

  panelClose.focus();
}

function closePanel(){
  overlay.classList.remove('show');
  panel.classList.remove('show');
  panelOpen = false;
  document.body.style.overflow = '';
  lampGlow.classList.remove('bright');
  setTimeout(() => {
    overlay.classList.add('hidden');
    panel.classList.add('hidden');
  }, 500);
}

panelClose.addEventListener('click', closePanel);
overlay.addEventListener('click', closePanel);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && panelOpen) closePanel();
});

/* ============================================================
   ROOM LIGHTING TOGGLE (day ↔ dusk)
   ============================================================ */
let dusk = false;
duskToggle.addEventListener('click', () => {
  dusk = !dusk;
  stage.classList.toggle('dusk', dusk);
  duskToggle.classList.toggle('on', dusk);
  duskToggle.textContent = dusk ? '☾' : '☀';
});

/* ============================================================
   FLOATING DUST PARTICLES
   ============================================================ */
const dustLayer = document.getElementById('dust');
const MOTE_COUNT = 16;
for (let i = 0; i < MOTE_COUNT; i++) {
  const mote = document.createElement('div');
  mote.className = 'mote';
  const left = Math.random() * 100;
  const delay = Math.random() * 10;
  const duration = 9 + Math.random() * 8;
  const bottom = 10 + Math.random() * 70;
  mote.style.left = left + '%';
  mote.style.top = bottom + '%';
  mote.style.animationDuration = duration + 's';
  mote.style.animationDelay = delay + 's';
  dustLayer.appendChild(mote);
}

/* ============================================================
   AUTO-HIDE THE HINT AFTER A WHILE ANYWAY
   ============================================================ */
setTimeout(dismissHint, 6000);
