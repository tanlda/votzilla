'use-client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { Poll } from '@/types/poll'

type Props = {
  className?: string
  children?: React.ReactNode
  poll: Poll
}

export const PollResults: NextComponentType<object, object, Props> = ({ className, children }) => {
  return <div className={cn(className)}>{children}</div>
}
