"use client"

import { useState, useEffect } from "react"
import { LoginScreen } from "@/components/login-screen"
import { Dashboard } from "@/components/dashboard"
import { InspectionDetail } from "@/components/inspection-detail"
import { AppHeader } from "@/components/app-header"
import { LoadingScreen } from "@/components/loading-screen"
import { FloatingPatterns } from "@/components/floating-patterns"

type AppView = "login" | "dashboard" | "detail"

export default function Home() {
  const [view, setView] = useState<AppView>("login")
  const [isLoading, setIsLoading] = useState(true)
  const [, setSelectedItem] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setView("dashboard")
      setIsLoading(false)
    }, 800)
  }

  const handleLogout = () => {
    setView("login")
  }

  const handleSelectItem = (id: string) => {
    setSelectedItem(id)
    setView("detail")
  }

  const handleBackToDashboard = () => {
    setView("dashboard")
    setSelectedItem(null)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (view === "login") {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <div className="relative min-h-screen">
      <FloatingPatterns />
      <div className="relative z-10">
        <AppHeader onLogout={handleLogout} />
        <main>
          {view === "dashboard" && (
            <Dashboard onSelectItem={handleSelectItem} />
          )}
          {view === "detail" && (
            <InspectionDetail onBack={handleBackToDashboard} />
          )}
        </main>
      </div>
    </div>
  )
}
