'use client'

import React, { Fragment } from 'react'
import { cn } from '@/lib/utils'
import { NextComponentType } from 'next'
import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query'

import { http } from '@/services/api'
import { Poll, Response, Pagination, Room } from '@/types'

import { PollCard } from '@/components/poll/card/poll-card'

type Props = {
  className?: string
  children?: React.ReactNode
  room: Room
}

interface ListPollsResponse extends Response {
  polls: Poll[]
  pagination: Pagination
}

const fetchPollsInfinity = async ({ queryKey, pageParam }: QueryFunctionContext) => {
  const [room] = queryKey
  const { polls } = await http.get<ListPollsResponse>(`/rooms/${room}/polls?after=${pageParam}`)
  return polls
}

export const PollList: NextComponentType<object, object, Props> = ({ className, room }) => {
  const { data } = useInfiniteQuery({
    queryKey: [room.name, 'https://github.com/TanStack/query/discussions/7455'],
    queryFn: fetchPollsInfinity,
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage[lastPage.length - 1].id,
  })

  // <VirtualItem>
  //   <PollCard /> {/* menu: global store */}
  // </VirtualItem>

  return (
    <div className={cn(className, 'flex flex-col gap-y-6')}>
      {data &&
        data.pages.map((polls) =>
          polls.map((poll, index) => (
            <Fragment key={poll.id + '-fr'}>
              {!!index && <hr key={poll.id + '-hr'} />}
              <PollCard key={poll.id} room={room} poll={poll}></PollCard>
            </Fragment>
          )),
        )}
    </div>
  )
}
