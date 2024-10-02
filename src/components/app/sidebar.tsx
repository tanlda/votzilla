'use client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export const Sidebar: NextComponentType<object, object, Props> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <div>Recent</div>
      <div>Rooms</div>
      <div>Travel</div>
      <div>People</div>
      <div>Music</div>
    </div>
  )
}
