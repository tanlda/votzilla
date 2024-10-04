import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const chipVariants = cva(
  'cursor-pointer inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        accent: 'text-neutral-600 bg-chemic border-chemic',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {}

function Chip({ className, variant, ...props }: ChipProps) {
  return <div className={cn(chipVariants({ variant }), className)} {...props} />
}

export { Chip, chipVariants }
