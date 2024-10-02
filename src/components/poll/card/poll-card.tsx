'use client'

import { QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'

import { http } from '@/services/api'
import { Room, Poll, Response, PollResults as PollResults, PollSelf, PollSelfOption } from '@/types'
import { PollHeader } from '@/components/poll/card/poll-header'
import { PollPanel } from '@/components/poll/card/poll-panel'
import { PollForm } from '@/components/poll/card/poll-form'
import { Card, CardContent } from '@/components/ui/card'

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

export const PollCard: NextComponentType<object, object, Props> = ({
  className,
  children,
  room,
  poll,
}) => {
  const { data: results, refetch } = useQuery({
    queryKey: [room.id, poll.id],
    queryFn: getPollResults,
    enabled: !!room.id,
    refetchInterval: 30 * 1000,
    staleTime: 0,
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

  const [self, setSelf] = useState<PollSelf | undefined>(undefined)

  const handleSubmitVote = (options: PollSelfOption[]) => {
    setSelf((prev) => {
      if (prev) return { ...prev, options }
      if (poll.self) return { ...poll.self }
    })

    refetch().finally()
  }

  return (
    <Card className={cn(className, 'min-w-[768px]')}>
      <PollHeader poll={poll} />
      <CardContent
        className={cn(
          className,
          'relative mb-4 flex items-start justify-between gap-x-4 px-4 py-0',
        )}
      >
        <PollForm
          className="grow"
          poll={poll}
          results={results}
          self={self || poll.self}
          onSubmitVote={handleSubmitVote}
        >
          {children}
        </PollForm>
        <PollPanel poll={poll} results={results} />
      </CardContent>
    </Card>
  )
}
