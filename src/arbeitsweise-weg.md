# Arbeitsweise – Variante „Weg“ (Kacheln mit handgezeichneten Pfeilen)

Gesichert am 27.10.2026, bevor „Meine Arbeitsweise“ auf die Listen-Variante (D) umgestellt wurde.

## Was diese Variante macht

- Deine Kacheln (`TabCard`) im Zickzack: 01 links, 02 rechts, 03 links, 04 rechts
- Dazwischen Pfeile im Stil von `public/images/pfeil.png` (durchgezogen, runde Enden, offene Spitze),
  in `--color-forest`. Sie werden per JS berechnet und **zeichnen sich beim Scrollen**
- Neben jeder Kachel eine handschriftliche Notiz in Reenie Beanie (Feld `note`)
- Kacheln gleiten leicht schräg rein und richten sich auf, Hover kippt sie leicht
- Tablet/Handy (≤ 900 px): untereinander, Notiz rechts darunter, keine Pfeile

## Zurückholen

1. Den kompletten Code unten kopieren
2. Den Inhalt von `src/components/Process.astro` damit ersetzen
3. Speichern, fertig – sonst muss nichts geändert werden
   (benötigt `--color-forest` in `global.css` und `TabCard.astro`, beides ist vorhanden)

## Kompletter Code: `src/components/Process.astro`

