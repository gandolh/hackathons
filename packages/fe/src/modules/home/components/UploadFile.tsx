import { useState, useRef } from "react"
import { useMutation } from "@tanstack/react-query"
import { Upload, X, FileText, Loader2 } from "lucide-react"
import { parseWapp } from "../utils"
import { useNavigate } from "react-router"
import { sendFile } from "../api"

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const uploadMutation = useMutation({
    mutationFn: async (f: File) => {
      const text = await f.text()
      const parsed = parseWapp(text)
      return await sendFile(parsed)
    },
    onSuccess: (res) => {
      if (res.data.ID) localStorage.setItem("convId", res.data.ID)
      navigate("dashboard")
    },
  })

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped?.name.endsWith(".txt")) setFile(dropped)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0]
    if (picked) setFile(picked)
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center px-5 md:px-0">
      {/* Brand */}
      <header className="text-center mb-12">
        <h1
          className="font-display font-black text-[var(--primary)] uppercase mb-4"
          style={{ fontSize: "clamp(36px,8vw,64px)", letterSpacing: "-0.04em", lineHeight: 1.1 }}
        >
          Yappinator <span className="text-[var(--outline)]">1000</span>
        </h1>
        <p className="text-[var(--on-surface-variant)] text-base max-w-sm mx-auto leading-relaxed">
          Upload your chat history to reveal the digital forensics of your conversations.
          No yapping left behind.
        </p>
      </header>

      {/* Upload widget */}
      <div className="w-full max-w-[560px]">
        {/* Dropzone */}
        <div
          className="relative w-full border-2 border-dashed border-[var(--outline-variant)] bg-[var(--surface-container)] rounded-sm p-10 flex flex-col items-center justify-center gap-6 cursor-pointer transition-colors duration-200"
          style={dragging ? { borderColor: "var(--primary)", background: "var(--surface-container-high)" } : {}}
          onDragEnter={(e) => { e.preventDefault(); setDragging(true) }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !file && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".txt"
            className="hidden"
            onChange={handleChange}
          />

          {uploadMutation.isPending ? (
            <>
              <Loader2 className="w-12 h-12 text-[var(--primary)] animate-spin" />
              <p className="text-label-sm text-[var(--primary)] animate-pulse">
                Analyzing your yapping…
              </p>
            </>
          ) : file ? (
            <div className="flex items-center gap-3 w-full">
              <FileText className="w-8 h-8 text-[var(--primary)] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[var(--on-surface)] text-sm font-medium truncate">{file.name}</p>
                <p className="text-[var(--on-surface-variant)] text-xs">
                  {(file.size / 1024).toFixed(0)} KB
                </p>
              </div>
              <button
                className="text-[var(--on-surface-variant)] hover:text-[var(--error)] transition-colors p-1"
                onClick={(e) => { e.stopPropagation(); setFile(null) }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full border border-[var(--outline-variant)] bg-[var(--surface)] flex items-center justify-center">
                <Upload className="w-9 h-9 text-[var(--on-surface-variant)]" />
              </div>
              <div className="text-center">
                <p className="text-[var(--on-surface)] font-display font-bold text-xl mb-1">
                  Drop your .txt chat here
                </p>
                <p className="text-label-sm text-[var(--outline)]">
                  Exported WhatsApp logs only
                </p>
              </div>
            </>
          )}
        </div>

        {/* CTA */}
        <button
          className="mt-6 w-full bg-[var(--primary)] text-[var(--on-primary)] py-4 rounded-sm text-label-sm hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={!file || uploadMutation.isPending}
          onClick={() => file && uploadMutation.mutate(file)}
        >
          {uploadMutation.isPending ? "Analyzing…" : file ? "Analyze Chat" : "Select File Manually"}
        </button>

        {uploadMutation.isError && (
          <p className="mt-3 text-center text-sm text-[var(--error)]">
            Upload failed. Please try again.
          </p>
        )}

        <p className="mt-5 text-center text-label-sm text-[var(--outline)]">
          All processing happens on your server. Your yapping stays private.
        </p>
      </div>

      <footer className="fixed bottom-0 py-6 text-label-sm text-[var(--outline-variant)]">
        © {new Date().getFullYear()} Yappinator One Thousand
      </footer>
    </div>
  )
}
