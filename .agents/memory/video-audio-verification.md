---
name: Video audio verification
description: Autoplay caveats when verifying soundtrack playback in embedded video previews versus export.
---

Do not infer audible video playback from a generated music file, a successful asset request, or an audio element in the DOM. Distinguish wiring and timeline synchronization from audible playback.

**Why:** Browser autoplay restrictions can leave unmuted audio paused in a headless or embedded preview even while the visual scene clock advances. An injected test iframe may have a different autoplay permission context from the actual workspace preview or the top-level export renderer.

**How to apply:** Verify source delivery and scene offsets with cheap checks, but call sound verified only after a real playback check in the relevant context. Treat a blocked headless autoplay attempt as inconclusive for export audio, not proof that the music file is missing or that the export is silent.