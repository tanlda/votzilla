import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/ui/icon'

type Props = {
  className?: string
}

export const Notification: NextComponentType<object, object, Props> = ({ className }) => {
  return (
    <div className={cn(className, '')}>
      <Icons.Bell />
    </div>
  )
}
