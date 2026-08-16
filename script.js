/* =========================================================
   CANDRA'S ROOM — script.js
   Semua teks/konten ada di CONTENT di bawah — edit bebas di sana.
   ========================================================= */

// ---- 1. GANTI DI SINI kalau nama file / lokasi asset berubah ----
const ASSET_BASE = "https://raw.githubusercontent.com/candracahyani222/Candra-Septia/main/assets/";
const ASSETS = {
  bg: "bg-empty.png",
  notes: "notes.png",
  humanReading: "human-reading.png",
  humanFacing: "human-facing.png",
  mirror: "mirror.png",
  desk: "desk.png",
  shelf: "shelf.png",
  bed: "bed.png",
  window: "curtain-window.png",
  chair: "chair.png",
};

// ---- 2. Hotspot yang bisa diklik (selain manusia, yang punya logic sendiri) ----
// z lebih besar = lebih "di atas" saat dua benda tumpang tindih di titik yang sama
const HOTSPOTS = [
  { id: "window", file: ASSETS.window, z: 2 },
  { id: "shelf", file: ASSETS.shelf, z: 3 },
  { id: "mirror", file: ASSETS.mirror, z: 4 },
  { id: "bed", file: ASSETS.bed, z: 5 },
  { id: "desk", file: ASSETS.desk, z: 6 },
  { id: "chair", file: ASSETS.chair, z: 7 },
];

// ---- 3. KONTEN — edit teksnya kapan saja, tampilan otomatis menyesuaikan ----
const CONTENT = {
  about: {
    greeting: "Hi, I'm Candra ♡",
    list: [
      "Dental student",
      "Creative girl",
      "Web & design enthusiast",
      "Dreamer & builder",
    ],
  },
  mirror: {
    eyebrow: "profile",
    title: "Get to know me ♡",
    type: "bio",
    bio: [
      "Sehari-hari kuliah kedokteran gigi, tapi selalu nyempetin waktu buat hal-hal kreatif — dari nulis, desain, sampai ngoprek website kecil-kecilan.",
      "Suka ruang yang tenang, cozy, dan sedikit berantakan dengan cara yang manis.",
    ],
    pills: ["calm & curious", "detail-oriented", "soft aesthetic", "night owl"],
  },
  desk: {
    eyebrow: "projects",
    title: "My Little Projects",
    type: "cards",
    cards: [
      { title: "Website", desc: "Eksperimen kecil dengan HTML, CSS, dan JS — termasuk kamar interaktif ini." },
      { title: "Design", desc: "Moodboard, palet warna, dan layout yang lahir dari coret-coretan iseng." },
      { title: "Content", desc: "Tulisan dan ide-ide yang belum tentu rapi, tapi jujur." },
      { title: "Other experiments", desc: "Hal-hal baru yang lagi dicoba, belum tentu selesai — dan gapapa." },
    ],
  },
  shelf: {
    eyebrow: "my journey",
    title: "A Little Timeline",
    type: "timeline",
    timeline: [
      { year: "2023", text: "Mulai kuliah kedokteran gigi, belajar disiplin dan sabar." },
      { year: "2024", text: "Jatuh cinta lagi sama dunia kreatif — mulai belajar desain & web." },
      { year: "2025", text: "Berani mencoba hal baru, termasuk membangun proyek pribadi sendiri." },
      { year: "2026", text: "Terus belajar, terus membangun — pelan-pelan tapi konsisten." },
      { year: "Future", text: "Masih ditulis. Semoga jadi versi diri yang lebih tenang dan berdaya." },
    ],
  },
  bed: {
    eyebrow: "dreams",
    title: "Things I'm dreaming about…",
    type: "list",
    items: [
      "Punya kamar praktik gigi sendiri yang nyaman untuk pasien",
      "Membangun sesuatu di dunia web/design yang dipakai banyak orang",
      "Belajar hidup lebih pelan dan hadir di setiap momen",
      "Traveling ke tempat-tempat yang selama ini cuma ada di wishlist",
    ],
  },
  window: {
    eyebrow: "my world",
    title: "There's a whole world outside.",
    type: "list",
    items: [
      "Tempat yang ingin dikunjungi: Kyoto, saat musim sakura",
      "Hal yang ingin dicoba: tinggal di kota kecil selama sebulan",
      "Wishlist: kamera film & buku sketsa baru",
      "Inspirasi: orang-orang yang konsisten mengejar hal kecil yang mereka suka",
    ],
  },
  chair: {
    eyebrow: "contact",
    title: "Let's sit and talk ♡",
    type: "contact",
    links: [
      { label: "Instagram", href: "#" },
      { label: "TikTok", href: "#" },
      { label: "Email", href: "#" },
      { label: "WhatsApp", href: "#" },
    ],
  },
};

