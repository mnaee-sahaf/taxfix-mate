# TaxFix Mate

A modern web application built with React, TypeScript, and Supabase, featuring a comprehensive UI component library and robust development tools.

## 🚀 Tech Stack

### Core Technologies
- **React 18** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and development server
- **Supabase** - Backend as a Service (BaaS)

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI
- **Radix UI** - Unstyled, accessible components
- **Lucide React** - Icon library

### State Management & Data Fetching
- **React Query (TanStack Query)** - Data fetching and caching
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Additional Features
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **jsPDF** - PDF generation
- **Canvas Confetti** - Celebration effects
- **Sonner** - Toast notifications

## 📁 Project Structure

src/
├── components/ # Reusable UI components
├── contexts/ # React context providers
├── docs/ # Documentation
├── hooks/ # Custom React hooks
├── integrations/ # Third-party integrations
├── lib/ # Utility functions and configurations
├── pages/ # Route components
└── utils/ # Helper functions



## 🛠️ Development Setup

1. **Prerequisites**
   - Node.js (Latest LTS version recommended)
   - npm or bun package manager

2. **Installation**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Development Server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. **Build**
   ```bash
   npm run build
   # or
   bun run build
   ```

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration

## 📦 Key Dependencies

### Production Dependencies
- `@supabase/supabase-js` - Supabase client
- `@tanstack/react-query` - Data fetching
- `react-router-dom` - Routing
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `recharts` - Charts
- `jspdf` - PDF generation

### Development Dependencies
- `typescript` - TypeScript support
- `tailwindcss` - CSS framework
- `eslint` - Code linting
- `@vitejs/plugin-react-swc` - Vite React plugin

## 🎨 UI Components

The project uses shadcn/ui components, which are built on top of Radix UI primitives. Available components include:
- Accordion
- Alert Dialog
- Avatar
- Checkbox
- Dialog
- Dropdown Menu
- Navigation Menu
- Toast
- And many more...

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🧪 Testing

- T0DO - 
Cypress UI tests and Unit tests will be implemented 

## 📚 Documentation


# TaxFix Technical Documentation

