import type { INodeProperties } from 'n8n-workflow';
import { actionUserGetOne, resourceUser } from '../resources.constants';

const showOnlyForUserGet = {
	operation: [actionUserGetOne],
	resource: [resourceUser],
};

export const userGetDescription: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		displayOptions: { show: showOnlyForUserGet },
		default: '',
		description: "The ID of the user to retrieve",
		required: true,
	},
];
