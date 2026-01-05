import type { Metadata } from 'next';
import { ResetPasswordPage } from '@/views';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your password',
};

export default function ResetPassword() {
  return <ResetPasswordPage />;
}
