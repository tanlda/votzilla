import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'

import { Logo } from '@/components/app/logo'
import { Search } from '@/components/app/search'
import { Notification } from '@/components/app/notification'
import { UserAvatar } from '@/components/user/user-avatar'

type Props = {
  className?: string
}

export const Header: NextComponentType<object, object, Props> = ({ className }) => {
  return (
    <div
      className={cn(
        className,
        'relative z-[10] flex w-screen items-center justify-start border-b border-neutral-300 px-4',
      )}
    >
      <Logo className="flex h-full min-w-[240px] items-center justify-start border-r border-neutral-300 px-2" />

      <div className="flex w-full items-center justify-between pl-6 pr-2">
        <Search className="mr-auto" />

        <div className="flex items-center justify-between gap-x-4">
          <Notification />
          <UserAvatar />
        </div>
      </div>
    </div>
  )
}
