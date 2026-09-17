# Kompetenzen — Darstellungs-Optionen

Verschiedene Wege, wie sich mehr Kompetenzen auf der Über-mich-Seite unterbringen lassen, ohne den bestehenden Stil zu brechen. Alle Optionen bauen auf dem aktuellen Chip-System (`Skills.astro`: weißer Chip, Sage-Rahmen, L-förmiger Sage-Tint-Schatten) auf — kein neues Muster erfunden.

**Aktueller Stand:** Ein einziges Flex-Grid mit 6 gleichwertigen Chips (Figma, Illustrator, InDesign, Photoshop, Canva, 10-Finger-System). Sauber, aber wächst nicht gut über ~8 Chips hinaus und macht keine Aussage über Bandbreite.

---

## Option A — Kategorisierte Blöcke (empfohlen)

**Idee:** Die Chips in klar benannte Gruppen splitten. Über jeder Gruppe ein kleines Label im Meta-Stil (Uppercase, `letter-spacing`, sage-dark) — analog zu `.deck-slide__meta` in den Case-Studies.

**So sieht's aus:**
```
DESIGN & TOOLS
┌──────┐ ┌────────────┐ ┌──────────┐ ┌──────────┐ ┌───────┐
│Figma │ │Illustrator │ │InDesign  │ │Photoshop │ │Canva  │
└──────┘ └────────────┘ └──────────┘ └──────────┘ └───────┘

UX & METHODEN
┌───────────────┐ ┌──────────────┐ ┌──────────────┐ ┌───────────────┐
│User Research  │ │Wireframing   │ │Prototyping   │ │Design Systems │
└───────────────┘ └──────────────┘ └──────────────┘ └───────────────┘

CODE
┌──────┐ ┌─────┐ ┌────────────┐ ┌───────┐
│HTML  │ │CSS  │ │JavaScript  │ │Astro  │
└──────┘ └─────┘ └────────────┘ └───────┘

WEITERES
┌──────────────────┐
│10-Finger-System  │
└──────────────────┘
```

**Vorteil:** Skaliert beliebig, macht Bandbreite sofort sichtbar (Design *und* Code *und* Methoden), signalisiert Struktur — genau das, was Recruiter in einer Kompetenz-Section suchen.
**Aufwand:** klein — Skills-Array wird ein Objekt mit `{ category, items }`, Chip-CSS bleibt 1:1, nur ein Kategorie-Header wird hinzugefügt.
**Passt zu:** Deinem Stil, weil das Meta-Label-Muster auf den Case-Study-Seiten schon existiert (visuelle Konsistenz).

---

## Option B — Zwei-Tier-Hierarchie (Kern + Ergänzend)

**Idee:** Die wichtigsten 4–5 Kompetenzen groß und prominent oben (aktuelle Chip-Größe), darunter eine zweite Reihe „auch vertraut mit" in kleinerer Chip-Variante (z. B. `font-size: 0.8rem`, kleinerer Schatten).

**So sieht's aus:**
```
KERN-KOMPETENZEN
┌────────┐  ┌────────────┐  ┌─────────────┐  ┌───────────────┐
│ Figma  │  │Prototyping │  │UX-Research  │  │Design Systems │
└────────┘  └────────────┘  └─────────────┘  └───────────────┘

AUCH VERTRAUT MIT
┌────┐ ┌───────────┐ ┌────────┐ ┌───────┐ ┌────┐ ┌────┐ ┌──────┐
│ Ai │ │ InDesign  │ │Photosh.│ │Canva  │ │HTML│ │CSS │ │Astro │
└────┘ └───────────┘ └────────┘ └───────┘ └────┘ └────┘ └──────┘
```

