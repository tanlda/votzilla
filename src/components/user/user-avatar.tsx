import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'

type Props = {
  className?: string
}

export const UserAvatar: NextComponentType<object, object, Props> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <Avatar />
    </div>
  )
}
