import type { INodeProperties } from 'n8n-workflow';
import { resourceAccount } from '../resources.constants';

const showOnlyForAccount = {
	resource: [resourceAccount],
};

export const accountDescription: INodeProperties[] = [
	{
		displayName: "Operation",
		name: "operation",
		type: "options",
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAccount,
		},
		options: [
			{
				name: "Get Current",
				value: "get: current account",
				action: "Get the current account information",
				description: "Get the current account information",
				routing: {
					request: {
						method: "GET",
						url: "/accounts/current",
					},
				},
			},
		],
		default: "get: current account",
	},
];
