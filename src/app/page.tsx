import Auth from '@/app/auth'
import { PollList } from '@/components/poll/list/poll-list'
import { RoomView } from '@/components/room/room-view'
import { Pagination, Poll, Response, Room, RoomStatus } from '@/types'
import { QueryClient } from '@tanstack/react-query'
import { http } from '@/services/api'

interface ListPollsResponse extends Response {
  polls: Poll[]
  pagination: Pagination
}

const fetchPolls = async ({ queryKey }: { queryKey: string[] }) => {
  const room = queryKey[1]
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
  await queryClient.prefetchQuery({ queryKey: ['rooms', room.name], queryFn: fetchPolls })

  return (
    <Auth>
      <div>
        <RoomView>
          <PollList room={room} />
        </RoomView>
      </div>
    </Auth>
  )
}
