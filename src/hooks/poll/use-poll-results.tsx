import { QueryFunctionContext, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, createContext, ReactNode, useEffect } from 'react'
import { timer } from '@/lib/utils'
import { createStore } from 'zustand'
import { VoteType } from '@/types/vote.ts'
import { http, secrets } from '@/services/api'
import type { Room, Poll, PollResults, Response, VoteMessage } from '@/types'

type FetchOptions = {
  return_fresh: boolean
  return_tags: boolean
}

type PollResultsState = {
  options: FetchOptions
  setOptions: (options: FetchOptions) => void
}

const createPollResultsStore = () => {
  return createStore<PollResultsState>((set) => {
    return {
      options: { return_fresh: true, return_tags: true }, // initial fresh results
      setOptions: (options) => set({ options }),
    }
  })
}

const PollResultsContext = createContext<ReturnType<typeof createPollResultsStore> | null>(null)

export const PollResultsProvider = ({ children }: { children: ReactNode }) => {
  const store = createPollResultsStore()
  return <PollResultsContext.Provider value={store}>{children}</PollResultsContext.Provider>
}

interface PollResultsResponse extends Response {
  results: PollResults
}

export const usePollResults = (room: Room, poll: Poll) => {
  const client = useQueryClient()
  const store = useContext(PollResultsContext)

  const getOptions = () => store?.getState().options
  const setOptions = (options: FetchOptions) => store?.setState({ options })

  const { data: results, refetch } = useQuery({
    queryKey: [room.id, poll.id],
    queryFn: async ({ queryKey }: QueryFunctionContext) => {
      const [room, poll] = queryKey
      const options = getOptions() || { return_fresh: false, return_tags: true }
      const { results } = await http.post<PollResultsResponse>(
        `/rooms/${room}/polls/${poll}/results`,
        { body: { ...options } },
      )
      setOptions({ return_fresh: false, return_tags: true })

      return results
    },
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

  const refreshResults = async (fresh: boolean = false) => {
    if (fresh) {
      setOptions({ return_fresh: false, return_tags: false })
      await timer(100)
      await refetch()
      await timer(100)
      setOptions({ return_fresh: false, return_tags: true })
    }

    await refetch()
  }

  const updateResults = () => {
    client.setQueryData([room.id, poll.id], (oldResults: PollResults) => {
      const updatedResults: PollResults = {
        ...oldResults,
        vote_count: 0,
        participant_count: 0,
        options: oldResults.options.map((o) => ({ ...o, vote_count: 0 })),
      }

      return updatedResults
    })
  }

  const handleAddVotes = (vote: VoteMessage) => {
    client.setQueryData([room.id, poll.id], (prev: PollResults) => {
      const count = (oid: string) => Number(vote.options.some((o) => o.id == oid))

      const updated: PollResults = {
        ...prev,
        vote_count: prev.vote_count + vote.options.length,
        participant_count: prev.participant_count + 1,
        options: prev.options.map((o) => ({ ...o, vote_count: o.vote_count + count(o.id) })),
      }

      return updated
    })
  }

  const handleEditVotes = (vote: VoteMessage) => {
    client.setQueryData([room.id, poll.id], (prev: PollResults) => {
      vote.previous_options = vote.previous_options || []
      const adds = Object.fromEntries(vote.options.map((o) => [o.id, 1]))
      const deletes = Object.fromEntries(vote.previous_options.map((o) => [o.id, -1]))

      const updated: PollResults = {
        ...prev,
        participant_count: prev.participant_count,
        vote_count: prev.vote_count + vote.options.length - vote.previous_options.length,
        options: prev.options.map((o) => ({
          ...o,
          vote_count: o.vote_count + (adds[o.id] || 0) + (deletes[o.id] || 0),
        })),
      }

      return updated
    })
  }

  const handleDeleteVotes = (vote: VoteMessage) => {
    client.setQueryData([room.id, poll.id], (prev: PollResults) => {
      vote.previous_options = vote.previous_options || []
      const deletes = Object.fromEntries(vote.previous_options.map((o) => [o.id, -1]))

      const updated: PollResults = {
        ...prev,
        participant_count: prev.participant_count - 1,
        vote_count: prev.vote_count - vote.previous_options.length,
        options: prev.options.map((o) => ({
          ...o,
          vote_count: o.vote_count + (deletes[o.id] || 0),
        })),
      }

      return updated
    })
  }

  useEffect(() => {
    const token = secrets.getAccessToken()
    const source = new EventSource(
      `http://localhost:8010/v1/votes/${poll.id}/subscribe?_t=${token}`,
    )

    source.addEventListener('uservote', (event) => {
      try {
        const vote: VoteMessage = JSON.parse(event.data)
        if (vote.type == VoteType.ADD) handleAddVotes(vote)
        if (vote.type == VoteType.EDIT) handleEditVotes(vote)
        if (vote.type == VoteType.DELETE) handleDeleteVotes(vote)
      } catch (error) {
        console.error('Error parsing uservote event', error)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poll])

  return {
    results,
    updateResults,
    refreshResults,
  }
}
