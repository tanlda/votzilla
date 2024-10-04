'use client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { Poll, PollResults, PollStatus } from '@/types/poll'
import { PollMenu } from '@/components/poll/card/poll-menu'

import { CardHeader } from '@/components/ui/card'
import { Chip } from '@/components/ui/chip.tsx'
import { PersonIcon } from '@radix-ui/react-icons'
import { Icons } from '@/components/ui/icon'

type Props = {
  className?: string
  children?: React.ReactNode
  poll: Poll
  results: PollResults
}

export const PollHeader: NextComponentType<object, object, Props> = ({
  className,
  poll,
  results,
}) => {
  const mapping = {
    [PollStatus.Open]: 'Live',
    [PollStatus.Closed]: 'Closed',
  }

  const label = mapping[poll.status]

  const handleMenu = (action: string) => {
    console.log(action)
  }

  const description =
    poll.description || "I'm not American so maybe it might be common knowledge among Americans."

  return (
    <CardHeader className={cn(className, 'flex flex-row items-start justify-between p-0')}>
      <div className={cn(className)}>
        <h6 className="text-lg font-semibold leading-6">
          {poll.title && 'Which of these modern communication methods is the most annoying?'}
        </h6>
        <div className="mt-1 text-sm text-neutral-500">{description}</div>
      </div>

      <div className="flex min-w-[30%] items-center justify-end">
        <div className="flex items-center gap-x-2">
          <PollMenu poll={poll} onMenu={handleMenu} />

          <Chip variant="secondary" className={cn(className, 'flex-center h-6 gap-x-1')}>
            <PersonIcon />

            <div className="mt-0.5">{results.participant_count}</div>
          </Chip>

          <Chip variant="accent" className={cn(className, 'flex h-6 items-center gap-x-1')}>
            <Icons.Live size={16} />
            <span>{label}</span>
          </Chip>
        </div>
      </div>
    </CardHeader>
  )
}
