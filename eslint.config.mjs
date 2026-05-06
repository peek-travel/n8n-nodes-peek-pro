import { config } from '@n8n/node-cli/eslint';

// Extends @n8n/node-cli base, then layers extra n8n community-node style rules
// per the n8n style guidelines documented in eslint-plugin-n8n-nodes-base and
// @n8n/eslint-plugin-community-nodes. Re-enables strict rules that the default
// config relaxes, and tightens a few TS rules.
//
// Rules intentionally left OFF (kept from base config):
//   - n8n-nodes-base/node-class-description-inputs-wrong-regular-node
//   - n8n-nodes-base/node-class-description-outputs-wrong
//     (these expect literal ['main'] arrays; this package uses the modern
//     NodeConnectionTypes.Main enum, which the rules do not understand.)
//   - n8n-nodes-base/cred-class-field-documentation-url-miscased
//     (auto-fixer would camelCase the actual URL string — corrupts links.)

export default [
	...config,
	{
		files: ['./credentials/**/*.ts'],
		rules: {
			// Sensitive string fields must declare typeOptions.password = true.
			'n8n-nodes-base/cred-class-field-type-options-password-missing': 'error',
		},
	},
	{
		files: ['./nodes/**/*.ts'],
		rules: {
			// Forbid deprecated maxValue typeOption on Limit-style params.
			'n8n-nodes-base/node-param-type-options-max-value-present': 'error',
		},
	},
	{
		files: ['./**/*.ts'],
		rules: {
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{ prefer: 'type-imports', fixStyle: 'separate-type-imports' },
			],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'@typescript-eslint/no-explicit-any': 'warn',
		},
	},
];
