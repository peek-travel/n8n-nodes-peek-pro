import type { INodeProperties } from 'n8n-workflow';
import { actionBookingAddAddon, resourceBooking } from '../resources.constants';

const showOnlyForBookingAddAddon = {
  operation: [actionBookingAddAddon],
  resource: [resourceBooking],
};

export const bookingAddAddonDescription: INodeProperties[] = [
  {
    displayName: "Booking ID",
    name: "bookingId",
    type: "string",
    displayOptions: { show: showOnlyForBookingAddAddon },
    default: "",
    description: 'The ID of the booking to add the add-on to (e.g. "b_jgmxry8" or "B-JGMXRY8")',
    required: true,
  },
  {
    displayName: "Add-On ID",
    name: "addonId",
    type: "string",
    displayOptions: { show: showOnlyForBookingAddAddon },
    default: "",
    description: 'The ID of the add-on to attach to the booking',
    required: true,
  },
  {
    displayName: "Quantity",
    name: "quantity",
    type: "string",
    displayOptions: { show: showOnlyForBookingAddAddon },
    default: "1",
    placeholder: "1",
    description: "Quantity of the add-on",
    required: true,
  },
];
