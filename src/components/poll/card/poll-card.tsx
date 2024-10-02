'use client'

import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { Room, Poll, Response, PollResults } from '@/types'
import { PollHeader } from '@/components/poll/card/poll-header'
import { PollContent } from '@/components/poll/card/poll-content'
import { Card } from '@/components/ui/card'
import { http } from '@/services/api'
import { PollSelf } from '@/types/poll'

type Props = {
  className?: string
  children?: React.ReactNode
  room: Room
  poll: Poll
}

interface PollResultsResponse extends Response {
  results: PollResults
}

const getPollResults = async ({ queryKey }: QueryFunctionContext) => {
  const [room, poll] = queryKey
  const { results } = await http.get<PollResultsResponse>(
    `/rooms/${room}/polls/${poll}/results?return_tags=true`,
  )
  return results
}

export const PollCard: NextComponentType<object, object, Props> = ({ className, room, poll }) => {
  const { data: results } = useQuery({
    queryKey: [room.id, poll.id],
    queryFn: getPollResults,
    enabled: !!room.id,
    refetchInterval: 60 * 1000,
    initialData: () => ({
      id: poll.id,
      key: '',
      version: '',
      vote_count: 0,
      participant_count: 0,
      created_at: 0,
      updated_at: 0,
      options: [],
      tags: [],
    }),
  })

  const self: PollSelf = {
    id: poll.id,
    options: [],
  }

  return (
    <Card className={cn(className, 'min-w-[768px]')}>
      <PollHeader poll={poll} />
      <PollContent poll={poll} self={self} results={results} />
    </Card>
  )
}
