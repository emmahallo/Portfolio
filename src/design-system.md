# Design-System — Startseite als Referenz

**Regel:** Diese Datei ist die verbindliche Referenz für alle Unterseiten. Neue Sections, Komponenten oder Blöcke müssen dieselben Tokens, Schriftgrößen, Abstände und Muster nutzen wie hier dokumentiert. Bei Unsicherheit: erst hier nachschlagen, dann bauen.

---

## 1. Farb-Tokens (`global.css`)

| Token | Wert | Verwendung |
|---|---|---|
| `--color-bg` | `#ffffff` | Seiten-Hintergrund |
| `--color-ink` | `#626c63` | Überschriften, Body auf hellem BG, Primary-Hover |
| `--color-text` | `#1c1c1c` | Alternativ dunkler Text (Header, Eyebrow) |
| `--color-sage` | `#809582` | Primärfarbe: Buttons, Border der Chips |
| `--color-sage-dark` | `#648767` | Outline-Button-Border/Text, Eyebrow-Dot |
| `--color-sage-tint` | `rgba(128, 149, 130, 0.31)` | Kachel-Schatten hinter Karten |
| `--color-badge-bg` | `rgba(216, 222, 216, 0.55)` | Eyebrow-Pill-BG |
| `--color-brown` | `#5c4242` | Fließtext in Arbeitsweise-Karten |
| `--color-border` | `#d9dcd5` | Footer-Trennlinie |

## 2. Typografie

| Element | Font | Weight | Size | Weitere |
|---|---|---|---|---|
| Body | `Karla`, system-ui | 400 | 1rem | line-height 1.5 |
| H1 (`.hero__title`) | `Staatliches` | 400 | `clamp(2.5rem, 5.2vw, 4rem)` | letter-spacing 0.07em, line-height 1.05 |
| Section-Heading (`.section-heading`) | `Karla` | 700 | `clamp(1.25rem, 1.4vw + 1rem, 1.5rem)` | UPPERCASE, letter-spacing 0.02em |
| Hero-Body (`.hero__text`) | `Karla` | 300 | 1.25rem | max-width 34ch |
| Eyebrow (`.eyebrow`) | `Karla` | 400 | 0.8rem im Header, 1rem im Hero | UPPERCASE, letter-spacing 0.04em |
| Button (`.btn`) | `Karla` | 600 | 0.95rem (Hero: 1.0625rem) | UPPERCASE, letter-spacing 0.03em |

**Regel:** Alle Section-Überschriften auf Unterseiten nutzen `.section-heading` (kein H2 mit eigenem Style).

## 3. Layout & Abstände

- **Max-Width:** `--max-width: 1280px` (Content-Wrapper via `.wrapper`).
- **Gutter (seitliches Padding):** `--gutter: clamp(1rem, 2.5vw, 3rem)`.
- **Section-Spacing (padding-block auf `.section`):** `--section-spacing: clamp(2.25rem, 4.5vw, 3.75rem)`.
- **Section-Heading margin-bottom:** `clamp(1.5rem, 3vw, 2.5rem)`.
- **Ausnahme — Heading direkt gefolgt von Fließtext ohne Kasten:** `0.5rem` (globale Regel in `global.css` via `.section-heading:has(+ .case-plain-text)`). Gilt für alle Sections auf Unterseiten, in denen nach der Überschrift direkt ein `<p class="case-plain-text">` folgt (ohne `TabCard` oder anderen Kasten dazwischen). **Ausgenommen:** Hero-Section der Startseite und der erste Bereich von `ueber-mich.astro` — dort greift der Standard.

**Regel:** Jede neue Section bekommt `<section class="section">` + darin `<div class="wrapper">`. Kein eigenes `padding-block`- oder `margin`-Override auf Section-Ebene — Abstand zwischen zwei Sections ist **immer** `2 × --section-spacing`, sonst wird die visuelle Rhythmus gebrochen.

## 4. Buttons

- Basis: `.btn` (padding 0.85rem 1.6rem, transition auf bg/color/transform).
- Hover-Bewegung: `translateY(-1px)`.
- **Primary** (`.btn--primary`): sage BG, weißer Text → Hover: BG wird `--color-ink` (dunkel).
- **Outline** (`.btn--outline`): transparent, sage-dark Border/Text → Hover: BG `--color-ink`, Border `--color-ink`, Text weiß.

**Regel:** Auf Unterseiten immer `.btn .btn--primary` oder `.btn .btn--outline` nutzen. Keine neuen Button-Varianten ohne Rücksprache.

