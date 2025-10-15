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
- Uses n8n's declarative routing system (no custom execute method)
- Supports resource-based operations for users and companies
- Uses API key authentication via the `peekProApi` credential

**Key Features:**
- Base URL: `http://127.0.0.1:5002` (local development)
- Authentication: API key via `x-api-key` header
- Resource-based architecture with User and Company operations
- Declarative routing for automatic request handling
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
- Parameterized operations with declarative routing configuration
- User ID parameter for single user retrieval

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
- ✅ Resource-based architecture (User and Company)
- ✅ Declarative routing system
- ✅ User operations (Get Many, Get Single)
- ✅ Company operations (Get Many with pagination)
- ✅ TypeScript compilation and build system

### Development Status
The node is now functionally implemented:
- Resource-based operations are active and configured
- Uses n8n's declarative routing for automatic request handling
- No custom execute method needed - relies on n8n's built-in routing
- Ready for testing with actual API endpoints
- README still contains placeholder content for documentation

## API Integration

### Base Configuration
- **Protocol**: HTTP
- **Host**: 127.0.0.1:5002 (local development)
- **Authentication**: API key in `x-api-key` header
- **Content Type**: JSON

### Endpoints
- `GET /ping` - Connectivity test (used for credential validation)
- `GET /companies` - List companies with pagination support
- `GET /users` - List users
- `GET /users/{id}` - Get specific user by ID

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
