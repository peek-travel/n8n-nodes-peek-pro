import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { PEEK_PRO_BASE_URL, DEFAULT_HEADERS } from '../../constants/peekPro.constants';
// import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { userDescription } from './resources/user';
import { accountDescription } from './resources/account';

export class PeekPro implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Peek Pro',
		name: 'peekPro',
		icon: { light: 'file:peekPro.svg', dark: 'file:peekPro.dark.svg' },
		group: ['transform'],
		version: 1,
		// subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		subtitle: '={{$parameter["operation"]}}',
		description: 'Build workflows with Peek Pro',
		defaults: {
			name: 'Peek Pro',
		},
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'peekProApi', required: true }],
		requestDefaults: {
			baseURL: PEEK_PRO_BASE_URL,
			headers: DEFAULT_HEADERS,
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'account',
			},
			...accountDescription,
			...userDescription,
		],
	};
}
