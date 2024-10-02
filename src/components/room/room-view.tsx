'use client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'
import { RoomHeader } from '@/components/room/room-header'
import { RoomContent } from '@/components/room/room-content'

type Props = {
  className?: string
  children?: React.ReactNode
}

export const RoomView: NextComponentType<object, object, Props> = ({ className, children }) => {
  // const room = SSR room

  return (
    <div className={cn(className)}>
      <RoomHeader />
      <RoomContent>{children}</RoomContent>
    </div>
  )
}
