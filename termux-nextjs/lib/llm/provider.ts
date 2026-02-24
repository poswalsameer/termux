import { LLMProvider } from "./types"
import { ApiProvider } from "./apiProvider"

// Using the real API provider that connects to our Next.js backend route
export const provider: LLMProvider = new ApiProvider()
