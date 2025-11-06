import type { INodeProperties } from 'n8n-workflow';
import { actionTimeslotSetAvailability, resourceTimeslot } from '../resources.constants';

const showOnlyForSetTimeslotAvailability = {
  operation: [actionTimeslotSetAvailability],
  resource: [resourceTimeslot],
};

export const timeslotSetAvailabilityStatus: INodeProperties[] = [
  {
    displayName: 'Timeslot ID',
    name: 'timeslotId',
    type: 'string',
    displayOptions: { show: showOnlyForSetTimeslotAvailability },
    default: '',
    description: "The ID of the timeslot to update",
    required: true,
  },
  {
    displayName: 'New Check-in Status',
    name: 'checkedIn',
    type: 'options',
    options: [
      {
        name: 'Available',
        value: 'available',
      },
      {
        name: 'Booked out',
        value: 'bookedout',
      },
      {
        name: 'Call to Book',
        value: 'calltobook',
      },
    ],
    displayOptions: { show: showOnlyForSetTimeslotAvailability },
    default: 'available',
    description: "The checked-in status of the booking",
    required: true,
  },
];
