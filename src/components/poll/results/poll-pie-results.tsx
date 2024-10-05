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
import { PieChart, Pie, Cell, LabelList, Label } from 'recharts'

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
    value: mapping[option.id].result?.vote_count || 0,
  }))

  return (
    <div style={{ width: 240, height: 200 }} className={cn(className)}>
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[220px]">
        <PieChart className="-mb-6 -mt-10">
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Pie
            data={chartData}
            dataKey="value"
            startAngle={90 + 360}
            endAngle={90}
            outerRadius="80%"
            innerRadius={40}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <>
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 4}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {results.vote_count}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 12}
                          className="fill-muted-foreground text-[10px]"
                        >
                          votes
                        </tspan>
                      </text>
                    </>
                  )
                }
              }}
            />
            <LabelList dataKey="title" className="fill-background" stroke="none" fontSize={12} />
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  )
}
