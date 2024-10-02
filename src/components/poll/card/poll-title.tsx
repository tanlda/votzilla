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

export const PollTitle: NextComponentType<object, object, Props> = ({ className, poll }) => {
  return (
    <div className={cn(className)}>
      <h6 className="text-lg font-semibold">{poll.title}</h6>
    </div>
  )
}
