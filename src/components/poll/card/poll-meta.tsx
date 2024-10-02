'use client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { PollStatus } from '@/types/poll'
import { Badge } from '@/components/ui/badge'

type Props = {
  className?: string
  children?: React.ReactNode
  status: PollStatus
}

export const PollMeta: NextComponentType<object, object, Props> = ({ className, status }) => {
  const mapping = {
    [PollStatus.Open]: 'Live',
    [PollStatus.Closed]: 'Closed',
  }

  const label = mapping[status]

  return (
    <div className="mr-4 flex items-center gap-x-2">
      <Badge
        variant="accent"
        className={cn(className, 'border-black/80 bg-black/80 px-2 py-0.5 font-medium text-white')}
      >
        Finished
      </Badge>
      <Badge variant="accent" className={cn(className, 'px-2 py-0.5 font-medium')}>
        {label}
      </Badge>
    </div>
  )
}
