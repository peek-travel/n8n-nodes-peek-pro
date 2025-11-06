import type { INodeProperties } from 'n8n-workflow';
import { actionTimeslotGetOne, resourceTimeslot } from '../resources.constants';

const showOnlyForTimeslotGet = {
  operation: [actionTimeslotGetOne],
  resource: [resourceTimeslot],
};

export const timeslotGetDescription: INodeProperties[] = [
  {
    displayName: 'Timeslot ID',
    name: 'timeslotId',
    type: 'string',
    displayOptions: { show: showOnlyForTimeslotGet },
    default: '',
    description: "The ID of the timeslot to retrieve",
    required: true,
  },
];
