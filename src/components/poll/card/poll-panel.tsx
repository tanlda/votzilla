'use client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { Poll, PollResults } from '@/types/poll'
import { Button } from '@/components/ui/button'
import { PollPieResults } from '@/components/poll/results/poll-pie-results'

type Props = {
  className?: string
  children?: React.ReactNode
  poll: Poll
  results: PollResults
}

export const PollPanel: NextComponentType<object, object, Props> = ({
  className,
  poll,
  results,
}) => {
  const tags = (results?.tags || []).toSorted((a, b) => b.vote_count - a.vote_count)

  return (
    <div
      className={cn(
        className,
        'flex min-w-64 max-w-52 flex-col items-center justify-start self-center',
      )}
    >
      <PollPieResults poll={poll} results={results} />
    </div>
  )
}
