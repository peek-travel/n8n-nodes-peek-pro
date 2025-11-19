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
    displayName: 'Only Get',
    name: 'filterBookings',
    type: 'options',
    displayOptions: { show: showOnlyForTimeslotGetRange },
    default: 'withBookings',
    description: "Limit which timeslots to retrieve by whether they have bookings",
    options: [
      {
        name: 'All Timeslots',
        value: 'all',
      },
      {
        name: 'Timeslots with Bookings',
        value: 'withBookings',
      },
      {
        name: 'Timeslots without Bookings',
        value: 'withoutBookings',
      },
    ],

  },
];
