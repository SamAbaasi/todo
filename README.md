# Task Management App

A modern task management application built with React 19, TypeScript, and Vite. Features a clean UI with animations, filtering capabilities, user assignment functionality, and comprehensive task statistics.

## Features

- 📝 Create, edit, and delete tasks
- ✅ Mark tasks as complete/incomplete
- 👥 Assign tasks to users
- 🔍 Search and filter tasks by title, user, and completion status
- 📊 View task statistics (total, completed, pending, completion rate)
- 👤 View user profiles with contact information
- 📄 Pagination for efficient task browsing
- ✨ Smooth animations and transitions
- 📱 Fully responsive design

## Technologies Used

- ⚛️ React 19
- 🦕 TypeScript
- ⚡ Vite (for fast development)
- 💨 Tailwind CSS (for styling)
- ✨ Lucide Icons (for beautiful icons)
- 📦 ESBuild (for optimized builds)

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v9+)

### Installation

1. Clone the repository:
```javascript
git clone https://github.com/samAbaasi/todo.git
```

2. Navigate to the project directory:
```javascript
cd todo
```

3. Install dependencies:
```javascript
npm install
```

4. Start the development server:
```javascript
npm run dev
```

5. Open the app in your browser:
```javascript
http://localhost:5173
```

## Project Structure
```bash
src/
├── types/              # TypeScript type definitions
├── services/           # API service classes
├── hooks/              # Custom React hooks
├── components/
│   ├── ui/             # Reusable UI components
│   └── features/       # Feature-specific components
├── pages/              # Application pages
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
public/                 # Static assets
index.html              # Application entry point
```