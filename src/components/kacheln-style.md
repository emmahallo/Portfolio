# kacheln-style

Card style used for every "Kachel mit Tab" across the site: the "Meine Arbeitsweise"
cards on the homepage (`Process.astro`) and all the content cards on the project
detail pages (`src/pages/projekte/*.astro` — Ausgangspunkt, Fokus, Workflow,
Prozess-Schritte, Download & Link, Learnings, …).

**Source of truth:** the component is `src/components/TabCard.astro`, its CSS lives
centrally in `src/styles/global.css` (`.tab-card` / `.tab-card__*`). Don't hand-roll
this markup or duplicate the CSS in a page-local `<style>` block — use `<TabCard>`.

## Usage

```astro
---
import TabCard from '../components/TabCard.astro';
---

<TabCard tab="01 Recherche vor Gestaltung">
  <p class="tab-card__text">{step.text}</p>
</TabCard>
```

`tab` is the label shown on the green tab. Everything else is passed as the default
slot, so a card can hold whatever it needs:

- **Plain text**: one or more `<p class="tab-card__text">…</p>`.
- **Image above text**: an `<img class="tab-card__top-image" …>` followed by the
  paragraph(s) — used for "Methodische Grundlage".
- **Rich text with bold spans**: `<div class="tab-card__text" set:html={bodyHtml} />`
  where `bodyHtml` is a string containing `<p>`/`<strong>` — used for the
  Empathize/Define/Ideate/… process steps.

Any extra attribute (`data-reveal`, `style="--reveal-delay: …"`, …) passed to
`<TabCard>` is forwarded to the outer `<article>`.

### Variants

- `variant="split"` — text and an image side by side (`<div class="tab-card__media"><img …></div>`
  next to the text). Used for the 5 process-phase cards on the Ernährungsberaterin page.
- `variant="showcase"` — no text, just one large screenshot
  (`<div class="tab-card__showcase-media"><img …></div>`). Used for
  Startseite/Buchungsprozess/Admin-Bereich on the Celestial-Haven page, and for the
  4 Ergebnisse-Kacheln on the Kutter-Gartencenter page.
- (no variant) — plain text-only card, the default.

Optional: a `<p class="tab-card__caption">` (small info icon + light text) placed
after the `.tab-card__showcase-media` block adds a caption line under the image —
used on the Kutter-Gartencenter page ("Mockups zur besseren Visualisierung").

## Visual anatomy

- **Frame**: thin sage-outlined white rectangle containing the body content.
- **Tab**: solid sage-green rectangle overlapping the frame's top-left corner, containing a bold white label (e.g. `01 Recherche vor Gestaltung`).
- **Shadow**: lighter sage-tint rectangle offset behind the tab, peeking out at bottom-left and top-left as an L-shape. Ends **before** the tab's right and top edges (does not overshoot).
- Tab sits **left of the frame** (not flush with its left edge). Its left edge is the outermost content boundary of the card and aligns with the section heading.

## Design tokens (from `global.css`)

- `--color-sage: #809582` — tab background
- `--color-sage-tint: rgba(128, 149, 130, 0.31)` — shadow rectangle
- `--color-brown: #5c4242` — body text
- Frame border: `1px solid var(--color-sage)`

## Gotchas / non-obvious bits

1. **`isolation: isolate` on `.tab-card__tab` is load-bearing.** Without it, the shadow pseudo-element (`z-index: 0`) renders behind the sibling `.tab-card__frame`'s white background, making it invisible. Isolating the tab creates a local stacking context so the shadow sits above the frame but below the label.
2. **Shadow uses `right` and `bottom` offsets (not `width`/`height`)** so it auto-sizes with the label text.
3. **Tab is DOM-ordered after the frame** to guarantee it paints on top without needing z-index on the tab itself.
4. **`margin-left: calc(1rem + 6px)` on `.tab-card`** combined with **`left: -1rem` on the tab** results in the tab's left edge sitting flush with the card's grid-cell/section left edge (aligned to the section heading), while the frame is shifted right of it.
5. **Content classes (`.tab-card__text`, `.tab-card__media`, `.tab-card__top-image`, `.tab-card__showcase-media`) live in `global.css`, not scoped inside `TabCard.astro`.** That's deliberate: `TabCard.astro`'s content comes through a `<slot />`, and Astro's scoped `<style>` does not reach into slotted content passed in from the page — only global CSS does.

## Related shared components (same "single source of truth in global.css" pattern)

- `TocChip.astro` / `CaseToc.astro` — numbered jump-links in the "Übersicht" section (`.toc-chip*`).
- `LinkTile.astro` — download/external-link card (`.link-tile*`).
- `ProjectCard.astro` — project card used in the homepage carousel and the "Weitere Projekte" grids (`.project-card*`).
- `CaseHero.astro` — hero section of a project detail page (`.case-hero*`, `.case-meta*`).
