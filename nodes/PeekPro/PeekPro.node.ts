import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { PEEK_PRO_BASE_URL, DEFAULT_HEADERS } from '../../constants/peekPro.constants';
import { userDescription } from './resources/user';
import { accountDescription } from './resources/account';
import { bookingDescription } from './resources/booking';
import { timeslotDescription } from './resources/timeslot';
import {
	resourceAccount,
	resourceDailyNote,
	resourceLog,
	resourceMembership,
	resourceProduct,
	resourcePromoCode,
	resourceReseller,
	resourceTimeslot,
	resourceUser,
} from './resources/resources.constants';
import { productDescription } from './resources/product';
import { dailyNoteDescription } from './resources/dailyNotes';
import { resellerDescription } from './resources/reseller';
import { promoCodeDescription } from './resources/promoCode';
import { membershipDescription } from './resources/membership';
import { logDescription } from './resources/log';

export class PeekPro implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Peek Pro',
		name: 'peekPro',
		icon: { light: 'file:peekPro.svg', dark: 'file:peekPro.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Build workflows with Peek Pro',
		defaults: {
			name: 'Peek Pro',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
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
						value: resourceAccount,
					},
					{
						name: 'Booking',
						value: 'booking',
					},
					{
						name: 'Daily Note',
						value: resourceDailyNote,
					},
					{
						name: 'Log',
						value: resourceLog,
					},
					{
						name: 'Membership',
						value: resourceMembership,
					},
					{
						name: 'Product',
						value: resourceProduct,
					},
					{
						name: 'Promo Code',
						value: resourcePromoCode,
					},
					{
						name: 'Reseller',
						value: resourceReseller,
					},
					{
						name: 'Timeslot',
						value: resourceTimeslot,
					},
					{
						name: 'User',
						value: resourceUser,
					},
				],
				default: 'booking',
			},
			...accountDescription,
			...userDescription,
			...bookingDescription,
			...timeslotDescription,
			...productDescription,
			...promoCodeDescription,
			...dailyNoteDescription,
			...resellerDescription,
			...membershipDescription,
			...logDescription,
		],
	};
}