## 5. Kachel-Style (Karten mit Offset-Schatten)

**Zwei Varianten** — beide nutzen `--color-sage-tint` als Schatten:

### 5a. Kachel mit Tab (Frame + Tab + Shadow)
Siehe `src/components/kacheln-style.md`. Diese Karten haben eine weiße Rahmen-Kachel, einen sage-grünen Tab links oben und einen L-förmigen Schatten hinter dem Tab.

**Component, nicht von Hand bauen:** `<TabCard tab="Label">…</TabCard>` (`src/components/TabCard.astro`). Style liegt zentral in `global.css`. Wird sowohl für die Arbeitsweise-Karten auf der Startseite (`Process.astro`) als auch für alle Inhalts-Karten auf den Projekt-Unterseiten genutzt (Ausgangspunkt, Fokus, Workflow, Prozess-Schritte, Download & Link, Learnings, …). Varianten: `variant="split"` (Text + Bild nebeneinander), `variant="showcase"` (nur ein großer Screenshot). Details und Beispiele in `kacheln-style.md`.

### 5b. Skill-Chips (nur Chip + Shadow, ohne Tab)
Wie in `Skills.astro`. Struktur:

```astro
<li class="skills__chip">
  <span class="skills__chip-label">{skill}</span>
</li>
```

```css
.skills__chip {
  position: relative;
  display: inline-block;
  isolation: isolate;
}
.skills__chip-label {
  position: relative;
  display: block;
  border: 1px solid var(--color-sage);
  background: #ffffff;
  color: var(--color-ink);
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.9rem 2rem;
  min-width: 9rem;
  z-index: 1;
}
.skills__chip::before {
  content: '';
  position: absolute;
  top: 12px; left: -6px; right: 14px; bottom: -6px;
  background: var(--color-sage-tint);
  z-index: 0;
}
```

**Regel für Schatten-Offsets:** immer `top: 12px, left: -6px, right: 14px, bottom: -6px` (L-Form nach unten-links) — identisch zum Arbeitsweise-Kartenstil. `isolation: isolate` auf dem Wrapper ist Pflicht.

## 6. Eyebrow-Pill

```astro
<span class="eyebrow">
  <span class="eyebrow__dot" aria-hidden="true"></span>
  LABEL
</span>
```

Pill mit `--color-badge-bg`, sage-dark Punkt links. In Hero-Kontext auf `font-size: 1rem` gebumpt, im Header 0.8rem.

## 7. CTA-Banner-Muster (Kontakt-Section)

- Bild mit `object-fit: cover`, `filter: brightness(0.85)`.
- Weißer Overlay: `rgba(255, 255, 255, 0.35)`, `pointer-events: none`.
- Grain-Layer via `::after` mit SVG-`feTurbulence`, `mix-blend-mode: soft-light`, `opacity: 0.5`.
- Button zentral positioniert (`z-index: 2`, `isolation: isolate` — Grain darf Button nicht überlagern).

## 8. Wiederkehrende Muster / Regeln

1. **`box-sizing: border-box`** ist global gesetzt.
2. **Listen-Reset:** `ul { margin:0; padding:0; list-style:none }` (global). Bei `<ol>` selbst zurücksetzen.
3. **Reduced-motion / smooth scrolling:** `html { scroll-behavior: smooth; scroll-padding-top: 96px }`.
4. **Mobile-Breakpoint:** primär `@media (max-width: 900px)` für Layout-Wechsel, `640px` für kleine Anpassungen (z. B. Button auf `width:100%`).
5. **Konsistenz-Regel:** wenn eine neue Section oder Karte gebaut werden soll, IMMER zuerst prüfen, ob es hier, in `kacheln-style.md` oder als fertige Komponente in `src/components/` schon ein Muster gibt, und dieses übernehmen. Keine neuen Werte erfinden ohne Grund.
6. **Keine Style-Duplikate pro Seite:** wiederverwendete Bausteine (Kachel, Sprungmarken, Link-Kachel, Projekt-Karte, Case-Hero) bekommen KEIN eigenes `<style>` auf der einzelnen Seite. Das CSS lebt einmal in `global.css`, die Seite nutzt nur die passende Komponente aus Abschnitt 9. Ein Seiten-lokaler `<style>`-Block ist nur für Layout, das wirklich nur auf dieser einen Seite vorkommt (z. B. eine zweispaltige Grid-Anordnung für zwei Karten).

