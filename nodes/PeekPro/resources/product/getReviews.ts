import type { INodeProperties } from 'n8n-workflow';
import { actionProductGetReviews, resourceProduct } from '../resources.constants';

const showOnlyForProductGetReviews = {
  operation: [actionProductGetReviews],
  resource: [resourceProduct],
};

export const productGetReviewsDescription: INodeProperties[] = [
  {
    displayName: "Product ID",
    name: "productId",
    type: "string",
    displayOptions: { show: showOnlyForProductGetReviews },
    default: "",
    description: "The ID of the product (activity) to fetch reviews for",
    required: true,
  },
  {
    displayName: "Review Count",
    name: "reviewCount",
    type: "number",
    typeOptions: { minValue: 1, maxValue: 50 },
    displayOptions: { show: showOnlyForProductGetReviews },
    default: 50,
    description: "Max number of results to return",
  },
  {
    displayName: "Review Offset",
    name: "reviewOffset",
    type: "number",
    typeOptions: { minValue: 0 },
    displayOptions: { show: showOnlyForProductGetReviews },
    default: 0,
    description: "How many of the newest reviews to skip before collecting",
  },
];
