import * as React from 'react';
import { cn } from '../../lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex min-h-12 w-full rounded-[var(--geraldo-radius-box-inner)] border-2 border-input bg-background px-geraldo-4 py-geraldo-3 text-base text-foreground transition-colors',
        'placeholder:text-muted-foreground',
        'hover:border-[var(--geraldo-color-neutral-400)]',
        'focus-visible:border-[var(--geraldo-color-info-400)] focus-visible:outline-none focus-visible:shadow-[var(--geraldo-focus-ring)]',
        'disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
