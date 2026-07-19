import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate, Link } from "react-router"
import { Loader2 } from "lucide-react"
import { login, register } from "../api"

interface AuthPageProps {
  mode: "login" | "register"
}

export function AuthPage({ mode }: AuthPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: () => mode === "login" ? login(email, password) : register(email, password),
    onSuccess: (res) => {
      localStorage.setItem("token", res.data.token)
      navigate("/")
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error
        ?? "Something went wrong. Please try again."
      setError(msg)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    mutation.mutate()
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-5">
      {/* Brand */}
      <header className="text-center mb-10">
        <h1
          className="font-display font-black text-[var(--primary)] uppercase"
          style={{ fontSize: "clamp(28px,6vw,48px)", letterSpacing: "-0.04em", lineHeight: 1.1 }}
        >
          Yappinator <span className="text-[var(--outline)]">1000</span>
        </h1>
      </header>

      {/* Form card */}
      <main className="w-full max-w-[400px]">
      <div className="bg-[var(--surface-container)] border border-[var(--outline-variant)] rounded-sm p-8 flex flex-col gap-6">
        <h2 className="text-label-sm text-[var(--on-surface-variant)]">
          {mode === "login" ? "Sign in to your account" : "Create an account"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-label-sm text-[var(--on-surface-variant)]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-sm px-3 py-2.5 text-sm text-[var(--on-surface)] outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--outline)]"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-label-sm text-[var(--on-surface-variant)]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] rounded-sm px-3 py-2.5 text-sm text-[var(--on-surface)] outline-none focus:border-[var(--primary)] transition-colors placeholder:text-[var(--outline)]"
              placeholder={mode === "register" ? "At least 8 characters" : "••••••••"}
            />
          </div>

          {error && (
            <p className="text-sm text-[var(--error)]">{error}</p>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="mt-2 w-full bg-[var(--primary)] text-[var(--on-primary)] py-3 rounded-sm text-label-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {mutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--on-surface-variant)]">
          {mode === "login" ? (
            <>
              No account?{" "}
              <Link to="/register" className="text-[var(--primary)] hover:underline">
                Create one
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-[var(--primary)] hover:underline">
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
      </main>
    </div>
  )
}
