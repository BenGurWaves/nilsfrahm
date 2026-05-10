/* ───────────────────────────────────────────────────────────────────────
   Nils Frahm — "Feutre"
   Loader → 3D column slider → strike-explode particles → detail fold.
   No libraries. Pure Canvas + CSS 3D + RAF.
   ─────────────────────────────────────────────────────────────────────── */

const WORKS = [
  {
    num: '01', year: '2011', title: 'Felt',
    epigraph: 'He pressed felt upon the hammers so he would not wake his neighbours. The microphones, placed inside the instrument, heard what the room could not.',
    instrument: 'Upright piano, modified. Two condenser microphones, close.',
    method: 'Muffled attack. Ambient decay. Late-night restraint as compositional principle.',
    room: 'Berlin, a rented apartment.'
  },
  {
    num: '02', year: '2013', title: 'Spaces',
    epigraph: 'A two-year collage of live rooms, stitched into a single breathing document. The audience is kept in, not edited out.',
    instrument: 'Pianos and synthesizers from thirty-odd stages.',
    method: 'Live recordings assembled as a mosaic. Nothing re-performed in the studio.',
    room: 'Thirty venues across two continents.'
  },
  {
    num: '03', year: '2015', title: 'Solo',
    epigraph: 'One take. No overdubs. Performed on the Klavins Modell 370 — a vertical piano three metres tall. Released on Piano Day, the 88th of the year.',
    instrument: 'Klavins Modell 370 — 370 cm, one string per key.',
    method: 'Improvised, single sitting. The first Piano Day gift.',
    room: 'Vác, Hungary — the Klavins workshop.'
  },
  {
    num: '04', year: '2018', title: 'All Melody',
    epigraph: 'After two years of building, a room at Funkhaus Berlin opened its doors. The record is what the room allowed him to finally hear.',
    instrument: 'Pipe organ, custom mixing console, ninety-two stops of brass and wood.',
    method: 'Written into the architecture of Saal 3 as it was built around him.',
    room: 'Funkhaus Berlin, Saal 3.'
  },
  {
    num: '05', year: '2022', title: 'Music for Animals',
    epigraph: 'Three hours, ten pieces. A record that refuses to be background and refuses to demand attention. It waits, as a forest waits.',
    instrument: 'Arp 2600, synclavier, celesta, the patient ones.',
    method: 'Long form as compositional ethics. No chorus. No release.',
    room: 'Saal 3, returned to after the tour.'
  },
  {
    num: '06', year: '2025', title: 'Night + Day',
    epigraph: 'A diptych. Two rooms of the same house. Night is the room with the window left open; Day is the room the sun walks through.',
    instrument: 'Una Corda, upright, Rhodes, and the first light on the console.',
    method: 'Composed at opposite hours. Never heard together until the sequence was final.',
    room: 'Funkhaus, dawn to dawn.'
  }
];

const STEP = 360 / WORKS.length; // 60° per hammer

/* ─── elements ─────────────────────────────────────────────────────── */
const column   = document.getElementById('column');
const stage    = document.getElementById('stage');
const rail     = document.getElementById('rail');
const cursor   = document.getElementById('cursor');
const particles= document.getElementById('particles');
const detail   = document.getElementById('detail');
const loader   = document.getElementById('loader');
const thread   = document.getElementById('loader-thread');
const loaderHammer = document.getElementById('loader-hammer');
const loaderWord   = document.querySelector('.loader-word');
const loaderMeta   = document.querySelector('.loader-meta');
const loaderCount  = document.getElementById('loader-count');
const coordNow     = document.getElementById('coord-now');
const hallThread   = document.getElementById('thread');

/* ─── build hammers ────────────────────────────────────────────────── */
WORKS.forEach((w, i) => {
  const el = document.createElement('button');
  el.className = 'hammer';
  el.dataset.index = i;
  el.style.transform =
    `rotateX(${-i * STEP}deg) translateZ(var(--column-radius))`;
  el.innerHTML = `
    <div class="hammer-shank"></div>
    <div class="hammer-inner">
      <div class="hammer-head" aria-hidden="true"></div>
      <div class="hammer-text">
        <span class="hammer-title">${w.title}</span>
        <span class="hammer-meta">
          <span>${w.num}</span><span>${w.year}</span>
        </span>
      </div>
    </div>`;
  el.setAttribute('aria-label', `${w.num} · ${w.title} · ${w.year}. Click to strike.`);
  column.appendChild(el);

  const rEl = document.createElement('button');
  rEl.className = 'rail-item';
  rEl.dataset.index = i;
  rEl.innerHTML = `
    <span class="rail-num">${w.num}</span>
    <span class="rail-tick"></span>`;
  rEl.setAttribute('aria-label', `Jump to ${w.title}`);
  rail.appendChild(rEl);
});

