import type { INodeProperties } from 'n8n-workflow';
import { actionBookingUpdateCheckin, resourceBookings } from '../resources.constants';

const showOnlyForBookingUpdateCheckin = {
  operation: [actionBookingUpdateCheckin],
  resource: [resourceBookings],
};

export const bookingUpdateCheckinDescription: INodeProperties[] = [
  {
    displayName: 'Booking ID',
    name: 'bookingId',
    type: 'string',
    displayOptions: { show: showOnlyForBookingUpdateCheckin },
    default: '',
    description: "The ID of the booking to retrieve",
    required: true,
  },
  {
    displayName: 'New Check-in Status',
    name: 'checkedIn',
    type: 'boolean',
    displayOptions: { show: showOnlyForBookingUpdateCheckin },
    default: true,
    description: "The checked-in status of the booking",
    required: true,
  },
];
