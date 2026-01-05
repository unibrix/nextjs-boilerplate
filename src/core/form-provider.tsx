'use client';

import { type ComponentProps } from 'react';
import {
  FormProvider as RHFFormProvider,
  type UseFormReturn,
  type FieldValues,
  type SubmitHandler,
} from 'react-hook-form';

import { cn } from '@/lib/utils';

interface FormProps<T extends FieldValues> extends Omit<
  ComponentProps<'form'>,
  'onSubmit'
> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

export function FormProvider<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...props
}: FormProps<T>) {
  return (
    <RHFFormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-4', className)}
        {...props}
      >
        {children}
      </form>
    </RHFFormProvider>
  );
}

// Alias for backwards compatibility
export { FormProvider as Form };
