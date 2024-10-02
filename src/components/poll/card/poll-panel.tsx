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
        'flex min-w-64 max-w-52 flex-col items-center justify-start self-center pt-4',
      )}
    >
      <PollPieResults poll={poll} />

      <div className="mt-4 flex min-h-6 flex-wrap items-center justify-center gap-2">
        {tags.map((tag) => (
          <Button key={tag.name} variant="secondary" size="sm">
            <span>
              {tag.name} [{tag.vote_count}]
            </span>
          </Button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-x-2">
        <Button variant="secondary" size="sm">
          Hide results
        </Button>
      </div>
    </div>
  )
}
