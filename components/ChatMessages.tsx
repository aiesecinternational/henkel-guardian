import { Card, CardContent } from "@/components/ui/card"
import type { GameState } from "../types/game"

interface ChatMessagesProps {
  gameState: GameState
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}

export function ChatMessages({ gameState, messagesEndRef }: ChatMessagesProps) {
  if (gameState.messages.length === 0) return null

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-600/50 mb-4 sm:mb-6 max-h-48 sm:max-h-60 overflow-y-auto mx-2 sm:mx-0">
      <CardContent className="p-3 sm:p-4 space-y-3">
        {gameState.messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-lg text-sm sm:text-base ${
                message.role === "user" ? "bg-[#E1000F] text-white" : "bg-slate-700 text-slate-100"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {gameState.isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 text-slate-100 p-2 sm:p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
    </Card>
  )
}
