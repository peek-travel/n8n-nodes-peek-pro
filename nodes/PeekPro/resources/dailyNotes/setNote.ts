import type { INodeProperties } from 'n8n-workflow';
import { actionDailyNoteSetToday, resourceDailyNote } from '../resources.constants';

const showOnlyForSetDailyNote = {
  operation: [actionDailyNoteSetToday],
  resource: [resourceDailyNote],
};

export const dailyNoteSetNotes: INodeProperties[] = [
  {
    displayName: "New Note for Today",
    name: "note",
    type: "string",
    displayOptions: { show: showOnlyForSetDailyNote },
    default: "",
    description: "Today's new daily note on the dashboard",
    required: true,
  },
];
