import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { PEEK_PRO_BASE_URL, DEFAULT_HEADERS } from '../../constants/peekPro.constants';
// import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { userDescription } from './resources/user';
import { accountDescription } from './resources/account';
import { bookingDescription } from './resources/booking';
import { timeslotDescription } from './resources/timeslot';
import { resourceAccount, resourceBooking, resourceProduct, resourceTimeslot, resourceUser } from './resources/resources.constants';
import { productDescription } from './resources/product';

export class PeekPro implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Peek Pro',
		name: 'peekPro',
		icon: { light: 'file:peekPro.svg', dark: 'file:peekPro.dark.svg' },
		group: ['transform'],
		version: 1,
		// subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}', //FIXME
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
						name: 'Booking',
						value: resourceBooking,
					},
					{
						name: 'Product',
						value: resourceProduct,
					},
					{
						name: 'Timeslot',
						value: resourceTimeslot,
					},
					{
						name: 'Account',
						value: resourceAccount,
					},
					{
						name: 'User',
						value: resourceUser,
					},
				],
				default: 'account',
			},
			...accountDescription,
			...userDescription,
			...bookingDescription,
			...timeslotDescription,
			...productDescription,
		],
	};
}
