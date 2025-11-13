import type { INodeProperties } from 'n8n-workflow';
import { actionTimeslotGetOne, actionTimeslotGetRange, actionTimeslotSetAvailability, actionTimeslotSetNotes, resourceTimeslot } from '../resources.constants';
import { timeslotGetRangeDescription } from './getRange';
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
        name: 'Get All for Time Range',
        value: actionTimeslotGetRange,
        action: 'Get all timeslots within time range',
        description: 'Get all timeslots within a given time range',
        routing: {
          request: {
            method: 'GET',
            url: '/users',
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
            url: '=/users/{{$parameter.userId}}',
          },
        },
      },
      {
        name: 'Set Availability',
        value: actionTimeslotSetAvailability,
        action: 'Set timeslot availability',
        description: 'Update the availability of a timeslot',
        routing: {
          request: {
            method: 'GET',
            url: '=/users/{{$parameter.userId}}',
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
    default: actionTimeslotGetRange,
  },
  ...timeslotGetRangeDescription,
  ...timeslotGetDescription,
  ...timeslotSetAvailabilityStatus,
  ...timeslotSetNotes,
];
