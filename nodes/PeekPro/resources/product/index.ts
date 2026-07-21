import type { INodeProperties } from 'n8n-workflow';
import {
  actionProductGetOne,
  actionProductGetReviews,
  resourceProduct,
} from '../resources.constants';
import { productGetDescription } from './getProduct';
import { productGetReviewsDescription } from './getReviews';

const showOnlyForProducts = {
  resource: [resourceProduct],
};

export const productDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForProducts,
    },
    options: [
      {
        name: "Get All",
        value: 'getAll: products',
        action: "Get all products",
        description: "Get all products",
        routing: {
          request: {
            method: "GET",
            url: "/products",
          },
        },
      },
      {
        name: "Get One",
        value: actionProductGetOne,
        action: "Get the data of a product",
        description: "Get the data of a single product",
        routing: {
          request: {
            method: "GET",
            url: '=/products/{{$parameter.productId}}',
          },
        },
      },
      {
        name: "Get All Reviews",
        value: actionProductGetReviews,
        action: "Get all reviews for a product",
        description: "Get customer reviews for a product, newest first",
        routing: {
          request: {
            method: "GET",
            url: '=/products/{{$parameter.productId}}/reviews',
            qs: {
              reviewCount: '={{$parameter["reviewCount"]}}',
              reviewOffset: '={{$parameter["reviewOffset"]}}',
            },
          },
        },
      },
    ],
    default: 'getAll: products',
  },
  ...productGetDescription,
  ...productGetReviewsDescription,
];
