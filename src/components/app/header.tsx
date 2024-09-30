import { NextComponentType } from 'next'
// import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

import { Logo } from '@/components/app/logo'
import { Search } from '@/components/app/search'
import { Notification } from '@/components/app/notification'
import { UserAvatar } from '@/components/user/user-avatar'

type Props = {
  className?: string
}

export const Header: NextComponentType<object, object, Props> = ({ className }) => {
  // const router = useRouter()

  return (
    <div
      className={cn(
        className,
        'relative z-[10] flex h-14 w-screen items-center justify-between px-4 text-black',
      )}
    >
      <Logo />
      <Search />
      <div className="flex items-center justify-between">
        <Notification />
        <UserAvatar />
      </div>
    </div>
  )
}
