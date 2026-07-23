#!/usr/bin/env node
/**
 * Validates this package against the n8n community-node review guidelines that
 * have tripped up submissions before. Runs as part of `npm run build` and
 * `prepublishOnly`, so a package that would be rejected by the n8n review can
 * never be published.
 *
 * Rules encoded here (see https://docs.n8n.io/connect/create-nodes/build-your-node/reference/codex-files):
 *   1. Codex `node` field must be `<packageName>.<nodeName>`, never the
 *      built-in `n8n-nodes-base.` prefix.
 *   2. `<nodeName>` in the codex must match the `name` in the sibling *.node.ts.
 *   3. Codex `categories` may only contain values from n8n's allowed list.
 *   4. Every *.node.ts needs a matching *.node.json codex, and vice-versa.
 *   5. Every node's INodeTypeDescription must set `usableAsTool: true` so it
 *      can be used as an AI tool.
 *   6. Every file referenced in package.json `n8n.nodes`/`n8n.credentials`
 *      must have a corresponding TypeScript source file.
 *
 * To add a rule: append a check that pushes to `errors`. Keep checks
 * high-signal — a false positive that blocks `npm run build` is worse than a
 * missing rule.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// The exact category values n8n accepts in a codex file. Keep in sync with
// https://docs.n8n.io/connect/create-nodes/build-your-node/reference/codex-files
const ALLOWED_CATEGORIES = new Set([
	'Data & Storage',
	'Finance & Accounting',
	'Marketing & Content',
	'Productivity',
	'Miscellaneous',
	'Sales',
	'Development',
	'Analytics',
	'Communication',
	'Utility',
]);

const errors = [];
const err = (file, msg) => errors.push(`${relative(ROOT, file)}: ${msg}`);

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const packageName = pkg.name;

/** Recursively collect files under `dir` whose name ends with `suffix`. */
function walk(dir, suffix, out = []) {
	if (!existsSync(dir)) return out;
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (entry.name === 'node_modules' || entry.name === 'dist') continue;
		const full = join(dir, entry.name);
		if (entry.isDirectory()) walk(full, suffix, out);
		else if (entry.name.endsWith(suffix)) out.push(full);
	}
	return out;
}

const nodesDir = join(ROOT, 'nodes');
const nodeTsFiles = walk(nodesDir, '.node.ts');
const codexFiles = walk(nodesDir, '.node.json');

// --- Node .ts files: usableAsTool + matching codex -------------------------
for (const tsFile of nodeTsFiles) {
	const src = readFileSync(tsFile, 'utf8');

	// Rule 5: usableAsTool: true present.
	if (!/usableAsTool:\s*true/.test(src)) {
		err(tsFile, "missing `usableAsTool: true` in the node description (required so the node can be used as an AI tool)");
	}

	// Rule 4: matching codex file must exist.
	const codexPath = tsFile.replace(/\.node\.ts$/, '.node.json');
	if (!existsSync(codexPath)) {
		err(tsFile, `no matching codex file — expected ${relative(ROOT, codexPath)}`);
	}
}

// --- Codex .node.json files -------------------------------------------------
for (const codexFile of codexFiles) {
	let codex;
	try {
		codex = JSON.parse(readFileSync(codexFile, 'utf8'));
	} catch (e) {
		err(codexFile, `invalid JSON: ${e.message}`);
		continue;
	}

	// Rule 4: matching node .ts must exist.
	const tsPath = codexFile.replace(/\.node\.json$/, '.node.ts');
	if (!existsSync(tsPath)) {
		err(codexFile, `no matching node file — expected ${relative(ROOT, tsPath)}`);
	}

	// Required codex fields.
	for (const field of ['node', 'nodeVersion', 'codexVersion']) {
		if (codex[field] === undefined) err(codexFile, `missing required field "${field}"`);
	}

	// Rules 1 & 2: `node` field = `<packageName>.<nodeName>`.
	if (typeof codex.node === 'string') {
		if (codex.node.startsWith('n8n-nodes-base.')) {
			err(codexFile, `"node" uses the built-in prefix "n8n-nodes-base." — community nodes must use "${packageName}."`);
		} else if (!codex.node.startsWith(`${packageName}.`)) {
			err(codexFile, `"node" is "${codex.node}" but must start with "${packageName}."`);
		} else if (existsSync(tsPath)) {
			const nodeName = codex.node.slice(packageName.length + 1);
			const match = /displayName:\s*'[^']*',\s*name:\s*'([^']+)'/.exec(readFileSync(tsPath, 'utf8'));
			if (match && match[1] !== nodeName) {
				err(codexFile, `"node" name segment ".${nodeName}" does not match the node's name "${match[1]}" in ${basename(tsPath)}`);
			}
		}
	}

	// Rule 3: categories from the allowed list only.
	if (codex.categories !== undefined) {
		if (!Array.isArray(codex.categories)) {
			err(codexFile, `"categories" must be an array`);
		} else {
			for (const cat of codex.categories) {
				if (!ALLOWED_CATEGORIES.has(cat)) {
					err(codexFile, `unsupported category "${cat}" — allowed: ${[...ALLOWED_CATEGORIES].join(', ')}`);
				}
			}
		}
	}
}

// --- Rule 6: package.json references resolve to source files ----------------
const referenced = [...(pkg.n8n?.nodes ?? []), ...(pkg.n8n?.credentials ?? [])];
for (const distPath of referenced) {
	const srcPath = join(ROOT, distPath.replace(/^dist\//, '').replace(/\.js$/, '.ts'));
	if (!existsSync(srcPath)) {
		err(join(ROOT, 'package.json'), `n8n reference "${distPath}" has no source file at ${relative(ROOT, srcPath)}`);
	}
}

// --- Report -----------------------------------------------------------------
if (errors.length > 0) {
	console.error(`\n✖ n8n guideline validation failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):\n`);
	for (const e of errors) console.error(`  • ${e}`);
	console.error('');
	process.exit(1);
}

console.log(`✓ n8n guideline validation passed (${nodeTsFiles.length} node${nodeTsFiles.length === 1 ? '' : 's'}, ${codexFiles.length} codex file${codexFiles.length === 1 ? '' : 's'})`);
