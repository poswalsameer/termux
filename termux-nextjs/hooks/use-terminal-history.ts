import { useState, useCallback } from "react"

export function useTerminalHistory() {
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const addToHistory = useCallback((command: string) => {
    if (!command.trim()) return
    setHistory((prev) => [command, ...prev])
    setHistoryIndex(-1)
  }, [])

  const getPreviousCommand = useCallback(() => {
    if (history.length === 0) return null
    const nextIndex = Math.min(historyIndex + 1, history.length - 1)
    setHistoryIndex(nextIndex)
    return history[nextIndex]
  }, [history, historyIndex])

  const getNextCommand = useCallback(() => {
    if (historyIndex <= 0) {
      setHistoryIndex(-1)
      return "" // Reset to empty input when hitting the bottom
    }
    const nextIndex = historyIndex - 1
    setHistoryIndex(nextIndex)
    return history[nextIndex]
  }, [historyIndex, history])

  const resetHistoryIndex = useCallback(() => {
    setHistoryIndex(-1)
  }, [])

  return {
    addToHistory,
    getPreviousCommand,
    getNextCommand,
    resetHistoryIndex
  }
}
