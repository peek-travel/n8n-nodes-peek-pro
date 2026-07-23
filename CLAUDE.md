# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run validate       # check nodes against n8n review guidelines
npm run build          # validate, then compile TypeScript → dist/
npm run build:watch    # watch mode (tsc --watch)
npm run lint           # ESLint via n8n-node lint
npm run lint:fix       # auto-fix lint errors
npm run dev            # n8n-node dev (local n8n dev server)
npm run release        # cut a release with release-it
```

There are no tests in this repository.

## n8n review compliance

n8n re-reviews every published version. `scripts/validate-n8n.mjs` enforces the
mechanical guidelines that have caused rejections (codex `node` prefix, allowed
`categories`, `usableAsTool: true`, codex↔node pairing). It runs on
`npm run build` and `prepublishOnly`, so a non-compliant package cannot be
published. When n8n flags a new issue, add a check to that script — see the
`n8n-guidelines` skill (`.claude/skills/n8n-guidelines/`) for the full rule list
and workflow.

## Architecture

This is an **n8n community node package** exposing two nodes:

| Node | Class | Type |
|------|-------|------|
| `PeekPro` | `nodes/PeekPro/PeekPro.node.ts` | Action (declarative routing) |
| `PeekProTrigger` | `nodes/PeekProTrigger/PeekProTrigger.node.ts` | Webhook trigger (imperative) |

Both nodes authenticate via the `peekProApi` credential (`credentials/PeekProApi.credentials.ts`), which injects `x-api-key` as a header. Credential validity is tested against `GET /ping`. The base URL (`https://n8n.peeklabs.com/n8n/api/v1`) and default headers live in `constants/peekPro.constants.ts`.

### PeekPro (action node) — declarative pattern

`PeekPro.node.ts` sets `requestDefaults` (base URL + headers) and then spreads arrays of `INodeProperties` from each resource module. **No `execute()` method exists** — all HTTP calls are declared inline on each operation option via the `routing.request` property.

Resource modules live under `nodes/PeekPro/resources/<resource>/`:

```
resources/
  resources.constants.ts   ← all resource & action string constants
  <resource>/
    index.ts               ← exports `<resource>Description: INodeProperties[]`
                             assembles the Operation dropdown + spreads parameter arrays
    <action>.ts            ← exports one `INodeProperties[]` for that action's params
```

Each `index.ts` defines a `displayOptions.show` guard so its `Operation` dropdown only appears for the right `resource` value. Each `<action>.ts` similarly guards its parameters on both `resource` and `operation`.

**Adding a new action:**
1. Add constants to `resources.constants.ts`.
2. Create `nodes/PeekPro/resources/<resource>/<action>.ts` with the parameter `INodeProperties[]`.
3. Add the operation option (with inline `routing.request`) to the resource's `index.ts` and spread the new parameter array.
4. If it's a new resource, add a new `index.ts`, register the resource option in `PeekPro.node.ts`, and spread the description array.

### PeekProTrigger (webhook node) — imperative pattern

Implements `webhookMethods.default` (`checkExists`, `create`, `delete`) and a `webhook()` handler directly in the class. Webhook lifecycle:
- **create**: POSTs to `/webhooks`, stores the returned ID in workflow static data (`webhookData.webhookId`).
- **checkExists**: GETs `/webhooks/{id}` and checks `response.active === true`.
- **delete**: DELETEs `/webhooks/{id}`, cleans up stored ID.
- **webhook()**: Returns a GET health/challenge response or unwraps a POST body into `{ event, headers, query, timestamp }`.

Localhost URLs are rejected at creation time.

### Build output

TypeScript compiles to `dist/`. The `package.json` `n8n` field points n8n to the compiled credential and node files in `dist/`. Only `dist/` is included in the published npm package.

## Overview Tracking

After making changes, review all the n8n configurations for both Peek Pro and Peek Pro Trigger in this n8n community node. Update the overview.md file that summarizes which resources exist, what actions within resources, for each of those actions what the possible input parameters are, and then the same for the triggers.
