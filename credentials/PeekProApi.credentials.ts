import { PEEK_PRO_BASE_URL } from '../constants/peekPro.constants';
import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PeekProApi implements ICredentialType {
	name = 'peekProApi';

	displayName = 'Peek Pro API';

	// Link to your community node's README
	documentationUrl = 'https://github.com/org/-peek-pro?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: PEEK_PRO_BASE_URL,
			url: '/ping',
			method: 'GET',
		},
	};
}
