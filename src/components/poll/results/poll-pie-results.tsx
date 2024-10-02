'use client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { Poll } from '@/types/poll'

type Props = {
  className?: string
  children?: React.ReactNode
  poll: Poll
}

export const PollPieResults: NextComponentType<object, object, Props> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <div className="flex-center h-28 w-28 rounded-full bg-black/20"></div>
    </div>
  )
}