/* =========================================================
   STATE
   ========================================================= */
const stage = document.getElementById("room-stage");
const hotspotLayerRoot = document.getElementById("hotspot-layers");
const hitCanvas = document.getElementById("hit-canvas");
const hitCtx = hitCanvas.getContext("2d", { willReadFrequently: true });

let humanOpen = false;
let modalOpen = false;
let hoveredId = null;
let assetsReady = false;

// per-hotspot hit-testing data: { id, img, canvas, ctx, w, h }
const hitData = {};

/* =========================================================
   LOAD IMAGES
   ========================================================= */
function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null); // fail gracefully, don't block the room
    img.src = src;
  });
}

async function init() {
  // background + decorative layers
  const bgEl = document.getElementById("layer-bg");
  const notesEl = document.getElementById("layer-notes");
  const readingEl = document.getElementById("layer-human-reading");
  const facingEl = document.getElementById("layer-human-facing");

  bgEl.src = ASSET_BASE + ASSETS.bg;
  notesEl.src = ASSET_BASE + ASSETS.notes;
  readingEl.src = ASSET_BASE + ASSETS.humanReading;
  facingEl.src = ASSET_BASE + ASSETS.humanFacing;

  // build hotspot <img> layers, ordered by z
  const sorted = [...HOTSPOTS].sort((a, b) => a.z - b.z);
  sorted.forEach((h) => {
    const img = document.createElement("img");
    img.className = "hotspot-img";
    img.src = ASSET_BASE + h.file;
    img.dataset.id = h.id;
    img.style.zIndex = h.z;
    img.draggable = false;
    hotspotLayerRoot.appendChild(img);
  });

  // prepare alpha-hit canvases (small, for fast pixel lookups)
  async function buildHitEntry(url) {
    const img = await loadImage(url);
    if (!img) return { ok: false };
    const maxDim = 260;
    const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.max(1, Math.round(img.naturalWidth * scale));
    const hgt = Math.max(1, Math.round(img.naturalHeight * scale));
    const c = document.createElement("canvas");
    c.width = w;
    c.height = hgt;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    try {
      ctx.drawImage(img, 0, 0, w, hgt);
      ctx.getImageData(0, 0, 1, 1);
      return { ctx, w, hgt, ok: true };
    } catch (e) {
      return { ok: false };
    }
  }

  await Promise.all([
    ...HOTSPOTS.map(async (h) => {
      hitData[h.id] = await buildHitEntry(ASSET_BASE + h.file);
    }),
    (async () => {
      hitData["human-reading"] = await buildHitEntry(ASSET_BASE + ASSETS.humanReading);
    })(),
    (async () => {
      hitData["human-facing"] = await buildHitEntry(ASSET_BASE + ASSETS.humanFacing);
    })(),
  ]);

  assetsReady = true;
  document.getElementById("loading-veil").classList.add("done");
  spawnDust();
  bindEvents();
  // auto-hide onboarding hint after a while regardless of interaction
  setTimeout(hideOnboardHint, 6000);
}

/* =========================================================
   ALPHA HIT-TEST
   ========================================================= */
// Maps a pointer position (in CSS px, relative to #room-stage) to the
// hotspot id under it, accounting for object-fit:cover scaling/cropping.
// must mirror the media query in style.css that switches layers to
// object-fit:contain + centered on wide/landscape screens
const wideScreenMQ = window.matchMedia("(min-aspect-ratio: 4/5)");

