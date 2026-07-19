export function RedFlagsCard({ redFlags }: { redFlags: string[] }) {
  return (
    <div className="bg-[var(--surface-container)] border border-[var(--outline-variant)] rounded-sm p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h3 className="text-label-sm text-[var(--error)]">Conversational Red Flags</h3>
      </div>
      <ul className="flex flex-col gap-3 mt-1">
        {redFlags.map((flag, i) => (
          <li key={i} className="border-l-2 border-[var(--error)] pl-3 py-0.5">
            <span className="text-sm text-[var(--on-surface)]">{flag}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
