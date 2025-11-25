import type { INodeProperties } from 'n8n-workflow';
import { userGetDescription } from './getUser';
import { actionUserGetOne, resourceUser } from '../resources.constants';

const showOnlyForUsers = {
	resource: [resourceUser],
};

export const userDescription: INodeProperties[] = [
	{
		displayName: "Operation",
		name: "operation",
		type: "options",
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForUsers,
		},
		options: [
			{
				name: "Get All",
				value: 'getAll: users',
				action: "Get all users",
				description: "Get all users",
				routing: {
					request: {
						method: "GET",
						url: "/users",
					},
				},
			},
			{
				name: "Get One",
				value: actionUserGetOne,
				action: "Get the data of a user",
				description: "Get the data of a single user",
				routing: {
					request: {
						method: "GET",
						url: '=/users/{{$parameter.userId}}',
					},
				},
			},
		],
		default: 'getAll: users',
	},
	...userGetDescription,
];
