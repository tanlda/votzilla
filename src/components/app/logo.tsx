import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export const Logo: NextComponentType<object, object, Props> = ({ className }) => {
  return (
    <div className={cn(className, 'text-lg font-semibold')}>
      <span>Votzilla</span>
    </div>
  )
}
