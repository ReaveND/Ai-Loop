"use client"

import React, { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const COLORS: Record<string, string> = {
  POSITIVE: "#22C55E", // success-500
  NEUTRAL: "#8B94AD",  // neutral-500
  NEGATIVE: "#EF4444", // danger-500
}

interface SentimentChartProps {
  data: { name: string; value: number }[]
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-2 border border-borderStrong rounded-lg p-2.5 shadow-xl text-xs">
        <div className="flex items-center space-x-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: COLORS[payload[0].name] || "#8B92A6" }}
          />
          <span className="font-semibold text-textPrimary capitalize">
            {payload[0].name.toLowerCase()}
          </span>
        </div>
        <p className="mt-1 font-mono font-medium text-textSecondary">
          {payload[0].value.toLocaleString()} <span className="text-textTertiary">items</span>
        </p>
      </div>
    )
  }
  return null
}

export default function SentimentChart({ data }: SentimentChartProps) {
  const [hiddenCategories, setHiddenCategories] = useState<string[]>([])

  const visibleData = data.filter(entry => !hiddenCategories.includes(entry.name))
  const visibleTotal = visibleData.reduce((acc, curr) => acc + curr.value, 0)

  const toggleCategory = (category: string) => {
    setHiddenCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  return (
    <div className="flex flex-col h-[300px] w-full">
      <div className="relative flex-1">
        {/* Center Label for Donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-2">
          <span className="text-2xl font-bold text-textPrimary tabular-nums">
            {visibleTotal.toLocaleString()}
          </span>
          <span className="text-[11px] font-medium text-textSecondary uppercase tracking-wider">
            Total
          </span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={visibleData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={92}
              paddingAngle={3}
              dataKey="value"
              stroke="#0B0E17"
              strokeWidth={2}
            >
              {visibleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || "#8B92A6"} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Interactive Custom Legend */}
      <div className="flex items-center justify-center space-x-4 pt-2 border-t border-borderSubtle">
        {["POSITIVE", "NEUTRAL", "NEGATIVE"].map(category => {
          const isHidden = hiddenCategories.includes(category)
          return (
            <button
              key={category}
              type="button"
              onClick={() => toggleCategory(category)}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                isHidden
                  ? "opacity-40 line-through text-textTertiary bg-surface-1"
                  : "text-textSecondary hover:text-textPrimary bg-surface-2"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS[category] }}
              />
              <span className="capitalize">{category.toLowerCase()}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
