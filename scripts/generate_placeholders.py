"""
Erzeugt lokale Platzhalterbilder, damit die Website ohne externe Assets
lauffähig ist. Diese Bilder sollen durch die echten Exporte aus Figma
ersetzt werden (siehe README.md im Projekt-Root).
"""
from PIL import Image, ImageDraw, ImageFont
import os

BASE = os.path.join(os.path.dirname(__file__), "..", "public", "images")

SAGE = (128, 149, 130)
SAGE_DARK = (98, 108, 99)
CREAM = (245, 242, 236)
WHITE = (255, 255, 255)


def get_font(size, bold=False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()


def vertical_gradient(size, top, bottom):
    w, h = size
    base = Image.new("RGB", size, top)
    draw = ImageDraw.Draw(base)
    for y in range(h):
        t = y / max(h - 1, 1)
        r = int(top[0] + (bottom[0] - top[0]) * t)
        g = int(top[1] + (bottom[1] - top[1]) * t)
        b = int(top[2] + (bottom[2] - top[2]) * t)
        draw.line([(0, y), (w, y)], fill=(r, g, b))
    return base


def add_dashed_border(draw, size, color, dash=14, gap=10, width=3):
    w, h = size
    x = 0
    while x < w:
        draw.line([(x, 0), (min(x + dash, w), 0)], fill=color, width=width)
        draw.line([(x, h - width), (min(x + dash, w), h - width)], fill=color, width=width)
        x += dash + gap
    y = 0
    while y < h:
        draw.line([(0, y), (0, min(y + dash, h))], fill=color, width=width)
        draw.line([(w - width, y), (w - width, min(y + dash, h))], fill=color, width=width)
        y += dash + gap


def centered_text(draw, size, lines, font_title, font_sub, color):
    w, h = size
    total_h = len(lines) * (font_title.size + 10)
    y = h / 2 - total_h / 2
    for i, line in enumerate(lines):
        font = font_title if i == 0 else font_sub
        bbox = draw.textbbox((0, 0), line, font=font)
        tw = bbox[2] - bbox[0]
        draw.text(((w - tw) / 2, y), line, font=font, fill=color)
        y += font.size + 10


def make_placeholder(path, size, label_lines, top=CREAM, bottom=SAGE):
    img = vertical_gradient(size, top, bottom)
    draw = ImageDraw.Draw(img)
    add_dashed_border(draw, size, WHITE if bottom == SAGE else SAGE_DARK)
    font_title = get_font(max(16, size[0] // 26), bold=True)
    font_sub = get_font(max(12, size[0] // 40))
    centered_text(draw, size, label_lines, font_title, font_sub, WHITE)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, quality=88)


def make_browser_mockup(path, size, title):
    w, h = size
    img = Image.new("RGB", size, WHITE)
    draw = ImageDraw.Draw(img)
    bar_h = int(h * 0.10)
    draw.rectangle([0, 0, w, bar_h], fill=(230, 230, 226))
    r = max(4, bar_h // 6)
    cx = int(bar_h * 0.6)
    for i, col in enumerate([(233, 116, 106), (240, 196, 97), (129, 199, 132)]):
        draw.ellipse([cx - r, bar_h // 2 - r, cx + r, bar_h // 2 + r], fill=col)
        cx += r * 3
    body = vertical_gradient((w, h - bar_h), CREAM, SAGE)
    img.paste(body, (0, bar_h))
    draw = ImageDraw.Draw(img)
    add_dashed_border(draw, size, SAGE_DARK)
    font_title = get_font(max(14, w // 22), bold=True)
    font_sub = get_font(max(11, w // 34))
    centered_text(draw, (w, h - bar_h), ["PLATZHALTER", title], font_title, font_sub, WHITE)
    img_shift = Image.new("RGB", size, WHITE)
    img_shift.paste(img.crop((0, 0, w, h)), (0, 0))
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img_shift.save(path, quality=88)


if __name__ == "__main__":
    make_placeholder(
        os.path.join(BASE, "hero-portrait.jpg"),
        (900, 1000),
        ["FOTO-PLATZHALTER", "hero-portrait.jpg ersetzen"],
        top=CREAM,
        bottom=SAGE,
    )
    make_browser_mockup(
        os.path.join(BASE, "projects", "ernaehrungsberaterin.jpg"),
        (700, 500),
        "ernaehrungsberaterin.jpg",
    )
    make_browser_mockup(
        os.path.join(BASE, "projects", "celestial-haven.jpg"),
        (700, 500),
        "celestial-haven.jpg",
    )
    make_browser_mockup(
        os.path.join(BASE, "projects", "surfcamp.jpg"),
        (700, 500),
        "surfcamp.jpg",
    )
    make_placeholder(
        os.path.join(BASE, "cta-beach.jpg"),
        (1800, 480),
        ["FOTO-PLATZHALTER", "cta-beach.jpg ersetzen"],
        top=SAGE,
        bottom=SAGE_DARK,
    )
    print("done")
