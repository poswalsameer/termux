import { ChatMessage } from "@/types/chat"
import { LLMProvider } from "./types"
import { sleep } from "../utils/sleep"

const MOCK_RESPONSES = [
  "Initializing remote connection...\nAccess granted.\nWelcome to the ghostty-inspired terminal.\nHow can I assist you today?",
  "I've analyzed the system logs.\nEverything seems to be running within normal parameters.\nWould you like me to run a deeper diagnostic?",
  "Calculating vector trajectories...\n\nResult: 42.001\nConfidence: 99.9%\n\nLet me know if you need any other computations.",
  "Here is a brief summary of the available commands:\n\n- clear: Clears the terminal output\n- help: Shows available commands\n- about: Displays system info\n\nEnjoy the frontend-only streaming experience.",
]

export class MockProvider implements LLMProvider {
  async *streamChat(messages: ChatMessage[]): AsyncGenerator<string> {
    // Initial latency before starting the stream (200-600ms)
    const initialDelay = Math.floor(Math.random() * 400) + 200
    await sleep(initialDelay)

    // Pick a random mock response or provide a default fallback
    const text = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]
    const words = text.split(/(\s+)/) // Split keeping whitespace

    for (const token of words) {
      if (!token) continue

      // Yield each word/space piece
      yield token

      // Simulate character streaming latency
      // Sometimes "think" for a moment
      const isThinking = Math.random() > 0.95
      const delay = isThinking ? Math.floor(Math.random() * 500) + 200 : Math.floor(Math.random() * 50) + 10
      await sleep(delay)
    }
  }
}
