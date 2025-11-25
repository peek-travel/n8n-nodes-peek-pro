import type { INodeProperties } from 'n8n-workflow';
import { actionDailyNoteSetToday,  resourceDailyNote } from '../resources.constants';
import { dailyNoteSetNotes } from './setNote';

const showOnlyForDailyNote = {
  resource: [resourceDailyNote],
};

export const dailyNoteDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForDailyNote,
    },
    options: [
      {
        name: "Get Today's Daily Note",
        value: 'get: daily note',
        action: 'Get daily note for today',
        routing: {
          request: {
            method: "GET",
            url: "/dailyNote/today",
          },
        },
      },
      {
        name: "Update Today's Daily Note",
        value: actionDailyNoteSetToday,
        action: 'Update daily note for today',
        routing: {
          request: {
            method: "POST",
            url: "/dailyNote/today",
            body: {
              note: '={{$parameter["note"]}}',
            },
          },
        },
      },

    ],
    default: 'get: daily note',
  },
  ...dailyNoteSetNotes,
];
