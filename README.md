# n8n-nodes-peek-pro

This is an n8n community node. It lets you use Peek Pro in your n8n workflows.

Peek Pro is a booking and experience management platform that helps businesses manage their tours, activities, and experiences.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This package includes two nodes:

### Peek Pro Node (Regular Actions)
- **Account Operations**: Get current account information
- **User Operations**: Get users, retrieve specific user details
- **Company Operations**: List companies with pagination support

### Peek Pro Trigger Node (Webhook Events)
- **New Booking**: Triggers when a new booking is created
- **Booking Updated**: Triggers when a booking is updated
- **Booking Cancelled**: Triggers when a booking is cancelled
- **All Booking Events**: Triggers on any booking-related event

The trigger node automatically manages webhook subscriptions with the Peek Pro API and processes incoming events in real-time.

## Credentials

To use this node, you need to configure the Peek Pro API credentials:

1. **API Key**: Obtain your API key from your Peek Pro account settings
2. **Authentication Method**: The node uses API key authentication via the `x-api-key` header
3. **Base URL**: The node connects to `https://n8n.peeklabs.com` by default

### Setting up credentials:
1. In n8n, go to **Credentials** → **Create New**
2. Search for "Peek Pro API" and select it
3. Enter your API key in the **API Key** field
4. Click **Save** to store the credentials

The credentials will be automatically tested when saved to ensure they work correctly.

## Compatibility

_State the minimum n8n version, as well as which versions you test against. You can also include any known version incompatibility issues._

## Usage

_This is an optional section. Use it to help users with any difficult or confusing aspects of the node._

_By the time users are looking for community nodes, they probably already know n8n basics. But if you expect new users, you can link to the [Try it out](https://docs.n8n.io/try-it-out/) documentation to help them get started._

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* _Link to app/service documentation._

## Version history

_This is another optional section. If your node has multiple versions, include a short description of available versions and what changed, as well as any compatibility impact._
