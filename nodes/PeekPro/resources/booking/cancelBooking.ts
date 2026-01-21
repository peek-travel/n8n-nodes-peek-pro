import type { INodeProperties } from 'n8n-workflow';
import { actionBookingCancel, resourceBooking } from '../resources.constants';

const showOnlyForBookingCancel = {
  operation: [actionBookingCancel],
  resource: [resourceBooking],
};

export const bookingCancelDescription: INodeProperties[] = [
  {
    displayName: "Booking ID",
    name: "bookingId",
    type: "string",
    displayOptions: { show: showOnlyForBookingCancel },
    default: "",
    description: "The ID of the booking to cancel",
    required: true,
  },
];
