import type { INodeProperties } from 'n8n-workflow';
import { actionBookingGetInvoiceLink, resourceBooking } from '../resources.constants';

const showOnlyForBookingGetInvoiceLink = {
  operation: [actionBookingGetInvoiceLink],
  resource: [resourceBooking],
};

export const bookingGetInvoiceLinkDescription: INodeProperties[] = [
  {
    displayName: "Booking ID",
    name: "bookingId",
    type: "string",
    displayOptions: { show: showOnlyForBookingGetInvoiceLink },
    default: "",
    description: "The ID of the booking to retrieve the invoice link for",
    required: true,
  },
];
