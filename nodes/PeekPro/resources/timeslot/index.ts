import type { INodeProperties } from 'n8n-workflow';
import {
  actionTimeslotGetOne,
  actionTimeslotSetAvailability,
  actionTimeslotSetGuide,
  actionTimeslotSetNotes,
  resourceTimeslot,
} from '../resources.constants';
import { timeslotGetDateDescription } from './getRange';
import { timeslotGetDescription } from './getTimeslot';
import { timeslotSetAvailabilityStatus } from './setAvailability';
import { timeslotSetNotes } from './setNotes';
import { timeslotSetGuide } from './setResourceGuide';

const showOnlyForTimeslots = {
  resource: [resourceTimeslot],
};

export const timeslotDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForTimeslots,
    },
    options: [
      {
        name: "Get All for Date",
        value: 'getMany: timeslots',
        action: "Get all timeslots on a date",
        description: "Get all timeslots for a date and product",
        routing: {
          request: {
            method: "GET",
            url: "/timeslots",
            qs: {
              date: '={{$parameter["date"]}}',
              productId: '={{$parameter["productId"]}}',
              filterBookings: '={{$parameter["filterBookings"]}}',
            },
          },
        },
      },
      {
        name: "Get One",
        value: actionTimeslotGetOne,
        action: "Get a timeslot",
        description: "Get the data of a single timeslot",
        routing: {
          request: {
            method: "GET",
            url: '=/timeslots/{{$parameter.timeslotId}}',
          },
        },
      },
      {
        name: "Set Availability Status",
        value: actionTimeslotSetAvailability,
        action: "Set timeslot availability",
        description: "Update the availability of a timeslot",
        routing: {
          request: {
            method: "POST",
            url: '=/timeslots/{{$parameter.timeslotId}}',
            body: {
              status: '={{$parameter["status"]}}',
            },
          },
        },
      },
      {
        name: "Set Notes",
        value: actionTimeslotSetNotes,
        action: "Update the notes of a timeslot",
        description: "Update the notes of a timeslot",
        routing: {
          request: {
            method: "POST",
            url: '=/timeslots/{{$parameter.timeslotId}}',
            body: {
              note: '={{$parameter["note"]}}',
            },
          },
        },
      },
      {
        name: "Set Guide or Resource",
        value: actionTimeslotSetGuide,
        action: "Set a guide to a timeslot",
        description: "Set a guide to a timeslot",
        routing: {
          request: {
            method: "POST",
            url: '=/timeslots/guideAssign',
            body: {
              timeslotIds: '={{$parameter["timeslotIds"].map(e => $evaluateExpression(e)).map(s => s.replace(/^=/, "")) }}',
              guideIds: '={{$parameter["guideOrResourceIds"].map(e => $evaluateExpression(e)).map(s => s.replace(/^=/, "")) }}',
              assignOrUnassign: '={{$parameter["assignOrUnassign"]}}',
            },
          },
        },
      },
    ],
    default: 'getMany: timeslots',
  },
  ...timeslotGetDateDescription,
  ...timeslotGetDescription,
  ...timeslotSetAvailabilityStatus,
  ...timeslotSetNotes,
  ...timeslotSetGuide,
];