function sampleAlphaAt(data, x, y, rect) {
  if (!data || !data.ok) return false;
  const fitScale = wideScreenMQ.matches
    ? Math.min(rect.width / data.w, rect.height / data.hgt) // contain
    : Math.max(rect.width / data.w, rect.height / data.hgt); // cover
  const dispW = data.w * fitScale;
  const dispH = data.hgt * fitScale;
  const offsetX = (rect.width - dispW) / 2;
  const offsetY = (rect.height - dispH) / 2;
  const imgX = Math.floor((x - offsetX) / fitScale);
  const imgY = Math.floor((y - offsetY) / fitScale);
  if (imgX < 0 || imgY < 0 || imgX >= data.w || imgY >= data.hgt) return false;
  const pixel = data.ctx.getImageData(imgX, imgY, 1, 1).data;
  return pixel[3] > 20;
}

function hotspotAtPoint(clientX, clientY) {
  const rect = stage.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  if (x < 0 || y < 0 || x > rect.width || y > rect.height) return null;

  // human is always the topmost hittable layer (she's in the foreground)
  const humanData = hitData[humanOpen ? "human-facing" : "human-reading"];
  if (sampleAlphaAt(humanData, x, y, rect)) return "about";

  // then furniture, topmost z first
  const sorted = [...HOTSPOTS].sort((a, b) => b.z - a.z);
  for (const h of sorted) {
    if (sampleAlphaAt(hitData[h.id], x, y, rect)) return h.id;
  }
  return null;
}

/* =========================================================
   HOVER / CURSOR
   ========================================================= */
function humanEl() {
  return humanOpen
    ? document.getElementById("layer-human-facing")
    : document.getElementById("layer-human-reading");
}

function setHover(id) {
  if (id === hoveredId) return;
  if (hoveredId) {
    const prevEl = hoveredId === "about" ? humanEl() : hotspotLayerRoot.querySelector(`[data-id="${hoveredId}"]`);
    if (prevEl) prevEl.classList.remove("is-hovered");
  }
  hoveredId = id;
  if (id) {
    const el = id === "about" ? humanEl() : hotspotLayerRoot.querySelector(`[data-id="${id}"]`);
    if (el) el.classList.add("is-hovered");
    stage.classList.add("cursor-point");
  } else {
    stage.classList.remove("cursor-point");
  }
}

function pressPulse(id) {
  const el = id === "about" ? humanEl() : hotspotLayerRoot.querySelector(`[data-id="${id}"]`);
  if (!el) return;
  el.classList.add("is-pressed");
  setTimeout(() => el.classList.remove("is-pressed"), 260);
}

/* =========================================================
   HUMAN / ABOUT ME
   ========================================================= */
function openHuman() {
  humanOpen = true;
  document.getElementById("layer-human-reading").classList.add("pose-hidden");
  document.getElementById("layer-human-facing").classList.add("pose-visible");

  const list = document.getElementById("speech-list");
  list.innerHTML = "";
  CONTENT.about.list.forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    list.appendChild(li);
  });
  document.querySelector(".speech-greeting").textContent = CONTENT.about.greeting;
  document.getElementById("speech-bubble").classList.add("visible");
  hideOnboardHint();
}

function closeHuman() {
  humanOpen = false;
  document.getElementById("layer-human-reading").classList.remove("pose-hidden");
  document.getElementById("layer-human-facing").classList.remove("pose-visible");
  document.getElementById("speech-bubble").classList.remove("visible");
}

/* =========================================================
   MODAL
   ========================================================= */
