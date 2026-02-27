import type { ChatMessage, LLMProvider } from "@/types"

export class ApiProvider implements LLMProvider {
  async *streamChat(messages: ChatMessage[]): AsyncGenerator<string> {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    })

    if (!response.ok) {
      const errBody = await response.text()
      throw new Error(`API returned error: ${response.status} ${errBody}`)
    }

    if (!response.body) {
      throw new Error("No response body available in stream")
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder("utf-8")

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }
        yield decoder.decode(value, { stream: true })
      }
    } finally {
      reader.releaseLock()
    }
  }
}

export const provider: LLMProvider = new ApiProvider()