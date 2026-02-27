import { provider } from "@/api-client"
import type { ChatMessage } from "@/types"
import { useState, useCallback } from "react"

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
          content: (
            <span>
              System: Termux<br />
              Version: 1.0.0<br />
              Built By:{" "}
              <a
                href="https://sameerposwal.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Sameer Poswal
              </a>
              <br />
              Contribute Here:{" "}
              <a
                href="https://github.com/poswalsameer/termux"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                https://github.com/poswalsameer/termux
              </a>
            </span>
          ),
          createdAt: new Date(),
        }
      ])
      return true
    }

    return false
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

    if (handleSystemCommand(content)) {
      return
    }

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
      const generator = provider.streamChat([userMsg])

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
