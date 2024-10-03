'use client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { Poll } from '@/types/poll'
import { PollTitle } from '@/components/poll/card/poll-title'
import { PollMeta } from '@/components/poll/card/poll-meta'
import { PollMenu } from '@/components/poll/card/poll-menu'

import { CardHeader } from '@/components/ui/card'

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
    <CardHeader className={cn(className, 'flex flex-row items-center justify-between p-0')}>
      <PollTitle poll={poll} />
      <div className="flex items-center">
        <PollMeta status={poll.status} />
        <PollMenu poll={poll} onMenu={handleMenu} />
      </div>
    </CardHeader>
  )
}
