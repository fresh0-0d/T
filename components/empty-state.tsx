"use client"

import { MascotCharacter } from "@/components/mascot"

export function EmptyState({ message = "검수할 바우처가 없어요" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in-up">
      <div className="animate-float">
        <MascotCharacter size={140} mood="sad" />
      </div>
      <p className="mt-6 text-lg font-bold text-foreground">{message}</p>
      <div className="mt-2 flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="animate-sparkle"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
                fill="#E88CA5"
                opacity="0.5"
              />
            </svg>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {'새로운 바우처가 등록되면 알려드릴게요'}
      </p>
    </div>
  )
}
