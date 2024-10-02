'use client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'
import { doNothing as noop } from 'remeda'

import { Poll } from '@/types/poll'

type Props = {
  className?: string
  children?: React.ReactNode
  poll: Poll

  onMenu?: (action: string) => void
}

export const PollMenu: NextComponentType<object, object, Props> = ({
  className,
  onMenu = noop,
}) => {
  return (
    <div className={cn(className, 'flex')} onClick={() => onMenu('menu')}>
      <div className="flex-center">
        <div>...</div>
      </div>
    </div>
  )
}
