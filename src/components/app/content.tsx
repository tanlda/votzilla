'use-client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  className?: string
  children: React.ReactNode
}

export const Content: NextComponentType<object, object, Props> = ({ className, children }) => {
  return <div className={cn(className)}>{children}</div>
}
