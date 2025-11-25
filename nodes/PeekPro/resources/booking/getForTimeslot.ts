import type { INodeProperties } from 'n8n-workflow';
import { actionBookingGetTimeslot, resourceBooking } from '../resources.constants';

const showOnlyForBookingGetTimeslot = {
  operation: [actionBookingGetTimeslot],
  resource: [resourceBooking],
};

export const bookingGetTimeslotDescription: INodeProperties[] = [
  {
    displayName: "Timeslot ID",
    name: "timeslotId",
    type: "string",
    displayOptions: { show: showOnlyForBookingGetTimeslot },
    default: "",
    description: "The ID of the timeslot for which to find bookings",
  },
];
