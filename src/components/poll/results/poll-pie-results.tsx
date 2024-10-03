'use client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { Option, Poll, PollResults, PollResultsOption, PollSelfOption } from '@/types/poll'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { PieChart, Pie, Cell } from 'recharts'

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig

const COLORS = ['hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))']

type Props = {
  className?: string
  children?: React.ReactNode
  poll: Poll
  results: PollResults
}

export const PollPieResults: NextComponentType<object, object, Props> = ({
  className,
  poll,
  results,
}) => {
  type Value = { poll: Option; result: PollResultsOption; self: PollSelfOption }

  const mapping: Record<string, Value> = {}

  for (const option of poll.options) {
    mapping[option.id] = { poll: option } as Value
  }

  for (const result of results.options) {
    mapping[result.id].result = result
  }

  const chartData = poll.options.map((option) => ({
    title: mapping[option.id].poll.title,
    name: mapping[option.id].poll.title,
    count: mapping[option.id].result?.vote_count || 0,
  }))

  return (
    <div className={cn(className)} style={{ width: 240, height: 240 }}>
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[240px]">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Pie
            data={chartData}
            dataKey="count"
            label
            startAngle={90 + 360}
            endAngle={90}
            outerRadius="70%"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  )
}