function renderModalBody(data) {
  const body = document.getElementById("modal-body");
  body.innerHTML = "";

  if (data.type === "bio") {
    data.bio.forEach((p) => {
      const el = document.createElement("p");
      el.textContent = p;
      body.appendChild(el);
    });
    if (data.pills) {
      const row = document.createElement("div");
      row.className = "pill-row";
      data.pills.forEach((p) => {
        const pill = document.createElement("span");
        pill.className = "pill";
        pill.textContent = p;
        row.appendChild(pill);
      });
      body.appendChild(row);
    }
  }

  if (data.type === "cards") {
    const grid = document.createElement("div");
    grid.className = "card-grid";
    data.cards.forEach((c) => {
      const card = document.createElement("div");
      card.className = "mini-card";
      const h3 = document.createElement("h3");
      h3.textContent = c.title;
      const p = document.createElement("p");
      p.textContent = c.desc;
      card.append(h3, p);
      grid.appendChild(card);
    });
    body.appendChild(grid);
  }

  if (data.type === "timeline") {
    const ul = document.createElement("ul");
    ul.className = "timeline";
    data.timeline.forEach((t) => {
      const li = document.createElement("li");
      const year = document.createElement("span");
      year.className = "year";
      year.textContent = t.year;
      const p = document.createElement("p");
      p.textContent = t.text;
      li.append(year, p);
      ul.appendChild(li);
    });
    body.appendChild(ul);
  }

  if (data.type === "list") {
    const ul = document.createElement("ul");
    ul.className = "dream-list";
    data.items.forEach((i) => {
      const li = document.createElement("li");
      li.textContent = i;
      ul.appendChild(li);
    });
    body.appendChild(ul);
  }

  if (data.type === "contact") {
    const wrap = document.createElement("div");
    wrap.className = "contact-row";
    data.links.forEach((l) => {
      const a = document.createElement("a");
      a.className = "contact-link";
      a.href = l.href;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML = `<span>${l.label}</span><span class="arrow">↗</span>`;
      wrap.appendChild(a);
    });
    body.appendChild(wrap);
  }
}

function openModal(id) {
  const data = CONTENT[id];
  if (!data) return;
  document.getElementById("modal-eyebrow").textContent = data.eyebrow || "";
  document.getElementById("modal-title").textContent = data.title || "";
  renderModalBody(data);

  const scrim = document.getElementById("modal-scrim");
  scrim.classList.remove("hidden");
  requestAnimationFrame(() => scrim.classList.add("visible"));
  modalOpen = true;
  hideOnboardHint();
}

function closeModal() {
  const scrim = document.getElementById("modal-scrim");
  scrim.classList.remove("visible");
  setTimeout(() => scrim.classList.add("hidden"), 350);
  modalOpen = false;
}

/* =========================================================
   ONBOARDING HINT
   ========================================================= */
function hideOnboardHint() {
  document.getElementById("onboard-hint").classList.add("hidden");
}

/* =========================================================
   AMBIENT DUST
   ========================================================= */
function spawnDust() {
  const layer = document.getElementById("dust-layer");
  const count = window.innerWidth < 640 ? 10 : 16;
  for (let i = 0; i < count; i++) {
    const d = document.createElement("span");
    d.className = "dust";
    d.style.left = Math.random() * 100 + "%";
    d.style.bottom = "-10px";
    d.style.animationDuration = 9 + Math.random() * 10 + "s";
    d.style.animationDelay = Math.random() * 10 + "s";
    layer.appendChild(d);
  }
}

/* =========================================================
   EVENT BINDING
   ========================================================= */
function bindEvents() {
  // --- desktop hover ---
  stage.addEventListener("mousemove", (e) => {
    if (modalOpen) return;
    const id = hotspotAtPoint(e.clientX, e.clientY);
    setHover(id);
  });

  stage.addEventListener("mouseleave", () => setHover(null));

  // --- click on room stage: figure out what (if anything) was hit ---
  stage.addEventListener("click", (e) => {
    if (modalOpen) return;

    const hitId = hotspotAtPoint(e.clientX, e.clientY);

    if (hitId === "about") {
      pressPulse("about");
      if (humanOpen) closeHuman();
      else openHuman();
      return;
    }

    if (hitId) {
      pressPulse(hitId);
      if (humanOpen) closeHuman();
      openModal(hitId);
      return;
    }

    // clicked empty space — close the speech bubble if it's open
    if (humanOpen) closeHuman();
  });

  // --- mobile touch: tap = hover pulse (actual open happens on the click event) ---
  stage.addEventListener(
    "touchstart",
    (e) => {
      if (modalOpen) return;
      const t = e.touches[0];
      const id = hotspotAtPoint(t.clientX, t.clientY);
      if (id) setHover(id);
    },
    { passive: true }
  );
  stage.addEventListener(
    "touchend",
    () => {
      setTimeout(() => setHover(null), 220);
    },
    { passive: true }
  );

  // --- modal close ---
  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("modal-scrim").addEventListener("click", (e) => {
    if (e.target.id === "modal-scrim") closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modalOpen) closeModal();
      if (humanOpen) closeHuman();
    }
  });
}

/* =========================================================
   GO
   ========================================================= */
init();
