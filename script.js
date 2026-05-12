/* ───────────────────────────────────────────────────────────────────────
   Nils Frahm — Nuit Funkhaus
   Eight acts of one night at Saal 3.
   Time advances on wheel/arrows/drag/rail-click; the hall transforms.
   ─────────────────────────────────────────────────────────────────────── */

/* ─── ACTS ─────────────────────────────────────────────────────────── */
const ACTS = [
  {
    n: 'i.', name: 'arrival', time: '20:48',
    line: 'He arrived at the hall before anyone else. The building was East German, the windows were soviet-tall. He liked the silence before sound.',
    cite: '— funkhaus berlin · saal 3',
    light: { winTop: '#c97f4a', winBot: '#3a1f12', skyTop: '#2b1812', skyBot: '#0a0a0e', tint: 'rgba(232,180,120,0.04)' },
    waveform: 'arrival',
    figure: 0
  },
  {
    n: 'ii.', name: 'felt', time: '22:14',
    line: 'A felt cloth, lowered onto the hammers, so the night might keep its quiet. The microphones, placed inside, heard what the room could not.',
    cite: '— Felt · 2011',
    light: { winTop: '#7a4a30', winBot: '#1f1410', skyTop: '#1a1014', skyBot: '#070710', tint: 'rgba(232,180,120,0.05)' },
    waveform: 'felt',
    figure: 1
  },
  {
    n: 'iii.', name: 'spaces', time: '00:31',
    line: 'Two years of audiences, kept in. The hall fills with strangers and they breathe in unison; he plays as if to all of them at once.',
    cite: '— Spaces · 2013',
    light: { winTop: '#3a2640', winBot: '#0e0e1c', skyTop: '#0e0e1c', skyBot: '#03030a', tint: 'rgba(232,180,120,0.06)' },
    waveform: 'spaces',
    figure: 1
  },
  {
    n: 'iv.', name: 'solo', time: '02:07',
    line: 'The Modell 370 stands alone. Three metres tall, one string per key. He plays it once, in a single breath, with no one in the room.',
    cite: '— Solo · 2015',
    light: { winTop: '#1d2436', winBot: '#070a14', skyTop: '#070a14', skyBot: '#02030a', tint: 'rgba(232,180,120,0.05)' },
    waveform: 'solo',
    figure: 1
  },
  {
    n: 'v.', name: 'all melody', time: '03:46',
    line: 'After two years of building, the door of Saal 3 is opened. The record is what the room finally lets him hear. The walls were waiting.',
    cite: '— All Melody · 2018',
    light: { winTop: '#1a2a3a', winBot: '#080d1a', skyTop: '#080d1a', skyBot: '#02030a', tint: 'rgba(232,180,120,0.07)' },
    waveform: 'all-melody',
    figure: 1
  },
  {
    n: 'vi.', name: 'music for animals', time: '04:55',
    line: 'Three hours, ten pieces. A record that refuses to be background and refuses to demand attention. As a forest waits — that is how he plays.',
    cite: '— Music for Animals · 2022',
    light: { winTop: '#2a3346', winBot: '#0d1220', skyTop: '#0d1220', skyBot: '#03030a', tint: 'rgba(232,180,120,0.06)' },
    waveform: 'animals',
    figure: 1
  },
  {
    n: 'vii.', name: 'day', time: '06:12',
    line: 'The first light falls on the console. He plays the room awake. The pendant lamp grows quieter as the windows learn how to glow.',
    cite: '— Day · 2025',
    light: { winTop: '#7a6440', winBot: '#3a2a1a', skyTop: '#3a2a1c', skyBot: '#0a0a0e', tint: 'rgba(214,183,140,0.10)' },
    waveform: 'day',
    figure: 1
  },
  {
    n: 'viii.', name: 'departure', time: '07:00',
    line: 'He leaves the hall the way he found it. The chair is empty again. Only the lamp remembers how the night sounded — and lamps forget by noon.',
    cite: '— funkhaus berlin · saal 3',
    light: { winTop: '#d6b78c', winBot: '#7a5a3c', skyTop: '#7a5a3c', skyBot: '#1a1a18', tint: 'rgba(214,183,140,0.14)' },
    waveform: 'departure',
    figure: 0
  }
];

