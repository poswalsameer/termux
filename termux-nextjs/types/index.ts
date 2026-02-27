export type ChatMessage = {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  createdAt: Date
}

export type LLMProvider = {
  streamChat(messages: ChatMessage[]): AsyncGenerator<string>
}