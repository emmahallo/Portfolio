# Emma Eichin — Portfolio (Startseite)

Astro-Umsetzung der Figma-Startseite (`Untitled`, Node „Startseite“, `187:2935`).

## Loslegen

```bash
npm install
npm run dev
```

Die Seite läuft dann unter `http://localhost:4321`.

```bash
npm run build    # erzeugt das statische Build in dist/
npm run preview  # zeigt den Build lokal an
```

## Projektstruktur

```
src/
  layouts/BaseLayout.astro   Grundgerüst, Google Fonts, Meta-Tags
  styles/global.css          Farb-/Schrift-Variablen, Basis-Styles
  components/
    Header.astro             Sticky-Navigation
    Hero.astro                Hero-Bereich mit Bild & CTA-Buttons
    Projects.astro            Projekt-Karten (Carousel mit Pfeilen/Dots)
    Process.astro             „Meine Arbeitsweise“ (4 Karten)
    Skills.astro               „Meine Kompetenzen“ (Chips)
    Cta.astro                  „Neugierig geworden?“-Banner
  pages/index.astro            Startseite (setzt alle Komponenten zusammen)
public/images/                 Bilder (siehe Hinweis unten)
```

## Wichtiger Hinweis zu den Bildern

In dieser Umgebung hatte ich keinen Netzwerkzugriff, um die tatsächlichen
Bild-Assets aus Figma herunterzuladen (Farben, Texte, Layout und Schriften
stammen aber 1:1 aus dem Figma-Design). Deshalb liegen aktuell generierte
**Platzhalterbilder** unter `public/images/`. Bitte ersetze sie 1:1
(gleicher Dateiname, ähnliches Seitenverhältnis) durch die echten Exporte
aus Figma:

| Datei | Ersetzt Figma-Layer | Verwendung |
|---|---|---|
| `public/images/hero-portrait.jpg` | „emma 1“ | Porträtfoto im Hero-Bereich |
| `public/images/projects/ernaehrungsberaterin.jpg` | „Rectangle 4“ | Projektkarte 1 |
| `public/images/projects/celestial-haven.jpg` | „Rectangle 6“ | Projektkarte 2 |
| `public/images/projects/surfcamp.jpg` | „Rectangle 8“ | Projektkarte 3 |
| `public/images/cta-beach.jpg` | „IMG_4284 3“ | Hintergrundfoto im Kontakt-Banner |

Export in Figma: Layer auswählen → rechtes Panel „Export“ → PNG/JPG,
2x-Auflösung empfehlenswert.

## Design-Entscheidungen

- **Nur die Startseite**: Im Figma-File gibt es weitere Unterseiten
  (Projekt-Detailseiten, evtl. „Über mich“/„Kontakt“). Abgesprochen wurde,
  zunächst nur die Startseite umzusetzen. Die Navigationspunkte „Projekte“,
  „Über mich“ und „Kontakt“ verlinken deshalb aktuell auf Abschnitte
  innerhalb der Startseite (`#projekte`, `#ueber-mich`, `#kontakt`). Sobald
  echte Unterseiten entstehen, einfach neue Dateien unter `src/pages/`
  anlegen (z. B. `src/pages/ueber-mich.astro`) und die Links in
  `src/components/Header.astro` anpassen.
- **Projektkarten-Links** zeigen aktuell auf `/projekte/<slug>` (noch ohne
  hinterlegte Seiten) — schon vorbereitet für spätere Detailseiten.
- **Kontakt-Button** verlinkt aktuell auf `mailto:hallo@emma-eichin.de` als
  Platzhalter-Adresse — bitte durch die echte E-Mail-Adresse ersetzen oder
  auf ein Kontaktformular umstellen.
- **Schriften**: „Staatliches“ (Überschrift) und „Karla“ (Fließtext) werden
  per Google-Fonts-Link in `src/layouts/BaseLayout.astro` geladen — dafür
  ist zur Laufzeit eine Internetverbindung nötig (im Browser des Besuchers,
  nicht beim Bauen der Seite).
- **Farben/Tokens** aus Figma sind in `src/styles/global.css` als
  CSS-Variablen hinterlegt (`--color-ink`, `--color-sage`,
  `--color-sage-dark`, `--color-brown`, …).
- Der Projekt-Slider ist mit reinem Vanilla-JS umgesetzt (kein zusätzliches
  npm-Paket), scrollt per CSS-Scroll-Snap und zeigt auf Mobilgeräten
  zusätzlich Pagination-Dots.

## Platzhalterbilder neu erzeugen

`scripts/generate_placeholders.py` hat die aktuellen Platzhalterbilder
erstellt (benötigt Python 3 + Pillow: `pip install pillow`). Das Skript ist
nur ein Hilfsmittel für die Entwicklung und nicht Teil der eigentlichen
Astro-Anwendung — kann bei Bedarf einfach gelöscht werden, sobald die
echten Bilder eingesetzt sind.

## Nächste Schritte

- Echte Bilder einsetzen (siehe Tabelle oben)
- Kontakt-E-Mail-Adresse anpassen
- Bei Bedarf eigene Unterseiten für Projekte, „Über mich“ und „Kontakt“
  ergänzen
