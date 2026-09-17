# Custom-Cursor — Varianten

Live-Vorschau: `/cursor-optionen` (Route: `src/pages/cursor-optionen.astro`).
Jede Variante läuft in einer eigenen Preview-Box; der Custom-Cursor ist auf die Box gescopet (`cursor: none` nur innerhalb), außerhalb bleibt der normale System-Cursor aktiv.

Sortiert von **minimal/klassisch** → **verspielt/experimentell**.

---

## 1. Dot (kleiner Kreis)
Ein 14 px Kreis folgt dem Mauszeiger smooth mit `lerp(0.2)`. Über Hintergründen wird er per `mix-blend-mode: difference` automatisch invertiert.

- **Look:** sehr clean, minimal, professionell
- **Passt zu:** Portfolios mit ruhigem Layout, Design-Studios, Awwwards-Style
- **Aufwand:** niedrig — nur 1 Element + rAF-Loop
- **Risiken:** `mix-blend-mode` kann in Safari bei bestimmten Backgrounds unerwartet aussehen

---

## 2. Dot + Outline-Ring (Dual Cursor)
Kleiner Dot (8 px) folgt 1:1. Größerer Ring (36 px) folgt verzögert mit `lerp(0.15)`. Bei Hover über `[data-cursor-hover]`-Elemente skaliert der Ring auf 64 px und bekommt einen leichten Hintergrund.

- **Look:** haptisches Feedback, ohne aufdringlich zu sein
- **Passt zu:** Portfolios mit vielen CTAs, editorielle Sites
- **Aufwand:** mittel — 2 Elemente + Hover-State-Tracking
- **Risiken:** keine

---

## 3. Magnetic Buttons
Standard-Cursor bleibt. Buttons in der Nähe des Cursors (< 90 px) ziehen sich mit `translate(dx × 0.35, dy × 0.35)` in Richtung Cursor.

- **Look:** edel, haptisch, „premium"
- **Passt zu:** Landing-Pages, Studio-Sites mit wenigen zentralen CTAs
- **Aufwand:** niedrig — nur pro Element ein Mousemove-Handler
- **Risiken:** sparsam einsetzen — auf jeder Kachel wirkt es unruhig

---

## 4. Kontext-Cursor mit Text
Kleiner Dot (12 px) folgt smooth. Über `[data-cursor-hover]`-Elementen wird er zu einem 90 px Kreis mit Text (`data-cursor-label`, z.B. „Ansehen", „Öffnen", „Zoom +").

- **Look:** modern, sehr informativ, awwwards-typisch
- **Passt zu:** Projekt-Grids, Foto-Galerien, alles wo Karten anklickbar sind
- **Aufwand:** mittel — Cursor + Text-Wechsel pro Element
- **Risiken:** Text muss kurz bleiben (max ~10 Zeichen), sonst wird's unruhig

---

## 5. Trail / Ghost-Spur
Main-Dot (12 px) folgt 1:1. 5 Ghost-Dots (je 10 px, `filter: blur(2px)`) folgen in Kette mit `lerp(0.35)` — jeder Ghost folgt dem vorherigen.

- **Look:** organisch, verspielt, warm
- **Passt zu:** kreative Marken, persönliche Portfolios, Illustration/Kunst
- **Aufwand:** mittel — 6 Elemente + Chain-Lerp
- **Risiken:** wirkt schnell „zu viel", nicht für seriöse B2B-Sites

---

## 6. Hover-Halo (nur bei Interaktion)
System-Cursor bleibt sichtbar. Über `[data-cursor-hover]`-Elementen erscheint ein weicher 80 px Radial-Gradient-Kreis (sage-farben, transparent), der smooth mitfolgt.

- **Look:** sehr zurückhaltend, funktional
- **Passt zu:** Sites die Custom-Cursor eigentlich vermeiden wollen, aber Hover-States verstärken
- **Aufwand:** niedrig — 1 Element, nur bei Hover aktiv
- **Risiken:** keine — komplett additiv zum System-Cursor

---

## 7. Klick-Kreis (Cursor-Swap)
System-Cursor bleibt normal auf allen nicht-interaktiven Bereichen (Text, Weißraum). Sobald man über ein `[data-cursor-hover]`-Element fährt, wird der System-Pfeil ausgeblendet (`cursor: none`) und ein 26 px Kreis (solides `--color-sage` = #809582) übernimmt und folgt smooth mit `lerp(0.28)`.

- **Look:** vertraut, aber mit klarem Akzent bei Interaktion — quasi das Gegenteil von Variante 6 (dort ist der Cursor da + Extra-Halo; hier _tauscht_ der Cursor)
- **Passt zu:** Portfolios die keinen permanenten Custom-Cursor wollen, aber CTAs/Karten deutlich hervorheben
- **Aufwand:** niedrig — 1 Element + Hover-Handler pro Interaktion
- **Risiken:** keine — außerhalb interaktiver Elemente ist alles wie gewohnt

---

## 8. Dezenter Kreis + Hover-Boost
Immer sichtbarer Kreis (20 px, weiche sage-Transparenz `rgba(128,149,130,0.35)`) folgt smooth mit `lerp(0.22)`. Über `[data-cursor-hover]`-Elementen wächst er auf 32 px und wird satt `--color-sage` (#809582 — dein Haupt-Grün). Übergang über `cubic-bezier(0.22, 1, 0.36, 1)`.

- **Look:** ruhig im Alltag, aber klarer visueller Boost auf klickbaren Elementen — Cursor bleibt immer sichtbar
- **Passt zu:** Portfolios die permanent einen Custom-Cursor wollen, ohne dass er sich aufdrängt
- **Aufwand:** niedrig — 1 Element + State-Toggle bei Hover
- **Risiken:** keine

---

## Empfehlung

- **Für dein Portfolio (ruhig, textfokussiert):** Variante 2 (Dot + Ring), Variante 4 (Kontext-Cursor) oder Variante 8 (dezenter Kreis + Boost)
- **Wenn du Projekt-Kacheln verstärken willst:** Variante 4 („Ansehen →" über ProjectCards) oder Variante 8
- **Wenn du minimal bleiben willst:** Variante 1 (Dot mit blend-mode), Variante 6 (Halo) oder Variante 7 (Swap)

---

## Technische Umsetzung (bei Auswahl einer Variante)

1. Custom-Cursor sollte **global** in `BaseLayout.astro` gerendert werden (nicht pro Seite), damit er über Seitenwechsel hinweg konsistent ist.
2. Auf Touch-Devices deaktivieren via `@media (hover: none) { .custom-cursor { display: none; } }`.
3. `prefers-reduced-motion: reduce` respektieren — dann Trail/Lerp deaktivieren, nur Position tracken.
4. Elemente die Hover-Effekte auslösen brauchen `data-cursor-hover` (+ optional `data-cursor-label` bei Variante 4).
