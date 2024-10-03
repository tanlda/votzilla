'use client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  className?: string
  children?: React.ReactNode
}

export const RoomHeader: NextComponentType<object, object, Props> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <div>Room Header</div>
    </div>
  )
}
