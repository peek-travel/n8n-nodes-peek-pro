import type { INodeProperties } from 'n8n-workflow';
import { actionTimeslotGetDate, resourceTimeslot } from '../resources.constants';

const showOnlyForTimeslotGetRange = {
  operation: [actionTimeslotGetDate],
  resource: [resourceTimeslot],
};

export const timeslotGetDateDescription: INodeProperties[] = [
  {
    displayName: "Date",
    name: 'date',
    type: 'dateTime',
    displayOptions: { show: showOnlyForTimeslotGetRange },
    default: '',
    description: "The date for which to retrieve timeslots",
    required: true,
  },
  {
    displayName: 'Product ID',
    name: 'productId',
    type: 'string',
    displayOptions: { show: showOnlyForTimeslotGetRange },
    default: '',
    description: "The ID of the product for which to find timeslots",
    required: true,
  },
  {
    displayName: 'Only Show Timeslots with Bookings',
    name: 'hasBookings',
    type: 'boolean',
    displayOptions: { show: showOnlyForTimeslotGetRange },
    default: true,
    description: "Only return timeslots that have bookings",
  },
];
