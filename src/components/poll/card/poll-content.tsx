'use client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { Poll, PollSelf, PollResults as IPollResults } from '@/types/poll'
import { PollForm } from '@/components/poll/card/poll-form'
import { PollResults } from '@/components/poll/card/poll-results'
import { CardContent } from '@/components/ui/card'

type Props = {
  className?: string
  children?: React.ReactNode
  poll: Poll
  self: PollSelf
  results: IPollResults
}

export const PollContent: NextComponentType<object, object, Props> = ({
  className,
  children,
  poll,
  self,
  results,
}) => {
  return (
    <CardContent
      className={cn(className, 'relative mb-4 flex items-start justify-between gap-x-4 px-4 py-0')}
    >
      <PollForm className="grow" poll={poll} self={self} results={results}>
        {children}
      </PollForm>
      <PollResults poll={poll} />
    </CardContent>
  )
}
