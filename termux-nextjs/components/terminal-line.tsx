import { ChatMessage } from "@/types/chat"
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
    if (message.role === "system") return "text-muted"
    return "text-foreground/90"
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
