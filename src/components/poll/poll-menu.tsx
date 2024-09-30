'use-client'

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
  children,
  onMenu = noop,
}) => {
  return (
    <div className={cn(className)} onClick={() => onMenu('menu')}>
      {children}
    </div>
  )
}
