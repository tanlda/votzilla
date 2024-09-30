'use-client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { PollHeader } from '@/components/poll/poll-header'
import { PollContent } from '@/components/poll/poll-content'
import { Poll } from '@/types/poll'

type Props = {
  className?: string
  children?: React.ReactNode
  poll: Poll
}

export const PollCard: NextComponentType<object, object, Props> = ({ className, poll }) => {
  return (
    <div className={cn(className)}>
      <PollHeader poll={poll} />
      <PollContent poll={poll} />
    </div>
  )
}
