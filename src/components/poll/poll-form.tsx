'use-client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { PollOption } from '@/components/poll/option/poll-option'

import { Poll } from '@/types/poll'

type Props = {
  className?: string
  children?: React.ReactNode
  poll: Poll
}

export const PollForm: NextComponentType<object, object, Props> = ({ className, poll }) => {
  return (
    <div className={cn(className, 'flex flex-col justify-start')}>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          {poll.tags.map((tag) => (
            <span key={tag} className="text-xs text-gray-500">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <div>Sort</div>
        </div>
      </div>

      <div className="flex flex-col justify-start">
        {poll.options.map((option) => (
          <PollOption key={option.id} option={option} />
        ))}
      </div>
    </div>
  )
}
