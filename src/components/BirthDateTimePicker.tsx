import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { SajuGlyph } from "./SajuGlyphs"

interface BirthDateTimePickerProps {
  birthdate: string
  birthtime: string
  unknownTime: boolean
  birthdateError?: string
  birthtimeError?: string
  onBirthdateChange: (value: string) => void
  onBirthtimeChange: (value: string) => void
  onClearBirthdateError: () => void
  onClearBirthtimeError: () => void
}

const weekDays = ["일", "월", "화", "수", "목", "금", "토"]
const yearOptions = Array.from({ length: 57 }, (_, index) => 2026 - index)
const monthOptions = Array.from({ length: 12 }, (_, index) => index)

const timeSlots = [
  { label: "자시", value: "00:00", range: "23-01" },
  { label: "축시", value: "02:00", range: "01-03" },
  { label: "인시", value: "04:00", range: "03-05" },
  { label: "묘시", value: "06:00", range: "05-07" },
  { label: "진시", value: "08:00", range: "07-09" },
  { label: "사시", value: "10:00", range: "09-11" },
  { label: "오시", value: "12:00", range: "11-13" },
  { label: "미시", value: "14:00", range: "13-15" },
  { label: "신시", value: "16:00", range: "15-17" },
  { label: "유시", value: "18:00", range: "17-19" },
  { label: "술시", value: "20:00", range: "19-21" },
  { label: "해시", value: "22:00", range: "21-23" },
]

function parseDate(value: string) {
  if (!value) return null
  const [year, month, day] = value.split("-").map(Number)
  if (!year || !month || !day) return null
  return { year, month: month - 1, day }
}

