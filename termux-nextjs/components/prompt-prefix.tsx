export function PromptPrefix({ role }: { role: "user" | "assistant" }) {
  const isUser = role === "user"

  // Blue for user, Purple for assistant
  const bg = isUser ? "#79c0ff" : "#d2a8ff"
  const fg = "#0f1117"
  const text = isUser ? "user" : "assistant"

  return (
    <span className="inline-flex items-center mr-[13px] select-none h-[26px] leading-none text-[15px] font-bold">
      <span
        style={{
          backgroundColor: bg,
          color: fg,
          clipPath: "polygon(0 0, calc(100% - 13px) 0, 100% 50%, calc(100% - 13px) 100%, 0 100%)",
          paddingRight: "25px",
        }}
        className="flex items-center pl-3 h-full"
      >
        {text}
      </span>
    </span>
  )
}
