"use client"

import { GameState, Level } from "@/types/game"

import { LevelInfo } from "./LevelInfo"
import { CharacterIllustration } from "./CharacterIllustration"
import { ChatMessages } from "./ChatMessages"
import { ChatInput } from "./ChatInput"
import { Button } from "./ui/button"

interface GameContentProps {
  gameState: GameState
  currentLevelData: Level
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent, currentLevelData: Level) => void
  onNextLevel: () => void
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}

export function GameContent({
  gameState,
  currentLevelData,
  onInputChange,
  onSubmit,
  onNextLevel,
  messagesEndRef,
}: GameContentProps) {

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl w-full">
        <LevelInfo gameState={gameState} />

        <CharacterIllustration currentLevelData={currentLevelData} />

        <div className="text-center mb-6 sm:mb-8 px-4">
          <p className="text-white text-base sm:text-lg">
            Ask me a question!
          </p>
        </div>

        <ChatMessages gameState={gameState} messagesEndRef={messagesEndRef} />

        <ChatInput
          gameState={gameState}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          currentLevelData={currentLevelData}
        />

        {gameState.completedLevels.includes(gameState.currentLevel) && (
          <div className="mt-6 text-center">
            <Button onClick={onNextLevel} className="bg-henkel-yellow text-black hover:bg-amber-300 transition">
              🚀 Next Level
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
