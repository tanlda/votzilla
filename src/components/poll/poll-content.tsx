'use-client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { PollForm } from '@/components/poll/poll-form'
import { PollResults } from '@/components/poll/poll-results'
import { Poll } from '@/types/poll'

type Props = {
  className?: string
  children?: React.ReactNode
  poll: Poll
}

export const PollContent: NextComponentType<object, object, Props> = ({
  className,
  children,
  poll,
}) => {
  return (
    <div className={cn(className)}>
      <PollForm poll={poll}>{children}</PollForm>
      <PollResults poll={poll} />
    </div>
  )
}
