'use client'

import {NextComponentType} from 'next'
import {cn} from '@/lib/utils'
import React from 'react'

import {Bar, BarChart, LabelList, XAxis, YAxis} from 'recharts'

import {Checkbox} from '@/components/ui/checkbox'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {FormControl, FormField, FormItem} from '@/components/ui/form'
import {UseFormReturn} from 'react-hook-form'
import {
  Option,
  Poll,
  PollResults,
  PollResultsOption,
  PollSelf,
  PollSelfOption,
} from '@/types/poll'

type Props = {
  className?: string
  children?: React.ReactNode
  form: UseFormReturn
  poll: Poll
  self?: PollSelf
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
    mapping[option.id] = {poll: option} as Value
  }

  for (const result of results.options) {
    mapping[result.id].result = result
  }

  for (const option of self?.options || []) {
    mapping[option.id].self = option
  }

  const chartData = poll.options.map((option) => ({
    title: mapping[option.id].poll.title,
    count: mapping[option.id].result?.vote_count || 0,
  }))

  const chartConfig = {
    count: {
      label: 'Total',
      color: '',
    },
  }

  const row = {width: 32, gap: 10, stroke: 1}

  return (
    <div className={cn(className, 'flex items-center justify-between')}>
      <div className="flex flex-col justify-start gap-y-2 pr-2">
        {poll.options.map((option) => (
          <FormField
            key={option.id}
            control={form.control}
            name="options"
            render={({field}) => (
              <FormItem className="h-8 w-8">
                <FormControl>
                  <Checkbox
                    id={option.id + ''}
                    checked={field.value?.map((o: Option) => o.id).includes(option.id)}
                    onCheckedChange={() => {
                      return field.value?.map((o: Option) => o.id).includes(option.id)
                        ? field.onChange(field.value.filter((o: Option) => o.id !== option.id))
                        : field.onChange([...field.value, {id: option.id, value: 1}]) // TODO: value
                    }}
                    className={cn('h-8 w-8')}
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
          style={{
            width: '90%',
            height: poll.options.length * row.width + (poll.options.length - 1) * row.gap,
          }}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{top: 0, right: 4, bottom: 0, left: 4}}
            maxBarSize={row.width * 3}
            barSize={row.width}
            width={100}
          >
            <YAxis
              dataKey="title"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              includeHidden
              hide
            />
            <XAxis dataKey="count" type="number" hide/>
            <ChartTooltip
              content={<ChartTooltipContent indicator="line"/>}
              animationDuration={200}
              isAnimationActive={false}
            />
            <Bar
              dataKey="count"
              layout="vertical"
              fontSize={12}
              radius={4}
              fill={'#F4F4F5'}
              background={{fill: 'none', stroke: '#D4D4D8', radius: 4}}
              style={{stroke: '#D4D4D8', strokeWidth: 1}}
            >
              <LabelList
                dataKey="title"
                position="insideLeft"
                className="font-medium"
                offset={32}
                fontSize={12}
                content={({index, x, y, value, height}) => {
                  return (
                    <text
                      x={x}
                      y={y}
                      fontSize={12}
                      dy={Number(height) / 2 + 4}
                      dx={32 + Number(chartData[index!].count / 100)}
                      className="font-medium"
                    >
                      {value}
                    </text>
                  )
                }}
              />
              <LabelList
                dataKey="count"
                position="insideLeft"
                className="fill-foreground font-semibold"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}
