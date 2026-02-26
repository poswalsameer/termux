import Header from "./header"
import { useEffect, useRef } from "react"
import { useChat } from "@/hooks/useChat"
import { TerminalLine } from "./terminal-line"
import { TerminalInput } from "./terminal-input"
import { TerminalWelcome } from "./terminal-welcome"


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
      className="flex flex-col rounded-3xl h-full w-full bg-zinc-950 text-primary overflow-hidden selection:bg-accent/30 selection:text-primary shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
    >
      <Header />

      {/* Terminal Content */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-4 p-4 sm:p-6 lg:p-8 pb-16 custom-scrollbar scroll-smooth"
      >
        {messages.length === 0 && <TerminalWelcome />}

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
