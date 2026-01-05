# NextJS Boilerplate

A modern, production-ready Next.js boilerplate with TypeScript, Tailwind CSS, shadcn/ui, and feature-based architecture.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components (Radix UI primitives)
- **Feature-based** component organization with prefix naming
- **react-i18next** for internationalization (EN/UK)
- **TanStack Query** for server state management
- **React Hook Form** with Zod validation
- **Google OAuth** integration
- **ESLint + Prettier** for code quality

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Architecture Principles

**Separation of Concerns:**
- `/app` - Route components (routing, metadata, render view components)
- `/views` - View components (business logic, data fetching, state management)
- `/components` - UI components (reusable, presentational)
- `/layouts` - Layout wireframes (structural templates)
- `/hooks` - Data fetching and state hooks
- `/core` - Infrastructure and providers

## Component Organization

This project uses a **feature-based structure with prefix naming**:

### Rules

1. **3+ related components** → Create folder with prefix name
2. **1-2 components** → Keep in `/components` root
3. **Always use prefixes** → `admin-user-table`, not just `table`
4. **Index exports** → Only export main component from `index.ts`

### Structure Examples

**Grouped components (3+):**
```
components/
└── admin-user/                     # Folder for feature
    ├── admin-user-table.tsx        # Parent component
    ├── admin-user-table-row.tsx    # Child component
    ├── admin-user-table-actions.tsx # Child component
    └── index.ts                    # Only exports AdminUserTable
```

**Standalone components (1-2):**
```
components/
├── user-avatar.tsx
├── loading-spinner.tsx
└── language-switcher.tsx
```

**Form components with validation:**
```
components/forms/
└── form-login/                      # Form with validation
    ├── form-login.tsx               # Form component
    ├── form-login.validation.ts     # Zod schema & types
    └── index.ts                     # Exports both component & validation
```

**View components use forms:**
```tsx
// settings-page.tsx - View uses form component
import { UpdateProfileForm } from '@/components/forms';

export function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateProfileForm />  {/* Form with validation */}
      </CardContent>
    </Card>
  );
}
```

See `/src/components/README.md` for detailed guidelines.

## Internationalization (i18n)

### Usage

```tsx
'use client';

import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('Dashboard')}</h1>
      <p>{t('Welcome to your dashboard')}</p>

      {/* Change language */}
      <button onClick={() => i18n.changeLanguage('uk')}>
        Українська
      </button>
      <button onClick={() => i18n.changeLanguage('en')}>
        English
      </button>
    </div>
  );
}
```

### Supported Languages

- `en` - English (default)
- `uk` - Ukrainian

### Adding New Translations

1. Add translations to `src/i18n/locales/en.json` and `src/i18n/locales/uk.json`
2. Use flat keys with descriptive names:

```json
{
  "Dashboard": "Dashboard",
  "Welcome to your dashboard": "Welcome to your dashboard",
  "Settings": "Settings",
  "Profile": "Profile"
}
```

## TanStack Query

### Usage

```tsx
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useUpdateProfile } from '@/hooks/use-users';
import { LoadingSpinner } from '@/components';

function ProfilePage() {
  const { user } = useAuth();
  const updateProfileMutation = useUpdateProfile();

  const handleUpdate = async (data) => {
    try {
      await updateProfileMutation.mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Welcome, {user.firstName}</h1>
      <button onClick={() => handleUpdate({ firstName: 'John' })}>
        Update Profile
      </button>
    </div>
  );
}
```

### Available Hooks

#### Auth Hooks (`use-auth.ts`)
- `useAuth()` - Get current user and auth state
- `useLogin()` - Login mutation
- `useSignup()` - Signup mutation
- `useGoogleLogin()` - Google OAuth login

#### User Hooks (`use-users.ts`)
- `useUpdateProfile()` - Update current user profile

#### Admin Hooks (`use-admin.ts`)
- `useAdminUsers()` - Fetch all users (admin only)
- `useCreateUser()` - Create new user (admin only)
- `useUpdateUser()` - Update user by ID (admin only)
- `useDeleteUser()` - Delete user by ID (admin only)

## API Client

The project uses **auto-generated API client** from OpenAPI/Swagger specification.

### Generated Client

```tsx
import { api } from '@/lib/api-client';

// All API methods are typed and auto-generated
const response = await api.userControllerFindAll();
const users = response.data;

// With parameters
const user = await api.userControllerFindOne('user-id');

// Mutations
await api.userControllerUpdate('user-id', {
  firstName: 'John',
  lastName: 'Doe'
});
```

## Environment Variables

Create `.env.local`:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Google OAuth (optional)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id

# App Configuration (optional)
NEXT_PUBLIC_APP_NAME=NextJS Boilerplate
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized JavaScript origins: `http://localhost:3000`
6. Copy Client ID to `NEXT_PUBLIC_GOOGLE_CLIENT_ID`

## Scripts

| Script                 | Description |
|------------------------|-------------|
| `npm run dev`          | Start development server (port 3000) |
| `npm run build`        | Build for production |
| `npm start`            | Start production server |
| `npm run lint`         | Run ESLint |
| `npm run codegen`      | Generate API client from Swagger |
| `npm run i18n:extract` | Extract i18n keys from code |

## Tech Stack

### Core
- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [React 18](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety

### Styling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [Radix UI](https://www.radix-ui.com/) - Unstyled accessible primitives
- [Lucide Icons](https://lucide.dev/) - Icon library

### State & Data
- [TanStack Query](https://tanstack.com/query) - Server state management
- [React Hook Form](https://react-hook-form.com/) - Form state management
- [Zod](https://zod.dev/) - Schema validation

### i18n & Auth
- [react-i18next](https://react.i18next.com/) - Internationalization
- [Google OAuth](https://developers.google.com/identity/gsi/web) - Social login

## License

MIT