const hammers = [...document.querySelectorAll('.hammer')];
const railItems = [...document.querySelectorAll('.rail-item')];

/* ─── column rotation state ───────────────────────────────────────── */
let angle = 0;          // displayed angle (degrees)
let target = 0;         // target angle
let active = 0;
let struckLock = false; // while a strike + detail is open
let lastWheel = 0;

function setActive(i) {
  active = ((i % WORKS.length) + WORKS.length) % WORKS.length;
  target = -active * STEP;
  hammers.forEach((h, k) => h.classList.toggle('active', k === active));
  railItems.forEach((r, k) => r.classList.toggle('active', k === active));
}

function raf() {
  angle += (target - angle) * 0.08;
  column.style.transform = `translate(-50%, -50%) rotateX(${angle}deg)`;
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* ─── navigation inputs ───────────────────────────────────────────── */
window.addEventListener('wheel', (e) => {
  if (struckLock) return;
  const now = performance.now();
  if (now - lastWheel < 280) return;
  lastWheel = now;
  setActive(active + (e.deltaY > 0 ? 1 : -1));
}, { passive: true });

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && struckLock) { closeDetail(); return; }
  if (struckLock) return;
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { setActive(active + 1); }
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft')   { setActive(active - 1); }
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    strike(active);
  }
});

/* drag (pointer) */
let dragging = false, dragStartY = 0, dragStartAngle = 0;
window.addEventListener('pointerdown', (e) => {
  if (struckLock) return;
  if (e.target.closest('#detail') || e.target.closest('#colophon')) return;
  dragging = true;
  dragStartY = e.clientY;
  dragStartAngle = target;
});
window.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  const dy = e.clientY - dragStartY;
  target = dragStartAngle + dy * 0.35;
});
window.addEventListener('pointerup', () => {
  if (!dragging) return;
  dragging = false;
  // snap to nearest
  const nearest = Math.round(-target / STEP);
  setActive(nearest);
});

/* rail clicks */
railItems.forEach(r => r.addEventListener('click', () => {
  if (struckLock) return;
  setActive(+r.dataset.index);
}));

/* hammer hover / strike */
hammers.forEach(h => {
  h.addEventListener('mouseenter', () => {
    if (+h.dataset.index === active) cursor.classList.add('hover');
    h.classList.add('hovered');
  });
  h.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    h.classList.remove('hovered');
  });
  h.addEventListener('click', (e) => {
    e.stopPropagation();
    if (struckLock) return;
    const i = +h.dataset.index;
    if (i !== active) { setActive(i); return; }
    strike(i);
  });
});

/* ─── the strike: particles + detail ──────────────────────────────── */
const ctx = particles.getContext('2d');
function sizeCanvas() {
  particles.width  = window.innerWidth  * devicePixelRatio;
  particles.height = window.innerHeight * devicePixelRatio;
  particles.style.width  = window.innerWidth  + 'px';
  particles.style.height = window.innerHeight + 'px';
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

let P = []; // particles
const COLORS = ['#E8E2D4','#CFC9BB','#A84B2A','#8A8580','#54524C'];

function burst(x, y, count) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const s = Math.pow(Math.random(), 1.4) * 9 + 0.6;
    P.push({
      x, y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s - 1.2,
      r: Math.random() * 1.6 + 0.4,
      life: 1,
      decay: 0.004 + Math.random() * 0.006,
      color: COLORS[(Math.random() * COLORS.length) | 0],
      g: 0.04 + Math.random() * 0.06
    });
  }
}

