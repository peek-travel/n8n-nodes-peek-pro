import type { INodeProperties } from 'n8n-workflow';
import { actionTimeslotSetGuide, resourceTimeslot } from '../resources.constants';

const showOnlyForSetTimeslotGuide = {
  operation: [actionTimeslotSetGuide],
  resource: [resourceTimeslot],
};

export const timeslotSetGuide: INodeProperties[] = [
  {
    displayName: "Timeslot ID",
    name: "timeslotId",
    type: "string",
    displayOptions: { show: showOnlyForSetTimeslotGuide },
    default: "",
    description: "The ID of the timeslot to update",
    required: true,
  },
  {
    displayName: "Guide ID",
    name: "guideId",
    type: "string",
    displayOptions: { show: showOnlyForSetTimeslotGuide },
    default: "",
    description: "The ID of the guide to assign to the timeslot",
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
        name: "Assign",
        value: "assign",
      },
      {
        name: "Unassign",
        value: "unassign",
      },
    ],
  },
];
