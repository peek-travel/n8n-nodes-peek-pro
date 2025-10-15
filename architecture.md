# n8n-nodes-peek-pro Architecture

## Overview

This is an n8n community node package that provides integration with the Peek Pro API. The node allows users to interact with Peek Pro services within their n8n workflows, enabling automation and data exchange with the Peek Pro platform.

## Project Structure

```
n8n-nodes-peek-pro/
├── constants/                 # Shared constants and configuration
│   └── peekPro.constants.ts  # API base URL and default headers
├── credentials/               # Authentication configuration
│   └── PeekProApi.credentials.ts  # API key authentication setup
├── nodes/                     # Main node implementation
│   └── PeekPro/
│       ├── PeekPro.node.ts   # Main node class and execution logic
│       ├── PeekPro.node.json # Node metadata and categorization
│       ├── peekPro.svg       # Light theme icon
│       ├── peekPro.dark.svg  # Dark theme icon
│       └── resources/        # Resource-specific operations
│           ├── company/      # Company-related operations
│           │   ├── index.ts  # Company operation definitions
│           │   └── getAll.ts # Get companies implementation
│           └── user/         # User-related operations
│               ├── index.ts  # User operation definitions
│               ├── get.ts    # Get single user implementation
│               └── create.ts # Create user implementation
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
- Implements the main `execute()` method
- Currently supports a basic "ping" operation for connectivity testing
- Uses API key authentication via the `peekProApi` credential

**Key Features:**
- Base URL: `http://127.0.0.1:5002` (local development)
- Authentication: API key via `x-api-key` header
- Default operation: Ping endpoint for connectivity testing
- Usable as a tool in n8n workflows

### 2. Authentication (`PeekProApi.credentials.ts`)

Implements API key-based authentication:
- Credential type: `peekProApi`
- Authentication method: Header-based (`x-api-key`)
- Includes credential testing via `/ping` endpoint
- Secure password field for API key storage

### 3. Resource Operations

The node is designed with a modular resource-based architecture:

#### Company Operations (`resources/company/`)
- **Get Many**: Retrieve multiple companies via `GET /companies`
- Supports pagination with limit/offset parameters
- Configurable result limits (1-100, default: 50)
- Option to return all results with automatic pagination

#### User Operations (`resources/user/`)
- **Get Many**: Retrieve multiple users via `GET /users`
- **Get Single**: Retrieve specific user via `GET /users/{userId}`
- **Create**: Create new user via `POST /users`
- Parameterized operations with proper routing configuration

### 4. Constants (`peekPro.constants.ts`)

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
- ✅ Ping operation for connectivity testing
- ✅ Resource structure for users and companies
- ✅ TypeScript compilation and build system

### Partially Implemented
- ⚠️ User and company operations (defined but commented out)
- ⚠️ Resource-based operation routing

### Development Status
The node appears to be in early development:
- Main operations are commented out in the node definition
- Only ping operation is currently active
- README contains placeholder content
- Local development URL suggests testing environment

## API Integration

### Base Configuration
- **Protocol**: HTTP
- **Host**: 127.0.0.1:5002 (local development)
- **Authentication**: API key in `x-api-key` header
- **Content Type**: JSON

### Endpoints
- `GET /ping` - Connectivity test
- `GET /companies` - List companies (planned)
- `GET /users` - List users (planned)
- `GET /users/{id}` - Get specific user (planned)
- `POST /users` - Create user (planned)

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
- Webhook support for real-time updates
- Batch operations for bulk data processing
- Advanced filtering and search capabilities
