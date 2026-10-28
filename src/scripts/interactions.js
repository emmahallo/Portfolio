/* =========================================================
   Interaktionen — Vanilla JS, keine Abhängigkeiten
   ---------------------------------------------------------
   Alles wird über data-Attribute im Markup gesteuert:

   [data-split]            Text wird wortweise eingeblendet
   [data-split="chars"]    … oder buchstabenweise (für große Titel)
   [data-trail="a.jpg|…"]  Bilder-Spur, die der Maus folgt (wie bold.team)
   [data-cursor="view"]    Cursor wird zur Pille mit Augen + Label
   [data-cursor-label]     Text in der Cursor-Pille
   [data-magnetic]         Element zieht sich zum Cursor hin
   [data-parallax="0.1"]   leichtes Parallax beim Scrollen

   Respektiert prefers-reduced-motion und Touch-Geräte.
========================================================= */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/* ---------------------------------------------------------
   1. Text-Reveal (Wörter / Buchstaben gleiten von unten rein)
--------------------------------------------------------- */
function splitText(el) {
  if (el.dataset.splitDone) return;
  el.dataset.splitDone = 'true';
  const mode = el.dataset.split === 'chars' ? 'chars' : 'words';
  const label = el.textContent.replace(/\s+/g, ' ').trim();
  el.setAttribute('aria-label', label);

  let index = 0;
  const nodes = Array.from(el.childNodes);
  el.textContent = '';

  const makePiece = (text) => {
    const outer = document.createElement('span');
    outer.className = 'split__mask';
    outer.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.className = 'split__piece';
    inner.style.setProperty('--i', String(index++));
    inner.textContent = text;
    outer.appendChild(inner);
    return outer;
  };

  nodes.forEach((node) => {
    if (node.nodeType !== Node.TEXT_NODE) {
      // <br>, <em> usw. bleiben erhalten
      if (node.nodeType === Node.ELEMENT_NODE) node.setAttribute('aria-hidden', 'true');
      el.appendChild(node);
      return;
    }
    const words = node.textContent.split(/(\s+)/);
    words.forEach((word) => {
      if (!word) return;
      if (/^\s+$/.test(word)) {
        el.appendChild(document.createTextNode(' '));
        return;
      }
      if (mode === 'chars') {
        const wordWrap = document.createElement('span');
        wordWrap.className = 'split__word';
        Array.from(word).forEach((ch) => wordWrap.appendChild(makePiece(ch)));
        el.appendChild(wordWrap);
      } else {
        el.appendChild(makePiece(word));
      }
    });
  });
}

