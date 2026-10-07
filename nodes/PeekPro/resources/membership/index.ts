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
              country: '={{ $parameter["additionalFields"]["country"] ? String($evaluateExpression($parameter["additionalFields"]["country"])).replace(/^=/, "") : undefined }}',
              address: '={{ $parameter["additionalFields"]["address"] ? String($evaluateExpression($parameter["additionalFields"]["address"])).replace(/^=/, "") : undefined }}',
              membershipCode: '={{ $parameter["additionalFields"]["membershipCode"] ? String($evaluateExpression($parameter["additionalFields"]["membershipCode"])).replace(/^=/, "") : undefined }}',
              phone: '={{ $parameter["additionalFields"]["phone"] ? String($evaluateExpression($parameter["additionalFields"]["phone"])).replace(/^=/, "") : undefined }}',
              customerName: '={{ $parameter["additionalFields"]["customerName"] ? String($evaluateExpression($parameter["additionalFields"]["customerName"])).replace(/^=/, "") : undefined }}',
            },
          },
        },
      },
    ],
    default: actionMembershipGetAll,
  },
  ...membershipCreateDescription,
];
