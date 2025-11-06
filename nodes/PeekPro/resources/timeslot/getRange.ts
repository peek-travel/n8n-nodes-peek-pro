import type { INodeProperties } from 'n8n-workflow';
import { actionTimeslotGetRange, resourceTimeslot } from '../resources.constants';

const showOnlyForTimeslotGetRange = {
  operation: [actionTimeslotGetRange],
  resource: [resourceTimeslot],
};

export const timeslotGetRangeDescription: INodeProperties[] = [
  {
    displayName: "Range Starts At",
    name: 'startDate',
    type: 'dateTime',
    displayOptions: { show: showOnlyForTimeslotGetRange },
    default: '',
    description: "The date to start retrieving timeslots from",
    required: true,
  },
  {
    displayName: "Range Ends At",
    name: 'endDate',
    type: 'dateTime',
    displayOptions: { show: showOnlyForTimeslotGetRange },
    default: '',
    description: "The date to end retrieving timeslots from",
    required: true,
  },
  {
    displayName: 'Product ID',
    name: 'productId',
    type: 'string',
    displayOptions: { show: showOnlyForTimeslotGetRange },
    default: '',
    description: "The ID of the product for which to find timeslots",
  },
];
