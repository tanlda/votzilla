'use-client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { PollTitle } from '@/components/poll/poll-title'
import { PollMeta } from '@/components/poll/poll-meta'
import { PollMenu } from '@/components/poll/poll-menu'

import { Poll } from '@/types/poll'

type Props = {
  className?: string
  children?: React.ReactNode
  poll: Poll
}

export const PollHeader: NextComponentType<object, object, Props> = ({ className, poll }) => {
  const handleMenu = (action: string) => {
    console.log(action)
  }

  return (
    <div className={cn(className, 'flex items-center justify-between')}>
      <PollTitle poll={poll} />
      <div className="flex items-center">
        <PollMeta status={poll.status} />
        <PollMenu poll={poll} onMenu={handleMenu} />
      </div>
    </div>
  )
}
