# Ergebnisse Kutter Gartencenter — Präsentations-Optionen

Kurzer Überblick über verschiedene Wege, die vier Kutter-Arbeiten (Instagram-Posts, Flyer, Postkarten, Werbebanner) professioneller zu präsentieren. Alle Optionen bleiben im bestehenden Design-System (TabCard, Farb-Tokens, Kachel-Schatten) — kein neues Muster erfunden.

**Aktueller Stand:** Vier `<TabCard variant="showcase">` untereinander, jeweils ein Bild + „Mockups zur besseren Visualisierung"-Caption. Sauber, aber alle gleich groß und ohne Hierarchie.

---

## Option A — Featured + Grid (Hierarchie)

**Idee:** Ein "Highlight"-Ergebnis groß oben (z. B. Flyer, weil das der Hauptauftrag war), die drei anderen als 3er-Grid darunter, halb so hoch.

**So sieht's aus:**
```
┌───────────────────────────────────┐
│         FLYER (großformatig)      │
└───────────────────────────────────┘
┌─────────┐  ┌─────────┐  ┌─────────┐
│Instagram│  │Postkarte│  │ Banner  │
└─────────┘  └─────────┘  └─────────┘
```

**Vorteil:** Sofort klare Hierarchie, zeigt was das "Herzstück" war. Wirkt wie ein Case-Study-Layout aus Behance / Awwwards.
**Aufwand:** klein — TabCard bleibt, neue CSS-Klasse `.result-grid` für 3-Spalter unten.
**Passt zu:** Wenn ein Ergebnis wichtiger ist als die anderen.

---

## Option B — Split-Cards (Text + Bild)

**Idee:** Jede Arbeit bekommt eine kurze Kontext-Beschreibung neben dem Bild. Nutzt bereits vorhandene `variant="split"` von TabCard.

**So sieht's aus:**
```
┌──────────────────────────────────────┐
│ Instagram-Posts                      │
│ [Bild]  │  Wöchentliche Content-     │
│         │  Serie für saisonale       │
│         │  Aktionen. 40+ Beiträge    │
│         │  seit 2022.                │
└──────────────────────────────────────┘
```

**Vorteil:** Zeigt Kompetenz — nicht nur Bilder, sondern auch "was ich gemacht habe und warum". Recruiter lieben Kontext.
**Aufwand:** klein — TabCard `variant="split"` existiert, nur pro Item einen 2–3-Zeiler formulieren.
**Passt zu:** Wenn du zeigen willst, dass hinter jedem Bild eine Aufgabe/Idee steckt.

---

## Option C — 2er-Grid kompakt

**Idee:** Zwei Kacheln pro Reihe, dadurch scrollt die Seite kürzer und die Bilder wirken beabsichtigt gesetzt (nicht endlose Wiederholung).

**So sieht's aus:**
```
┌──────────┐  ┌──────────┐
│Instagram │  │  Flyer   │
└──────────┘  └──────────┘
┌──────────┐  ┌──────────┐
│Postkarte │  │  Banner  │
└──────────┘  └──────────┘
```

**Vorteil:** Ruhig, gleichwertig, weniger Endlos-Scroll. Vier Arbeiten passen perfekt in ein 2×2.
**Aufwand:** minimal — nur `.result-grid-2` Wrapper, Rest bleibt.
**Passt zu:** Wenn alle vier Arbeiten gleich wichtig sind und du "Portfolio-Feeling" willst.

---

## Option D — Filter-Tabs (Digital / Print)

**Idee:** Oben zwei Chips: "Digital" (Instagram, Banner) und "Print" (Flyer, Postkarte). Klick filtert. Standard: "Alle".

**Vorteil:** Zeigt Bandbreite (digital + analog), spielt mit der Duft-Marke „Grafik-Design für beide Welten".
**Aufwand:** mittel — braucht JS (kleines Alpine/Vanilla-Snippet), Chip-Styling gibt's schon (`.skills__chip` als Basis).
**Passt zu:** Wenn du die Vielseitigkeit zum Argument machen willst.

---

## Option E — Mockups in Umgebung (Kontext-Fotos)

**Idee:** Statt reiner Flat-Mockups Fotos oder gerenderte Szenen — Flyer in einer Hand, Banner am Bauzaun, Postkarte auf Holztisch. Instagram schon in Handy-Mockup (hast du).

**Vorteil:** Wirkt "gemacht" statt "designt am Bildschirm" — sehr überzeugend für Print/Werbung.
**Aufwand:** mittel-hoch — braucht neue Mockup-Bilder (Photoshop-Renders oder Fotos). Layout bleibt.
**Passt zu:** Wenn du zeigen willst, dass die Arbeiten in der realen Welt funktionieren, nicht nur als PDF.

---

## Option F — Prozess-Ansicht (Vorher/Idee → Endergebnis)

**Idee:** Pro Arbeit ein 2-Schritt-Slider: Skizze/Konzept links, finales Mockup rechts. Zeigt Denkweise statt nur Ergebnis.

**Vorteil:** Design-Prozess wird sichtbar — hebt sich klar von reinen „Portfolio-Sammlungen" ab.
**Aufwand:** hoch — brauchst Zwischenstände oder rekonstruierte Skizzen. Für Werkstudi-Arbeit evtl. nicht vorhanden.
**Passt zu:** Wenn Portfolio-Zielgruppe UX/Design-Studios sind (die wollen Prozess sehen).

---

## Option G — Masonry-Collage (wie Foto-Galerie)

**Idee:** Unregelmäßiges Bild-Grid mit unterschiedlichen Höhen — nutzt bereits `.photo-gallery` aus dem Design-System (siehe design-system.md §9).

**So sieht's aus:**
```
┌─────┐ ┌────────┐
│Post │ │ Flyer  │
│kart.│ │        │
└─────┘ │        │
┌─────┐ └────────┘
│Insta│ ┌────────┐
└─────┘ │ Banner │
        └────────┘
```

**Vorteil:** Wirkt lebendig, „Design-Portfolio"-Look. Passt gut wenn Bilder unterschiedliche Formate haben.
**Aufwand:** klein — Klasse existiert.
**Passt zu:** Wenn du bewusst weniger streng/„grafisch-verspielt" wirken willst — passt zur Gärtnerei-Anmutung.

---

## Meine Empfehlung

**Für professionellen Case-Study-Eindruck:** **Option A (Featured + Grid)** kombiniert mit **kurzem Kontext-Text** (Option B, aber nur für das Featured).

Also: Flyer groß oben mit 2–3 Zeilen Kontext daneben („Flyer zur Neueröffnung des Standorts Kempten, 6-seitig, gefaltet, Auflage X"), die anderen drei als kompaktes 3er-Grid unten ohne Text.

**Für „lockerer, portfolio-mäßig":** Option G (Masonry).

**Für „schnellster Effekt mit minimalem Aufwand":** Option C (2×2-Grid).

---

Sag mir, welche Richtung dir gefällt (A / B / C / D / E / F / G oder Kombi), dann baue ich das direkt in `kutter-gartencenter.astro` ein.
