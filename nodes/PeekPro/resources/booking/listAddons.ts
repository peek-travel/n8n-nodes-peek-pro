import type { INodeProperties } from 'n8n-workflow';
import { actionBookingListAddons, resourceBooking } from '../resources.constants';

const showOnlyForBookingListAddons = {
  operation: [actionBookingListAddons],
  resource: [resourceBooking],
};

export const bookingListAddonsDescription: INodeProperties[] = [
  {
    displayName: "Booking ID",
    name: "bookingId",
    type: "string",
    displayOptions: { show: showOnlyForBookingListAddons },
    default: "",
    description: 'The ID of the booking to list add-ons for (e.g. "b_jgmxry8" or "B-JGMXRY8")',
    required: true,
  },
  {
    displayName: "Show Internal",
    name: "showInternal",
    type: "boolean",
    displayOptions: { show: showOnlyForBookingListAddons },
    default: false,
    description:
      "Whether to return the detailed internal add-on model (one entry per item with per-option refids and reservation statuses) instead of the grouped result",
  },
];
