import type { INodeProperties } from 'n8n-workflow';
import {
  actionTimeslotGetOne,
  actionTimeslotGetDate,
  actionTimeslotSetAvailability,
  actionTimeslotSetNotes,
  resourceTimeslot,
} from '../resources.constants';
import { timeslotGetDateDescription } from './getRange';
import { timeslotGetDescription } from './getTimeslot';
import { timeslotSetAvailabilityStatus } from './setAvailability';
import { timeslotSetNotes } from './setNotes';

const showOnlyForTimeslots = {
  resource: [resourceTimeslot],
};

export const timeslotDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForTimeslots,
    },
    options: [
      {
        name: 'Get All for Date',
        value: actionTimeslotGetDate,
        action: 'Get all timeslots on a date',
        description: 'Get all timeslots for a date and product',
        routing: {
          request: {
            method: 'GET',
            url: '/timeslots',
            qs: {
              date: '={{$parameter["date"]}}',
              productId: '={{$parameter["productId"]}}',
              filterBookings: '={{$parameter["filterBookings"]}}',
            },
          },
        },
      },
      {
        name: 'Get One',
        value: actionTimeslotGetOne,
        action: 'Get a timeslot',
        description: 'Get the data of a single timeslot',
        routing: {
          request: {
            method: 'GET',
            url: '=/timeslots/{{$parameter.timeslotId}}',
          },
        },
      },
      {
        name: 'Set Availability Status',
        value: actionTimeslotSetAvailability,
        action: 'Set timeslot availability',
        description: 'Update the availability of a timeslot',
        routing: {
          request: {
            method: 'POST',
            url: '=/timeslots/{{$parameter.timeslotId}}',
          },
        },
      },
      {
        name: 'Set Notes',
        value: actionTimeslotSetNotes,
        action: 'Update the notes of a timeslot',
        description: 'Update the notes of a timeslot',
        routing: {
          request: {
            method: 'GET',
            url: '=/users/{{$parameter.userId}}',
          },
        },
      },
    ],
    default: actionTimeslotGetDate,
  },
  ...timeslotGetDateDescription,
  ...timeslotGetDescription,
  ...timeslotSetAvailabilityStatus,
  ...timeslotSetNotes,
];
