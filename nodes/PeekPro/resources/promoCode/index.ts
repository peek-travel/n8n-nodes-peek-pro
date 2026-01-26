import type { INodeProperties } from 'n8n-workflow';
import { actionPromoCodeCreate, resourcePromoCode } from '../resources.constants';
import { promoCodeCreateDescription } from './createPromoCode';

const showOnlyForPromoCode = {
  resource: [resourcePromoCode],
};

export const promoCodeDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForPromoCode,
    },
    options: [
      {
        name: "Get All",
        value: 'getAll: promoCode',
        action: "Get all promo codes",
        description: "Get all promo codes",
        routing: {
          request: {
            method: "GET",
            url: "/promocode",
          },
        },
      },
      {
        name: "Create Promo Code",
        value: actionPromoCodeCreate,
        action: "Create a new promo code",
        description: "Create a new promo code",
        routing: {
          request: {
            method: "POST",
            url: '=/promocode/create',
            body: {
              name: '={{$parameter["name"]}}',
              code: '={{$parameter["code"]}}',
              amount: '={{$parameter["amount"]}}',
              discountType: '={{$parameter["discountType"]}}',
              currency: '={{$parameter["currency"]}}',
            },
          },
        },
      },

    ],
    default: 'getAll: promoCode',
  },
  ...promoCodeCreateDescription,
];
