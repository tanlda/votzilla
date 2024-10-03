import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

type Props = {
  className?: string
}

export const UserAvatar: NextComponentType<object, object, Props> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <Avatar>
        <AvatarImage src="https://ui.shadcn.com/avatars/03.png" alt="anonymous" />
        <AvatarFallback>AN</AvatarFallback>
      </Avatar>
    </div>
  )
}