**Vorteil:** Erzählt eine Story („darauf liege ich Wert, damit kann ich außerdem umgehen"). Ehrlicher als „alles auf Augenhöhe".
**Aufwand:** klein-mittel — zweite Chip-Variante (`.skills__chip--sm`) mit reduziertem Padding und dünnerem Schatten.
**Passt zu:** Wenn du klar priorisieren willst, was dein eigentliches Profil ist.

---

## Option C — Icon + Label

**Idee:** Jeder Chip bekommt links ein kleines Icon (SVG, monochrom in `--color-sage-dark`). Figma-Logo, Ai-„A", HTML-„<>", etc.

**So sieht's aus:**
```
┌────────────┐ ┌────────────────┐ ┌──────────────┐
│  ◆  Figma  │ │  ▲  Illustr.   │ │  ⬛  InDesign │
└────────────┘ └────────────────┘ └──────────────┘
```

**Vorteil:** Schneller visueller Anker beim Scannen — man erkennt Figma / Adobe / Code auf den ersten Blick, ohne zu lesen.
**Aufwand:** mittel — pro Tool ein SVG-Asset besorgen/vereinheitlichen (Strichstärke, Größe), Chip-Layout auf Flex mit Gap umstellen.
**Passt zu:** Wenn du die Chip-Fläche visuell aufwerten willst — sonst wirken Chips ohne Icons bei viel Text schnell leer.

---

## Option D — Dünne Trennlinien statt Kategorie-Header

**Idee:** Wie Option A, aber ohne sichtbare Kategorie-Labels — nur eine dünne, dashed Sage-Linie (identisch zum Trenner zwischen `.deck-slide`s) zwischen den Gruppen.

**So sieht's aus:**
```
┌──────┐ ┌────────────┐ ┌──────────┐ ┌──────────┐ ┌───────┐
│Figma │ │Illustrator │ │InDesign  │ │Photoshop │ │Canva  │
└──────┘ └────────────┘ └──────────┘ └──────────┘ └───────┘
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
┌───────────────┐ ┌──────────────┐ ┌──────────────┐
│User Research  │ │Wireframing   │ │Prototyping   │
└───────────────┘ └──────────────┘ └──────────────┘
```

**Vorteil:** Ruhiger, minimalistischer — keine zusätzliche Typografie-Ebene. Nutzt bestehendes Divider-Muster.
**Aufwand:** minimal — CSS-only, kein neues Element außer `<hr>` / `::before`.
**Passt zu:** Wenn Kategorie-Labels dir zu „bürokratisch" wirken und du der Chip-Gruppierung mehr Vertrauen schenkst.

---

## Option E — Skill-Erzählung als Fließtext + Chip-Wolke

**Idee:** Kurzer Intro-Satz („Ich arbeite hauptsächlich in Figma und ergänze mit …"), darunter die Chips als Wolke ohne Kategorien.

**So sieht's aus:**
```
Ich arbeite hauptsächlich in Figma für UI und Prototyping,
ergänze mit der Adobe Creative Suite für Print & Illustration
und beherrsche die Grundlagen von HTML, CSS und JavaScript.

┌──────┐ ┌────────────┐ ┌──────────┐ ┌──────────┐ ┌───────┐
│Figma │ │Illustrator │ │InDesign  │ │Photoshop │ │Canva  │
└──────┘ └────────────┘ └──────────┘ └──────────┘ └───────┘
┌────┐ ┌─────┐ ┌────────────┐ ┌───────┐ ┌──────────────────┐
│HTML│ │CSS  │ │JavaScript  │ │Astro  │ │10-Finger-System  │
└────┘ └─────┘ └────────────┘ └───────┘ └──────────────────┘
```

**Vorteil:** Persönlich, erklärt Zusammenhänge (was benutzt du wofür), passt zu deinem Bio-Ton auf der Über-mich-Seite.
**Aufwand:** klein — Text-Block über den Chips ergänzen, sonst keine Struktur-Änderung.
**Passt zu:** Wenn du mehr Kontext als Struktur willst und den Bogen zur Bio darüber schließen willst.

---

## Option F — Kacheln statt Chips (mit Micro-Kontext)

**Idee:** Für die 3–4 wichtigsten Kompetenzen jeweils eine kleine `TabCard` (Kachel mit L-Schatten, wie Ausgangspunkt/Fokus) mit 1–2 Sätzen Kontext. Der Rest bleibt als Chip-Reihe.

**So sieht's aus:**
```
┌────────────────────────────┐ ┌────────────────────────────┐
│ FIGMA                      │ │ USER RESEARCH              │
│ Prototypen, Auto-Layout,   │ │ Interviews, Personas,      │
│ Design Systems, Variables. │ │ User Journeys.             │
└────────────────────────────┘ └────────────────────────────┘

┌────────────┐ ┌──────────┐ ┌────────┐ ┌────┐ ┌─────┐ ┌───────┐
│Illustrator │ │Photoshop │ │InDesign│ │HTML│ │CSS  │ │Astro  │
└────────────┘ └──────────┘ └────────┘ └────┘ └─────┘ └───────┘
```

**Vorteil:** Zeigt Tiefe bei den wichtigen Skills, nicht nur Breite. Wirkt hochwertiger als reine Wortliste — genau das, was in Portfolios oft fehlt.
**Aufwand:** klein — `TabCard` existiert schon, nur die Kompetenz-Section aufteilen in "2er-Grid oben, Chips unten".
**Passt zu:** Wenn du bei einzelnen Skills Substanz zeigen willst statt nur Namen zu droppen.

---

## Meine Empfehlung

**Option A (Kategorien)** als Basis — bester Return für minimalen Aufwand und skaliert am saubersten, wenn du später noch mehr Tools/Methoden hinzufügst. Wenn du bei einzelnen Kern-Skills Tiefe zeigen willst, lässt sich **F** später oben draufsetzen (die 2–3 wichtigsten als Kachel, der Rest darunter kategorisiert).
