"use client"

import { LayoutDashboard, Bell, User, LogOut } from "lucide-react"
import { MascotCharacter } from "@/components/mascot"

export function AppHeader({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <MascotCharacter size={32} mood="happy" />
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-foreground leading-tight tracking-tight">
              {'수출바우처'}
            </span>
            <span className="text-[10px] font-medium text-muted-foreground leading-tight">
              {'검수 시스템'}
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <button className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-all">
            <LayoutDashboard size={16} />
            {'대시보드'}
          </button>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button className="relative flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all" aria-label="알림">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all" aria-label="프로필">
            <User size={18} />
          </button>
          <button
            onClick={onLogout}
            className="flex items-center justify-center w-10 h-10 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
            aria-label="로그아웃"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