/* ─── waveform paths (matched to the back wall ~ x:120 → 1480, y centre 610) */
const WAVES = {
  /* flat line, the room is silent */
  arrival: 'M120,610 L1480,610',
  /* gentle sine, intimate */
  felt:    'M120,610 Q200,604 280,610 T440,610 T600,610 T760,610 T920,610 T1080,610 T1240,610 T1400,610 L1480,610',
  /* dense, busy */
  spaces:  'M120,610 L160,594 L200,624 L240,598 L280,620 L320,592 L360,628 L400,600 L440,616 L480,592 L520,624 L560,602 L600,618 L640,596 L680,624 L720,598 L760,622 L800,602 L840,618 L880,596 L920,624 L960,602 L1000,618 L1040,598 L1080,622 L1120,602 L1160,618 L1200,596 L1240,622 L1280,602 L1320,616 L1360,600 L1400,624 L1440,604 L1480,610',
  /* a single tall vertical mark — Solo's one note */
  solo:    'M120,610 L780,610 L800,520 L800,610 L1480,610',
  /* a wide ambient pad */
  'all-melody': 'M120,610 Q400,560 800,560 T1480,610',
  /* slow long horizontal drift */
  animals: 'M120,610 Q280,608 440,612 T760,610 T1080,612 T1400,610 L1480,610',
  /* sustained tone, slight rise */
  day:     'M120,610 Q400,584 800,584 T1480,580',
  /* return to flat */
  departure:'M120,610 L1480,610'
};

/* ─── element refs ─────────────────────────────────────────────────── */
const root      = document.documentElement;
const loader    = document.getElementById('loader');
const doorL     = document.getElementById('door-l');
const doorR     = document.getElementById('door-r');
const doorT     = document.getElementById('door-t');
const stage     = document.getElementById('hall-stage');
const sky       = document.getElementById('sky');
const wash      = document.getElementById('hallWash');
const hallSvg   = document.getElementById('hall');
const wave      = document.getElementById('wave');
const figure    = document.getElementById('figure');
const dawnRay   = document.getElementById('dawn-ray');
const lampHalo  = document.getElementById('lamp-halo');
const cursor    = document.getElementById('cursor');
const time      = document.getElementById('time');
const arcRule   = document.getElementById('arcRule');
const proseLine = document.getElementById('proseLine');
const proseCite = document.getElementById('proseCite');
const actNum    = document.getElementById('actNum');
const actName   = document.getElementById('actName');
const railEl    = document.getElementById('rail');
const frame     = document.querySelector('.frame');
const timecard  = document.querySelector('.timecard');
const proseStage= document.querySelector('.prose-stage');
const invitation= document.querySelector('.invitation');
const frameCoord= document.getElementById('frame-coord');
const frameNow  = document.getElementById('frame-now');

/* ─── herringbone floor (procedural) ─────────────────────────────── */
(function herringbone() {
  const g = document.getElementById('herring');
  if (!g) return;
  const rows = [{ y: 700, w: 22 }, { y: 740, w: 28 }, { y: 800, w: 36 }, { y: 870, w: 48 }];
  rows.forEach(r => {
    for (let x = 0; x < 1600; x += r.w * 2) {
      const a = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      a.setAttribute('x1', x); a.setAttribute('y1', r.y);
      a.setAttribute('x2', x + r.w); a.setAttribute('y2', r.y + 6);
      g.appendChild(a);
      const b = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      b.setAttribute('x1', x + r.w); b.setAttribute('y1', r.y + 6);
      b.setAttribute('x2', x + r.w * 2); b.setAttribute('y2', r.y);
      g.appendChild(b);
    }
  });
})();

/* ─── rail (eight ticks) ───────────────────────────────────────────── */
ACTS.forEach((a, i) => {
  const b = document.createElement('button');
  b.className = 'rail-tick';
  b.dataset.i = i;
  b.innerHTML = `<span class="tick-bar"></span><span class="tick-time">${a.time}</span>`;
  b.setAttribute('aria-label', `${a.n} ${a.name}, ${a.time}`);
  b.addEventListener('click', () => goTo(i));
  railEl.appendChild(b);
});
const ticks = [...railEl.querySelectorAll('.rail-tick')];

