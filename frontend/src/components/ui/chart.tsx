"use client"

import * as React from "react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface ChartProps {
    data: any[]
    children: React.ReactNode
}

export const ChartContainer = ({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) => {
    return <div className={className}>{children}</div>
}

export const Chart = ({ data, children }: ChartProps) => {
    // Extract all the dataKeys from ChartLine components
    const dataKeys: string[] = []
    const lineComponents: React.ReactElement[] = []
    const otherComponents: React.ReactElement[] = []

    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
            const props = child.props as { dataKey?: string }
            if (child.type === ChartLine) {
                if (props.dataKey) dataKeys.push(props.dataKey)
                lineComponents.push(child)
            } else {
                otherComponents.push(child)
            }
        }
    })

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                {otherComponents}
                {lineComponents}
            </LineChart>
        </ResponsiveContainer>
    )
}

interface ChartGridProps {
    x?: boolean
    y?: boolean
}

export const ChartGrid = ({ x = true, y = true }: ChartGridProps) => {
    return <CartesianGrid strokeDasharray="3 3" vertical={y} horizontal={x} />
}

interface ChartLineProps {
    dataKey: string
    stroke: string
    strokeWidth: number
    activeDot?: { r: number }
    name?: string
}

export const ChartLine = ({ dataKey, stroke, strokeWidth, activeDot, name }: ChartLineProps) => {
    return (
        <Line
            type="monotone"
            dataKey={dataKey}
            stroke={stroke}
            strokeWidth={strokeWidth}
            activeDot={activeDot}
            name={name || dataKey}
        />
    )
}

interface ChartXAxisProps {
    dataKey: string
}

export const ChartXAxis = ({ dataKey }: ChartXAxisProps) => {
    return <XAxis dataKey={dataKey} />
}

export const ChartYAxis = () => {
    return <YAxis />
}

export const ChartTooltip = ({ children: _children }: { children: React.ReactNode }) => {
    return (
        <Tooltip
            content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                    return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="font-medium">{label}</div>
                                {payload.map((entry, index) => (
                                    <div key={`item-${index}`} className="flex items-center gap-1">
                                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                        <span className="font-medium">{entry.name}:</span>
                                        <span>{entry.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }
                return null
            }}
        />
    )
}

export const ChartTooltipContent = () => {
    // This is a placeholder component as the actual content is handled by ChartTooltip
    return null
}

