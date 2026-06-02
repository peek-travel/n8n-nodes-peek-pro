import type { INodeProperties } from 'n8n-workflow';
import {
  actionMembershipCreate,
  actionMembershipGetAll,
  resourceMembership,
} from '../resources.constants';
import { membershipCreateDescription } from './createMembership';

const showOnlyForMemberships = {
  resource: [resourceMembership],
};

export const membershipDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForMemberships,
    },
    options: [
      {
        name: "Get All",
        value: actionMembershipGetAll,
        action: "Get all memberships",
        description: "List all membership variants configured on the account",
        routing: {
          request: {
            method: "GET",
            url: "/memberships",
          },
        },
      },
      {
        name: "Create",
        value: actionMembershipCreate,
        action: "Purchase a membership for a customer",
        description: "Purchase a membership for a customer",
        routing: {
          request: {
            method: "POST",
            url: '=/memberships/create',
            body: {
              membershipVariantId: '={{$parameter["membershipVariantId"]}}',
              email: '={{$parameter["email"]}}',
              importId: '={{$parameter["importId"]}}',
              country: '={{$parameter["additionalFields"]["country"] || undefined}}',
              address: '={{$parameter["additionalFields"]["address"] || undefined}}',
              membershipCode: '={{$parameter["additionalFields"]["membershipCode"] || undefined}}',
              phone: '={{$parameter["additionalFields"]["phone"] || undefined}}',
              customerName: '={{$parameter["additionalFields"]["customerName"] || undefined}}',
            },
          },
        },
      },
    ],
    default: actionMembershipGetAll,
  },
  ...membershipCreateDescription,
];
