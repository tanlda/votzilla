'use-client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { Option } from '@/types/poll'

type Props = {
  className?: string
  children?: React.ReactNode
  option: Option
}

export const PollOption: NextComponentType<object, object, Props> = ({ className, option }) => {
  return (
    <div className={cn(className)}>
      <div>{option.title}</div>
    </div>
  )
}
