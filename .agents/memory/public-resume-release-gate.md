---
name: Public resume release gate
description: Preserve the private-contact checks when changing public resume generation.
---

The public resume release check must fail closed when it cannot extract text from the generated PDF. Never let an unsupported PDF format or empty extraction silently skip the private-contact scan.

**Why:** A successful release check must mean the PDF text was actually inspected; otherwise the build can report a false sense of safety.

**How to apply:** When changing the resume generator or PDF format, update the extraction step and verify it still scans the whole generated document before shipping.