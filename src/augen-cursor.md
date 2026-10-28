# Archiv: Augen-Cursor (data-mode="view")

Ursprünglicher Cursor für die Projektkarten – ersetzt durch Sparkles.

---

## HTML (in `interactions.js`, `initCursor`)

```html
<span class="ee-cursor__art">
  <span class="ee-eyes__fill"></span>
  <span class="ee-eyes__rings"></span>
  <span class="ee-eyes__heart ee-eyes__heart--l"></span>
  <span class="ee-eyes__heart ee-eyes__heart--r"></span>
  <span class="ee-swipe__arrow"></span>
</span>
```

## JS – Richtungs-Tracking (in `initCursor`, tick-Funktion)

```js
let lastMx = mx;
let lastMy = my;
let dirX = 0;
let dirY = 0;
let hx = 0;
let hy = 0;

// im tick:
const vx = mx - lastMx;
const vy = my - lastMy;
lastMx = mx;
lastMy = my;
const speed = Math.hypot(vx, vy);
if (speed > 1.5) {
  dirX = vx / speed;
  dirY = vy / speed;
}
hx = lerp(hx, dirX, 0.14);
hy = lerp(hy, dirY, 0.14);
cursor.style.setProperty('--hx', hx.toFixed(3));
cursor.style.setProperty('--hy', hy.toFixed(3));
```

## CSS (in `interactions.css`)

```css
/* ---- Projekte: Augen mit beweglichen Herzen ---- */
.ee-cursor[data-mode='view'] {
  --anchor: -36px;
}

.ee-cursor[data-mode='view'] .ee-cursor__art {
  width: 85px;
  aspect-ratio: 681 / 590;
}

.ee-cursor[data-mode='view'] .ee-cursor__text {
  font-size: 1.8rem;
}

.ee-eyes__fill,
.ee-eyes__rings,
.ee-eyes__heart {
  display: none;
  position: absolute;
  background: var(--color-forest);
}

.ee-cursor[data-mode='view'] .ee-eyes__fill,
.ee-cursor[data-mode='view'] .ee-eyes__rings,
.ee-cursor[data-mode='view'] .ee-eyes__heart {
  display: block;
}

.ee-eyes__fill {
  inset: 0;
  background: #ffffff;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 681 590'%3E%3Cellipse cx='180' cy='295' rx='155' ry='272' fill='white'/%3E%3Cellipse cx='501' cy='295' rx='155' ry='272' fill='white'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 681 590'%3E%3Cellipse cx='180' cy='295' rx='155' ry='272' fill='white'/%3E%3Cellipse cx='501' cy='295' rx='155' ry='272' fill='white'/%3E%3C/svg%3E") center / contain no-repeat;
}

.ee-eyes__rings {
  inset: 0;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 681 590'%3E%3Cellipse cx='180' cy='295' rx='155' ry='272' fill='none' stroke='white' stroke-width='14'/%3E%3Cellipse cx='501' cy='295' rx='155' ry='272' fill='none' stroke='white' stroke-width='14'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 681 590'%3E%3Cellipse cx='180' cy='295' rx='155' ry='272' fill='none' stroke='white' stroke-width='14'/%3E%3Cellipse cx='501' cy='295' rx='155' ry='272' fill='none' stroke='white' stroke-width='14'/%3E%3C/svg%3E") center / contain no-repeat;
}

.ee-eyes__heart {
  width: 14.1%;
  aspect-ratio: 96 / 126;
  top: 49.8%;
  transform: translate(-50%, -50%)
    translate(calc(var(--hx, 0) * 7.5px), calc(var(--hy, 0) * 15px));
  -webkit-mask: url('/images/eyes-heart.png') center / contain no-repeat;
  mask: url('/images/eyes-heart.png') center / contain no-repeat;
}

.ee-eyes__heart--l { left: 26.4%; }
.ee-eyes__heart--r { left: 72%; }
```
