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

## Requirements

- Available for all current Peek Pro customers
- API key is available via the Peek Pro n8n app

## License

MIT
