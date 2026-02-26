import React from "react"

interface PromptPrefixProps {
  role: "user" | "assistant"
}

export function PromptPrefix({ role }: PromptPrefixProps) {
  // Use distinct colors for user vs assistant
  const isUser = role === "user"

  // Segment 1: user or assistant
  const seg1Bg = isUser ? "#79c0ff" : "#d2a8ff" // Blue for user, Purple for assistant
  const seg1Fg = "#0f1117"
  const seg1Text = isUser ? "user" : "assistant"

  // Segment 2: directory
  const seg2Bg = "#58a6ff" // Blue
  const seg2Fg = "#0f1117"
  const seg2Text = "~"

  return (
    <span className="inline-flex items-center mr-3 select-none h-[22px] leading-none text-[13px] font-bold">
      {/* Segment 1 */}
      <span
        style={{ backgroundColor: seg1Bg, color: seg1Fg }}
        className="relative flex items-center px-3 h-full z-20"
      >
        {seg1Text}
        {/* Powerline Arrow 1 */}
        <span
          className="absolute -right-[11px] top-0 w-0 h-0"
          style={{
            borderTop: "11px solid transparent",
            borderBottom: "11px solid transparent",
            borderLeft: `11px solid ${seg1Bg}`,
          }}
        />
      </span>

      {/* Segment 2 */}
      <span
        style={{ backgroundColor: seg2Bg, color: seg2Fg }}
        className="relative flex items-center pl-4 pr-3 h-full z-10"
      >
        {seg2Text}
        {/* Powerline Arrow 2 */}
        <span
          className="absolute -right-[11px] top-0 w-0 h-0"
          style={{
            borderTop: "11px solid transparent",
            borderBottom: "11px solid transparent",
            borderLeft: `11px solid ${seg2Bg}`,
          }}
        />
      </span>

      {/* Spacing after arrow */}
      <span className="w-2" />
    </span>
  )
}
