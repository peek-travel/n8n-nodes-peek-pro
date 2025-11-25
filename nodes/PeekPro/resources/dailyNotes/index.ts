import type { INodeProperties } from 'n8n-workflow';
import { actionDailyNoteGetToday,  actionDailyNoteSetToday,  resourceDailyNote } from '../resources.constants';
import { dailyNoteSetNotes } from './setNote';

const showOnlyForDailyNote = {
  resource: [resourceDailyNote],
};

export const dailyNoteDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForDailyNote,
    },
    options: [
      {
        name: 'Get Today\'s Daily Note',
        value: actionDailyNoteGetToday,
        action: 'Get today\'s Daily Note',
        description: 'Get today\'s Daily Note',
        routing: {
          request: {
            method: 'GET',
            url: '/dailyNote/today',
          },
        },
      },
      {
        name: 'Update Today\'s Daily Note',
        value: actionDailyNoteSetToday,
        action: 'Update today\'s Daily Note',
        description: 'Update today\'s Daily Note',
        routing: {
          request: {
            method: 'POST',
            url: '/dailyNote/today',
            body: {
              note: '={{$parameter["note"]}}',
            },
          },
        },
      },

    ],
    default: actionDailyNoteGetToday,
  },
  ...dailyNoteSetNotes,
];
