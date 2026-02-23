import { LLMProvider } from "./types"
import { MockProvider } from "./mockProvider"

// Swap this out with your real API provider (e.g. ApiProvider) in the future.
export const provider: LLMProvider = new MockProvider()
