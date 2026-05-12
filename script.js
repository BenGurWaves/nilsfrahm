/* ───────────────────────────────────────────────────────────────────────
   Nils Frahm — La Pédale
   Loader (cantus firmus) → page reveal → six works in a hushed column.
   The cursor is a baton. Hold space (or press-and-hold) to sustain
   the pedal: the room resonates within a radius of ~340px, type
   clarifies, a hairline draws horizontally across the page.
   ─────────────────────────────────────────────────────────────────────── */

const WORKS = [
  {
    num: '01', year: '2011', title: 'Felt',
    epigraph: 'A felt cloth, lowered onto the hammers, so the night might keep its quiet. The microphones, placed inside, heard what the room could not.',
    room: 'a Berlin apartment',
    method: 'muffled attack, ambient decay'
  },
  {
    num: '02', year: '2013', title: 'Spaces',
    epigraph: 'Two years of rooms, stitched into a single continuous breath. The audience kept in, never edited out.',
    room: 'thirty venues',
    method: 'live mosaic, no studio retake'
  },
  {
    num: '03', year: '2015', title: 'Solo',
    epigraph: 'One sitting. No overdubs. Performed on the Klavins Modell 370, three metres tall, one string per key. Released on the eighty-eighth day.',
    room: 'Vác · the Klavins workshop',
    method: 'improvised in a single take'
  },
  {
    num: '04', year: '2018', title: 'All Melody',
    epigraph: 'After two years of building, the door of Saal 3 was opened. The record is what the room finally let him hear.',
    room: 'Saal 3 · Funkhaus',
    method: 'composed into the architecture'
  },
  {
    num: '05', year: '2022', title: 'Music for Animals',
    epigraph: 'Three hours, ten pieces. A record that refuses to be background and refuses to demand attention. It waits, the way a forest waits.',
    room: 'Saal 3, after the tour',
    method: 'long form as ethics'
  },
  {
    num: '06', year: '2025', title: 'Night + Day',
    epigraph: 'A diptych. Two rooms of the same house. Night is the room with the window left open. Day is the room the sun walks through.',
    room: 'Funkhaus · dawn to dawn',
    method: 'composed at opposite hours'
  }
];

/* ─── elements ────────────────────────────────────────────────────── */
const loader   = document.getElementById('loader');
const cantus   = document.getElementById('cantus');
const loaderWord = document.querySelector('.loader-word');
const page     = document.getElementById('page');
const frame    = document.querySelector('.frame');
const invitation = document.querySelector('.invitation');
const worksEl  = document.getElementById('works');
const cursor   = document.getElementById('cursor');
const halo     = document.querySelector('.res-halo');
const resL     = document.querySelector('.res-l');
const resR     = document.querySelector('.res-r');
const caption  = document.getElementById('caption');
const capEpi   = document.getElementById('cap-epigraph');
const capRoom  = caption.querySelector('.cap-room');
const capMet   = caption.querySelector('.cap-method');
const frameNow = document.getElementById('frame-now');

/* ─── build the column ────────────────────────────────────────────── */
WORKS.forEach((w, i) => {
  const li = document.createElement('li');
  li.className = 'work';
  li.dataset.index = i;
  li.setAttribute('role', 'listitem');

  const letters = [...w.title].map((ch, k) =>
    `<span class="ltr" style="--li:${k}">${ch === ' ' ? '&nbsp;' : ch}</span>`
  ).join('');

  li.innerHTML = `
    <span class="w-mark" aria-hidden="true"></span>
    <span class="w-num">${w.num}</span>
    <span class="w-title" data-title="${w.title}">${letters}</span>
    <span class="w-year">${w.year}</span>
  `;
  worksEl.appendChild(li);
});
const works = [...document.querySelectorAll('.work')];

/* ─── active state + dispersion / arrival ─────────────────────────── */
let active = 0;
let busy = false;

function setActive(next, opts = {}) {
  if (busy || next === active) {
    updateDistances();
    return;
  }
  busy = true;

  const prev = active;
  active = ((next % WORKS.length) + WORKS.length) % WORKS.length;

  // disperse previous title — letters drift apart by their own kerning
  const prevTitle = works[prev].querySelector('.w-title');
  const prevLetters = [...prevTitle.querySelectorAll('.ltr')];
  const center = (prevLetters.length - 1) / 2;
  prevLetters.forEach((el, k) => {
    const d = (k - center);
    const dx = d * 22 + (Math.random() * 8 - 4);
    el.style.transform = `translateX(${dx}px) translateY(${(Math.random()*6-3)}px)`;
  });
  works[prev].classList.add('dispersing');
  works[prev].classList.remove('active');

  // arrive new title — staggered blur-up
  const nextEl = works[active];
  const nextLetters = [...nextEl.querySelectorAll('.ltr')];
  nextLetters.forEach((el) => { el.style.transform = ''; });
  nextEl.classList.remove('dispersing');
  // force reflow before re-arming animation
  void nextEl.offsetWidth;
  nextEl.classList.add('arriving', 'active');

  updateDistances();
  updateCaption(active);

  // unlock + cleanup
  setTimeout(() => {
    works[prev].classList.remove('dispersing');
    works[prev].querySelectorAll('.ltr').forEach(el => el.style.transform = '');
    nextEl.classList.remove('arriving');
    busy = false;
  }, 1700);
}

