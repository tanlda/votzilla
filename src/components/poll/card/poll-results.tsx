'use client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { Poll } from '@/types/poll'
import { Button } from '@/components/ui/button'
import { PollPieResults } from '@/components/poll/results/poll-pie-results'

type Props = {
  className?: string
  children?: React.ReactNode
  poll: Poll
}

export const PollResults: NextComponentType<object, object, Props> = ({ className, poll }) => {
  const tags = ['student', 'worker', 'developer']

  return (
    <div className={cn(className, 'flex min-w-64 flex-col items-center justify-center pt-4')}>
      <PollPieResults poll={poll} />

      <div className="mt-4 flex items-center justify-between gap-x-2">
        {tags.map((tag) => (
          <Button key={tag} variant="secondary" size="sm">
            {tag}
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
