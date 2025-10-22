# n8n-nodes-peek-pro Architecture

## Overview

This is an n8n community node package that provides integration with the Peek Pro API. The node allows users to build workflows with Peek Pro services, enabling automation and data exchange with the Peek Pro platform. The implementation uses n8n's modern declarative routing system for clean, maintainable API integrations.

## Project Structure

```
n8n-nodes-peek-pro/
├── constants/                 # Shared constants and configuration
│   └── peekPro.constants.ts  # API base URL and default headers
├── credentials/               # Authentication configuration
│   └── PeekProApi.credentials.ts  # API key authentication setup
├── nodes/                     # Main node implementation
│   ├── PeekPro/              # Regular action node
│   │   ├── PeekPro.node.ts   # Main node class and execution logic
│   │   ├── PeekPro.node.json # Node metadata and categorization
│   │   ├── peekPro.svg       # Light theme icon
│   │   ├── peekPro.dark.svg  # Dark theme icon
│   │   └── resources/        # Resource-specific operations
│   │       ├── account/      # Account-related operations
│   │       │   └── index.ts  # Account operation definitions
│   │       ├── company/      # Company-related operations
│   │       │   ├── index.ts  # Company operation definitions
│   │       │   └── getAll.ts # Get companies implementation
│   │       └── user/         # User-related operations
│   │           ├── index.ts  # User operation definitions
│   │           ├── get.ts    # Get single user implementation
│   │           └── create.ts # Create user implementation
│   └── PeekProTrigger/       # Trigger node for webhooks
│       ├── PeekProTrigger.node.ts   # Trigger node implementation
│       ├── PeekProTrigger.node.json # Trigger node metadata
│       ├── peekPro.svg       # Light theme icon
│       └── peekPro.dark.svg  # Dark theme icon
├── dist/                     # Compiled TypeScript output
├── package.json              # Node package configuration
├── tsconfig.json            # TypeScript configuration
└── eslint.config.mjs        # ESLint configuration
```

## Core Components

### 1. Main Node Class (`PeekPro.node.ts`)

The primary node implementation that:
- Extends the n8n `INodeType` interface
- Defines node metadata (name, description, icon, etc.)
- Uses n8n's declarative routing system (no custom execute method)
- Supports resource-based operations for users and companies
- Uses API key authentication via the `peekProApi` credential

**Key Features:**
- Base URL: `https://n8n.peeklabs.com` (production)
- Authentication: API key via `x-api-key` header
- Resource-based architecture with Account, User and Company operations
- Declarative routing for automatic request handling
- Usable as a tool in n8n workflows

### 2. Trigger Node Class (`PeekProTrigger.node.ts`)

The trigger node implementation that:
- Extends the n8n `ITriggerNode` interface
- Manages webhook subscriptions with the Peek Pro API
- Handles incoming webhook events for real-time notifications
- Supports multiple event types (booking.created, booking.updated, etc.)
- Uses API key authentication via the `peekProApi` credential

**Key Features:**
- Webhook-based real-time event processing
- Automatic webhook subscription management (create, check, delete)
- Support for multiple booking event types
- SSL verification options
- Raw data inclusion options
- Proper error handling and cleanup

### 3. Authentication (`PeekProApi.credentials.ts`)

Implements API key-based authentication:
- Credential type: `peekProApi`
- Authentication method: Header-based (`x-api-key`)
- Includes credential testing via `/ping` endpoint
- Secure password field for API key storage

### 4. Resource Operations

The node is designed with a modular resource-based architecture:

#### Account Operations (`resources/account/`)
- **Get Current**: Retrieve current account information via `GET /account/current`
- No parameters required - returns authenticated user's account details
- Simple endpoint for account verification and basic account data

#### Company Operations (`resources/company/`)
- **Get Many**: Retrieve multiple companies via `GET /companies`
- Supports pagination with limit/offset parameters
- Configurable result limits (1-100, default: 50)
- Option to return all results with automatic pagination

#### User Operations (`resources/user/`)
- **Get Many**: Retrieve multiple users via `GET /users`
- **Get Single**: Retrieve specific user via `GET /users/{userId}`
- Parameterized operations with declarative routing configuration
- User ID parameter for single user retrieval

