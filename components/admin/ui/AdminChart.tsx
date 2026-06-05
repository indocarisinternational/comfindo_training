"use client"

import { Line, LineChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { AdminCard } from "./AdminCard"

interface ChartProps {
  data: Array<Record<string, string | number>>
  type?: "line" | "bar"
  dataKey: string
  xAxisKey: string
  height?: number
}

type AdminTooltipProps = {
  active?: boolean
  payload?: Array<{ value?: string | number }>
  label?: string | number
}

function AdminChartTooltip({ active, payload, label }: AdminTooltipProps) {
  if (active && payload?.length) {
    return (
      <AdminCard className="p-3 border-none !bg-[var(--popover)] !rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
        <p className="text-[12px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-1">{label}</p>
        <p className="text-[16px] font-bold text-[var(--foreground)] tracking-tight">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--primary)] mr-2" />
          {payload[0].value}
        </p>
      </AdminCard>
    )
  }
  return null
}

export function AdminChart({ data, type = "line", dataKey, xAxisKey, height = 300 }: ChartProps) {
  return (
    <div style={{ width: '100%', height: height }}>
      <ResponsiveContainer>
        {type === "line" ? (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey={xAxisKey} 
              stroke="var(--muted-foreground)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="var(--muted-foreground)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<AdminChartTooltip />} cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke="var(--primary)" 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 6, fill: "var(--primary)", stroke: "var(--background)", strokeWidth: 3 }}
            />
          </LineChart>
        ) : (
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey={xAxisKey} 
              stroke="var(--muted-foreground)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="var(--muted-foreground)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip content={<AdminChartTooltip />} cursor={{ fill: 'var(--secondary)' }} />
            <Bar 
              dataKey={dataKey} 
              fill="var(--primary)" 
              radius={[4, 4, 4, 4]} 
              barSize={32}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