function updateDistances() {
  works.forEach((el, i) => {
    if (i === active) {
      el.removeAttribute('data-dist');
      return;
    }
    el.dataset.dist = String(Math.min(5, Math.abs(i - active)));
  });
}

function updateCaption(i) {
  caption.classList.remove('visible');
  setTimeout(() => {
    const w = WORKS[i];
    capEpi.innerHTML = `<em>"</em>${w.epigraph}<em>"</em>`;
    capRoom.textContent = w.room;
    capMet.textContent = w.method;
    caption.classList.add('visible');
  }, 320);
}

/* ─── inputs ──────────────────────────────────────────────────────── */
let lastWheel = 0;
window.addEventListener('wheel', (e) => {
  const now = performance.now();
  if (now - lastWheel < 320) return;
  lastWheel = now;
  setActive(active + (e.deltaY > 0 ? 1 : -1));
}, { passive: true });

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    if (!e.repeat) setPedal(true);
    return;
  }
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') setActive(active + 1);
  if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  setActive(active - 1);
  if (e.key === 'Enter') setPedal(true);
  if (e.key === 'Escape') setPedal(false);
});
window.addEventListener('keyup', (e) => {
  if (e.code === 'Space' || e.key === 'Enter') setPedal(false);
});

works.forEach(el => {
  el.addEventListener('click', () => setActive(+el.dataset.index));
});

/* drag/touch is intentionally absent — silence is the default mode */
/* but on touch devices we expose pedal via touch-and-hold */
let touchHoldTimer = null;
document.addEventListener('touchstart', () => {
  touchHoldTimer = setTimeout(() => setPedal(true), 220);
}, { passive: true });
document.addEventListener('touchend', () => {
  clearTimeout(touchHoldTimer);
  setPedal(false);
});

/* ─── pedal mechanic ──────────────────────────────────────────────── */
let pedal = false;
function setPedal(on) {
  if (pedal === on) return;
  pedal = on;
  document.body.classList.toggle('pedal', on);
  if (!on) works.forEach(w => w.classList.remove('heard'));
}

/* mouse-press also engages the pedal — natural for a "hold" gesture */
document.addEventListener('pointerdown', (e) => {
  // ignore clicks on actual interactive elements (works, colophon)
  if (e.target.closest('a, .work, button')) return;
  setPedal(true);
});
document.addEventListener('pointerup', () => setPedal(false));
document.addEventListener('pointercancel', () => setPedal(false));
window.addEventListener('blur', () => setPedal(false));

/* ─── cursor follow + resonance positioning ──────────────────────── */
let mx = innerWidth / 2, my = innerHeight / 2;
let cx = mx, cy = my;

window.addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; });

function loop() {
  cx += (mx - cx) * 0.18;
  cy += (my - cy) * 0.18;
  cursor.style.transform = `translate(${cx}px, ${cy}px)`;

  // halo follows precisely (no easing) — sense of the held column of light
  if (halo) {
    halo.style.left = `${mx}px`;
    halo.style.top  = `${my}px`;
  }
  // resonance lines anchor to cursor Y, draw outward to edges
  if (resL && resR) {
    resL.style.top = resR.style.top = `${my}px`;
    resL.style.right = `${innerWidth - mx}px`;
    resR.style.left  = `${mx}px`;
  }

  // when pedal is held, "hear" the works that fall within the resonance radius
  if (pedal) {
    const R = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--reso')) || 340;
    works.forEach(el => {
      const r = el.getBoundingClientRect();
      const ex = r.left + r.width / 2;
      const ey = r.top  + r.height / 2;
      const d = Math.hypot(mx - ex, my - ey);
      el.classList.toggle('heard', d < R);
    });
  }

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

/* ─── frame clock — italic only, low contrast ────────────────────── */
function tickClock() {
  const d = new Date();
  const h = String(d.getUTCHours()).padStart(2, '0');
  const m = String(d.getUTCMinutes()).padStart(2, '0');
  frameNow.textContent = `${h}h ${m} · UTC, the room`;
}
tickClock(); setInterval(tickClock, 30 * 1000);

/* ─── loader sequence: cantus draws, wordmark resonates in ─────── */
function runLoader() {
  const start = performance.now();
  const DUR = 2400;
  function step(t) {
    const p = Math.min(1, (t - start) / DUR);
    const e = 1 - Math.pow(1 - p, 3);
    cantus.setAttribute('x2', String(120 + (760) * e));
    if (p < 1) requestAnimationFrame(step);
    else afterCantus();
  }
  requestAnimationFrame(step);
}
function afterCantus() {
  loaderWord.classList.add('lit');
  setTimeout(() => {
    loader.classList.add('gone');
    setTimeout(enter, 1100);
  }, 1900);
}
function enter() {
  frame.classList.add('visible');
  page.classList.add('visible');
  invitation.classList.add('visible');
  // first arrival — no dispersion needed; just mark active and reveal caption
  works[active].classList.add('active', 'arriving');
  updateDistances();
  updateCaption(active);
  setTimeout(() => works[active].classList.remove('arriving'), 1700);
}

runLoader();

/* A Velocity atelier work — © MMXXVI */
