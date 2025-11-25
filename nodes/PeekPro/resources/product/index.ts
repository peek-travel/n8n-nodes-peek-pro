import type { INodeProperties } from 'n8n-workflow';
import { actionProductGetAll, actionProductGetOne, resourceProduct } from '../resources.constants';
import { productGetDescription } from './getProduct';

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
        value: actionProductGetAll,
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
    ],
    default: actionProductGetAll,
  },
  ...productGetDescription,
];
