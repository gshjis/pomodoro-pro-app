# 🍅 Pomodoro Frontend

A modern, responsive frontend for the Pomodoro task management application built with React, TypeScript, and Tailwind CSS.

## Features

- 🎯 **Pomodoro Timer** - 25-minute focus sessions with break intervals
- 📝 **Task Management** - Create, edit, delete, and organize tasks
- 🎨 **Beautiful UI** - Tomato-red themed design with smooth animations
- 🔐 **Authentication** - Secure login and registration
- 📱 **Responsive** - Works perfectly on all devices
- ⚡ **Fast** - Built with Vite for optimal performance

## Quick Start

### Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your backend URL
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Frontend: `http://localhost:8080`
   - Your backend should be running on `http://localhost:8000`

### Docker Setup

#### Option 1: Frontend Only
```bash
# Build and run frontend container
docker build -t pomodoro-frontend .
docker run -p 8080:8080 -e VITE_API_URL=http://localhost:8000 pomodoro-frontend
```

#### Option 2: Full Stack with Docker Compose
```bash
# Update docker-compose.yml with your backend image
# Then run:
docker-compose up --build
```

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication forms
│   ├── tasks/           # Task management components
│   ├── timer/           # Pomodoro timer component
│   └── ui/              # shadcn/ui components
├── pages/               # Route pages
├── lib/                 # Utilities and API client
├── hooks/               # Custom React hooks
└── index.css           # Design system & global styles
```

## API Integration

The frontend integrates with your FastAPI backend through:

- **Authentication**: Login, register, token refresh
- **Tasks**: CRUD operations for task management
- **Categories**: Task categorization
- **Real-time**: Timer state management

### API Configuration

Update the `VITE_API_URL` environment variable to point to your backend:

```env
# Development
VITE_API_URL=http://localhost:8000

# Production
VITE_API_URL=https://your-backend-domain.com
```

## Design System

The app uses a comprehensive design system with:

- **Colors**: Tomato red primary, success green, warning yellow
- **Typography**: Clean, readable fonts optimized for productivity
- **Animations**: Smooth transitions and timer pulse effects
- **Shadows**: Subtle depth with glow effects for interactive elements

All colors and styles are defined in `src/index.css` and `tailwind.config.ts`.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000` |

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Backend Requirements

This frontend expects your FastAPI backend to provide:

### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login  
- `POST /auth/refresh` - Token refresh

### Task Endpoints
- `GET /tasks` - Get user's tasks
- `POST /tasks` - Create new task
- `PATCH /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task

### Response Formats
See the API documentation in your FastAPI backend at `/docs`

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Docker Production
```bash
docker build -t pomodoro-frontend .
docker run -p 8080:8080 pomodoro-frontend
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own applications.