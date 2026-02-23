import { ChatMessage } from "@/types/chat"

export interface LLMProvider {
  streamChat(messages: ChatMessage[]): AsyncGenerator<string>
}
