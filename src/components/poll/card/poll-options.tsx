'use client'

import { NextComponentType } from 'next'
import { cn } from '@/lib/utils'
import React from 'react'

import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'

import { Checkbox } from '@/components/ui/checkbox'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import {
  Option,
  Poll,
  PollResults,
  PollResultsOption,
  PollSelf,
  PollSelfOption,
} from '@/types/poll'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
} satisfies ChartConfig

type Props = {
  className?: string
  children?: React.ReactNode
  form: UseFormReturn<any>
  poll: Poll
  self: PollSelf
  results: PollResults
}

export const PollOptions: NextComponentType<object, object, Props> = ({
  className,
  form,
  poll,
  self,
  results,
}) => {
  type Value = { poll: Option; result: PollResultsOption; self: PollSelfOption }

  const mapping: Record<string, Value> = {}

  for (const option of poll.options) {
    mapping[option.id] = { poll: option } as Value
  }

  for (const option of self.options) {
    mapping[option.id].self = option
  }

  for (const result of results.options) {
    mapping[result.id].result = result
  }

  const chartData = poll.options.map((option) => ({
    title: mapping[option.id].poll.title,
    count: mapping[option.id].result?.vote_count || 0,
  }))

  console.log(mapping)

  return (
    <div className={cn(className, 'flex items-center justify-between')}>
      <div className="flex flex-grow flex-col justify-start py-2">
        {poll.options.map((option) => (
          <FormField
            key={option.id}
            control={form.control}
            name="options"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    id={option.id + ''}
                    checked={field.value?.map((o: Option) => o.id).includes(option.id)}
                    onCheckedChange={() => {
                      return field.value?.map((o: Option) => o.id).includes(option.id)
                        ? field.onChange(field.value.filter((o: Option) => o.id !== option.id))
                        : field.onChange([...field.value, { id: option.id, value: 1 }]) // TODO: value
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
      </div>

      <div className="grow" style={{}}>
        <ChartContainer
          config={chartConfig}
          style={{ width: 400, height: poll.options.length * 48 }}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            barCategoryGap={0}
            maxBarSize={42}
            width={100}
          >
            <YAxis
              dataKey="title"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              animationDuration={200}
              isAnimationActive={false}
            />
            <Bar dataKey="count" layout="vertical" fill="#CCCCCC" fontSize={12}>
              <LabelList
                dataKey="title"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}
