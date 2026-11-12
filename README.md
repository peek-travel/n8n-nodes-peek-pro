# n8n-nodes-peek-pro

An n8n community node that allows interacting with the Peek Pro booking software.

## Installation

In your n8n instance:

1. Go to Settings → Community Nodes.
2. Add the following package: `n8n-nodes-peek-pro`

## Credentials

This node requires an API key.
Peek Pro customers can obtain their API key from the Peek Pro n8n app.

To configure it in n8n:

1. Go to Credentials → New
2. Select Peek Pro API
3. Enter your API key
4. Save

## Features

This package supports:

- Webhook-style triggers for new or updated bookings
- Notification triggers for signed waivers
- Pulling booking information
- Accessing back-office calendar data
- Retrieving guest information

## Usage

1. Add a Peek Pro node to your workflow
2. Select an operation such as booking retrieval or event subscription
3. Choose or create your Peek Pro API credentials
4. Configure the required fields
5. Execute the node to verify everything is working

## Trigger event signatures

The Peek Pro Trigger node accepts only signed events.

- When the workflow is activated, the node registers its webhook and stores the signing secret that Peek Pro returns. n8n keeps the secret in the workflow static data, so a workflow export includes it.
- Each POST must have an `X-Peek-Timestamp` header and an `X-Peek-Signature` header (`v1=` + hex HMAC-SHA256 of `<timestamp>.<raw body>`).
- The node returns HTTP 401 and does not start the workflow when the signature is missing or wrong, when the timestamp is more than 5 minutes old, or when the same request comes a second time to the same n8n process.
- A workflow that was activated with an older version registers its webhook again on the next activation.

## Requirements

- Available for all current Peek Pro customers
- API key is available via the Peek Pro n8n app

## License

MIT
