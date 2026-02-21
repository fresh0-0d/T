"use client"

export function FloatingPatterns() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Floating circles */}
      <div className="absolute top-[10%] left-[5%] w-32 h-32 rounded-full bg-pink-blossom/5 animate-float" />
      <div className="absolute top-[30%] right-[10%] w-24 h-24 rounded-full bg-lavender-mist/40 animate-float delay-200" />
      <div className="absolute bottom-[20%] left-[15%] w-20 h-20 rounded-full bg-sand-beige/50 animate-float delay-400" />
      <div className="absolute top-[60%] right-[5%] w-16 h-16 rounded-full bg-pink-blossom-light/40 animate-float delay-300" />
      <div className="absolute bottom-[10%] right-[20%] w-28 h-28 rounded-full bg-mint-cream/30 animate-float delay-100" />
      
      {/* Sparkles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-sparkle"
          style={{
            top: `${15 + i * 15}%`,
            left: `${10 + i * 16}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="#E88CA5" opacity="0.3" />
          </svg>
        </div>
      ))}
    </div>
  )
}
