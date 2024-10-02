import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { Poll, PollResults, PollSelf, PollSelfOption } from '@/types/poll'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PollOptions } from '@/components/poll/card/poll-options'

import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { http } from '@/services/api'
import { VoteType, VoteResponse } from '@/types/vote'

type Props = {
  className?: string
  children?: React.ReactNode
  poll: Poll
  self?: PollSelf
  results: PollResults
  onSubmitVote: (options: PollSelfOption[]) => void
}

const FormSchema = z.object({
  options: z
    .array(
      z.object({
        id: z.string(),
        value: z.number(),
      }),
    )
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one option.',
    }),
})

export const PollForm: NextComponentType<object, object, Props> = ({
  className,
  poll,
  self,
  results,
  onSubmitVote,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      options: self?.options || [],
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await http.post<VoteResponse>(`/votes/${poll.id}/vote`, {
      body: {
        type: VoteType.ADD,
        votes: data.options,
        tags: ['anonymous'], // TODO: user.tags
      },
      config: {
        baseURL: 'http://localhost:8010',
      },
    })

    if (response.ok) {
      onSubmitVote(data.options)
    }
  }

  return (
    <div className={cn(className, 'flex h-full flex-col justify-start')}>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-x-2">
          {poll.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-medium">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex h-6 items-center justify-end">
          <div>Sort</div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex grow flex-col justify-start py-2">
            <PollOptions form={form} poll={poll} self={self} results={results} />
          </div>

          <div className="bottom-0 left-4 mt-auto flex items-center justify-start gap-x-2">
            <Button className="font-medium" type="submit">
              Vote
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