function tick() {
  ctx.clearRect(0, 0, particles.width, particles.height);
  for (let i = P.length - 1; i >= 0; i--) {
    const p = P[i];
    p.vy += p.g;
    p.vx *= 0.985;
    p.vy *= 0.992;
    p.x += p.vx;
    p.y += p.vy;
    p.life -= p.decay;
    if (p.life <= 0) { P.splice(i, 1); continue; }
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

function strike(i) {
  struckLock = true;
  const h = hammers[i];
  const head = h.querySelector('.hammer-head');
  const rect = head.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  cursor.classList.add('strike');
  setTimeout(() => cursor.classList.remove('strike'), 520);

  h.classList.add('striking');

  // two-stage burst: wood dust on pull, felt + ember on impact
  setTimeout(() => burst(cx, cy - 18, 240), 160);
  setTimeout(() => {
    const r2 = head.getBoundingClientRect();
    burst(r2.left + r2.width/2, r2.top + r2.height/2, window.innerWidth < 820 ? 900 : 1700);
  }, 440);

  setTimeout(() => {
    stage.classList.add('struck');
    openDetail(i);
  }, 560);
}

/* ─── detail fold ─────────────────────────────────────────────────── */
const dNum = document.getElementById('detail-num');
const dYear= document.getElementById('detail-year');
const dTitle = document.getElementById('detail-title');
const dEpi = document.getElementById('detail-epigraph');
const dInst = document.getElementById('detail-instrument');
const dMeth = document.getElementById('detail-method');
const dRoom = document.getElementById('detail-room');
const dDots = document.getElementById('detail-dots');
const dClose = document.getElementById('detail-close');

function openDetail(i) {
  const w = WORKS[i];
  dNum.textContent = w.num;
  dYear.textContent = w.year;
  dTitle.textContent = w.title;
  dEpi.textContent = '"' + w.epigraph + '"';
  dInst.textContent = w.instrument;
  dMeth.textContent = w.method;
  dRoom.textContent = w.room;
  // breath-mark dots — one per pseudo-"track", pulsing one at a time
  dDots.innerHTML = '';
  const n = 10;
  for (let k = 0; k < n; k++) {
    const s = document.createElement('span');
    dDots.appendChild(s);
  }
  let k = 0;
  const spans = [...dDots.children];
  if (window._breath) clearInterval(window._breath);
  window._breath = setInterval(() => {
    spans.forEach(s => s.classList.remove('pulse'));
    spans[k].classList.add('pulse');
    k = (k + 1) % spans.length;
  }, 520);

  detail.classList.add('open');
  detail.setAttribute('aria-hidden', 'false');
}

function closeDetail() {
  detail.classList.remove('open');
  detail.setAttribute('aria-hidden', 'true');
  if (window._breath) clearInterval(window._breath);
  // restore hammer
  setTimeout(() => {
    hammers.forEach(h => h.classList.remove('striking'));
    stage.classList.remove('struck');
    struckLock = false;
  }, 700);
}
dClose.addEventListener('click', closeDetail);

/* ─── cursor ──────────────────────────────────────────────────────── */
let mx = innerWidth/2, my = innerHeight/2;
let cx = mx, cy = my;
window.addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; });
function cursorLoop() {
  cx += (mx - cx) * 0.22;
  cy += (my - cy) * 0.22;
  cursor.style.transform = `translate(${cx}px, ${cy}px)`;
  requestAnimationFrame(cursorLoop);
}
cursorLoop();

/* ─── coord clock ─────────────────────────────────────────────────── */
function tickClock() {
  const d = new Date();
  const hh = String(d.getUTCHours()).padStart(2,'0');
  const mm = String(d.getUTCMinutes()).padStart(2,'0');
  const ss = String(d.getUTCSeconds()).padStart(2,'0');
  coordNow.textContent = `${hh}:${mm}:${ss} UTC`;
}
tickClock(); setInterval(tickClock, 1000);

/* ─── loader sequence ─────────────────────────────────────────────── */
function runLoader() {
  const start = performance.now();
  const DUR = 2100;
  function animate(t) {
    const p = Math.min(1, (t - start) / DUR);
    // draw the Modell 370 thread
    const y = 60 + (740 - 60) * easeOutCubic(p);
    thread.setAttribute('y2', y);
    loaderHammer.setAttribute('cy', y);
    loaderHammer.setAttribute('r', 1.4 + p * 3.2);
    // count up 00 / 88
    loaderCount.textContent = `${String(Math.floor(p * 88)).padStart(2,'0')} / 88`;
    if (p < 1) requestAnimationFrame(animate);
    else afterThread();
  }
  requestAnimationFrame(animate);
}
function easeOutCubic(t){ return 1 - Math.pow(1-t, 3); }

function afterThread() {
  loaderWord.classList.add('lit');
  loaderMeta.classList.add('lit');
  setTimeout(() => {
    loader.classList.add('gone');
    setTimeout(enterStage, 900);
  }, 1800);
}

function enterStage() {
  stage.classList.add('visible');
  document.getElementById('hud-top').classList.add('visible');
  rail.classList.add('visible');
  document.getElementById('hint').classList.add('visible');
  document.getElementById('colophon').classList.add('visible');
  setActive(0);
  // subtle hall thread (echo of Modell 370) slowly draws
  let y = 0;
  const grow = () => {
    y += 3;
    hallThread.setAttribute('y2', Math.min(y, 820));
    if (y < 820) requestAnimationFrame(grow);
  };
  requestAnimationFrame(grow);
}

runLoader();

/* A Velocity atelier work — © MMXXVI */