/* ─── apply act ────────────────────────────────────────────────────── */
let current = 0;
let busy = false;

function applyLight(a) {
  root.style.setProperty('--win-top',    a.light.winTop);
  root.style.setProperty('--win-bottom', a.light.winBot);
  root.style.setProperty('--sky-top',    a.light.skyTop);
  root.style.setProperty('--sky-bottom', a.light.skyBot);
  root.style.setProperty('--hall-tint',  a.light.tint);
  sky.style.background  = `linear-gradient(to bottom, ${a.light.skyTop} 0%, ${a.light.skyBot} 70%)`;
  wash.style.background = `radial-gradient(ellipse 60% 40% at 50% 32%, ${a.light.tint}, transparent 70%), radial-gradient(ellipse 100% 80% at 50% 100%, rgba(0,0,0,0.5), transparent 70%)`;
}

function setProseLetters(el, str) {
  let gi = 0;
  el.innerHTML = str.split(/(\s+)/).map(part => {
    if (/^\s+$/.test(part)) return '<span class="ws"> </span>';
    const inner = [...part].map(ch => {
      const html = `<span class="ltr" style="--li:${gi}">${ch}</span>`;
      gi += 1;
      return html;
    }).join('');
    return `<span class="word">${inner}</span>`;
  }).join('');
}

function applyAct(i, instant = false) {
  const a = ACTS[i];

  /* time + arc */
  time.textContent = a.time;
  arcRule.style.width = `${(i / (ACTS.length - 1)) * 100}%`;

  /* light */
  applyLight(a);
  document.body.dataset.act = i;

  /* waveform */
  wave.setAttribute('d', WAVES[a.waveform]);
  if (a.waveform === 'solo') {
    wave.setAttribute('stroke', 'var(--bordeaux)');
    wave.setAttribute('opacity', '0.85');
  } else if (a.waveform === 'arrival' || a.waveform === 'departure') {
    wave.setAttribute('stroke', 'var(--bone-2)');
    wave.setAttribute('opacity', '0.25');
  } else {
    wave.setAttribute('stroke', 'var(--bordeaux)');
    wave.setAttribute('opacity', '0.55');
  }

  /* figure */
  figure.style.opacity = a.figure ? 0.85 : 0;

  /* lamp halo intensity (loudest at the end of night, dimmer at dawn) */
  if (lampHalo) {
    if (a.waveform === 'day' || a.waveform === 'departure') lampHalo.setAttribute('opacity', '0.35');
    else lampHalo.setAttribute('opacity', '0.95');
  }
  /* dawn ray: only visible in the last two acts */
  if (dawnRay) {
    dawnRay.setAttribute('opacity', (a.waveform === 'day' || a.waveform === 'departure') ? '1' : '0');
  }

  /* prose dispersion / arrival */
  actNum.textContent = a.n;
  actName.textContent = a.name;
  proseCite.innerHTML = `<em>${a.cite}</em>`;

  /* rail */
  ticks.forEach((t, k) => {
    t.classList.toggle('active', k === i);
    t.classList.toggle('passed', k < i);
  });

  /* frame */
  frameCoord.textContent = `act ${a.n.replace('.', '')} · ${a.name}`;
  frameNow.textContent = `${a.time} · the room`;

  if (instant) {
    setProseLetters(proseLine, a.line);
    proseLine.classList.remove('dispersing', 'arriving');
    return;
  }

  /* disperse current letters, then arrive new */
  proseLine.classList.add('dispersing');
  const ltrs = proseLine.querySelectorAll('.ltr');
  const center = (ltrs.length - 1) / 2;
  ltrs.forEach((el, k) => {
    const d = (k - center);
    el.style.transform = `translateX(${d * 9 + (Math.random() * 6 - 3)}px) translateY(${(Math.random() * 6 - 3)}px)`;
  });
  setTimeout(() => {
    setProseLetters(proseLine, a.line);
    proseLine.classList.remove('dispersing');
    void proseLine.offsetWidth;
    proseLine.classList.add('arriving');
    setTimeout(() => proseLine.classList.remove('arriving'), 1700);
  }, 800);
}

