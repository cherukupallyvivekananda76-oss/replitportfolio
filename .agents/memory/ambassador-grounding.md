---
name: Ambassador grounding boundary
description: Why the public portfolio assistant uses fixed verified answers and a transparent direct-match fallback.
---

Treat the language model as a topic selector, never as the author of factual claims about the candidate. The server must assemble replies and citations from reviewed, public evidence. Unsupported claims use the exact refusal text; private contact details and chat transcripts must not be stored or logged.

**Why:** A source-grounded recruiter assistant must remain reliable even when a visitor attempts prompt injection. The user's own model provider also returned rate-limit responses during initial verification, so direct evidence matching kept the assistant useful without inventing facts or pretending model classification had succeeded.

**How to apply:** When adding or changing profile facts, review the public source and corresponding citations first. If model selection is unavailable, show that the response used direct matching; do not silently present it as a model-selected answer. Keep private source material outside public assets.