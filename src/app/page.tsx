import { Button } from '@/components/ui/button'
import { PollList } from '@/components/poll/list/poll-list'
import { RoomView } from '@/components/room/room-view'

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { http } from '@/services/api'
import { Response, Poll, Room, RoomStatus, Pagination } from '@/types'

interface ListPollsResponse extends Response {
  polls: Poll[]
  pagination: Pagination
}

const fetchPolls = async ({ queryKey }: { queryKey: string[] }) => {
  const [room] = queryKey
  const { polls } = await http.get<ListPollsResponse>(`/rooms/${room}/polls`)
  return polls
}

export default async function Home() {
  const room: Room = {
    id: 'Uk',
    name: 'default',
    status: RoomStatus.ACTIVE,
    description: 'default',
    display_name: 'default',
    icon: 'main-icon.png',
    image: 'main-image.png',
    banner: 'main-banner.png',
  }

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({ queryKey: [room.name], queryFn: fetchPolls })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <Button disabled>Vote</Button>
        <div className="mt-4">
          <RoomView>
            <PollList room={room} />
          </RoomView>
        </div>
      </div>
    </HydrationBoundary>
  )
}