### 8a. Eingefrorene Sections (Layout nicht mehr ändern)

Diese Sections sind final abgestimmt. Weder Markup noch CSS am Layout verändern (Farb-/Copy-Änderungen sind nur ok, wenn explizit gewünscht). Als Referenz-Muster übernehmen, wenn eine andere Unterseite dasselbe Section-Muster neu bekommt.

- **Download & Link (`src/pages/projekte/ernaehrungsberaterin.astro`, `#download-link`)** — Aufbau:
  - `<div class="download-grid">` mit zwei `<TabCard tab="Download" | tab="Link">`.
  - Jede TabCard enthält: `<p class="tab-card__text">` mit einer Zeile Beschreibungstext + eine kompakte `<LinkTile>` (kleines Icon links, Titel + Subtitel rechts, Subtitel einzeilig).
  - Seitenlokales CSS (`.download-grid`) hält folgende Regeln:
    - `display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(1.5rem, 3vw, 2.5rem); align-items: start;`
    - `.tab-card { width: auto; }` (füllt die Grid-Zelle, damit beide Kacheln gleich breit sind).
    - `.tab-card + .tab-card { margin-top: 0; }` (überschreibt den Standard-Stack-Abstand aus `global.css`, damit die Link-Kachel auf gleicher Höhe wie die Download-Kachel startet).
    - `.tab-card__frame { display: flex; flex-direction: column; gap: 1.75rem; }` (fester Abstand zwischen Text und LinkTile, matcht den oberen Innenabstand der Kachel).
    - `.tab-card__text { max-width: 45ch; }` (Lesebreite).
    - `.link-tile__subtitle { max-width: none; white-space: nowrap; }` (Subtitel bleibt einzeilig → beide Kacheln enden auf gleicher Höhe).
    - Unter 760 px: `grid-template-columns: 1fr` (eine Spalte).
  - **Regel:** Wenn eine andere Projekt-Unterseite eine „Download & Link"-Section braucht, dieses Setup 1:1 übernehmen (Markup + Style-Block kopieren). Kein Neubau.

---

## 9. Projekt-Unterseiten (Case Studies unter `/projekte/…`)

Jede Projekt-Unterseite (`src/pages/projekte/*.astro`) folgt demselben Aufbau und nutzt dieselben Komponenten aus `src/components/`:

| Komponente | Wofür | Props |
|---|---|---|
| `CaseHero` | Hero mit Titel, Eyebrow, Meta-Chips, Vorschaubild | `title`, `meta` (string[]), `image`, `imageAlt`, optional `imagePosition`, optional `eyebrow` (Default `"UI/UX – Design"`, z. B. `"Grafik-Design"` für Nicht-UI/UX-Projekte) |
| `CaseToc` | "Übersicht"-Section mit nummerierten Sprungmarken | `items` (`{number, label, href}[]`) — passt sich per `flex-wrap` an 2 bis 6+ Einträge an |
| `TabCard` | Inhalts-Kachel (siehe Abschnitt 5a / `kacheln-style.md`) | `tab`, optional `variant` |
| `LinkTile` | Download-/Link-Kachel (PDF, Live-Website) | `href`, `title`, `subtitle`, `icon` (`'download' \| 'external'`), optional `download`, `target` |
| `ProjectCard` | Projekt-Karte (Startseiten-Karussell **und** "Weitere Projekte") | `title`, `meta`, `image`, `href`, optional `imagePosition` |

**Regel Vorschaubilder in `ProjectCard` — NICHT ÄNDERN:** Die Bilder im sage-getönten Rahmen der Projekt-Kacheln müssen immer horizontal **und** vertikal zentriert sitzen und den **Laptop-Mockup groß** zeigen (nicht klein in der Mitte schwimmen). In `global.css` steht daher fix:

```css
.project-card__image img {
  object-fit: cover;
  object-position: center center;
  transform: scale(1.2);         /* Basis-Zoom — Laptop moderat vergrößert */
  transform-origin: center center;
}
.project-card:hover .project-card__image img { transform: scale(1.28); }
```

Die Quell-PNGs (`public/images/voschau projektsseiten/*.png`, 4:3, sage-Hintergrund) sind so gebaut, dass der Beschnitt oben/unten und das Hochzoomen optisch nicht auffallen. Nicht auf `contain` zurückstellen, `transform: scale(...)` nicht entfernen — auch nicht seitenlokal überschreiben. Wenn eine neue Quelldatei nicht mittig ist oder anderen Hintergrund hat, die Quelldatei anpassen, nicht die Regel.

