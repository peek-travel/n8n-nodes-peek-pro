import type { INodeProperties } from 'n8n-workflow';
import { actionAccountGetCurrent, resourceAccount } from '../resources.constants';

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
				value: actionAccountGetCurrent,
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
		default: actionAccountGetCurrent,
	},
];
