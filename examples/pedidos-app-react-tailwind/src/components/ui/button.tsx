import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-geraldo-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:shadow-[var(--geraldo-focus-ring)] disabled:pointer-events-none disabled:opacity-55 [&_svg]:pointer-events-none [&_svg]:size-[18px] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        filled: '',
        outline: 'border-2 bg-transparent',
        ghost: 'border-2 border-transparent bg-transparent',
      },
      color: {
        primary: '',
        secondary: '',
        danger: '',
      },
      size: {
        sm: 'min-h-9 rounded-md px-geraldo-4 text-sm',
        md: 'min-h-11 rounded-full px-geraldo-5 text-base',
        lg: 'min-h-[52px] rounded-full px-geraldo-7 text-base',
      },
    },
    compoundVariants: [
      {
        variant: 'filled',
        color: 'primary',
        class:
          'border-transparent bg-primary text-[var(--geraldo-color-neutral-0)] shadow-md hover:bg-[var(--geraldo-color-primary-600)]',
      },
      {
        variant: 'filled',
        color: 'secondary',
        class:
          'border-transparent bg-secondary text-[var(--geraldo-color-neutral-0)] shadow-md hover:bg-[var(--geraldo-color-secondary-600)]',
      },
      {
        variant: 'filled',
        color: 'danger',
        class:
          'border-transparent bg-destructive text-destructive-foreground shadow-md hover:bg-[var(--geraldo-color-danger-600)]',
      },
      {
        variant: 'outline',
        color: 'primary',
        class:
          'border-primary text-[var(--geraldo-color-primary-600)] hover:bg-[var(--geraldo-color-primary-bg)]',
      },
      {
        variant: 'outline',
        color: 'secondary',
        class:
          'border-secondary text-[var(--geraldo-color-secondary-600)] hover:bg-[var(--geraldo-color-secondary-bg)]',
      },
      {
        variant: 'outline',
        color: 'danger',
        class:
          'border-destructive text-[var(--geraldo-color-danger-600)] hover:bg-[var(--geraldo-color-danger-bg)]',
      },
      {
        variant: 'ghost',
        color: 'primary',
        class: 'text-primary hover:bg-muted',
      },
      {
        variant: 'ghost',
        color: 'secondary',
        class: 'text-secondary hover:bg-muted',
      },
      {
        variant: 'ghost',
        color: 'danger',
        class: 'text-destructive hover:bg-muted',
      },
    ],
    defaultVariants: {
      variant: 'filled',
      color: 'primary',
      size: 'md',
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, size, asChild = false, type = 'button', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, color, size, className }))}
        ref={ref}
        type={asChild ? undefined : type}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
