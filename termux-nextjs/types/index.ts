import { ReactNode } from "react"

export type ChatMessage = {
  id: string
  role: "user" | "assistant" | "system"
  content: string | ReactNode
  createdAt: Date
}

export type LLMProvider = {
  streamChat(messages: ChatMessage[]): AsyncGenerator<string>
}