'use client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

type Props = {
  className?: string
}

import { SearchIcon } from 'lucide-react'

export const Search: NextComponentType<object, object, Props> = ({ className }) => {
  return (
    <div className={cn(className, 'relative flex min-h-9 w-[384px] items-center justify-start')}>
      <SearchIcon className="absolute left-2.5 -mt-0.5 scale-75 opacity-60" />
      <Input
        className="w-full border-neutral-300 pl-9 shadow-none"
        placeholder="Search anything..."
      />
    </div>
  )
}
