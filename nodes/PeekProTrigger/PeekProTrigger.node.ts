import type {
	IHookFunctions,
	IWebhookFunctions,
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError, NodeOperationError } from 'n8n-workflow';
import { PEEK_PRO_BASE_URL, DEFAULT_HEADERS, NGROK_FOR_LOCAL_WEBHOOK } from '../../constants/peekPro.constants';

export class PeekProTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Peek Pro Trigger',
		name: 'peekProTrigger',
		icon: { light: 'file:peekPro.svg', dark: 'file:peekPro.dark.svg' },
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].length ? $parameter["events"].join(", ") : "No events selected"}}',
		description: 'Starts the workflow when Peek Pro events occur (e.g., new bookings)',
		defaults: {
			name: 'Peek Pro Trigger',
		},
		usableAsTool: true,
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'peekProApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'On booking created',
						value: 'booking.created',
						description: 'Trigger when a new booking is created',
					},
					{
						name: 'On booking cancelled',
						value: 'booking.cancelled',
						description: 'Trigger when a booking is cancelled',
					},
					{
						name: 'On booking rescheduled',
						value: 'booking.rescheduled',
						description: 'Trigger when a booking is rescheduled',
					},
					{
						name: 'On booking checked in',
						value: 'booking.checked_in',
						description: 'Trigger when a booking is checked in',
					},
					{
						name: 'On any booking change',
						value: 'booking.updated',
						description: 'Trigger when a booking is created or updated',
					},
					{
						name: 'On waiver signed (coming soon)',
						value: 'waiver.created',
						description: 'Trigger when a waiver is signed',
					},
					{
						name: 'On data push from Focus App (coming soon)',
						value: 'focus.data',
						description: 'Trigger when Peek Pro Focus app pushes data to n8n app',
					},
					{
						name: 'On data push from Peek Pro backend (coming soon)',
						value: 'backend.data',
						description: 'Trigger when Peek Pro Focus app pushes data to n8n app',
					},
				],
				default: ['booking.created'],
				required: true,
				description: 'The events that should trigger the workflow',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId === undefined) {
					return false;
				}

				try {
					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'peekProApi',
						{
							method: 'GET',
							url: `${PEEK_PRO_BASE_URL}/webhooks/${webhookData.webhookId}`,
							headers: DEFAULT_HEADERS,
							json: true,
						},
					);

					// Check if webhook still exists and is active
					return response && response.active === true;
				} catch {
					// If webhook doesn't exist, clean up the stored ID
					delete webhookData.webhookId;
					return false;
				}
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				let webhookUrl = this.getNodeWebhookUrl('default') as string;
				const events = this.getNodeParameter('events') as string[];
				const options = this.getNodeParameter('options') as IDataObject;

				// FIXME: add back in
				// // Validate webhook URL
				// if (webhookUrl.includes('//localhost') || webhookUrl.includes('//127.0.0.1')) {
				// 	throw new NodeOperationError(
				// 		this.getNode(),
				// 		'The webhook cannot work with localhost URLs. Please use a public URL that Peek Pro can reach.',
				// 	);
				// }

				// Replace 127.0.0:1:<port> with NGROK_FOR_LOCAL_WEBHOOK
				webhookUrl = webhookUrl.replace(
					'http://localhost:5678',
					NGROK_FOR_LOCAL_WEBHOOK,
				);

				console.log('webhookUrl', webhookUrl);

				// Prepare webhook subscription payload
				const body: IDataObject = {
					url: webhookUrl,
					eventTypes: events,
					active: true,
					description: `n8n workflow webhook for events: ${events.join(', ')}`,
				};

				// Add SSL verification option if specified
				if (options.verifySSL === false) {
					body.verify_ssl = false;
				}

				let responseData;
				try {
					responseData = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'peekProApi',
						{
							method: 'POST',
							body,
							url: `${PEEK_PRO_BASE_URL}/webhooks`,
							headers: DEFAULT_HEADERS,
							json: true,
						},
					);
				} catch (error) {
					// Handle specific error cases
					if (error.httpCode === 409) {
						throw new NodeOperationError(
							this.getNode(),
							'A webhook with this URL already exists. Please use a different webhook URL or delete the existing webhook.',
							{ level: 'warning' },
						);
					}

					throw new NodeOperationError(
						this.getNode(),
						`Failed to create webhook: ${error.message}`,
						{ level: 'warning' },
					);
				}

				// Validate response
				if (!responseData?.id) {
					throw new NodeApiError(this.getNode(), responseData as JsonObject, {
						message: 'Webhook creation response did not contain the expected webhook ID.',
					});
				}

				// Store webhook ID for future reference
				webhookData.webhookId = responseData.id as string;
				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId !== undefined) {
					try {
						await this.helpers.httpRequestWithAuthentication.call(
							this,
							'peekProApi',
							{
								method: 'DELETE',
								url: `${PEEK_PRO_BASE_URL}/webhooks/${webhookData.webhookId}`,
								headers: DEFAULT_HEADERS,
								json: true,
							},
						);
					} catch (error) {
						// Log error but don't fail - webhook might already be deleted
						this.logger?.warn(`Failed to delete webhook: ${error.message}`);
						return false;
					}

					// Clean up stored webhook ID
					delete webhookData.webhookId;
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const bodyData = this.getBodyData();
		const headerData = this.getHeaderData();
		const queryData = this.getQueryData();
		const httpMethod = req.method?.toUpperCase() || 'POST';
		const options = this.getNodeParameter('options') as IDataObject;

		// Handle GET requests (webhook verification)
		if (httpMethod === 'GET') {
			// Some webhook systems send verification challenges via GET
			if (queryData && typeof queryData === 'object' && 'challenge' in queryData) {
				return {
					webhookResponse: queryData.challenge as string,
				};
			}

			// Health check response
			return {
				webhookResponse: JSON.stringify({
					status: 'healthy',
					message: 'Peek Pro webhook endpoint is active',
					timestamp: new Date().toISOString(),
				}),
			};
		}

		// Handle POST requests (actual webhook events)
		if (httpMethod === 'POST') {
			// Validate that we have data
			if (!bodyData || (typeof bodyData === 'object' && Object.keys(bodyData).length === 0)) {
				return { webhookResponse: 'OK' };
			}

			// Prepare return data
			const returnData: IDataObject[] = [];
			const eventData: IDataObject = {
				event: bodyData,
				headers: headerData,
				query: queryData,
				timestamp: new Date().toISOString(),
			};

			// Include raw data if requested
			if (options.includeRawData) {
				eventData.raw = {
					body: bodyData,
					headers: headerData,
					query: queryData,
					method: httpMethod,
				};
			}

			returnData.push(eventData);

			return {
				workflowData: [this.helpers.returnJsonArray(returnData)],
			};
		}

		// Unsupported method
		return {
			webhookResponse: JSON.stringify({
				error: 'Method not allowed',
				message: `HTTP method ${httpMethod} is not supported`,
				supportedMethods: ['GET', 'POST'],
			}),
		};
	}
}
