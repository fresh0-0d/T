"use client"

import { useState } from "react"
import { MascotCharacter } from "@/components/mascot"
import { FloatingPatterns } from "@/components/floating-patterns"
import { Eye, EyeOff, LogIn } from "lucide-react"

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setIsLoading(false)
    onLogin()
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-8">
      <FloatingPatterns />
      
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Mascot */}
        <div className="mb-6 flex flex-col items-center">
          <div className="animate-bounce-soft">
            <MascotCharacter size={130} mood={isLoading ? "stamping" : "happy"} />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-foreground tracking-tight text-balance text-center">
            {'Welcome! \uD83C\uDF38'}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground text-center">
            {'수출바우처 검수 시스템에 오신 것을 환영해요'}
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl bg-card p-8 shadow-lg shadow-pink-blossom/10 border border-border">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-foreground">
                {'이메일'}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@company.com"
                className="rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-semibold text-foreground">
                {'비밀번호'}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-input accent-pink-blossom" />
                <span className="text-xs text-muted-foreground">{'로그인 유지'}</span>
              </label>
              <button type="button" className="text-xs text-primary hover:text-pink-blossom-dark transition-colors font-medium">
                {'비밀번호 찾기'}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="animate-stamp inline-block">{'검수중...'}</span>
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  <span>{'로그인'}</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">{'또는'}</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:bg-accent hover:-translate-y-0.5 transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>{'Google로 계속하기'}</span>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {'계정이 없으신가요? '}
          <button className="text-primary font-semibold hover:text-pink-blossom-dark transition-colors">
            {'회원가입'}
          </button>
        </p>
      </div>
    </div>
  )
}