```astro
---
import TabCard from './TabCard.astro';
const steps = [
  {
    number: '01',
    title: 'Recherche vor Gestaltung',
    note: 'erst verstehen, dann gestalten!',
    text: 'Was gestaltet wird, ergibt sich aus dem, was gebraucht wird. Am Anfang steht deshalb die <strong>Analyse von Problem und Zielgruppe</strong>, welche mit etablierten <strong>UX-Methoden</strong> herausgearbeitet werden.',
  },
  {
    number: '02',
    title: 'Design',
    note: 'früh sichtbar machen!',
    text: '<strong>Figma und KI-Werkzeuge</strong> helfen mir, Ideen und gesammelte Erkenntnisse schnell sichtbar zu machen. Je früher ein Entwurf greifbar ist, desto früher lässt er sich prüfen.',
  },
  {
    number: '03',
    title: 'Testing',
    note: 'testen, testen, testen!',
    text: 'Ob eine Lösung funktioniert, zeigt sich erst in der Anwendung. Daher führe ich <strong>früh und wiederholt Tests</strong> durch, die dafür sorgen, dass die Nutzung am Ende reibungslos gelingt.',
  },
  {
    number: '04',
    title: 'Teamarbeit',
    note: "zusammen geht's besser\u00a0:)",
    text: 'Gute Projekte entstehen selten allein. Ich arbeite gern im <strong>Team</strong> und setze dabei auf eine <strong>offene Kommunikation</strong>, um effizient miteinander zu arbeiten.',
  },
];
---

<section id="ueber-mich" class="section process" data-process>
  <div class="wrapper">
    <h2 class="section-heading" data-split>Meine Arbeitsweise</h2>

    <div class="process__flow">
      <!-- Handgezeichneter Weg zwischen den Kacheln (wird per JS gezeichnet) -->
      <svg class="process__path" aria-hidden="true"></svg>

      <ol class="process__steps">
        {steps.map((step, i) => (
          <li class:list={['process__step', i % 2 === 0 ? 'is-left' : 'is-right']} style={`--i: ${i}`}>
            <TabCard tab={`${step.number} ${step.title}`}>
              <p class="tab-card__text" set:html={step.text} />
            </TabCard>
            <p class="process__note" aria-hidden="true">{step.note}</p>
          </li>
        ))}
      </ol>
    </div>
  </div>
</section>

<script>
  // 1) Kacheln + Notizen nacheinander einblenden
  // 2) Gestrichelten Weg zwischen den Kacheln berechnen und beim Scrollen „zeichnen“
  const initProcess = () => {
    const section = document.querySelector<HTMLElement>('[data-process]');
    const flow = section?.querySelector<HTMLElement>('.process__flow');
    const svg = section?.querySelector<SVGSVGElement>('.process__path');
    if (!section || !flow || !svg) return;

    const steps = Array.from(section.querySelectorAll<HTMLElement>('.process__step'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const NS = 'http://www.w3.org/2000/svg';

    // ---- Einblenden ----
    if (reduceMotion || !('IntersectionObserver' in window)) {
      steps.forEach((s) => s.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
      );
      steps.forEach((s) => io.observe(s));
    }

    // ---- Weg zeichnen ----
    type Seg = { draw: SVGPathElement; head: SVGPathElement; len: number; y1: number; y2: number };
    let segs: Seg[] = [];

    const build = () => {
      svg.innerHTML = '';
      segs = [];
      const desktop = window.matchMedia('(min-width: 901px)').matches;
      if (!desktop) return;

      const box = flow.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      svg.setAttribute('width', String(box.width));
      svg.setAttribute('height', String(box.height));

      const frames = steps.map((s) => s.querySelector<HTMLElement>('.tab-card__frame')!.getBoundingClientRect());
      const tabs = steps.map((s) => s.querySelector<HTMLElement>('.tab-card__tab')!.getBoundingClientRect());
      const rel = (x: number, y: number) => [x - box.left, y - box.top];

      for (let i = 0; i < steps.length - 1; i++) {
        const a = frames[i];
        const bTab = tabs[i + 1];
        const fromLeft = steps[i].classList.contains('is-left');
        // Start: unter der Kachel, Ende: kurz vor dem Reiter der nächsten Kachel
        const [x1, y1] = rel(a.left + a.width * (fromLeft ? 0.62 : 0.38), a.bottom + 10);
        const [x2, y2] = fromLeft
          ? rel(bTab.left - 14, bTab.top + bTab.height / 2)
          : rel(bTab.right + 14 + (frames[i + 1].right - bTab.right), bTab.top + bTab.height / 2);
        const dy = y2 - y1;
        // weicher Bogen wie bei pfeil.png
        const d = `M ${x1} ${y1} C ${x1 + (fromLeft ? -6 : 6)} ${y1 + dy * 0.85}, ${x2 + (fromLeft ? -110 : 110)} ${y2 + 2}, ${x2} ${y2}`;

        const id = `process-mask-${i}`;
        const mask = document.createElementNS(NS, 'mask');
        mask.setAttribute('id', id);
        mask.setAttribute('maskUnits', 'userSpaceOnUse');
        const draw = document.createElementNS(NS, 'path');
        draw.setAttribute('d', d);
        draw.setAttribute('class', 'process__path-draw');
        mask.appendChild(draw);
        svg.appendChild(mask);

        const line = document.createElementNS(NS, 'path');
        line.setAttribute('d', d);
        line.setAttribute('class', 'process__path-line');
        line.setAttribute('mask', `url(#${id})`);
        svg.appendChild(line);

        // Pfeilspitze in Richtung der Kurve am Ende
        const len = line.getTotalLength();
        const p1 = line.getPointAtLength(len);
        const p0 = line.getPointAtLength(Math.max(0, len - 14));
        const ang = Math.atan2(p1.y - p0.y, p1.x - p0.x);
        // offene Spitze, ein Schenkel etwas länger – wie bei deinem pfeil.png
        const wing = (o: number, l: number) => [p1.x - l * Math.cos(ang + o), p1.y - l * Math.sin(ang + o)];
        const [ax, ay] = wing(0.6, 15);
        const [bx, by] = wing(-0.42, 19);
        const head = document.createElementNS(NS, 'path');
        head.setAttribute('d', `M ${ax} ${ay} L ${p1.x} ${p1.y} L ${bx} ${by}`);
        head.setAttribute('class', 'process__path-head');
        svg.appendChild(head);

        draw.style.strokeDasharray = `${len}`;
        draw.style.strokeDashoffset = `${len}`;
        segs.push({ draw, head, len, y1, y2 });
      }
      update();
    };

    const update = () => {
      if (!segs.length) return;
      if (reduceMotion) {
        segs.forEach((s) => { s.draw.style.strokeDashoffset = '0'; s.head.classList.add('is-on'); });
        return;
      }
      // Jede Linie zeichnet sich, während sie durch den unteren Bildschirmbereich
      // wandert – fertig, kurz bevor die nächste Kachel ganz im Bild ist
      const vh = window.innerHeight;
      const top = flow.getBoundingClientRect().top;
      segs.forEach((s) => {
        const y1 = top + s.y1;
        const y2 = top + s.y2;
        const p = Math.min(1, Math.max(0, (vh * 1.1 - y1) / (y2 - y1 + vh * 0.2)));
        s.draw.style.strokeDashoffset = `${s.len * (1 - p)}`;
        s.head.classList.toggle('is-on', p >= 0.98);
      });
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => { ticking = false; update(); });
      }
    }, { passive: true });
    window.addEventListener('resize', build);
    (document as any).fonts?.ready?.then?.(build);
    window.addEventListener('load', build);
    build();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProcess);
  } else {
    initProcess();
  }
