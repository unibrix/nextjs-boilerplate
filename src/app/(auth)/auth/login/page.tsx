import type { Metadata } from 'next';
import { LoginPage } from '@/views';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
};

export default function Login() {
  return <LoginPage />;
}
