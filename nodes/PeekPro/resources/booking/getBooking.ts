import type { INodeProperties } from 'n8n-workflow';
import { actionBookingGetOne, resourceBooking } from '../resources.constants';

const showOnlyForBookingGet = {
  operation: [actionBookingGetOne],
  resource: [resourceBooking],
};

export const bookingGetDescription: INodeProperties[] = [
  {
    displayName: "Booking ID",
    name: "bookingId",
    type: "string",
    displayOptions: { show: showOnlyForBookingGet },
    default: "",
    description: "The ID of the booking to retrieve",
    required: true,
  },
];
