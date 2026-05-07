import type { INodeProperties } from 'n8n-workflow';
import { actionBookingGetRange, resourceBooking } from '../resources.constants';

const showOnlyForBookingGetRange = {
  operation: [actionBookingGetRange],
  resource: [resourceBooking],
};

export const bookingGetRangeDescription: INodeProperties[] = [
  {
    displayName: "Purchase or Activity Date",
    name: "searchBy",
    type: "options",
    displayOptions: { show: showOnlyForBookingGetRange },
    default: "purchaseDate",
    description: "Search by purchase or activity date",
    required: true,
    options: [
      {
        name: "Purchase Date",
        value: "purchaseDate",
      },
      {
        name: "Activity Date",
        value: "activityDate",
      },
    ],
  },
  {
    displayName: "From",
    name: "startTime",
    type: "dateTime",
    displayOptions: { show: showOnlyForBookingGetRange },
    default: "",
    description: "The date to start retrieving bookings from",
    required: true,
  },
  {
    displayName: "To",
    name: "endTime",
    type: "dateTime",
    displayOptions: { show: showOnlyForBookingGetRange },
    default: "",
    description: "The date to end retrieving bookings from",
    required: true,
  },
  {
    displayName: "Product ID",
    name: "productId",
    type: "string",
    displayOptions: { show: showOnlyForBookingGetRange },
    default: "",
    description: "The ID of the product for which to find bookings",
  },
  {
    displayName: "Primary Guest Email",
    name: "email",
    type: "string",
    placeholder: 'name@email.com',
    displayOptions: { show: showOnlyForBookingGetRange },
    default: "",
    description: "The email of the primary guest for which to find bookings",
  },
  {
    displayName: "Search Text",
    name: "searchString",
    type: "string",
    placeholder: '',
    displayOptions: { show: showOnlyForBookingGetRange },
    default: "",
    description: "The search text for which to find bookings",
  },
  {
    displayName: 'Include Guest Details (From Waivers)',
    name: 'includeGuests',
    type: "boolean",
    displayOptions: { show: showOnlyForBookingGetRange },
    default: false,
    description: 'Whether to include guest details from waivers',
  },
];
