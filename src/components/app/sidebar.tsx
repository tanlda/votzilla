'use client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import { BookmarkIcon } from '@radix-ui/react-icons'

type Props = {
  className?: string
}

export const Sidebar: NextComponentType<object, object, Props> = ({ className }) => {
  const rooms: string[] = ['Recent', 'Rooms', 'Travel', 'People', 'Music']

  return (
    <div className={cn(className, 'h-full min-w-[256px] border-r border-neutral-300 p-4')}>
      <div className="flex h-full flex-col gap-y-2">
        {rooms.map((room) => (
          <div
            key={room}
            className="flex min-h-8 cursor-pointer items-center justify-start gap-x-2 rounded-md p-2 hover:bg-neutral-100"
          >
            <div className="flex-center h-6 w-6 rounded-full border border-neutral-800 text-xs">
              R
            </div>
            <div className="text-md mr-auto text-left font-medium text-neutral-800">{room}</div>
            <BookmarkIcon />
          </div>
        ))}
      </div>
    </div>
  )
}
