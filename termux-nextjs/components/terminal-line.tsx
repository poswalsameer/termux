import { ChatMessage } from "@/types"
import { PromptPrefix } from "./prompt-prefix"

interface TerminalLineProps {
  message: ChatMessage
  isLast?: boolean
  isStreaming?: boolean
}

export function TerminalLine({ message, isLast, isStreaming }: TerminalLineProps) {
  const getPrefix = () => {
    switch (message.role) {
      case "user":
        return <PromptPrefix role="user" />
      case "assistant":
        return <PromptPrefix role="assistant" />
      case "system":
        return null
    }
  }

  const getTextColor = () => {
    switch (message.role) {
      case "system": return "text-[#79c0ff]"
      case "user": return "text-[#79c0ff]"
      case "assistant": return "text-[#d2a8ff]"
      default: return "text-foreground"
    }
  }

  return (
    <div className={`font-mono text-sm sm:text-base leading-relaxed wrap-break-word whitespace-pre-wrap ${getTextColor()} flex items-start gap-1 sm:gap-0`}>
      <div className="shrink-0 pt-[2px]">
        {getPrefix()}
      </div>
      <div className="flex-1">
        {message.content ? (
          message.content
        ) : (
          isLast && isStreaming && message.role === "assistant" && (
            <span className="animate-pulse text-muted-foreground/70">Generating your response....</span>
          )
        )}
      </div>
    </div>
  )
}
