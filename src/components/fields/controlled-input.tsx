'use client';

import { type InputHTMLAttributes } from 'react';
import {
  useFormContext,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { Input, Label } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ControlledInputProps<T extends FieldValues> extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name'
> {
  name: FieldPath<T>;
  label?: string;
  hint?: string;
}

export function ControlledInput<T extends FieldValues>({
  name,
  label,
  hint,
  className,
  ...props
}: ControlledInputProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={name} className={error ? 'text-destructive' : ''}>
          {label}
        </Label>
      )}
      <Input
        id={name}
        {...register(name)}
        {...props}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${name}-error` : hint ? `${name}-hint` : undefined
        }
        className={
          error ? 'border-destructive focus-visible:ring-destructive' : ''
        }
      />
      {errorMessage && (
        <p id={`${name}-error`} className="text-sm text-destructive">
          {errorMessage}
        </p>
      )}
      {!errorMessage && hint && (
        <p id={`${name}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}
