import type { INodeProperties } from 'n8n-workflow';
import { actionBookingRemoveAddon, resourceBooking } from '../resources.constants';

const showOnlyForBookingRemoveAddon = {
  operation: [actionBookingRemoveAddon],
  resource: [resourceBooking],
};

export const bookingRemoveAddonDescription: INodeProperties[] = [
  {
    displayName: "Booking ID",
    name: "bookingId",
    type: "string",
    displayOptions: { show: showOnlyForBookingRemoveAddon },
    default: "",
    description:
      'The ID of the booking to remove the add-on from (e.g. "b_jgmxry8" or "B-JGMXRY8")',
    required: true,
  },
  {
    displayName: "Add-On Option ID",
    name: "addonOptionId",
    type: "string",
    displayOptions: { show: showOnlyForBookingRemoveAddon },
    default: "",
    description:
      'The add-on item option ID to cancel (the "addonOptionId" returned by the List Add-Ons operation)',
    required: true,
  },
  {
    displayName: "Quantity",
    name: "quantity",
    type: "string",
    displayOptions: { show: showOnlyForBookingRemoveAddon },
    default: "1",
    placeholder: "1",
    description: "Number of add-on units to cancel",
    required: true,
  },
];
