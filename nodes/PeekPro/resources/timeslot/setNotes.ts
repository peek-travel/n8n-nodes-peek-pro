import type { INodeProperties } from 'n8n-workflow';
import { actionTimeslotSetNotes, resourceTimeslot } from '../resources.constants';

const showOnlyForSetTimeslotNotes = {
  operation: [actionTimeslotSetNotes],
  resource: [resourceTimeslot],
};

export const timeslotSetNotes: INodeProperties[] = [
  {
    displayName: "Timeslot ID",
    name: "timeslotId",
    type: "string",
    displayOptions: { show: showOnlyForSetTimeslotNotes },
    default: "",
    description: "The ID of the timeslot to update",
    required: true,
  },
  {
    displayName: "New Note",
    name: "note",
    type: "string",
    displayOptions: { show: showOnlyForSetTimeslotNotes },
    default: "",
    description: "The new notes of the timeslot",
    required: true,
  },
];
