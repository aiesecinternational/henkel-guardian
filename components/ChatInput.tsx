"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import type { GameState, Level } from "../types/game"

interface ChatInputProps {
  gameState: GameState
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent, currentLevelData: Level) => void
  currentLevelData: Level
}

export function ChatInput({ gameState, onInputChange, onSubmit, currentLevelData }: ChatInputProps) {
  return (
    <form onSubmit={(e) => onSubmit(e, currentLevelData)} className="relative mx-2 sm:mx-0">
      <Input
        value={gameState.userInput}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Ask Henkel Guard a question..."
        className="bg-slate-800/50 backdrop-blur-sm border-slate-600/50 text-white placeholder-slate-400 pr-12 sm:pr-14 h-12 sm:h-14 text-sm sm:text-lg"
        disabled={gameState.isLoading}
      />
      <Button
        type="submit"
        disabled={!gameState.userInput.trim() || gameState.isLoading}
        className="absolute right-2 top-2 sm:top-3 bg-[#E1000F] hover:bg-[#E1000F]/80 text-white h-8 w-8 sm:h-8 sm:w-8 p-0"
      >
        <Send className="w-3 h-3 sm:w-4 sm:h-4" />
      </Button>
    </form>
  )
}
