import type { Metadata } from 'next';
import { ForgotPasswordPage } from '@/views';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password',
};

export default function ForgotPassword() {
  return <ForgotPasswordPage />;
}
