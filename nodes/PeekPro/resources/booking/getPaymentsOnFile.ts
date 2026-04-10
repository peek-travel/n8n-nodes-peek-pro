import type { INodeProperties } from 'n8n-workflow';
import { actionBookingGetPaymentsOnFile, resourceBooking } from '../resources.constants';

const showOnlyForBookingGetPaymentsOnFile = {
  operation: [actionBookingGetPaymentsOnFile],
  resource: [resourceBooking],
};

export const bookingGetPaymentsOnFileDescription: INodeProperties[] = [
  {
    displayName: "Booking ID",
    name: "bookingId",
    type: "string",
    displayOptions: { show: showOnlyForBookingGetPaymentsOnFile },
    default: "",
    description: "The ID of the booking to retrieve payments on file for",
    required: true,
  },
];
