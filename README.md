# Finance Dashboard

## Overview
This project is a modern, clean, and interactive Finance Dashboard Built with React, Vite, TypeScript, and Tailwind CSS. It focuses on providing a clean, responsive, and interactive user interface for managing transactions, visualizing financial data, and providing role-based features. 

The application utilizes mock data and local state management to simulate a full application lifecycle without backend dependency.

## Features
- **Interactive UI**: A polished, modern interface with smooth animations and dynamic data visualizations.
- **Transaction Management**: Search, filter, sort, and manage transactions directly in the table.
- **Role-based Access Control**: Simulated Admin and Viewer roles which dictate UI features and capabilities.
- **Responsive Layout**: Designed for optimal viewing across desktop, tablet, and mobile devices.
- **Configurable Settings**: A customizable settings panel synced seamlessly throughout the application.

## Additional Features

- Multi-page navigation (Dashboard, Transactions, Analytics, Settings)
- Notification system with dropdown panel
- Add/Edit transaction modal with real-time UI updates
- Reset Demo functionality to restore initial state
- Smart Insights panel with dynamic observations
- Collapsible sidebar with responsive behavior
- Toast notifications for user feedback

## Mapping to Assignment Requirements 

### Dashboard Overview
- Implemented summary cards: Total Balance, Income, Expenses
- Time-based chart: Balance & Cash Flow trend
- Categorical chart: Spending Breakdown (Donut chart)

### Transactions Section
- Displays transactions with date, amount, category, type
- Includes search, filtering, and sorting functionality

### Role-Based UI
- Viewer: can only view data
- Admin: can add, edit, and delete transactions
- Role switching implemented via UI

### Insights Section
- Highest spending category
- Cash flow insights
- Category-based observations

### State Management
- Managed using React Context API and LocalStorage combined with local React component state
- Seamlessly handles transactions, filters, role, and UI state across reloads

### UI/UX
- Clean, responsive, modern design 
- Gracefully handles empty states and edge cases

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Recharts (for charts)
- Lucide Icons (for scalable vector graphics)

## Project Structure

```text
src/
├── assets/          # Static assets
├── components/      # Reusable UI components (Sidebar, Tables, Charts, Modals)
├── context/         # React Context for global state (Auth, Transactions)
├── data/            # Mock dataset representing DB
├── utils/           # Utility functions (filtering, sorting, formatting)
├── App.tsx          # Main application layout structure
├── main.tsx         # Entry point bridging React to DOM
├── types.ts         # Global TypeScript interfaces
└── index.css        # Global stylesheet and Tailwind configs
```

## Setup Instructions
To get this project running locally on your computer, follow these simple steps:

1. **Prerequisites**
   - Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

2. **Installation**
   - Clone the repository and navigate into the project directory:
     ```bash
     git clone https://github.com/shiv-xm/FinDash.git
     cd FinDash
     ```
   - Install all project dependencies via npm:
     ```bash
     npm install
     ```

3. **Running the Application**
   - Start the local development server:
     ```bash
     npm run dev
     ```
   - Open your browser and navigate to the URL provided in your terminal (typically `http://localhost:5173`).

4. **Building for Production**
   - To build the project for production, run:
     ```bash
     npm run build
     ```
