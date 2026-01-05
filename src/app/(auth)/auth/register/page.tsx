import type { Metadata } from 'next';
import { RegisterPage } from '@/views';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a new account',
};

export default function Register() {
  return <RegisterPage />;
}
