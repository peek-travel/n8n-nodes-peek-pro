---
type: "always_apply"
---

## For Typescript and UI
- don't put async calls with `await` inside loops. Use `Promise.all()` instead
- Except for logging messages, do not put static strings directly into the code. Instead, declare static const variables at the beginning of the class. Allow those to be shared as necessary.
- Reuse UI components / handlebar partials as much as possible
- Look for opportunities to simplify code by creating helper functions instead of code duplication

