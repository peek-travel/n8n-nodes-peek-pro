import type { INodeProperties } from 'n8n-workflow';
import { actionBookingGetRange, resourceBooking } from '../resources.constants';

const showOnlyForBookingGetRange = {
  operation: [actionBookingGetRange],
  resource: [resourceBooking],
};

export const bookingGetRangeDescription: INodeProperties[] = [
  {
    displayName: "Range Starts At",
    name: 'startDate',
    type: 'dateTime',
    displayOptions: { show: showOnlyForBookingGetRange },
    default: '',
    description: "The date to start retrieving bookings from",
    required: true,
  },
  {
    displayName: "Range Ends At",
    name: 'endDate',
    type: 'dateTime',
    displayOptions: { show: showOnlyForBookingGetRange },
    default: '',
    description: "The date to end retrieving bookings from",
    required: true,
  },
  {
    displayName: 'Product ID',
    name: 'productId',
    type: 'string',
    displayOptions: { show: showOnlyForBookingGetRange },
    default: '',
    description: "The ID of the product for which to find bookings",
  },
];
