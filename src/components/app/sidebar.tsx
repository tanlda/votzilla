'use client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'

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
            <div className="w-7.5 h-7.5 flex-center rounded-full border border-neutral-800">C</div>
            <div className="mr-auto text-left font-medium text-neutral-800">{room}</div>
            <div>B</div>
          </div>
        ))}
      </div>
    </div>
  )
}
