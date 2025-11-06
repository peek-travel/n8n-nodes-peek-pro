import type { INodeProperties } from 'n8n-workflow';
import { actionProductGetOne, resourceProduct } from '../resources.constants';

const showOnlyForProductGetOne = {
  operation: [actionProductGetOne],
  resource: [resourceProduct],
};

export const productGetDescription: INodeProperties[] = [
  {
    displayName: 'Product ID',
    name: 'productId',
    type: 'string',
    displayOptions: { show: showOnlyForProductGetOne },
    default: '',
    description: "The ID of the product to retrieve",
    required: true,
  },
];
