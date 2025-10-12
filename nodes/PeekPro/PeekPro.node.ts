import type { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { PEEK_PRO_BASE_URL, DEFAULT_HEADERS } from '../../constants/peekPro.constants';
// import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
// import { userDescription } from './resources/user';
// import { companyDescription } from './resources/company';

export class PeekPro implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Peek Pro',
		name: 'peekPro',
		icon: { light: 'file:peekPro.svg', dark: 'file:peekPro.dark.svg' },
		group: ['transform'],
		version: 1,
		// subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with the Peek Pro API',
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
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [{ name: 'Ping', value: 'ping', description: 'Test connectivity' }],
				default: 'ping',
			},
			// {
			// 	displayName: 'Resource',
			// 	name: 'resource',
			// 	type: 'options',
			// 	noDataExpression: true,
			// 	options: [
			// 		{
			// 			name: 'User',
			// 			value: 'user',
			// 		},
			// 		{
			// 			name: 'Company',
			// 			value: 'company',
			// 		},
			// 	],
			// 	default: 'user',
			// },
			// ...userDescription,
			// ...companyDescription,
		],
	};

	async execute(this: any) {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			// Simple GET to verify transport/auth works.
			// Uses requestDefaults.baseURL from your description.
			// const res = await this.helpers.httpRequest({
			// 	method: 'GET',
			// 	url: '/v1/ping',  // change if your API uses a different health endpoint
			// 	json: true,
			// 	// If your credentials are needed for auth, you can inject here,
			// 	// but many APIs accept the key via default header or base auth.
			// 	// headers: { Authorization: `Bearer ${apiKey}` },
			// });
			// const res = await this.helpers.httpRequestWithAuthentication.call(this, 'peekProApi', {
			// 	method: 'POST',
			// 	baseURL: 'http://127.0.0.1:5002', // or move this into the credentials later
			// 	url: '/health',
			// 	json: true,
			// });
			const res = await this.helpers.httpRequestWithAuthentication.call(this, 'peekProApi', {
				method: 'GET',
				baseURL: PEEK_PRO_BASE_URL,
				headers: DEFAULT_HEADERS,
				url: '/ping',   // adjust if your ping lives elsewhere
				json: true,
			});
			const payload: IDataObject = (res && typeof res === 'object') ? (res as IDataObject) : { value: res as unknown as string };
			returnData.push({ json: payload });

			// returnData.push({ json: res as object });
		}

		return this.prepareOutputData(returnData);
	}
}
