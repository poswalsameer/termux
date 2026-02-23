import { useState, useRef, useEffect } from "react"
import { Cursor } from "./Cursor"
import { useTerminalHistory } from "@/hooks/useTerminalHistory"

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
    <div className="flex items-center font-mono text-sm sm:text-base w-full mt-2">
      <span className="text-primary mr-2 flex-shrink-0">user@llm:~$</span>
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
        {/* Rendered output + cursor */}
        <span className="text-primary/90 whitespace-pre-wrap break-all pointer-events-none flex items-center min-h-[1.5rem]">
          {input}
          {!disabled && <Cursor />}
        </span>
      </div>
    </div>
  )
}
