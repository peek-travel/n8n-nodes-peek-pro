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
5. **`usableAsTool: true`** — **action** nodes' `INodeTypeDescription` must set
   it so they can be used as AI tools. **Trigger** nodes (`group: ['trigger']`)
   must NOT set it — n8n's linter rejects `usableAsTool` on triggers because they
   cannot be invoked as AI tools (this rejected 0.4.4).
6. **package.json references resolve** — every path in `n8n.nodes` /
   `n8n.credentials` must have a corresponding TypeScript source file.

Reference: https://docs.n8n.io/connect/create-nodes/build-your-node/reference/codex-files

## When you add or change a node

- Add/adjust the `.node.json` codex to satisfy rules 1–4.
- Keep `usableAsTool: true` on action nodes; never set it on trigger nodes (rule 5).
- Run `npm run validate`, then `npm run build` and `npm run lint`. Lint mirrors
  n8n's `npx @n8n/scan-community-package`, so a lint failure = review rejection.
- Update `overview.md` per the Overview Tracking section of `CLAUDE.md`.

**Linter version skew.** The reviewer lints with `@n8n/node-cli@latest`; the
pinned devDep lags (a `^0.x` caret can't cross minor versions). Rules flip
between versions — e.g. old `node-usable-as-tool` *wanted* `usableAsTool` on
triggers, current one *forbids* it (this rejected 0.4.4). `prepublishOnly`
therefore runs `npx @n8n/node-cli@latest lint`, so the publish gate always uses
the reviewer's exact rules even when the local pinned linter is stale. Bump the
pinned `@n8n/node-cli` devDep toward latest periodically.

## Adding a new guideline

When n8n flags something new, encode it as a check in
`scripts/validate-n8n.mjs` (push to `errors`) and document it here, so the same
issue can never reach review again. Keep checks high-signal — a false positive
that blocks `npm run build` is worse than a missing rule.
