import type { INodeProperties } from 'n8n-workflow';

const showOnlyForAccount = {
	resource: ['account'],
};

export const accountDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAccount,
		},
		options: [
			{
				name: 'Get Current',
				value: 'getCurrent',
				action: 'Get current account',
				description: 'Get the current account information',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/accounts/current',
					},
				},
			},
		],
		default: 'getCurrent',
	},
];
