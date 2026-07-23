---
name: n8n-guidelines
description: Rules and checks for keeping this n8n community node package compliant with the n8n submission review. Use whenever adding or editing a node, a codex (.node.json) file, a resource/action, or the package.json n8n block — anything that would be re-reviewed on publish.
---

# n8n community-node guidelines

n8n re-reviews every published version. These are the rules that have caused
rejections before. `scripts/validate-n8n.mjs` enforces the mechanical ones and
runs on `npm run build` and `prepublishOnly`, so a non-compliant package cannot
be published. Run it directly any time you touch node files:

```bash
npm run validate
```

## Rules the validator enforces

1. **Codex `node` prefix** — in every `*.node.json`, the `node` field must be
   `<packageName>.<nodeName>` (e.g. `n8n-nodes-peek-pro.peekPro`), using the
   package name from `package.json`. Never the built-in `n8n-nodes-base.`
   prefix (the scaffolding template ships with that — it must be changed).
2. **Node name match** — the `.<nodeName>` segment must equal the `name` in the
   sibling `*.node.ts` node description.
3. **Categories** — codex `categories` may only contain: Data & Storage,
   Finance & Accounting, Marketing & Content, Productivity, Miscellaneous,
   Sales, Development, Analytics, Communication, Utility. No "Developer Tools",
   no "Trigger".
4. **Codex ↔ node pairing** — every `*.node.ts` needs a matching `*.node.json`
   and vice-versa (same base filename).
5. **`usableAsTool: true`** — every node's `INodeTypeDescription` must set it,
   including trigger nodes, so the node can be used as an AI tool.
6. **package.json references resolve** — every path in `n8n.nodes` /
   `n8n.credentials` must have a corresponding TypeScript source file.

Reference: https://docs.n8n.io/connect/create-nodes/build-your-node/reference/codex-files

## When you add or change a node

- Add/adjust the `.node.json` codex to satisfy rules 1–4.
- Keep `usableAsTool: true` in the node description (rule 5).
- Run `npm run validate`, then `npm run build` and `npm run lint`.
- Update `overview.md` per the Overview Tracking section of `CLAUDE.md`.

## Adding a new guideline

When n8n flags something new, encode it as a check in
`scripts/validate-n8n.mjs` (push to `errors`) and document it here, so the same
issue can never reach review again. Keep checks high-signal — a false positive
that blocks `npm run build` is worse than a missing rule.
