'use-client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import type { PollStatus } from '@/types/poll'

type Props = {
  className?: string
  children?: React.ReactNode
  status: PollStatus
}

export const PollMeta: NextComponentType<object, object, Props> = ({ className, status }) => {
  return <div className={cn(className)}>{status}</div>
}
