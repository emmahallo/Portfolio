#!/bin/bash
# Optimize all images in public/images/
# - Resize to max 2000px longest side
# - Compress PNGs via pngquant (lossy but visually near-identical)
# - Recompress JPEGs via jpegoptim

set -e
cd "$(dirname "$0")/.."

MAX_DIM=2000
IMG_DIR="public/images"

total_before=0
total_after=0
count=0

echo "Optimizing images in $IMG_DIR..."
echo

find "$IMG_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) -print0 | \
while IFS= read -r -d '' file; do
    before_bytes=$(stat -f%z "$file")
    before_kb=$((before_bytes / 1024))

    # Skip tiny files (already fine)
    if [ "$before_bytes" -lt 200000 ]; then
        continue
    fi

    # Resize if larger than MAX_DIM on any side
    width=$(sips -g pixelWidth "$file" 2>/dev/null | awk '/pixelWidth/ {print $2}')
    height=$(sips -g pixelHeight "$file" 2>/dev/null | awk '/pixelHeight/ {print $2}')

    if [ -n "$width" ] && [ -n "$height" ]; then
        if [ "$width" -gt "$MAX_DIM" ] || [ "$height" -gt "$MAX_DIM" ]; then
            sips -Z "$MAX_DIM" "$file" >/dev/null 2>&1
        fi
    fi

    # Format-specific compression
    ext="${file##*.}"
    lower_ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')

    case "$lower_ext" in
        png)
            # pngquant: lossy, quality 75-90, keeps alpha
            pngquant --quality=75-90 --skip-if-larger --force --strip \
                --output "$file" "$file" 2>/dev/null || true
            ;;
        jpg|jpeg)
            jpegoptim -m85 --strip-all --quiet "$file" || true
            ;;
    esac

    after_bytes=$(stat -f%z "$file")
    after_kb=$((after_bytes / 1024))
    saved_kb=$((before_kb - after_kb))

    if [ "$saved_kb" -gt 0 ]; then
        printf "  %-70s %5d KB → %5d KB (-%d KB)\n" "$(basename "$file")" "$before_kb" "$after_kb" "$saved_kb"
    fi
done

echo
echo "Final image dir size:"
du -sh "$IMG_DIR"
