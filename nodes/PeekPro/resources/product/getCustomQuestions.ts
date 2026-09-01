import type { INodeProperties } from 'n8n-workflow';
import { actionProductGetCustomQuestions, resourceProduct } from '../resources.constants';

const showOnlyForProductGetCustomQuestions = {
  operation: [actionProductGetCustomQuestions],
  resource: [resourceProduct],
};

export const productGetCustomQuestionsDescription: INodeProperties[] = [
  {
    displayName: "Product ID",
    name: "productId",
    type: "string",
    displayOptions: { show: showOnlyForProductGetCustomQuestions },
    default: "",
    description: "The ID of the product (activity) to fetch custom questions for",
    required: true,
  },
];
