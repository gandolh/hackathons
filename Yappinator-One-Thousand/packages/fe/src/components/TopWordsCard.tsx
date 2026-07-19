interface TopWordsCardProps {
  person: "you" | "other"
  words: { word: string; count: number }[]
}

export function TopWordsCard({ person, words }: TopWordsCardProps) {
  const isYou = person === "you"
  const color = isYou ? "var(--primary)" : "var(--secondary)"
  const label = isYou ? "You" : "Other"
  const max = words[0]?.count || 1

  return (
    <div className="bg-[var(--surface-container)] border border-[var(--outline-variant)] rounded-sm p-6 flex flex-col gap-4">
      <h3 className="text-label-sm text-[var(--on-surface-variant)]">
        Top Words — <span style={{ color }}>{label}</span>
      </h3>
      <div className="flex flex-col gap-3 mt-1">
        {words.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-20 text-sm text-[var(--on-surface)] text-right truncate font-body">
              {item.word}
            </span>
            <div className="flex-1 h-5 bg-[var(--surface-container-high)]">
              <div
                className="h-full"
                style={{ width: `${(item.count / max) * 100}%`, backgroundColor: color }}
              />
            </div>
            <span className="w-8 text-xs font-data text-[var(--on-surface-variant)] text-right">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
