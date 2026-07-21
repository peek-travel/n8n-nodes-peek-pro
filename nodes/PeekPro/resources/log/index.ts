import type { INodeProperties } from 'n8n-workflow';
import { actionLogCreate, resourceLog } from '../resources.constants';
import { logCreateDescription } from './createLog';

const showOnlyForLog = {
  resource: [resourceLog],
};

export const logDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForLog,
    },
    options: [
      {
        name: "Create Log Entry",
        value: actionLogCreate,
        action: "Create a log entry",
        description: "Record a workflow error or info entry in the Autopilot audit log",
        routing: {
          request: {
            method: "POST",
            url: "/logs",
            body: {
              message: '={{$parameter["message"]}}',
              level: '={{$parameter["level"]}}',
              source: '={{$parameter["source"]}}',
            },
          },
        },
      },
    ],
    default: actionLogCreate,
  },
  ...logCreateDescription,
];
