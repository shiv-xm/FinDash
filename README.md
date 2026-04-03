# Finance Dashboard

## Overview
This project is an enterprise-grade Finance Dashboard Built with React, Vite, TypeScript, and Tailwind CSS. It focuses on providing a clean, responsive, and interactive user interface for managing transactions, visualizing financial data, and providing role-based features. 

The application utilizes mock data and local state management to simulate a full application lifecycle without backend dependency.

## Features
- **Interactive UI**: A polished, modern interface with smooth animations and dynamic data visualizations.
- **Transaction Management**: Search, filter, sort, and manage transactions directly in the table.
- **Role-based Access Control**: Simulated Admin and Viewer roles which dictate UI features and capabilities.
- **Responsive Layout**: Designed for optimal viewing across desktop, tablet, and mobile devices.
- **Configurable Settings**: A customizable settings panel synced seamlessly throughout the application.

## Setup Instructions
To get this project running locally on your computer, follow these simple steps:

1. **Prerequisites**
   - Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

2. **Installation**
   - Navigate to the project directory in your terminal:
     ```bash
     cd Zz
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

## How This Project Meets Assignment Requirements

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
- Clean, responsive, enterprise-grade design 
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
