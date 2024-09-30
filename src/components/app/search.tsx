'use-client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

type Props = {
  className?: string
}

export const Search: NextComponentType<object, object, Props> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <Input />
    </div>
  )
}
