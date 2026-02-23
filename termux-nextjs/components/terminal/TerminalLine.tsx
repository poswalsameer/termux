import { ChatMessage } from "@/types/chat"
import { Cursor } from "./Cursor"

interface TerminalLineProps {
  message: ChatMessage
  isLast?: boolean
  isStreaming?: boolean
}

export function TerminalLine({ message, isLast, isStreaming }: TerminalLineProps) {
  const getPrefix = () => {
    switch (message.role) {
      case "user":
        return <span className="text-primary mr-2">user@llm:~$</span>
      case "assistant":
        return <span className="text-accent mr-2">assistant@llm:~$</span>
      case "system":
        return null
    }
  }

  const getTextColor = () => {
    if (message.role === "system") return "text-muted"
    return "text-primary/90"
  }

  return (
    <div className={`font-mono text-sm sm:text-base leading-relaxed break-words whitespace-pre-wrap ${getTextColor()}`}>
      {getPrefix()}
      {message.content}
      {isLast && isStreaming && message.role === "assistant" && <Cursor />}
    </div>
  )
}
