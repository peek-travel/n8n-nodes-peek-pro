import type { INodeProperties } from 'n8n-workflow';
import { actionBookingUpdateNotes, resourceBooking } from '../resources.constants';

const showOnlyForBookingUpdateNotes = {
  operation: [actionBookingUpdateNotes],
  resource: [resourceBooking],
};

export const bookingUpdateNotesDescription: INodeProperties[] = [
  {
    displayName: 'Booking ID',
    name: 'bookingId',
    type: 'string',
    displayOptions: { show: showOnlyForBookingUpdateNotes },
    default: '',
    description: "The ID of the booking to update",
    required: true,
  },
  {
    displayName: 'Additional Note',
    name: 'note',
    type: 'string',
    displayOptions: { show: showOnlyForBookingUpdateNotes },
    default: true,
    description: "The checked-in status of the booking",
    required: true,
  },
];