function goTo(i) {
  if (busy) return;
  i = Math.max(0, Math.min(ACTS.length - 1, i));
  if (i === current) return;
  busy = true;
  current = i;
  applyAct(i);
  setTimeout(() => { busy = false; }, 900);
}

/* ─── inputs ──────────────────────────────────────────────────────── */
let lastWheel = 0;
window.addEventListener('wheel', (e) => {
  const now = performance.now();
  if (now - lastWheel < 600) return;
  lastWheel = now;
  goTo(current + (e.deltaY > 0 ? 1 : -1));
}, { passive: true });

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(current + 1);
  if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goTo(current - 1);
  if (e.key === 'Home') goTo(0);
  if (e.key === 'End')  goTo(ACTS.length - 1);
});

/* drag (touch + pointer) */
let dragY = null;
window.addEventListener('pointerdown', (e) => {
  if (e.target.closest('a, button')) return;
  dragY = e.clientY;
});
window.addEventListener('pointerup', (e) => {
  if (dragY == null) return;
  const dy = e.clientY - dragY;
  dragY = null;
  if (Math.abs(dy) < 28) return;
  goTo(current + (dy < 0 ? 1 : -1));
});

/* ─── cursor + parallax ───────────────────────────────────────────── */
let mx = innerWidth / 2, my = innerHeight / 2;
let cx = mx, cy = my;
window.addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; });
function loop() {
  cx += (mx - cx) * 0.18;
  cy += (my - cy) * 0.18;
  cursor.style.transform = `translate(${cx}px, ${cy}px)`;
  /* parallax: shift hall slightly opposite cursor (smaller magnitude on phones) */
  const phone = innerWidth < 820;
  const px = (mx / innerWidth  - 0.5) * (phone ? -6 : -14);
  const py = (my / innerHeight - 0.5) * (phone ? -3 : -8);
  hallSvg.style.transform = `translate3d(${px}px, ${py}px, 0)`;
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

/* ─── loader sequence: doors part ─────────────────────────────────── */
function runLoader() {
  const start = performance.now();
  const DUR = 2200;
  function step(t) {
    const p = Math.min(1, (t - start) / DUR);
    const e = 1 - Math.pow(1 - p, 3);
    /* the doors: top stays, two halves move outward — simulate as four lines: top, left vertical, right vertical, bottom */
    const cy_t = 80;
    const cy_b = 720;
    const cx_l = 300 - (220 * e);
    const cx_r = 300 + (220 * e);
    doorL.setAttribute('x1', cx_l); doorL.setAttribute('x2', cx_l);
    doorL.setAttribute('y1', cy_t); doorL.setAttribute('y2', cy_b);
    doorR.setAttribute('x1', cx_r); doorR.setAttribute('x2', cx_r);
    doorR.setAttribute('y1', cy_t); doorR.setAttribute('y2', cy_b);
    doorT.setAttribute('x1', cx_l); doorT.setAttribute('x2', cx_r);
    doorT.setAttribute('y1', cy_t); doorT.setAttribute('y2', cy_t);
    if (p < 1) requestAnimationFrame(step);
    else after();
  }
  requestAnimationFrame(step);
  setTimeout(() => loader.classList.add('lit'), 100);
}
function after() {
  setTimeout(() => {
    loader.classList.add('gone');
    setTimeout(enter, 1100);
  }, 2400);
}
function enter() {
  stage.classList.add('visible');
  frame.classList.add('visible');
  timecard.classList.add('visible');
  proseStage.classList.add('visible');
  railEl.classList.add('visible');
  invitation.classList.add('visible');
  applyAct(0, true);
  /* set up the prose letters */
  setProseLetters(proseLine, ACTS[0].line);
  proseLine.classList.add('arriving');
  setTimeout(() => proseLine.classList.remove('arriving'), 1700);
}
runLoader();

/* A Velocity atelier work — © MMXXVI */
