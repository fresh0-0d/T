"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  ChevronDown,
  Building2,
  Calendar,
  FileText,
  TrendingUp,
} from "lucide-react"
import { EmptyState } from "@/components/empty-state"

type InspectionStatus = "pending" | "approved" | "rejected" | "in_review"

interface InspectionItem {
  id: string
  company: string
  voucherType: string
  amount: string
  submittedDate: string
  status: InspectionStatus
}

const mockData: InspectionItem[] = [
  { id: "VCH-2026-001", company: "글로벌트레이드 주식회사", voucherType: "마케팅 바우처", amount: "15,000,000원", submittedDate: "2026-02-18", status: "pending" },
  { id: "VCH-2026-002", company: "코리아익스포트 (주)", voucherType: "물류 바우처", amount: "8,500,000원", submittedDate: "2026-02-17", status: "in_review" },
  { id: "VCH-2026-003", company: "한국디지털수출 주식회사", voucherType: "마케팅 바우처", amount: "12,000,000원", submittedDate: "2026-02-16", status: "approved" },
  { id: "VCH-2026-004", company: "아시아트레이드파트너스", voucherType: "디자인 바우처", amount: "5,200,000원", submittedDate: "2026-02-15", status: "rejected" },
  { id: "VCH-2026-005", company: "넥스트글로벌 (주)", voucherType: "통번역 바우처", amount: "3,800,000원", submittedDate: "2026-02-14", status: "pending" },
  { id: "VCH-2026-006", company: "스마트수출연구소", voucherType: "마케팅 바우처", amount: "20,000,000원", submittedDate: "2026-02-13", status: "approved" },
  { id: "VCH-2026-007", company: "프리미엄무역 주식회사", voucherType: "물류 바우처", amount: "9,100,000원", submittedDate: "2026-02-12", status: "in_review" },
]

const statusConfig: Record<InspectionStatus, { label: string; icon: React.ReactNode; bgClass: string; textClass: string; count: number }> = {
  pending: { label: "검수 대기", icon: <Clock size={20} />, bgClass: "bg-sand-beige", textClass: "text-foreground", count: mockData.filter(d => d.status === "pending").length },
  approved: { label: "승인 완료", icon: <CheckCircle2 size={20} />, bgClass: "bg-mint-cream", textClass: "text-foreground", count: mockData.filter(d => d.status === "approved").length },
  rejected: { label: "반려", icon: <XCircle size={20} />, bgClass: "bg-soft-coral/20", textClass: "text-foreground", count: mockData.filter(d => d.status === "rejected").length },
  in_review: { label: "검수중", icon: <Eye size={20} />, bgClass: "bg-lavender-mist", textClass: "text-foreground", count: mockData.filter(d => d.status === "in_review").length },
}

const statusBadgeConfig: Record<InspectionStatus, { label: string; className: string }> = {
  pending: { label: "대기", className: "bg-sand-beige text-foreground" },
  approved: { label: "승인", className: "bg-mint-cream text-foreground" },
  rejected: { label: "반려", className: "bg-soft-coral/20 text-foreground" },
  in_review: { label: "검수중", className: "bg-lavender-mist text-foreground" },
}

export function Dashboard({ onSelectItem }: { onSelectItem: (id: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<InspectionStatus | "all">("all")
  const [showFilter, setShowFilter] = useState(false)
  const [showEmpty] = useState(false)

  const filteredData = mockData.filter((item) => {
    const matchSearch = item.company.includes(searchQuery) || item.id.includes(searchQuery)
    const matchStatus = filterStatus === "all" || item.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-5xl mx-auto animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
          {'대시보드'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {'오늘도 바우처 검수 화이팅!'}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {(Object.entries(statusConfig) as [InspectionStatus, typeof statusConfig[InspectionStatus]][]).map(([key, config], idx) => (
          <button
            key={key}
            onClick={() => setFilterStatus(filterStatus === key ? "all" : key)}
            className={`group relative flex flex-col gap-2 rounded-2xl p-4 md:p-5 border border-border transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-blossom/10 ${
              filterStatus === key ? "ring-2 ring-primary shadow-lg shadow-primary/10" : ""
            } ${config.bgClass} animate-fade-in-up`}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <span className={`${config.textClass} opacity-70`}>{config.icon}</span>
              <TrendingUp size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-2xl md:text-3xl font-extrabold text-foreground">{config.count}</span>
              <span className="text-xs font-medium text-muted-foreground">{config.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="회사명 또는 바우처 번호 검색"
            className="w-full rounded-full border border-input bg-card px-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 rounded-full border border-input bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-accent transition-all"
          >
            <Filter size={16} />
            <span>{'필터'}</span>
            <ChevronDown size={14} className={`transition-transform ${showFilter ? "rotate-180" : ""}`} />
          </button>
          {showFilter && (
            <div className="absolute right-0 top-full mt-2 z-20 w-48 rounded-xl border border-border bg-card p-2 shadow-lg shadow-pink-blossom/10 animate-fade-in-up">
              <button
                onClick={() => { setFilterStatus("all"); setShowFilter(false); }}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${filterStatus === "all" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"}`}
              >
                {'전체 보기'}
              </button>
              {(Object.entries(statusConfig) as [InspectionStatus, typeof statusConfig[InspectionStatus]][]).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => { setFilterStatus(key); setShowFilter(false); }}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${filterStatus === key ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent"}`}
                >
                  {config.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Inspection List */}
      {showEmpty || filteredData.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-3">
          {filteredData.map((item, idx) => {
            const badge = statusBadgeConfig[item.status]
            return (
              <button
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-4 rounded-2xl border border-border bg-card p-4 md:p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-blossom/10 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${badge.className}`}>
                      {badge.label}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">{item.id}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.company}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText size={12} />
                      {item.voucherType}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 size={12} />
                      {item.amount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {item.submittedDate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                  <span className="text-xs font-medium hidden md:block">{'상세보기'}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
