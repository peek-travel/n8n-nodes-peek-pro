import type { INodeProperties } from 'n8n-workflow';
import { actionBookingGetRange, resourceBooking } from '../resources.constants';

const showOnlyForBookingGetRange = {
  operation: [actionBookingGetRange],
  resource: [resourceBooking],
};

export const bookingGetRangeDescription: INodeProperties[] = [
  {
    displayName: "Purchase or Activity Date",
    name: 'searchBy',
    type: 'options',
    displayOptions: { show: showOnlyForBookingGetRange },
    default: '',
    description: "Search by purchase or activity date",
    required: true,
    options: [
      {
        name: 'Purchase Date',
        value: 'purchaseDate',
      },
      {
        name: 'Activity Date',
        value: 'activityDate',
      },
    ],
  },
  {
    displayName: "From",
    name: 'startTime',
    type: 'dateTime',
    displayOptions: { show: showOnlyForBookingGetRange },
    default: '',
    description: "The date to start retrieving bookings from",
    required: true,
  },
  {
    displayName: "To",
    name: 'endTime',
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