### 5. Constants (`peekPro.constants.ts`)

Centralized configuration:
- `PEEK_PRO_BASE_URL`: API base URL (currently localhost:5002)
- `DEFAULT_HEADERS`: Standard JSON headers for API requests

## Technical Architecture

### n8n Integration

The node follows n8n's community node standards:
- **API Version**: 1
- **Node Version**: 1.0
- **Categories**: Development, Developer Tools
- **Inputs/Outputs**: Single main input/output
- **Credentials**: Required API key authentication

### Declarative Routing System

The node uses n8n's modern declarative routing approach:
- **No Custom Execute Method**: Relies on n8n's built-in request handling
- **Routing Configuration**: Each operation defines its HTTP method, URL, and parameters
- **Automatic Request Processing**: n8n handles authentication, request building, and response processing
- **Parameter Mapping**: URL parameters and query strings are automatically constructed from user inputs
- **Response Handling**: JSON responses are automatically parsed and returned as workflow data

### TypeScript Configuration

- **Target**: ES2019
- **Module System**: CommonJS
- **Strict Mode**: Enabled
- **Output**: Compiled to `dist/` directory
- **Source Maps**: Generated for debugging

### Build System

- **CLI Tool**: `@n8n/node-cli` for development and building
- **Scripts**:
  - `build`: Compile TypeScript to JavaScript
  - `dev`: Start development server
  - `lint`: Code quality checks
  - `release`: Package for distribution

## Current Implementation Status

### Implemented Features
- ✅ Basic node structure and metadata
- ✅ API key authentication
- ✅ Resource-based architecture (Account, User and Company)
- ✅ Declarative routing system
- ✅ Account operations (Get Current)
- ✅ User operations (Get Many, Get Single)
- ✅ Company operations (Get Many with pagination)
- ✅ Trigger node for webhook-based events
- ✅ Webhook subscription management (create, check, delete)
- ✅ Support for booking events (created, updated, cancelled)
- ✅ TypeScript compilation and build system

### Development Status
The package now includes both regular and trigger nodes:
- **Regular Node**: Resource-based operations are active and configured
- **Trigger Node**: Webhook-based event handling for real-time notifications
- Uses n8n's declarative routing for automatic request handling
- No custom execute method needed for regular node - relies on n8n's built-in routing
- Trigger node implements full webhook lifecycle management
- Ready for testing with actual API endpoints
- README still contains placeholder content for documentation

## API Integration

### Base Configuration
- **Protocol**: HTTPS
- **Host**: n8n.peeklabs.com (production)
- **Authentication**: API key in `x-api-key` header
- **Content Type**: JSON

### Endpoints

#### Regular Node Endpoints
- `GET /ping` - Connectivity test (used for credential validation)
- `GET /accounts/current` - Get current account information
- `GET /companies` - List companies with pagination support
- `GET /users` - List users
- `GET /users/{id}` - Get specific user by ID

#### Trigger Node Endpoints
- `POST /webhooks` - Create a new webhook subscription
- `GET /webhooks/{id}` - Check if webhook subscription exists
- `DELETE /webhooks/{id}` - Delete webhook subscription
- `POST /webhook` - Webhook endpoint for receiving events (n8n-generated URL)

## Development Workflow

### Local Development
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Reset environment: `./hard_n8n_reset.sh` (clears cache and restarts)

### Build Process
1. TypeScript compilation: `tsc`
2. Output to `dist/` directory
3. Package for n8n consumption

### Quality Assurance
- ESLint for code quality
- TypeScript strict mode for type safety
- n8n CLI tools for validation

## Future Considerations

### Scalability
- Resource operations can be easily extended
- Modular structure supports additional API endpoints
- Authentication system can be enhanced for different auth methods

### Production Readiness
- Base URL needs to be configurable for production environments
- Error handling should be enhanced
- Comprehensive testing should be implemented
- Documentation needs completion

### Extension Points
- Additional resources (projects, tasks, etc.)
- Additional webhook event types beyond bookings
- Batch operations for bulk data processing
- Advanced filtering and search capabilities
- Webhook retry mechanisms and error handling
- Custom webhook authentication methods
