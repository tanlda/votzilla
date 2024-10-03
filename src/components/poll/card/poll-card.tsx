'use client'

import { NextComponentType } from 'next'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

import { Room, Poll, PollSelf, PollSelfOption } from '@/types'
import { PollHeader } from '@/components/poll/card/poll-header'
import { PollPanel } from '@/components/poll/card/poll-panel'
import { PollForm } from '@/components/poll/card/poll-form'
import { Card, CardContent } from '@/components/ui/card'
import { PollResultsProvider, usePollResults } from '@/hooks/poll/use-poll-results.tsx'

type Props = {
  className?: string
  children?: React.ReactNode
  room: Room
  poll: Poll
}

export const PollCardInner: NextComponentType<object, object, Props> = ({
  className,
  children,
  room,
  poll,
}) => {
  const { results } = usePollResults(room, poll)

  const [self, setSelf] = useState<PollSelf | undefined>(undefined)

  const handleSubmitVote = async (options: PollSelfOption[]) => {
    setSelf((prev) => {
      if (prev) return { ...prev, options }
      if (poll.self) return { ...poll.self }
    })

    // await refreshResults(true)
  }

  return (
    <Card className={cn(className, 'min-w-[768px] px-4 pb-4 pt-3 shadow-none')}>
      <PollHeader poll={poll} />
      <CardContent
        className={cn(
          className,
          'relative mb-4 flex items-start justify-between gap-x-4 px-4 py-0',
        )}
      >
        <PollForm
          className="grow"
          poll={poll}
          results={results}
          self={self || poll.self}
          onSubmitVote={handleSubmitVote}
        >
          {children}
        </PollForm>
        <PollPanel poll={poll} results={results} />
      </CardContent>
    </Card>
  )
}

export const PollCard: NextComponentType<object, object, Props> = ({
  className,
  children,
  room,
  poll,
}) => {
  return (
    <PollResultsProvider>
      <PollCardInner className={className} room={room} poll={poll}>
        {children}
      </PollCardInner>
    </PollResultsProvider>
  )
}
