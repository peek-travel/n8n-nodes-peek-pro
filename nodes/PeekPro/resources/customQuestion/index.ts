import type { INodeProperties } from 'n8n-workflow';
import { actionCustomQuestionGetAll, resourceCustomQuestion } from '../resources.constants';

const showOnlyForCustomQuestions = {
  resource: [resourceCustomQuestion],
};

export const customQuestionDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: showOnlyForCustomQuestions,
    },
    options: [
      {
        name: "Get All",
        value: actionCustomQuestionGetAll,
        action: "Get all custom questions",
        description: "Get all custom questions defined on the connected account",
        routing: {
          request: {
            method: "GET",
            url: "/custom-questions",
          },
        },
      },
    ],
    default: actionCustomQuestionGetAll,
  }
];
