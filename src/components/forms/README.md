# Forms Directory

This directory contains form components with their validation schemas colocated together.

## Structure

Each form is organized in its own directory with validation:

```
forms/
├── form-login/
│   ├── form-login.tsx               # Form component
│   ├── form-login.validation.ts     # Zod schema & types
│   └── index.ts                     # Exports component & validation
├── form-register/
│   ├── form-register.tsx
│   ├── form-register.validation.ts
│   └── index.ts
└── index.ts                         # Central export for all forms
```

## Benefits of Colocation

1. **Single responsibility** - Each form directory contains everything related to that form
2. **Easy to find** - Validation is always next to the component that uses it
3. **Better maintainability** - Changes to validation logic are close to the UI
4. **Reusability** - Both component and validation can be imported separately if needed

## Example

### Form Component (`form-login/form-login.tsx`)

```tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from './form-login.validation';

export function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    // Submit logic...
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>{/* Form fields */}</form>
  );
}
```

### Validation Schema (`form-login/form-login.validation.ts`)

```tsx
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;
```

### Index Export (`form-login/index.ts`)

```tsx
export { LoginForm } from './form-login';
export { loginSchema, type LoginInput } from './form-login.validation';
```

## Usage

### Import form component only:

```tsx
import { LoginForm } from '@/components/forms';
```

### Import both component and validation:

```tsx
import {
  LoginForm,
  loginSchema,
  type LoginInput,
} from '@/components/forms/form-login';
```

### Use validation separately (e.g., in tests):

```tsx
import { loginSchema } from '@/components/forms/form-login';

const result = loginSchema.safeParse({
  email: 'test@example.com',
  password: '123456',
});
```

## Available Forms

- **form-login** - User login form
- **form-register** - User registration form
- **form-forgot-password** - Forgot password form
- **form-reset-password** - Reset password form
- **form-update-profile** - Update user profile form (used in Settings page)
- **form-admin-create-user** - Admin create user form
- **form-admin-update-user** - Admin update user form

## Forms vs Views

**Forms** contain:

- Form UI components
- Validation schemas (Zod)
- Form submission logic
- Field-level state management

**Views** (pages) should:

- Import and use form components
- Handle page-level layout
- Manage page-level state (if needed)
- NOT contain validation logic

Example:

```tsx
// ❌ Bad - validation in view
export function SettingsPage() {
  const schema = z.object({ ... });  // Don't do this!
  const form = useForm({ ... });
  return <form>...</form>;
}

// ✅ Good - use form component
export function SettingsPage() {
  return (
    <Card>
      <UpdateProfileForm />  {/* Form has validation */}
    </Card>
  );
}
```
