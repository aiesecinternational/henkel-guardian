"use client"

import { GameCompletedModal } from "@/components/GameCompleteModal";
import { GameContent } from "@/components/GameContent";
import { Header } from "@/components/Header";
import { SuccessModal } from "@/components/SuccessModal";
import { levels } from "@/data/levels";
import { useGame } from "@/hooks/useGame";

export default function Home() {
  const { gameState, updateGameState, handleSubmit, handleNextLevel, resetGame, messagesEndRef } = useGame()

  const currentLevelData = levels.find((l) => l.id === gameState.currentLevel)!

  const handleInputChange = (value: string) => {
    updateGameState({ userInput: value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
       <Header />
       <div className="flex-1 flex flex-col min-w-0">
        <GameContent
            gameState={gameState}
            currentLevelData={currentLevelData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onNextLevel={handleNextLevel}
            messagesEndRef={messagesEndRef}
          />
       </div>
       
       {/* Modals */}
      <SuccessModal
        open={gameState.showSuccess}
        onOpenChange={(open) => updateGameState({ showSuccess: open })}
        currentLevelData={currentLevelData}
        currentLevel={gameState.currentLevel}
        onNextLevel={handleNextLevel}
      />

      <GameCompletedModal
        open={gameState.gameCompleted}
        onOpenChange={(open) => updateGameState({ gameCompleted: open })}
        onReset={resetGame}
      />
    </div>
  );
}