import type { INodeProperties } from 'n8n-workflow';
import { actionBookingUpdateNotes, resourceBooking } from '../resources.constants';

const showOnlyForBookingUpdateNotes = {
  operation: [actionBookingUpdateNotes],
  resource: [resourceBooking],
};

export const bookingUpdateNotesDescription: INodeProperties[] = [
  {
    displayName: "Booking ID",
    name: "bookingId",
    type: "string",
    displayOptions: { show: showOnlyForBookingUpdateNotes },
    default: "",
    description: "The ID of the booking to update",
    required: true,
  },
  {
    displayName: "Note",
    name: "note",
    type: "string",
    displayOptions: { show: showOnlyForBookingUpdateNotes },
    default: "",
    description: "The additional note to add to the booking.",
    required: true,
  },
  {
    displayName: "Add or Overwrite",
    name: "appendOrOverwrite",
    type: "options",
    displayOptions: { show: showOnlyForBookingUpdateNotes },
    default: "append",
    description: "Whether to add the note to the existing notes or overwrite them.",
    required: true,
    options: [
      {
        name: "Add (Recommended)",
        value: "append",
      },
      {
        name: "Overwrite (Strongly Not Recommended)",
        value: "overwrite",
      },
    ],
  },
];
