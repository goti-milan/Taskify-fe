# Taskify - Task Management Application

A modern, feature-rich task management application built with React, TypeScript, and Tailwind CSS. Taskify helps you organize, track, and manage your tasks efficiently with a clean and intuitive interface.

![Taskify Preview](./public/vite.svg)

## Features

### Core Functionality

- **Task Management**: Create, read, update, and delete tasks
- **Task Filtering**: Filter tasks by status (all, active, completed)
- **Pagination**: Navigate through large sets of tasks with pagination controls
- **Dark/Light Mode**: Toggle between light and dark themes for comfortable viewing

### User Experience

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modal Forms**: Easy-to-use modal forms for creating and editing tasks
- **Protected Routes**: Secure access to authenticated routes
- **Real-time Feedback**: Toast notifications for user actions

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **Context API**: Efficient state management for auth, theme, and task filters
- **Modular Architecture**: Clean separation of concerns with components, layouts, and utilities

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router (implied by protected routes and page structure)
- **API Integration**: REST API with Axios (or similar)

## Project Structure

```
Taskify-fe/
├── public/                 # Static assets
├── src/
│   ├── api/               # API integration modules
│   │   ├── api.ts         # Base API configuration
│   │   ├── auth.api.ts    # Authentication endpoints
│   │   └── task.api.ts    # Task management endpoints
│   ├── components/        # Reusable UI components
│   │   ├── CenterButton.tsx
│   │   ├── FilterSummary.tsx
│   │   ├── Footer.tsx
│   │   ├── FormField.tsx
│   │   ├── Header.tsx
│   │   ├── Modal.tsx
│   │   ├── Pagination.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskFilter.tsx
│   │   ├── TaskForm.tsx
│   │   └── ThemeToggle.tsx
│   ├── context/           # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── FilterContext.tsx
│   │   ├── TaskModalContext.tsx
│   │   └── ThemeContext.tsx
│   ├── layouts/           # Page layout components
│   │   ├── AuthLayout.tsx
│   │   ├── Layout.tsx
│   │   └── MobileLayout.tsx
│   ├── pages/             # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Tasks.tsx
│   ├── utils/             # Utility functions
│   │   └── functions.tsx
│   ├── App.tsx            # Main application component
│   ├── index.css          # Global styles
│   └── main.tsx           # Application entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A running Taskify backend API

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Taskify-fe
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## API Integration

The application integrates with the Taskify backend API. Key endpoints:

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Tasks

- `GET /api/tasks` - Get all tasks (with pagination & filters)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Context Providers

- **AuthContext**: Manages authentication state and user data
- **ThemeContext**: Handles dark/light theme switching
- **FilterContext**: Manages task filter preferences
- **TaskModalContext**: Controls task form modal state

## Components Overview

| Component        | Description                              |
| ---------------- | ---------------------------------------- |
| `Header`         | Main navigation header with theme toggle |
| `TaskCard`       | Displays individual task information     |
| `TaskFilter`     | Filter controls for task list            |
| `TaskForm`       | Form for creating/editing tasks          |
| `Pagination`     | Navigation controls for task list        |
| `Modal`          | Reusable modal dialog component          |
| `ThemeToggle`    | Dark/light mode switch                   |
| `ProtectedRoute` | Route guard for authenticated users      |

## Development

### Code Style

The project uses ESLint for code quality. Run linting with:

```bash
npm run lint
```

### Type Safety

All components and functions are written in TypeScript with strict type checking enabled.

## Deployment

1. Build the production version:

```bash
npm run build
```

2. The output will be in the `dist` directory, ready for deployment.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
