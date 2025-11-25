import type { INodeProperties } from 'n8n-workflow';
import { actionBookingGetGuests, resourceBooking } from '../resources.constants';

const showOnlyForGetBookingGuests = {
  operation: [actionBookingGetGuests],
  resource: [resourceBooking],
};

export const bookingGetBookingGuestsDescription: INodeProperties[] = [
  {
    displayName: "Booking ID",
    name: "bookingId",
    type: "string",
    displayOptions: { show: showOnlyForGetBookingGuests },
    default: "",
    description: "The ID of the booking to retrieve",
    required: true,
  },
];
