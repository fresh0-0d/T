"use client"

import { MascotCharacter } from "@/components/mascot"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="animate-bounce-soft">
        <MascotCharacter size={100} mood="stamping" />
      </div>
      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-base font-bold text-foreground animate-pulse-soft">
          {'검수중...'}
        </p>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce-soft"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
