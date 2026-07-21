import type { INodeProperties } from 'n8n-workflow';
import { actionBookingGetGuests, resourceBooking } from '../resources.constants';

const showOnlyForBookingGetGuests = {
  operation: [actionBookingGetGuests],
  resource: [resourceBooking],
};

export const bookingGetGuestsDescription: INodeProperties[] = [
  {
    displayName: "Booking ID",
    name: "bookingId",
    type: "string",
    displayOptions: { show: showOnlyForBookingGetGuests },
    default: "",
    description: 'The ID of the booking to list guests for (e.g. "b_jgmxry8" or "B-JGMXRY8")',
    required: true,
  },
];
