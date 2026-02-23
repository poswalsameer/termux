import { useEffect, useRef } from "react"
import { useChat } from "@/hooks/useChat"
import { TerminalLine } from "./TerminalLine"
import { TerminalInput } from "./TerminalInput"

export function Terminal() {
  const { messages, isStreaming, sendMessage } = useChat()
  const bottomRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll logic
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, isStreaming])

  return (
    <div
      className="flex flex-col h-screen w-full bg-background text-primary overflow-hidden p-4 sm:p-6 lg:p-10 selection:bg-accent/30 selection:text-primary"
    >
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-4 pb-16 custom-scrollbar scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="text-muted font-mono mb-6">
            <p>Welcome to the AI Terminal.</p>
            <p>Type `&apos;`help&apos;` for available commands.</p>
            <p className="mt-4">Loading system definitions... [OK]</p>
            <p>Establishing LLM link... [OK]</p>
          </div>
        )}

        {messages.map((msg, idx) => {
          const isLast = idx === messages.length - 1
          return (
            <TerminalLine
              key={msg.id}
              message={msg}
              isLast={isLast}
              isStreaming={isStreaming}
            />
          )
        })}

        <TerminalInput onSubmit={sendMessage} disabled={isStreaming} />

        <div ref={bottomRef} className="h-4 w-full" />
      </div>
    </div>
  )
}
