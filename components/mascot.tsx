"use client"

export function MascotCharacter({ className = "", size = 120, mood = "happy" }: { className?: string; size?: number; mood?: "happy" | "thinking" | "sad" | "stamping" }) {
  const faceExpression = {
    happy: { leftEye: "M35 38 Q37 34 39 38", rightEye: "M51 38 Q53 34 55 38", mouth: "M38 50 Q45 57 52 50" },
    thinking: { leftEye: "M34 37 L40 37", rightEye: "M50 37 L56 37", mouth: "M40 52 Q45 50 50 52" },
    sad: { leftEye: "M35 38 Q37 34 39 38", rightEye: "M51 38 Q53 34 55 38", mouth: "M38 54 Q45 48 52 54" },
    stamping: { leftEye: "M34 36 L40 36", rightEye: "M50 36 L56 36", mouth: "M38 50 Q45 57 52 50" },
  }
  
  const face = faceExpression[mood]
  
  return (
    <svg viewBox="0 0 90 100" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="45" cy="70" rx="25" ry="22" fill="#FFD6E0" stroke="#E88CA5" strokeWidth="2" />
      {/* Head */}
      <circle cx="45" cy="42" r="24" fill="#FFE4EC" stroke="#E88CA5" strokeWidth="2" />
      {/* Blush */}
      <ellipse cx="32" cy="46" rx="5" ry="3" fill="#FFB3C6" opacity="0.5" />
      <ellipse cx="58" cy="46" rx="5" ry="3" fill="#FFB3C6" opacity="0.5" />
      {/* Eyes */}
      <path d={face.leftEye} stroke="#4A3548" strokeWidth="2.5" strokeLinecap="round" />
      <path d={face.rightEye} stroke="#4A3548" strokeWidth="2.5" strokeLinecap="round" />
      {/* Mouth */}
      <path d={face.mouth} stroke="#4A3548" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Document in hand */}
      <rect x="56" y="55" width="18" height="22" rx="3" fill="white" stroke="#E88CA5" strokeWidth="1.5" />
      <line x1="60" y1="61" x2="70" y2="61" stroke="#E88CA5" strokeWidth="1" />
      <line x1="60" y1="65" x2="70" y2="65" stroke="#E88CA5" strokeWidth="1" />
      <line x1="60" y1="69" x2="66" y2="69" stroke="#E88CA5" strokeWidth="1" />
      {/* Small check mark on document */}
      <path d="M64 72 L66 74 L70 70" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Small arm */}
      <path d="M60 62 Q65 58 68 60" stroke="#E88CA5" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Feet */}
      <ellipse cx="35" cy="90" rx="8" ry="5" fill="#FFD6E0" stroke="#E88CA5" strokeWidth="1.5" />
      <ellipse cx="55" cy="90" rx="8" ry="5" fill="#FFD6E0" stroke="#E88CA5" strokeWidth="1.5" />
      {/* Small crown / flower */}
      <circle cx="45" cy="20" r="4" fill="#FFB3C6" />
      <circle cx="39" cy="23" r="3" fill="#FFD6E0" />
      <circle cx="51" cy="23" r="3" fill="#FFD6E0" />
    </svg>
  )
}