## Table of Contents
1. [Application Overview](#application-overview)
2. [Project Structure](#project-structure)
3. [Authentication Flow](#authentication-flow)
4. [Data Storage](#data-storage)
5. [State Management](#state-management)
6. [Form Handling](#form-handling)
7. [Tax Filing Process](#tax-filing-process)
8. [PDF Generation](#pdf-generation)
9. [UI Component System](#ui-component-system)
10. [Routing](#routing)
11. [Database Schema](#database-schema)

## Application Overview

TaxFix is a web application designed to help users file their taxes. The application provides a step-by-step tax filing process, dashboard visualization of tax data, and PDF generation for completed tax forms. It uses React for the frontend, Supabase for the backend, and Tailwind CSS with Shadcn UI for styling.

## Project Structure

The application follows a component-based architecture with the following main directories:

```
src/
├── components/         # Reusable UI components
│   ├── auth/           # Authentication-related components
│   ├── dashboard/      # Dashboard-related components
│   ├── layout/         # Layout components (navbar, footer)
│   ├── tax-filing/     # Tax filing form components
│   └── ui/             # UI components from shadcn/ui
├── contexts/           # React contexts for global state
├── hooks/              # Custom React hooks
│   └── tax-form/       # Tax form related hooks
├── integrations/       # External service integrations
│   └── supabase/       # Supabase integration
├── lib/                # Utility libraries
├── pages/              # Page components
└── utils/              # Utility functions
    └── pdf/            # PDF generation utilities
```

## Authentication Flow

The application uses Supabase Auth for authentication. The authentication flow is managed by the `AuthContext` in `src/contexts/AuthContext.tsx`.

### Key Components:
- `AuthProvider`: Wraps the application and provides authentication state
- `useAuth`: Custom hook to access authentication state
- `ProtectedRoute`: Component that restricts access to authenticated users
- `AuthCallback`: Handles OAuth callback redirects
- `UserProfileMenu`: Displays user information and logout option

### Authentication State Variables:
- `session`: The current Supabase session object
- `user`: The current authenticated user
- `loading`: Boolean indicating if authentication is being checked
- `isAuthenticated`: Boolean indicating if user is authenticated
- `signOut`: Function to sign out the user

## Data Storage

### Supabase Database
The application uses Supabase as its backend service. Two primary tables are used:

1. **profiles**:
   - `id`: UUID (linked to auth.users)
   - `name`: Text
   - `cnic`: Text
   - `taxpayer_category`: Text
   - `residency_status`: Text
   - `created_at`: Timestamp
   - `updated_at`: Timestamp

2. **tax_filings**:
   - `id`: UUID
   - `user_id`: UUID (linked to auth.users)
   - `form_data`: JSONB (stores the entire tax form data)
   - `status`: Text ('draft' or 'submitted')
   - `created_at`: Timestamp
   - `updated_at`: Timestamp

### LocalStorage
The application also uses localStorage for various purposes:

- `taxFilingProgress`: Stores draft tax filing data
- `dashboardCache`: Caches dashboard data

## State Management

### React Context
The application uses React Context for global state management:

- `AuthContext`: Manages authentication state

### React Hooks
Custom hooks are used for component-level state management:

- `useTaxForm`: Manages tax form data and navigation
- `useDashboardData`: Fetches and manages dashboard data
- `useIncomeData`: Transforms tax filing data into chart format

## Form Handling

The tax filing form is divided into multiple steps, each represented by a component. Form state is managed by a combination of React hooks:

### Form State Management:
- `useFormData`: Manages form data and tracks changes
- `useFormNavigation`: Handles step navigation
- `useFormPersistence`: Handles saving and loading form data
- `useFormSubmission`: Handles form submission

### Form Data Structure:
The tax form data is structured according to the `TaxFormData` interface in `src/components/tax-filing/types.ts`. Key data points include:

- Personal information (name, CNIC)
- Residency status
- Income sources and amounts
- Expenses and deductions
- Assets and their values
- Withholding taxes

## Tax Filing Process

The tax filing process is divided into steps defined in `constants.ts`:

1. **Identification**: Collect personal information
2. **Residency**: Determine residency status
3. **Income**: Collect income sources and amounts
4. **Deductions**: Collect eligible deductions
5. **Expenses**: Collect expense information
6. **Assets**: Collect asset information
7. **Withholding**: Collect withholding tax information
8. **Review**: Review all information and submit

### Tax Calculation:
Tax calculation is performed in `utils/taxCalculation.ts` and returns:
- `calculatedTax`: The calculated tax amount
- `paidTax`: Tax already paid
- `balanceDue`: Remaining tax to pay
- `totalIncome`: Total income from all sources

## PDF Generation

The application generates PDF tax returns using the `jspdf` library. PDF generation is handled in `utils/pdfGenerator.ts`.

The PDF includes:
- Personal information
- Income breakdown
- Expenses and deductions
- Assets
- Tax calculation summary

## UI Component System

The application uses Shadcn UI, a collection of reusable components built on top of Tailwind CSS and Radix UI.

Key UI components:
- `Button`: For actions
- `Card`: For content containers
- `Tabs`: For tabbed navigation
- `Dialog`: For modals
- `Toast`: For notifications

## Routing

The application uses React Router for client-side routing. Routes are defined in `App.tsx`:

- `/`: Home page
- `/auth`: Authentication page
- `/auth/callback`: OAuth callback
- `/dashboard`: User dashboard (protected)
- `/filing`: Tax filing form (protected)
- `/calculator`: Tax calculator
- `/profile`: User profile (protected)

## Database Schema

### Supabase Tables:

#### profiles
```sql
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  name text,
  cnic text,
  taxpayer_category text,
  residency_status text
);
```

#### tax_filings
```sql
create table public.tax_filings (
  id uuid default gen_random_uuid() not null primary key,
  user_id uuid not null,
  form_data jsonb not null,
  status text default 'draft' not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);
```

### Row Level Security (RLS) Policies:
Both tables have Row Level Security enabled to ensure users can only access their own data.

### Database Triggers:
A trigger on `auth.users` inserts a new row into `profiles` when a user signs up.

## Conclusion

This documentation provides a high-level overview of the TaxFix application architecture and implementation details. For more specific information, refer to the code and comments in the respective files.


## �� Contributing

Currently this app is maintained purely by (myself) Muneeb Sahaf 

## 📄 License

TBD