function toDateValue(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function getMonthDays(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function shiftMonth(year: number, month: number, amount: number) {
  const next = new Date(year, month + amount, 1)
  return { year: next.getFullYear(), month: next.getMonth() }
}

function clampYear(year: number) {
  return Math.max(1970, Math.min(2026, year))
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-full bg-white/70 text-[#7a421b] ring-1 ring-[#efcfac]/80 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.96]"
    >
      {children}
    </button>
  )
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function BirthDateTimePicker({
  birthdate,
  birthtime,
  unknownTime,
  birthdateError,
  birthtimeError,
  onBirthdateChange,
  onBirthtimeChange,
  onClearBirthdateError,
  onClearBirthtimeError,
}: BirthDateTimePickerProps) {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [yearMonthOpen, setYearMonthOpen] = useState(false)
  const selected = parseDate(birthdate)
  const [viewYear, setViewYear] = useState(selected?.year ?? 2003)
  const [viewMonth, setViewMonth] = useState(selected?.month ?? 2)
  const displayYear = viewYear
  const displayMonth = viewMonth
  const firstDay = new Date(displayYear, displayMonth, 1).getDay()
  const totalDays = getMonthDays(displayYear, displayMonth)
  const calendarCells = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: totalDays }, (_, index) => index + 1),
  ]

  const goMonth = (amount: number) => {
    const next = shiftMonth(displayYear, displayMonth, amount)
    if (next.year < 1970) {
      setViewYear(1970)
      setViewMonth(0)
      return
    }
    if (next.year > 2026) {
      setViewYear(2026)
      setViewMonth(11)
      return
    }
    setViewYear(clampYear(next.year))
    setViewMonth(next.month)
  }

  const selectYearMonth = (year: number, month: number) => {
    setViewYear(year)
    setViewMonth(month)
  }

  const selectedLabel = selected
    ? `${selected.year}년 ${selected.month + 1}월 ${selected.day}일`
    : "생년월일을 골라주세요"

  useEffect(() => {
    if (birthdateError) setCalendarOpen(true)
  }, [birthdateError])

  useEffect(() => {
    if (!selected) return
    setViewYear(selected.year)
    setViewMonth(selected.month)
  }, [birthdate])

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-bold" style={{ color: "#a0673a" }}>
            생년월일
          </label>
          <button
            type="button"
            onClick={() => setCalendarOpen((value) => !value)}
            className="rounded-full bg-[#fff7eb] px-3 py-1 text-[11px] font-black ring-1 ring-[#efcfac]/75 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
            style={{ color: birthdate ? "#d4763b" : "#b08060" }}
          >
            {selectedLabel}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setCalendarOpen((value) => !value)}
          className="flex w-full items-center gap-3 rounded-[1.35rem] px-4 py-3 text-left transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
          style={{
            background: birthdateError ? "#fff0f0" : "#fdf6ec",
            border: `2px solid ${birthdateError ? "#f87171" : birthdate ? "#d4763b" : "#f0d4b0"}`,
            color: "#3d1f08",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.8)",
          }}
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/65 ring-1 ring-[#efcfac]/75">
            <SajuGlyph name={birthdate ? "spark" : "moon"} size={22} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-base font-black leading-tight">{selectedLabel}</span>
            <span className="mt-0.5 block text-xs font-bold text-[#b08060]">
              {calendarOpen ? "아래 날짜판에서 선택하세요" : "탭해서 날짜판 열기"}
            </span>
          </span>
          <span
            className="grid h-8 w-8 place-items-center rounded-full bg-white/60 text-[#a0673a] ring-1 ring-[#efcfac]/70 transition-transform duration-500"
            style={{ transform: calendarOpen ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            <Arrow direction="right" />
          </span>
        </button>

        {calendarOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -8 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
            className="mt-2 overflow-hidden rounded-[1.35rem] p-3"
            style={{
              background: "#fdf6ec",
              border: "2px solid #f0d4b0",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.8)",
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <IconButton label="이전 달" onClick={() => goMonth(-1)}>
                <Arrow direction="left" />
              </IconButton>
              <button
                type="button"
                onClick={() => setYearMonthOpen((value) => !value)}
                className="rounded-2xl bg-white/60 px-5 py-2 text-center ring-1 ring-[#efcfac]/70 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
              >
                <div className="text-lg font-black leading-none text-[#3d1f08]">
                  {displayYear}.{String(displayMonth + 1).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#b08060]">
                  {yearMonthOpen ? "select year / month" : "tap to change"}
                </div>
              </button>
              <IconButton label="다음 달" onClick={() => goMonth(1)}>
                <Arrow direction="right" />
              </IconButton>
            </div>

            {yearMonthOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.34, ease: [0.32, 0.72, 0, 1] }}
                className="mb-3 rounded-[1.1rem] bg-white/45 p-2 ring-1 ring-[#efcfac]/70"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#b08060]">
                    year
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#b08060]">
                    month
                  </span>
                </div>
                <div className="grid grid-cols-[1fr_96px] gap-2">
                  <div className="grid max-h-[132px] grid-cols-3 gap-1 overflow-y-auto pr-1">
                    {yearOptions.map((year) => {
                      const active = year === displayYear
                      return (
                        <button
                          key={year}
                          type="button"
                          onClick={() => selectYearMonth(year, displayMonth)}
                          className="rounded-xl px-1 py-2 text-xs font-black transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.96]"
                          style={{
                            background: active ? "#d4763b" : "rgba(253,246,236,0.8)",
                            color: active ? "#fffaf1" : "#7a421b",
                          }}
                        >
                          {year}
                        </button>
                      )
                    })}
                  </div>
                  <div className="grid max-h-[132px] grid-cols-2 gap-1 overflow-y-auto">
                    {monthOptions.map((month) => {
                      const active = month === displayMonth
                      return (
                        <button
                          key={month}
                          type="button"
                          onClick={() => {
                            selectYearMonth(displayYear, month)
                            setYearMonthOpen(false)
                          }}
                          className="rounded-xl py-2 text-xs font-black transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.96]"
                          style={{
                            background: active ? "#d4763b" : "rgba(253,246,236,0.8)",
                            color: active ? "#fffaf1" : "#7a421b",
                          }}
                        >
                          {month + 1}월
                        </button>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            <div className="mb-1 grid grid-cols-7 gap-1">
              {weekDays.map((day) => (
                <div key={day} className="py-1 text-center text-[10px] font-black text-[#b08060]">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarCells.map((day, index) => {
                const isSelected =
                  Boolean(selected) &&
                  selected?.year === displayYear &&
                  selected.month === displayMonth &&
                  selected.day === day

                return day ? (
                  <motion.button
                    key={`${displayYear}-${displayMonth}-${day}`}
                    type="button"
                    onClick={() => {
                      onBirthdateChange(toDateValue(displayYear, displayMonth, day))
                      onClearBirthdateError()
                      setCalendarOpen(false)
                    }}
                    whileTap={{ scale: 0.92 }}
                    className="relative grid aspect-square place-items-center rounded-xl text-sm font-black transition-colors duration-300"
                    style={{
                      background: isSelected ? "#d4763b" : "rgba(255,255,255,0.55)",
                      color: isSelected ? "#fffaf1" : "#6b3f1f",
                      boxShadow: isSelected ? "0 8px 18px rgba(180,80,30,0.28)" : "none",
                    }}
                  >
                    {day}
                    {isSelected && (
                      <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-[#f1b461] ring-2 ring-[#fdf6ec]">
                        <SajuGlyph name="spark" size={9} />
                      </span>
                    )}
                  </motion.button>
                ) : (
                  <div key={`empty-${index}`} />
                )
              })}
            </div>
          </motion.div>
        )}
        {birthdateError && (
          <p className="mt-1 text-xs font-semibold" style={{ color: "#ef4444" }}>
            {birthdateError}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold" style={{ color: "#a0673a" }}>
          태어난 시간
        </label>
        <div
          className="grid max-h-[120px] grid-cols-3 gap-1.5 overflow-y-auto rounded-[1.35rem] p-2"
          style={{
            background: unknownTime ? "#f5ede3" : birthtimeError ? "#fff0f0" : "#fdf6ec",
            border: `2px solid ${
              birthtimeError && !unknownTime
                ? "#f87171"
                : birthtime && !unknownTime
                  ? "#d4763b"
                  : "#f0d4b0"
            }`,
            opacity: unknownTime ? 0.5 : 1,
          }}
        >
          {timeSlots.map((slot) => {
            const active = birthtime === slot.value && !unknownTime
            return (
              <button
                key={slot.value}
                type="button"
                disabled={unknownTime}
                onClick={() => {
                  onBirthtimeChange(slot.value)
                  onClearBirthtimeError()
                }}
                className="rounded-2xl px-2 py-2 text-left transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.96] disabled:cursor-not-allowed"
                style={{
                  background: active ? "#d4763b" : "rgba(255,255,255,0.56)",
                  color: active ? "#fffaf1" : "#6b3f1f",
                  boxShadow: active ? "0 8px 18px rgba(180,80,30,0.22)" : "none",
                }}
              >
                <span className="block text-sm font-black leading-none">{slot.label}</span>
                <span className="mt-1 block text-[10px] font-bold opacity-70">{slot.range}</span>
              </button>
            )
          })}
        </div>
        {birthtimeError && (
          <p className="mt-1 text-xs font-semibold" style={{ color: "#ef4444" }}>
            {birthtimeError}
          </p>
        )}
      </div>
    </div>
  )
}
