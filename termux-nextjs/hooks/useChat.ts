import { useState, useCallback } from "react"
import { ChatMessage } from "@/types/chat"
import { provider } from "@/lib/llm/provider"

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  const handleSystemCommand = useCallback((content: string) => {
    const cmd = content.trim().toLowerCase()

    if (cmd === "clear") {
      clearMessages()
      return true
    }

    if (cmd === "help") {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "system",
          content: "Available commands:\n  clear - clear the terminal\n  help  - show this help message\n  about - about this terminal",
          createdAt: new Date(),
        }
      ])
      return true
    }

    if (cmd === "about") {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "system",
          content: "System: Ghostty-inspired frontend LLM Terminal.\nVersion: 1.0.0\nArchitecture: Next.js App Router, Tailwind, Streaming UI.",
          createdAt: new Date(),
        }
      ])
      return true
    }

    return false // Not a system command
  }, [clearMessages])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isStreaming) return

    // 1. Add user message
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])

    // 2. Intercept local commands
    if (handleSystemCommand(content)) {
      return
    }

    // 3. Start assistant stream
    setIsStreaming(true)

    const assistantId = crypto.randomUUID()
    setMessages((prev) => [
      ...prev,
      {
        id: assistantId,
        role: "assistant",
        content: "",
        createdAt: new Date(),
      }
    ])

    try {
      const generator = provider.streamChat([userMsg]) // pass history if needed

      let chunkedContent = ""
      for await (const chunk of generator) {
        chunkedContent += chunk
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, content: chunkedContent } : msg
          )
        )
      }
    } catch (error) {
      console.error("Streaming failed:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "system",
          content: "Error: Failed to stream response from provider.",
          createdAt: new Date(),
        }
      ])
    } finally {
      setIsStreaming(false)
    }

  }, [isStreaming, handleSystemCommand])

  return {
    messages,
    isStreaming,
    sendMessage,
    clearMessages
  }
}
