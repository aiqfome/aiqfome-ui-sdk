import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-geraldo-2 rounded-[var(--geraldo-radius-badge)] border px-geraldo-3 py-0.5 text-sm font-medium transition-colors [&_svg]:size-3.5',
  {
    variants: {
      tone: {
        primary: 'border-transparent bg-primary text-[var(--geraldo-color-neutral-0)]',
        secondary: 'border-transparent bg-secondary text-[var(--geraldo-color-neutral-0)]',
        success: 'border-transparent bg-success text-[var(--geraldo-color-neutral-0)]',
        warning: 'border-transparent bg-warning text-[var(--geraldo-color-neutral-900)]',
        danger: 'border-transparent bg-destructive text-destructive-foreground',
        info: 'border-transparent bg-info text-[var(--geraldo-color-neutral-0)]',
        neutral: 'border-border bg-muted text-foreground',
        developer:
          'border-transparent bg-[var(--geraldo-color-developer-bg)] text-[var(--geraldo-color-developer-700)]',
      },
    },
    defaultVariants: {
      tone: 'primary',
    },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

function Badge({ className, tone, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export { Badge, badgeVariants };