function initSplit() {
  const els = document.querySelectorAll('[data-split]');
  if (!els.length) return;
  els.forEach(splitText);

  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-split-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-split-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -6% 0px' }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------------------------------------------------------
   2. Bilder-Spur (Maus) — inspiriert von bold.team
--------------------------------------------------------- */
function initTrail(zone) {
  const sources = (zone.dataset.trail || '').split('|').map((s) => s.trim()).filter(Boolean);
  if (!sources.length || reduceMotion) return;

  // Bilder vorladen, damit nichts aufblitzt
  sources.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  const layer = document.createElement('div');
  layer.className = 'trail-layer';
  layer.setAttribute('aria-hidden', 'true');
  zone.prepend(layer);

  const MAX = 9;
  let index = 0;
  let z = 1;
  let last = null;
  const threshold = () => clamp(window.innerWidth * 0.07, 70, 120);

  const spawn = (x, y, dx = 0, dy = 0) => {
    const img = document.createElement('img');
    img.className = 'trail-img';
    img.src = sources[index++ % sources.length];
    img.alt = '';
    img.decoding = 'async';
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.zIndex = String(z++);
    layer.appendChild(img);

    while (layer.children.length > MAX) layer.firstElementChild.remove();

    const rot = (Math.random() - 0.5) * 16;
    const driftX = clamp(dx * 0.6, -60, 60);
    const driftY = clamp(dy * 0.6, -60, 60);

    const appear = img.animate(
      [
        { opacity: 0, transform: `translate(-50%, -50%) scale(0.55) rotate(${rot * 2}deg)` },
        { opacity: 1, transform: `translate(-50%, -50%) scale(1) rotate(${rot}deg)` },
      ],
      { duration: 380, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
    );

    appear.finished
      .then(() =>
        img.animate(
          [
            { opacity: 1, transform: `translate(-50%, -50%) scale(1) rotate(${rot}deg)` },
            {
              opacity: 0,
              transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY + 30}px)) scale(0.8) rotate(${rot}deg)`,
            },
          ],
          { duration: 700, delay: 650, easing: 'cubic-bezier(0.55, 0, 0.45, 1)', fill: 'forwards' }
        ).finished
      )
      .then(() => img.remove())
      .catch(() => img.remove());
  };

  zone.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    if (e.target.closest('a, button')) return; // über Buttons keine Bilder
    const r = zone.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    if (!last) {
      last = { x, y };
      return;
    }
    const dx = x - last.x;
    const dy = y - last.y;
    if (Math.hypot(dx, dy) < threshold()) return;
    last = { x, y };
    spawn(x, y, dx, dy);
    zone.classList.add('has-trailed');
  });

  zone.addEventListener('pointerleave', () => {
    last = null;
  });

  // Touch: Antippen erzeugt ein Bild
  zone.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    if (e.target.closest('a, button')) return;
    const r = zone.getBoundingClientRect();
    spawn(e.clientX - r.left, e.clientY - r.top);
    zone.classList.add('has-trailed');
  });
}

/* ---------------------------------------------------------
   3. Kontext-Cursor mit Doodle + Handschrift
   [data-cursor="view"]  → Augen + „Projekt ansehen!“
   [data-cursor="drag"]  → Swipe-Pfeil + „swipe!“
   Text kommt aus data-cursor-label.
--------------------------------------------------------- */
function initCursor() {
  if (!finePointer) return;

  const cursor = document.createElement('div');
  cursor.className = 'ee-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = `
    <div class="ee-cursor__inner">
      <span class="ee-cursor__art">
        <span class="ee-spark ee-spark--1"><svg viewBox="0 0 24 24"><path d="M12,1 L14.5,9.5 L23,12 L14.5,14.5 L12,23 L9.5,14.5 L1,12 L9.5,9.5 Z" fill="currentColor"/></svg></span>
        <span class="ee-spark ee-spark--2"><svg viewBox="0 0 24 24"><path d="M12,1 L14.5,9.5 L23,12 L14.5,14.5 L12,23 L9.5,14.5 L1,12 L9.5,9.5 Z" fill="currentColor"/></svg></span>
        <span class="ee-spark ee-spark--3"><svg viewBox="0 0 24 24"><path d="M12,1 L14.5,9.5 L23,12 L14.5,14.5 L12,23 L9.5,14.5 L1,12 L9.5,9.5 Z" fill="currentColor"/></svg></span>
        <span class="ee-spark ee-spark--4"><svg viewBox="0 0 24 24"><path d="M12,1 L14.5,9.5 L23,12 L14.5,14.5 L12,23 L9.5,14.5 L1,12 L9.5,9.5 Z" fill="currentColor"/></svg></span>
        <span class="ee-swipe__arrow"></span>
      </span>
      <span class="ee-cursor__text"></span>
    </div>`;
  document.body.appendChild(cursor);

  const text = cursor.querySelector('.ee-cursor__text');

  let mx = -100;
  let my = -100;
  let x = mx;
  let y = my;
  let started = false;

  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      mx = e.clientX;
      my = e.clientY;
      if (!started) {
        x = mx;
        y = my;
        started = true;
      }
    },
    { passive: true }
  );

  const setActive = (target) => {
    if (target) {
      text.textContent = target.dataset.cursorLabel || '';
      cursor.dataset.mode = target.dataset.cursor;
      cursor.classList.add('is-active');
    } else {
      cursor.classList.remove('is-active');
      cursor.classList.remove('is-on-light');
    }
  };

  document.addEventListener('pointerover', (e) => {
    const target = e.target.closest('[data-cursor]');
    setActive(target);
    if (target) {
      cursor.classList.toggle('is-on-light', !!e.target.closest('.project-card__content'));
    }
  });
  document.addEventListener('pointerleave', () => setActive(null));
  window.addEventListener('blur', () => setActive(null));
  window.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') cursor.classList.add('is-pressed');
  });
  window.addEventListener('pointerup', () => cursor.classList.remove('is-pressed'));
  window.addEventListener('pointercancel', () => cursor.classList.remove('is-pressed'));

  // Hintergrundfarbe unter dem Cursor ermitteln (transparent-Elemente überspringen)
  const bgLuminance = (el) => {
    let node = el;
    while (node && node !== document.documentElement) {
      const bg = window.getComputedStyle(node).backgroundColor;
      const m = bg.match(/[\d.]+/g);
      if (m) {
        const [r, g, b, a = 1] = m.map(Number);
        if (a > 0.05) return 0.299 * r + 0.587 * g + 0.114 * b;
      }
      node = node.parentElement;
    }
    return 255;
  };

  let sampleAt = 0;
  const tick = () => {
    if (!cursor.isConnected) return;
    x = lerp(x, mx, reduceMotion ? 1 : 0.22);
    y = lerp(y, my, reduceMotion ? 1 : 0.22);
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    // Sternfarbe alle ~120ms anpassen
    const now = performance.now();
    if (now - sampleAt > 120) {
      sampleAt = now;
      const els = document.elementsFromPoint(mx, my);
      const pageEl = els.find((e) => !cursor.contains(e));
      if (pageEl) cursor.classList.toggle('is-on-dark', bgLuminance(pageEl) < 140);
    }

    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------------------------------------------------------
   4. Magnetische Buttons
--------------------------------------------------------- */
function initMagnetic() {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic) || 0.35;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.setProperty('--mx', `${dx * strength}px`);
      el.style.setProperty('--my', `${dy * strength}px`);
      el.classList.add('is-magnet');
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
      el.classList.remove('is-magnet');
    });
  });
}

/* ---------------------------------------------------------
   5. Parallax beim Scrollen
--------------------------------------------------------- */
function initParallax() {
  const els = Array.from(document.querySelectorAll('[data-parallax]'));
  if (!els.length || reduceMotion) return;
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (!el.isConnected) return;
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - vh / 2;
      el.style.setProperty('--py', `${(-center * speed).toFixed(1)}px`);
    });
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
}

/* --------------------------------------------------------- */
function init() {
  initSplit();
  document.querySelectorAll('[data-trail]').forEach(initTrail);
  initCursor();
  initMagnetic();
  initParallax();
}

document.addEventListener('astro:page-load', init);