</script>

<style>
  .process__flow {
    position: relative;
  }

  .process__path {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
    z-index: 0;
  }

  /* Stil wie public/images/pfeil.png: durchgezogen, kräftig, runde Enden */
  .process__path :global(.process__path-line) {
    fill: none;
    stroke: var(--color-forest);
    stroke-width: 3;
    stroke-linecap: round;
  }

  .process__path :global(.process__path-draw) {
    fill: none;
    stroke: #fff;
    stroke-width: 10;
    stroke-linecap: round;
  }

  .process__path :global(.process__path-head) {
    fill: none;
    stroke: var(--color-forest);
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .process__path :global(.process__path-head.is-on) {
    opacity: 1;
  }

  .process__steps {
    position: relative;
    z-index: 1;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: clamp(2.5rem, 5vw, 4rem);
  }

  /* ---- Ein Schritt: Kachel + handschriftliche Notiz ---- */
  .process__step {
    position: relative;
    display: flex;
    align-items: center;
    gap: clamp(1.5rem, 3vw, 3rem);
    width: 100%;
  }

  .process__step :global(.tab-card) {
    flex: 0 1 auto;
    width: min(100%, 34rem);
    max-width: none;
    margin-top: 0;
    opacity: 0;
    translate: 0 26px;
    rotate: -1.5deg;
    transition:
      opacity 0.7s ease,
      translate 0.8s cubic-bezier(0.22, 1, 0.36, 1),
      rotate 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .process__step.is-right {
    flex-direction: row-reverse;
  }

  .process__step.is-right :global(.tab-card) {
    rotate: 1.5deg;
  }

  .process__step.is-in :global(.tab-card) {
    opacity: 1;
    translate: 0 0;
    rotate: 0deg;
  }

  /* Hover: Kachel kippt leicht, Schatten wandert mit (wie bei den Kompetenzen) */
  .process__step :global(.tab-card__frame),
  .process__step :global(.tab-card__tab) {
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .process__step :global(.tab-card__tab)::before {
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @media (hover: hover) {
    .process__step.is-in :global(.tab-card):hover {
      rotate: -1deg;
      translate: 0 -3px;
    }

    .process__step.is-in.is-right :global(.tab-card):hover {
      rotate: 1deg;
    }
  }

  .process__step :global(.tab-card__text) {
    max-width: none !important;
    font-size: 1rem;
  }

  .process__step :global(.tab-card__text strong) {
    color: var(--color-sage-dark);
  }

  /* Handschriftliche Notiz */
  .process__note {
    flex: 0 1 19rem;
    font-family: 'Reenie Beanie', cursive;
    font-size: clamp(1.7rem, 2.2vw, 2.2rem);
    line-height: 1.05;
    color: var(--color-forest);
    rotate: -4deg;
    opacity: 0;
    scale: 0.8;
    transition:
      opacity 0.5s ease 0.35s,
      scale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.35s;
  }

  .process__step.is-right .process__note {
    text-align: right;
    rotate: 3deg;
  }

  .process__step.is-in .process__note {
    opacity: 1;
    scale: 1;
  }

  /* ---- Tablet & Handy: untereinander, Notiz unter der Kachel ---- */
  @media (max-width: 900px) {
    .process__step,
    .process__step.is-right {
      flex-direction: column;
      align-items: stretch;
      gap: 0.6rem;
    }

    .process__step :global(.tab-card) {
      width: auto;
    }

    .process__note,
    .process__step.is-right .process__note {
      flex: none;
      align-self: flex-end;
      text-align: right;
      font-size: 1.7rem;
      margin-right: 0.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .process__step :global(.tab-card),
    .process__note {
      transition: none;
      opacity: 1;
      translate: none;
      rotate: none;
      scale: none;
    }
  }
</style>
```
