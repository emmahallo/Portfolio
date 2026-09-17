# Querformat-Bilder — Darstellungs-Optionen

Live-Vorschau: `/querformat-optionen` (Route: `src/pages/querformat-optionen.astro`).
Bildmaterial: 4 Landscape-Fotos aus `public/images/Fotografie/`.

Sortiert von **klassisch/editorial** → **experimentell/interaktiv**.

---

## Standard-Layouts

### 1. Sticky-Stack (Full-Bleed) — aktuell im Einsatz
Jedes Bild füllt den Viewport, sticky Scroll mit Dwell-Time zwischen Bildern (60 vh Margin). Ruhig, cineastisch. **Zu sehen auf `/projekte/foto-projekte` unter „Ergebnisse".**

### 2. Editorial-Grid (2 Spalten mit Meta-Zeile)
Magazine-Look: 2 Spalten, gleich große 3:2-Kacheln. Unter jedem Bild Titel + Meta durch Trennlinie abgesetzt.

### 3. Split-Screen Story (Bild + Text nebeneinander, alternierend)
Pro Bild eine Zeile: Bild links (Zeilen 1, 3, …) oder rechts (Zeilen 2, 4, …), gegenüber Titel + kurzer Fließtext. Sehr editorial.

### 4. Ken-Burns Slideshow (Auto-Play mit sanftem Zoom)
Ein großes Bild füllt den Bereich, wechselt alle 5 s mit Cross-Fade + 8 s langsamer Scale-Bewegung. Dots + Hover pausiert.

### 5. Cinema-Strip (Horizontales Scroll-Snap)
Große Filmstreifen-Kacheln horizontal scrollbar (`scroll-snap-type: x mandatory`). Caption unter jedem Bild.

### 6. Full-Bleed Parallax (Bild volle Breite, Text mit Offset)
Jedes Bild spannt sich über die volle Fensterbreite mit JS-basiertem Parallax (translateY ± 20 px). Weiße Text-Karte mit Sage-Border-Left oben drauf.

---

## Storytelling / Editorial-Deep-Dives

### 7. Sticky-Story (Bild bleibt, Text scrollt)
Wie bei den Portraits: Bild bleibt links sticky (3:2, max. 92 vh), rechts scrollen Text-Blöcke vorbei (`min-height: 70vh`), Bild wechselt via Cross-Fade (`IntersectionObserver`, threshold 0.55).

### 8. Bento-Grid (1 Hero + 3 kleine)
Asymmetrisches Grid: `grid-template-columns: repeat(4, 1fr)`. Hero spannt 3 Spalten × 2 Reihen, drei weitere Zellen daneben/darunter. Caption als weißes Overlay unten links.

### 9. Contact-Sheet mit Hover-Zoom
Dichtes dunkles Thumbnail-Grid (`repeat(auto-fill, minmax(180px, 1fr))`, 4 px Gap, schwarzer Hintergrund). Bilder haben `filter: brightness(0.85)`, Hover skaliert 1.1 und stellt volle Helligkeit her. Index-Label oben links.

### 10. Timeline mit Datum
Horizontal scrollbare Zeitleiste. Datum-Chip mit Sage-Border über jedem Bild, Sage-Dot an einer verbindenden Linie. Scroll-Snap zentriert.

### 11. Marquee (Auto-Scroll Filmstreifen)
Dauerhaft nach links laufende Reihe (`animation: 60s linear infinite`, Bilder 3× dupliziert). Hover pausiert die Animation und blendet Caption ein. Fade-Mask an beiden Rändern.

### 12. Diagonal-Collage (überlappend, leicht rotiert)
4 Bilder überlappen sich im 6-Spalten-Grid mit unterschiedlichen Rotationen (−3°, +2°, −1°, +4°). Weißer Rand, Schatten. Hover richtet auf (`rotate(0deg) scale(1.03)`).

---

## Experimentell / Auffällig

### 13. Typo-Cutout (Bild in Wort)
Riesiges Wort „FOTOGRAFIE" (bis 22 rem) wird mit dem Foto gefüllt (`background-clip: text` + `mix-blend-mode: screen`). Dunkler Overlay, Meta-Zeile unten links. Auto-Play alle 3.5 s.

### 14. Cover-Flow (3D-Karussell)
Mittleres Bild frontal, Nachbarn in 3D gekippt (`perspective: 1400px`, `rotateY` bis ±22°, Scale 0.55). Buttons ‹ › oder Pfeiltasten wechseln. Klick auf ein Nebenbild springt dorthin.

### 15. Streifen-Reveal (Bild in Slices)
Jedes Bild in 6 vertikale Streifen zerlegt, die abwechselnd von oben/unten reinschieben (`translateY: ±105%`, gestaffelte Delays 90 ms). Getriggert beim Reinscrollen via `IntersectionObserver`.

### 16. Radial-Arc (Kreisbogen-Anordnung)
4 Bilder als Fächer aus einem gemeinsamen Fußpunkt aufgespannt (`transform-origin: 50% 130%`, Rotationen ±18°). Polaroid-Optik. Hover hebt aus dem Fächer heraus.

### 17. Dual-Layer (Blur-Background + Focus-Card)
Großes unscharfes Foto als Hintergrund (`filter: blur(28px) brightness(0.55)`), scharfe Karten-Version davor zentriert. Dots + Auto-Play alle 4.5 s, Hover pausiert.

### 18. Draggable Deck (Karten-Stapel zum Durchziehen)
Karten liegen als 3D-Stapel (`transform: translateY(var(--stack) * 10px) scale(1 - var(--stack) * 0.03)`). Drag/Wisch (Pointer-Events) oder Klick wirft die oberste weg. „Neu stapeln"-Button.

### 19. Accordion-Balken (Klick öffnet)
Vertikale Balken nebeneinander mit `flex: 1`. Aktiver Balken springt auf `flex: 6`. Inaktive Balken zeigen ihr Label um 90° rotiert; aktiver Balken zeigt großen Titel horizontal + Foto-Count-Badge + Untertitel. Klick oder Hover wechselt. Angelehnt an das gezeigte Referenz-Screenshot.

---

## Meine Einschätzung

Für ein **UI/UX-Portfolio**, das nicht wie ein Foto-Portfolio wirken soll:
- **Option 7 (Sticky-Story)** — passt zum Portrait-Bereich, konsistent
- **Option 19 (Accordion)** — sehr interaktiv, zeigt Design-Verständnis
- **Option 4 (Ken-Burns)** oder **Option 17 (Dual-Layer)** — falls ruhige Präsentation gewünscht ist

Für ein **Foto-fokussiertes Portfolio**:
- **Option 1 (aktuell)** oder **Option 6 (Parallax)** — Bild bekommt maximalen Raum
- **Option 14 (Cover-Flow)** oder **Option 13 (Typo-Cutout)** — sehr eigenständige Handschrift