**Regel `imagePosition`-Prop — final abgestimmt (NICHT ÄNDERN):** Für einzelne Kacheln wird der Bildausschnitt per `imagePosition`-Prop verschoben (überschreibt `object-position` inline). Die folgenden Werte sind final und in **beiden** Listen (`src/components/Projects.astro` = Startseiten-Karussell **und** `src/pages/projekte/index.astro` = Projekte-Übersicht) synchron zu halten:

| Projekt | `imagePosition` |
|---|---|
| Ernährungsberaterin | `center 70%` |
| Celestial Haven (Hotel) | `center 70%` |
| Surfcamp | `center 70%` |
| Activity Tracker | `center 55%` |
| Kutter Gartencenter | – (kein Prop, Default aus `global.css`) |
| Foto-Projekte | `30% center` |

Diese Werte wurden am 2026-09-10 gemeinsam mit Emma festgelegt. Sonderformate (z. B. Handy-Mockup `phonetransparent.png`) sind weiterhin die berechtigte Ausnahme, um `imagePosition` zu setzen — neue Werte nur nach Rücksprache. Wenn ein Projekt aus der Liste hier oder in einer der beiden Dateien geändert wird, immer alle drei Stellen (beide Astro-Files + diese Tabelle) synchron mit-aktualisieren.

**Aufbau einer Projekt-Unterseite:**

1. `<CaseHero title=… meta={[…]} image=… imageAlt=… />`
2. `<CaseToc items={overview} />`
3. Beliebig viele `<section id="…" class="section"><div class="wrapper">…</div></section>` mit `<TabCard>`-Inhalten, dazwischen ganz normale `<h2 class="section-heading">`.
4. Ergebnis-Screenshot: `<div class="case-result"><img …></div>` (kein eigenes Styling nötig, Klasse ist in `global.css`).
   Für eine reine Foto-Sammlung (kein einzelner Screenshot) stattdessen die Foto-Galerie nutzen: `<div class="photo-gallery"><figure class="photo-gallery__item"><img …></figure>…</div>` (Masonry-Collage, Klassen in `global.css`) — genutzt auf der Foto-Projekte-Seite.
5. "Weitere Projekte": `<div class="project-grid">` (3er-Grid, in `global.css`) mit `<ProjectCard>` für die jeweils **anderen** Projekte — sich selbst nie mit auflisten.
6. Footer: identisch zur Startseite (Markup kopieren, kein eigener Footer-Component bisher).

**Regel:** Neue Projekt-Unterseite → immer mit diesen Komponenten bauen, nie das Kachel-/Karten-Markup neu von Hand schreiben. Fehlt eine Variante (z. B. eine neue `TabCard`-Variante), zuerst in `TabCard.astro` + `global.css` ergänzen, dann auf der Seite verwenden — nicht seitenlokal improvisieren.

### 9a. Über-mich-Seite (`src/pages/ueber-mich.astro`)

Eigenständige Route (nicht unter `/projekte/…`), verlinkt aus dem Header-Nav-Punkt „Über mich". Kein `CaseHero`-Component (kein Eyebrow/Meta-Chips nötig), nutzt aber dieselben Hero-Klassen direkt: `.case-hero__inner` / `.case-hero__content` / `.case-hero__title` / `.case-hero__media` / `.case-hero__shape` / `.case-hero__frame` (+ Modifier `.case-hero__frame--portrait` fürs Hochformat-Bild). Bio-Fließtext mit fetten Hervorhebungen: `<div class="about-bio" set:html={bioHtml} />` (gleiches `bodyHtml`-Muster wie bei den Prozess-Schritten). Werdegang-Zeitleiste: `.timeline` (siehe `global.css`) — 4-Spalten-Grid mit abwechselnd oben/unten liegenden Stationen, bricht unter 760px zu einer gestapelten Liste um.

## Wie ich das anwende

Wenn du sagst: *„Bau auf Unterseite X eine Section mit Y"*, dann:

1. `<section class="section">` + `<div class="wrapper">` als Rahmen.
2. Section-Titel als `<h2 class="section-heading">`.
3. Textstile, Buttons, Karten aus dieser Datei übernehmen — keine eigenen Größen/Farben.
4. Nur wenn du explizit sagst „das soll anders aussehen als Y", weiche ich ab (und frage bei Bedarf nach).
