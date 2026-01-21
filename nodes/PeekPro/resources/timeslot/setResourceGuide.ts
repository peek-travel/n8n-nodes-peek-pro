import type { INodeProperties } from 'n8n-workflow';
import { actionTimeslotSetGuide, resourceTimeslot } from '../resources.constants';

const showOnlyForSetTimeslotGuide = {
  operation: [actionTimeslotSetGuide],
  resource: [resourceTimeslot],
};

export const timeslotSetGuide: INodeProperties[] = [
  {
    displayName: "Timeslot ID",
    name: "timeslotIds",
    type: "string",
    typeOptions: {
      multipleValues: true,
    },
    displayOptions: { show: showOnlyForSetTimeslotGuide },
    default: [],
    description: "The IDs of the timeslots to update",
    required: true,
  },
  {
    displayName: "Guide or Resource ID",
    name: "guideOrResourceIds",
    type: "string",
    typeOptions: {
      multipleValues: true,
    },
    default: [],
    displayOptions: { show: showOnlyForSetTimeslotGuide },
    description: "The ID of the guide or resource to assign to the timeslot",
    required: true,
  },
  {
    displayName: "Assign or Unassign Guide",
    name: "assignOrUnassign",
    type: "options",
    displayOptions: { show: showOnlyForSetTimeslotGuide },
    default: "assign",
    description: 'Whether to assign the guide to the timeslot or unassign them',
    required: true,
    options: [
      {
        name: "Assign to Timeslots",
        value: "assign",
      },
      {
        name: "Remove From Timeslots",
        value: "unassign",
      },
    ],
  },
];
