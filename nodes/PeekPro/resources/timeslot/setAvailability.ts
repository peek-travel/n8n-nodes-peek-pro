import type { INodeProperties } from 'n8n-workflow';
import { actionTimeslotSetAvailability, resourceTimeslot } from '../resources.constants';

const showOnlyForSetTimeslotAvailability = {
  operation: [actionTimeslotSetAvailability],
  resource: [resourceTimeslot],
};

export const timeslotSetAvailabilityStatus: INodeProperties[] = [
  {
    displayName: "Timeslot ID",
    name: "timeslotId",
    type: "string",
    displayOptions: { show: showOnlyForSetTimeslotAvailability },
    default: "",
    description: "The ID of the timeslot to update",
    required: true,
  },
  {
    displayName: "New Availability Status",
    name: "status",
    type: "options",
    options: [
      {
        name: "Available",
        value: "BOOKABLE",
      },
      {
        name: 'Booked Out',
        value: "BLOCKED",
      },
      {
        name: "Call to Book",
        value: "CALL_TO_BOOK",
      },
    ],
    displayOptions: { show: showOnlyForSetTimeslotAvailability },
    default: "BOOKABLE",
    description: "The availability status of the timeslot",
    required: true,
  },
];
