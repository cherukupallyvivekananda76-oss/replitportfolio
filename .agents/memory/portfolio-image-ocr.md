---
name: Portfolio image OCR
description: Preserve full-frame coverage when inspecting raster portfolio assets for private contact details.
---

Normalize raster assets to a multipage TIFF before OCR so every frame or page is inspected. Direct Tesseract input can silently read only the first frame of an animated image.

**Why:** A contact detail shown only in a later frame was missed by direct OCR, allowing an animated image to pass the release gate.

**How to apply:** Keep OCR preprocessing sequence-aware and fail the release when an image cannot be normalized or inspected.