# TinyUrl - React Frontend

A modern, fully-featured URL shortener frontend built with React, TypeScript, and TailwindCSS.

## Features

- **User Authentication** - Register and login with JWT-based authentication
- **URL Shortening** - Create shortened URLs from long links
- **Dashboard** - Overview of all your URLs with statistics
- **URL Management** - View, edit, and delete your shortened URLs
- **Click Analytics** - Track clicks with IP addresses and timestamps
- **QR Code Generation** - Generate QR codes for any shortened URL
- **Copy to Clipboard** - Quick copy functionality for shortened links
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop

## Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Axios** for API requests
- **TailwindCSS** for styling
- **Lucide React** for icons
- **qrcode.react** for QR code generation
- **Vite** for blazing fast development

## Prerequisites

Before running the frontend, ensure you have:

1. **Node.js** (v18 or higher)
2. **Backend API** running (default: `http://localhost:3000`)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
# Copy the example file
cp .env.example .env

# Edit .env and set your backend API URL
VITE_API_BASE_URL=http://localhost:3000
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Toast.tsx
│   ├── QrCodeModal.tsx
│   ├── UrlCard.tsx
│   └── ProtectedRoute.tsx
├── pages/              # Page components
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Dashboard.tsx
│   ├── UrlList.tsx
│   ├── UrlDetails.tsx
│   └── NotFound.tsx
├── services/           # API service layers
│   ├── authService.ts
│   └── urlService.ts
├── types/              # TypeScript type definitions
│   ├── auth.ts
│   └── url.ts
├── hooks/              # Custom React hooks
│   └── useAuth.ts
├── utils/              # Utility functions
│   └── copyToClipboard.ts
├── config/             # Configuration files
│   └── api.ts
├── App.tsx            # Main app component
└── main.tsx           # Application entry point
```

## Routes

- `/` - Home (redirects to dashboard or login)
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Main dashboard with URL creation
- `/urls` - List of all user URLs
- `/urls/:shortCode` - Detailed view with analytics
- `*` - 404 Not Found page

## API Integration

The frontend connects to your Node.js backend API. Configure the base URL in `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### Authentication Flow

1. User registers or logs in
2. JWT token is stored in `localStorage`
3. Token is automatically included in all API requests via Axios interceptor
4. On 401 response, user is redirected to login

### API Endpoints Used

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/urls` - Create short URL
- `GET /api/v1/urls` - Get all user URLs
- `GET /api/v1/urls/:shortCode` - Get URL details
- `PUT /api/v1/urls/:shortCode` - Update URL
- `DELETE /api/v1/urls/:shortCode` - Delete URL
- `GET /api/v1/urls/:shortCode/logs` - Get click analytics

## Features Overview

### Dashboard

- Summary statistics (total URLs, clicks, average)
- Quick URL creation form
- Real-time stats updates

### URL Management

- View all shortened URLs in a card layout
- Copy short URL to clipboard
- Generate and view QR codes
- Edit original URLs
- Delete URLs
- View detailed analytics

### Analytics

- Track total clicks per URL
- View click history with IP addresses
- Timestamp for each click
- Visual presentation of data

### User Experience

- Toast notifications for all actions
- Loading states for async operations
- Error handling with user-friendly messages
- Protected routes requiring authentication
- Responsive design for all screen sizes

## Development

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

### Building for Production

```bash
npm run build
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
