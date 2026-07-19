import { Award, Clock, Heart, MessageSquare, Paperclip, BarChart2, Upload } from "lucide-react"
import { ComparisonCard } from "@/components/ComparisonCard"
import { RedFlagsCard } from "@/components/RedFlagsCard"
import { TopWordsCard } from "@/components/TopWordsCard"
import { MessagesPerMonthChart } from "@/components/MessagesPerMonthChart"
import { useConvStats } from "../hooks/useConvStats"

const icons = [
  <MessageSquare className="w-4 h-4" />,
  <Heart className="w-4 h-4" />,
  <Paperclip className="w-4 h-4" />,
  <Clock className="w-4 h-4" />,
  <Award className="w-4 h-4" />,
]

export default function Dashboard() {
  const { data } = useConvStats()
  const { comparisons, topWords, messagesPerMonth, redFlags } = data!

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-[var(--outline-variant)] bg-[var(--background)] flex items-center justify-between px-5 md:px-10">
        <span
          className="text-[var(--primary)] uppercase tracking-tighter font-display font-black"
          style={{ fontSize: 22, letterSpacing: "-0.04em" }}
        >
          Yappinator
        </span>
        <button
          className="text-label-sm text-[var(--on-surface-variant)] border border-[var(--outline-variant)] rounded-sm px-3 py-1.5 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
          onClick={() => {
            localStorage.removeItem("token")
            localStorage.removeItem("convId")
            window.location.href = "/"
          }}
        >
          Sign out
        </button>
      </header>

      <div className="flex flex-1 pt-16 md:pl-64">
        {/* Sidebar */}
        <nav className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] flex-col py-6 z-40">
          <div className="flex-1 flex flex-col gap-1 px-4">
            <div className="flex items-center gap-3 px-4 py-3 border-l-2 border-[var(--primary)] bg-[var(--surface-container-high)] rounded-r-sm">
              <BarChart2 className="w-4 h-4 text-[var(--primary)]" />
              <span className="text-label-sm text-[var(--primary)]">Dashboard</span>
            </div>
          </div>
          <div className="px-4 mt-auto">
            <button
              className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-[var(--on-primary)] px-4 py-3 rounded-sm text-label-sm hover:opacity-90 transition-opacity"
              onClick={() => {
                localStorage.removeItem("convId")
                window.location.href = "/"
              }}
            >
              <Upload className="w-4 h-4" />
              Upload New Chat
            </button>
          </div>
        </nav>

        {/* Main */}
        <main className="flex-1 p-5 md:p-10 max-w-[1200px] mx-auto w-full pb-24">
          <div className="mb-8">
            <h1 className="text-[var(--on-surface)] font-display font-bold text-2xl md:text-3xl mb-1">
              Chat Analysis
            </h1>
            <p className="text-sm text-[var(--on-surface-variant)]">
              Revealing the digital forensics of your conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisons.map(({ title, youValue, otherValue, youLabel, otherLabel }, i) => (
              <ComparisonCard
                key={i}
                title={title}
                icon={icons[i % icons.length]}
                youValue={youValue}
                otherValue={otherValue}
                youLabel={youLabel}
                otherLabel={otherLabel}
              />
            ))}
            <RedFlagsCard redFlags={redFlags} />
            <TopWordsCard person="you" words={topWords.you} />
            <TopWordsCard person="other" words={topWords.other} />

            {/* Chart — full width */}
            <div className="col-span-full bg-[var(--surface-container)] border border-[var(--outline-variant)] rounded-sm p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-label-sm text-[var(--on-surface-variant)]">Volume Over Time</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[var(--primary)]" style={{ borderRadius: 2 }} />
                    <span className="text-xs text-[var(--on-surface-variant)]">You</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[var(--secondary)]" style={{ borderRadius: 2 }} />
                    <span className="text-xs text-[var(--on-surface-variant)]">Other</span>
                  </div>
                </div>
              </div>
              <MessagesPerMonthChart data={messagesPerMonth} />
            </div>
          </div>
        </main>
      </div>

      <footer className="border-t border-[var(--outline-variant)] flex flex-col md:flex-row justify-between items-center px-5 md:px-10 py-6 md:ml-64">
        <span className="font-display font-black text-[var(--on-surface)] uppercase tracking-tighter text-sm" style={{ letterSpacing: "-0.04em" }}>
          Yappinator
        </span>
        <span className="text-label-sm text-[var(--outline)] mt-2 md:mt-0">
          © {new Date().getFullYear()} Yappinator One Thousand. No yapping left behind.
        </span>
      </footer>
    </div>
  )
}
