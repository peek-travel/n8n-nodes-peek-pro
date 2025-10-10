import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { userDescription } from './resources/user';
import { companyDescription } from './resources/company';

export class PeekPro implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Peek Pro',
		name: 'peekPro',
		icon: { light: 'file:peekPro.svg', dark: 'file:peekPro.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Peek Pro API',
		defaults: {
			name: 'Peek Pro',
		},
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [{ name: 'peekProApi', required: true }],
		requestDefaults: {
			baseURL: 'https://n8n.peeklabs.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Company',
						value: 'company',
					},
				],
				default: 'user',
			},
			...userDescription,
			...companyDescription,
		],
	};
}
