import OpenAI from "openai"
import { NextRequest } from "next/server"
import { systemPrompt } from "@/lib/system-prompt"

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY || "",
  baseURL: "https://integrate.api.nvidia.com/v1",
})

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const formattedMessages = messages.map((m: { role: "system" | "user" | "assistant", content: string }) => ({
      role: m.role,
      content: m.content,
    }))

    const finalMessages = [
      { role: "system", content: systemPrompt },
      ...formattedMessages,
    ] as OpenAI.Chat.ChatCompletionMessageParam[]

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: finalMessages,
      temperature: 1,
      top_p: 1,
      stream: true,
    })

    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            if (!chunk.choices) continue
            const content = chunk.choices[0]?.delta?.content || ""

            if (content) {
              controller.enqueue(encoder.encode(content))
            }
          }
        } catch (error) {
          console.error("Streaming error:", error)
          controller.error(error)
        } finally {
          controller.close()
        }
      },
      cancel() {
        // Stream aborted connection optionally handle
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
      },
    })
  } catch (error: unknown) {
    console.error("API error:", error)
    const err = error as Error
    return new Response(
      JSON.stringify({ error: err.message || "An error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
