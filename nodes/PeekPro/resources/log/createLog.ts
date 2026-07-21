import type { INodeProperties } from 'n8n-workflow';
import { actionLogCreate, resourceLog } from '../resources.constants';

const showOnlyForLogCreate = {
  operation: [actionLogCreate],
  resource: [resourceLog],
};

export const logCreateDescription: INodeProperties[] = [
  {
    displayName: "Message",
    name: "message",
    type: "string",
    displayOptions: { show: showOnlyForLogCreate },
    default: "",
    description: "The log text to record (trimmed, capped at 2000 characters)",
    required: true,
  },
  {
    displayName: "Level",
    name: "level",
    type: "options",
    displayOptions: { show: showOnlyForLogCreate },
    options: [
      { name: "Error", value: "error" },
      { name: "Info", value: "info" },
    ],
    default: "info",
    description: "Severity of the log entry",
  },
  {
    displayName: "Source",
    name: "source",
    type: "string",
    displayOptions: { show: showOnlyForLogCreate },
    default: "",
    description:
      "Workflow name or identifier shown as the entry's resource ID (capped at 200 characters)",
  },
];
