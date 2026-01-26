import type { INodeProperties } from 'n8n-workflow';
import { actionPromoCodeCreate, resourcePromoCode } from '../resources.constants';

const showOnlyForPromoCodeCreate = {
  operation: [actionPromoCodeCreate],
  resource: [resourcePromoCode],
};

export const promoCodeCreateDescription: INodeProperties[] = [
  {
    displayName: "Name",
    name: "name",
    type: "string",
    displayOptions: { show: showOnlyForPromoCodeCreate },
    default: "",
    description: "The name of the promo code",
    required: true,
  },
  {
    displayName: "Redemption Code",
    name: "code",
    type: "string",
    displayOptions: { show: showOnlyForPromoCodeCreate },
    default: "",
    description: "The redemption code of the promo code",
    required: true,
  },
  {
    displayName: "Amount",
    name: "amount",
    type: "string",
    displayOptions: { show: showOnlyForPromoCodeCreate },
    default: "",
    placeholder: '30.0',
    description: "The amount of the promo code",
    required: true,
  },
  {
    displayName: "Discount Type",
    name: "discountType",
    type: "options",
    displayOptions: { show: showOnlyForPromoCodeCreate },
    default: "fixed",
    description: "The type of discount the promo code offers",
    required: true,
    options: [
      {
        name: "Fixed Amount",
        value: "fixed",
      },
      {
        name: "Percentage",
        value: "percent",
      },
    ],
  },
  {
    displayName: "Currency",
    name: "currency",
    type: "string",
    displayOptions: { show: showOnlyForPromoCodeCreate },
    default: "USD",
    placeholder: 'USD',
    description: "The currency of the promo code",
  },
];
