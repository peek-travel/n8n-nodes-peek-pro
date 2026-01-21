import type { INodeProperties } from 'n8n-workflow';
import { resourceReseller } from '../resources.constants';

const showOnlyForResellers = {
  resource: [resourceReseller],
};

export const resellerDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForResellers,
    },
    options: [
      {
        name: "Get All",
        value: 'getAll: reseller',
        action: "Get all resellers",
        description: "Get all resellers",
        routing: {
          request: {
            method: "GET",
            url: "/reseller",
          },
        },
      },
    ],
    default: 'getAll: reseller',
  }
];
