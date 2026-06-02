import type { INodeProperties } from 'n8n-workflow';
import { actionMembershipCreate, resourceMembership } from '../resources.constants';

const showOnlyForMembershipCreate = {
  operation: [actionMembershipCreate],
  resource: [resourceMembership],
};

export const membershipCreateDescription: INodeProperties[] = [
  {
    displayName: "Membership Variant ID",
    name: "membershipVariantId",
    type: "string",
    displayOptions: { show: showOnlyForMembershipCreate },
    default: "",
    description: "The membershipVariantId from List Memberships",
    required: true,
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    placeholder: 'name@email.com',
    displayOptions: { show: showOnlyForMembershipCreate },
    default: "",
    description: "The customer email. Must be a valid email format.",
    required: true,
  },
  {
    displayName: "Import ID",
    name: "importId",
    type: "string",
    displayOptions: { show: showOnlyForMembershipCreate },
    default: "",
    description: "Idempotency key — a stable, unique ID for this purchase derived from the source record (e.g. the upstream order/customer ID). Re-sending the same Import ID will not create a second membership.",
    required: true,
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    displayOptions: { show: showOnlyForMembershipCreate },
    default: {},
    options: [
      {
        displayName: "Address",
        name: "address",
        type: "string",
        default: "",
        description: "The customer's formatted address",
      },
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "",
        placeholder: 'US',
        description: "The 2 letter country code of the customer (e.g. 'US' for the United States)",
      },
      {
        displayName: "Customer Name",
        name: "customerName",
        type: "string",
        default: "",
        description: "The customer's name",
      },
      {
        displayName: "Membership Redemption Code",
        name: "membershipCode",
        type: "string",
        default: "",
        description: "The desired code used by the customer",
      },
      {
        displayName: "Phone",
        name: "phone",
        type: "string",
        placeholder: '+14155555555',
        default: "",
        description: "The customer's formatted phone number (e.g. +14155555555)",
      },
    ],
  },
];
