import type { INodeProperties } from 'n8n-workflow';
import { actionBookingGetMetadata, resourceBooking } from '../resources.constants';

const showOnlyForGetBookingMetatada = {
  operation: [actionBookingGetMetadata],
  resource: [resourceBooking],
};

export const bookingGetBookingMetatadaDescription: INodeProperties[] = [
  {
    displayName: 'Booking ID',
    name: 'bookingId',
    type: 'string',
    displayOptions: { show: showOnlyForGetBookingMetatada },
    default: '',
    description: "The ID of the booking to retrieve",
    required: true,
  },
];
