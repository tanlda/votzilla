import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  children: React.ReactNode
}

export const Main: NextComponentType<object, object, Props> = ({ className, children }) => {
  return <main className={cn(className)}>{children}</main>
}
