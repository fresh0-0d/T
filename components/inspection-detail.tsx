"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText,
  Download,
  CheckCircle2,
  XCircle,
  Save,
  MessageSquare,
  Image as ImageIcon,
  File,
} from "lucide-react"

interface ChecklistItem {
  id: string
  label: string
  checked: boolean
}

const mockCompanyInfo = {
  id: "VCH-2026-001",
  company: "글로벌트레이드 주식회사",
  representative: "김수출",
  businessNumber: "123-45-67890",
  phone: "02-1234-5678",
  email: "export@globaltrade.co.kr",
  address: "서울특별시 강남구 테헤란로 123, 무역센터 15층",
  voucherType: "마케팅 바우처",
  amount: "15,000,000원",
  submittedDate: "2026-02-18",
  category: "온라인 마케팅",
}

const mockDocuments = [
  { id: "1", name: "사업계획서.pdf", type: "pdf", size: "2.4 MB" },
  { id: "2", name: "수출실적증명서.pdf", type: "pdf", size: "1.1 MB" },
  { id: "3", name: "견적서_마케팅.xlsx", type: "xlsx", size: "856 KB" },
  { id: "4", name: "로고_시안.png", type: "image", size: "3.2 MB" },
  { id: "5", name: "계약서_최종.pdf", type: "pdf", size: "1.8 MB" },
]

const initialChecklist: ChecklistItem[] = [
  { id: "1", label: "사업자등록증 확인", checked: false },
  { id: "2", label: "수출실적 증빙자료 확인", checked: false },
  { id: "3", label: "바우처 사용계획서 검토", checked: false },
  { id: "4", label: "견적서 금액 적정성 확인", checked: false },
  { id: "5", label: "수행기관 적격 여부 확인", checked: false },
  { id: "6", label: "중복지원 여부 확인", checked: false },
  { id: "7", label: "제출서류 완전성 확인", checked: false },
]

export function InspectionDetail({ onBack }: { onBack: () => void }) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist)
  const [comment, setComment] = useState("")
  const [showConfirm, setShowConfirm] = useState<"approve" | "reject" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    )
  }

  const checkedCount = checklist.filter((item) => item.checked).length
  const progress = Math.round((checkedCount / checklist.length) * 100)

  const handleAction = async (action: "approve" | "reject") => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
    setShowConfirm(null)
    onBack()
  }

  const getDocIcon = (type: string) => {
    switch (type) {
      case "image": return <ImageIcon size={16} className="text-pink-blossom" />
      case "pdf": return <FileText size={16} className="text-destructive" />
      default: return <File size={16} className="text-muted-foreground" />
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-4xl mx-auto animate-fade-in-up">
      {/* Back button & Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-card border border-border text-foreground hover:bg-accent hover:-translate-y-0.5 transition-all"
          aria-label="뒤로가기"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl font-extrabold text-foreground tracking-tight">
            {'검수 상세'}
          </h1>
          <p className="text-xs text-muted-foreground font-mono">{mockCompanyInfo.id}</p>
        </div>
      </div>

      {/* Company Info Card */}
      <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm">
        <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
          <Building2 size={16} className="text-primary" />
          {'기업 정보'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "기업명", value: mockCompanyInfo.company },
            { label: "대표자", value: mockCompanyInfo.representative },
            { label: "사업자번호", value: mockCompanyInfo.businessNumber },
            { label: "바우처 유형", value: mockCompanyInfo.voucherType },
            { label: "신청 금액", value: mockCompanyInfo.amount },
            { label: "카테고리", value: mockCompanyInfo.category },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
              <span className="text-sm font-semibold text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Phone size={12} /> {mockCompanyInfo.phone}
          </span>
          <span className="flex items-center gap-1.5">
            <Mail size={12} /> {mockCompanyInfo.email}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} /> {mockCompanyInfo.address}
          </span>
        </div>
      </div>

      {/* Documents Section */}
      <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm">
        <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
          <FileText size={16} className="text-primary" />
          {'제출 서류'}
          <span className="ml-auto text-xs font-medium text-muted-foreground">{mockDocuments.length}{'개 파일'}</span>
        </h2>
        <div className="flex flex-col gap-2">
          {mockDocuments.map((doc) => (
            <div
              key={doc.id}
              className="group flex items-center gap-3 rounded-xl border border-border bg-background p-3 hover:bg-accent/50 transition-all"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary">
                {getDocIcon(doc.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.size}</p>
              </div>
              <button className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100" aria-label={`${doc.name} 다운로드`}>
                <Download size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist Section */}
      <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <CheckCircle2 size={16} className="text-primary" />
            {'검수 체크리스트'}
          </h2>
          <span className="ml-auto text-xs font-bold text-primary">
            {checkedCount}/{checklist.length}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="mb-4 h-2 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex flex-col gap-2">
          {checklist.map((item) => (
            <label
              key={item.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition-all ${
                item.checked
                  ? "border-primary/30 bg-pink-blossom-light/30"
                  : "border-border bg-background hover:bg-accent/50"
              }`}
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheck(item.id)}
                  className="sr-only"
                />
                <div
                  className={`flex items-center justify-center w-5 h-5 rounded-md border-2 transition-all ${
                    item.checked
                      ? "border-primary bg-primary"
                      : "border-input bg-card"
                  }`}
                >
                  {item.checked && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="animate-stamp">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className={`text-sm font-medium transition-colors ${item.checked ? "text-primary" : "text-foreground"}`}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Comment Section */}
      <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm">
        <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
          <MessageSquare size={16} className="text-primary" />
          {'검수 의견'}
        </h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="검수 의견을 입력해주세요..."
          rows={4}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-all resize-none leading-relaxed"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-3 pb-8">
        <button
          onClick={() => setShowConfirm("approve")}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
        >
          <CheckCircle2 size={16} />
          {'승인'}
        </button>
        <button
          onClick={() => setShowConfirm("reject")}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-destructive px-6 py-3.5 text-sm font-bold text-destructive-foreground shadow-md shadow-destructive/20 hover:shadow-lg hover:shadow-destructive/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
        >
          <XCircle size={16} />
          {'반려'}
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3.5 text-sm font-bold text-secondary-foreground hover:bg-accent hover:-translate-y-0.5 active:translate-y-0 transition-all">
          <Save size={16} />
          {'임시저장'}
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-2xl shadow-pink-blossom/20 border border-border animate-fade-in-up">
            <div className="flex flex-col items-center gap-4 text-center">
              {showConfirm === "approve" ? (
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-mint-cream">
                  <CheckCircle2 size={28} className="text-foreground" />
                </div>
              ) : (
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-soft-coral/20">
                  <XCircle size={28} className="text-destructive" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {showConfirm === "approve" ? "바우처를 승인할까요?" : "바우처를 반려할까요?"}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {showConfirm === "approve"
                    ? "승인 후에는 취소할 수 없어요"
                    : "반려 사유를 꼭 입력해주세요"}
                </p>
              </div>
              <div className="flex w-full gap-3">
                <button
                  onClick={() => setShowConfirm(null)}
                  className="flex-1 rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-secondary-foreground hover:bg-accent transition-all"
                >
                  {'취소'}
                </button>
                <button
                  onClick={() => handleAction(showConfirm)}
                  disabled={isSubmitting}
                  className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold transition-all disabled:opacity-70 ${
                    showConfirm === "approve"
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-destructive text-destructive-foreground shadow-md shadow-destructive/20"
                  }`}
                >
                  {isSubmitting ? "처리중..." : showConfirm === "approve" ? "승인하기" : "반려하기"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
