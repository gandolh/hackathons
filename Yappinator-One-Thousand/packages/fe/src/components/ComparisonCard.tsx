import type React from "react"

interface ComparisonCardProps {
  title: string
  icon: React.ReactNode
  youValue: string
  otherValue: string
  youLabel?: string
  otherLabel?: string
}

export function ComparisonCard({
  title,
  icon,
  youValue,
  otherValue,
  youLabel = "You",
  otherLabel = "Other",
}: ComparisonCardProps) {
  return (
    <div className="bg-[var(--surface-container)] border border-[var(--outline-variant)] rounded-sm p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-[var(--on-surface-variant)]">{icon}</span>
        <h3 className="text-label-sm text-[var(--on-surface-variant)]">{title}</h3>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col flex-1">
          <span className="text-label-sm text-[var(--primary)] mb-2">{youLabel}</span>
          <span className="font-data text-[40px] font-bold leading-none text-[var(--primary)]">
            {youValue}
          </span>
        </div>
        <div className="w-px h-12 bg-[var(--outline-variant)] mx-4 self-center" />
        <div className="flex flex-col flex-1 items-end">
          <span className="text-label-sm text-[var(--secondary)] mb-2">{otherLabel}</span>
          <span className="font-data text-[40px] font-bold leading-none text-[var(--secondary)]">
            {otherValue}
          </span>
        </div>
      </div>
    </div>
  )
}
