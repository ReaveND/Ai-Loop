"use client"

import React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface VolumeChartProps {
  data: { date: string; count: number }[]
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-2 border border-borderStrong rounded-lg p-2.5 shadow-xl text-xs">
        <p className="font-semibold text-textPrimary mb-0.5">{label}</p>
        <p className="text-accent-400 font-mono font-medium">
          {payload[0].value} <span className="text-textSecondary">feedback items</span>
        </p>
      </div>
    )
  }
  return null
}

export default function VolumeChart({ data }: VolumeChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    displayDate: new Date(item.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
  }))

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData} margin={{ top: 10, right: 20, bottom: 5, left: -10 }}>
          <defs>
            <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B5BFF" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#3B5BFF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1D243A" vertical={false} strokeWidth={1} />
          <XAxis
            dataKey="displayDate"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9AA3B8", fontSize: 11 }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9AA3B8", fontSize: 11 }}
            dx={-8}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#3B5BFF"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#volumeGradient)"
            activeDot={{ r: 5, fill: "#3B5BFF", stroke: "#F4F6FB", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
