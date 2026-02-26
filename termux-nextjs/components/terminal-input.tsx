import { useState, useRef, useEffect } from "react"
import { useTerminalHistory } from "@/hooks/useTerminalHistory"
import { Cursor } from "./cursor"
import { PromptPrefix } from "./prompt-prefix"

interface TerminalInputProps {
  onSubmit: (text: string) => void
  disabled?: boolean
}

export function TerminalInput({ onSubmit, disabled }: TerminalInputProps) {
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const { addToHistory, getNextCommand, getPreviousCommand, resetHistoryIndex } = useTerminalHistory()

  // Keep focus on input if clicking anywhere
  useEffect(() => {
    const handleGlobalClick = () => {
      inputRef.current?.focus()
    }
    document.addEventListener("click", handleGlobalClick)
    return () => document.removeEventListener("click", handleGlobalClick)
  }, [])

  // Auto-focus when input becomes enabled again
  useEffect(() => {
    if (!disabled) {
      // Small timeout to ensure the input is re-rendered as enabled before focusing
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [disabled])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !disabled && input.trim()) {
      onSubmit(input)
      addToHistory(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const prev = getPreviousCommand()
      if (prev !== null) setInput(prev)
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const next = getNextCommand()
      setInput(next)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    resetHistoryIndex()
  }

  return (
    <div className="flex items-center font-mono text-sm sm:text-base w-full mt-2 relative">
      <div className="shrink-0 flex items-center pr-3">
        <PromptPrefix role="user" />
      </div>
      <div className="relative flex-1 flex items-center">
        {/* Hidden physical input for focus & mobile keyboards */}
        <input
          ref={inputRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="absolute inset-0 opacity-0 w-full h-full cursor-text"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <span className="text-[#79c0ff] whitespace-pre-wrap break-all pointer-events-none flex items-center min-h-6">
          {input}
          {!disabled && <Cursor />}
        </span>
      </div>
    </div>
  )
}
