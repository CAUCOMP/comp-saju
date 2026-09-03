import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { FortuneResult } from "../types/fortune"
import { GlyphBadge, SajuGlyph, ScoreSigils } from "../components/SajuGlyphs"
import type { GlyphName } from "../components/SajuGlyphs"

interface Props {
  name: string
  result: FortuneResult
  onRestart: () => void
}

interface CardProps {
  icon: GlyphName
  title: string
  content: string
  accent?: string
  delay?: number
}

function ResultCard({ icon, title, content, accent, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 280, damping: 24 }}
      className="rounded-2xl p-4"
      style={{
        background: accent ?? "rgba(255,255,255,0.75)",
        boxShadow: "0 2px 12px rgba(107,63,31,0.08)",
      }}
    >
      <div className="mb-2 flex items-center gap-2">
        <GlyphBadge name={icon} size={19} className="rounded-xl p-1" />
        <p className="text-xs font-bold" style={{ color: "#a0673a" }}>
          {title}
        </p>
      </div>
      <p
        className="text-base font-black leading-snug"
        style={{ color: "#3d1f08" }}
      >
        {content}
      </p>
    </motion.div>
  )
}

type DetailKey = "score" | "role" | "warning" | "advice"

interface DetailToggleProps {
  id: DetailKey
  title: string
  content: string
  openId: DetailKey | null
  onToggle: (id: DetailKey) => void
}

function DetailToggle({
  id,
  title,
  content,
  openId,
  onToggle,
}: DetailToggleProps) {
  const isOpen = openId === id

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.58)",
        border: "1.5px solid rgba(240,212,176,0.9)",
      }}
    >
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="text-sm font-black" style={{ color: "#4a2c0f" }}>
          {title}
        </span>
        <span
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-base font-black transition-transform"
          style={{
            color: "#d4763b",
            background: "rgba(255,246,236,0.9)",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
          >
            <p
              className="px-4 pb-4 text-sm font-semibold leading-relaxed"
              style={{ color: "#7d4f2b" }}
            >
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ResultScreen({ name, result, onRestart }: Props) {
  const [openDetail, setOpenDetail] = useState<DetailKey | null>("role")

  const handleDetailToggle = (id: DetailKey) => {
    setOpenDetail((current) => (current === id ? null : id))
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 pt-8 pb-4 text-center"
      >
        <p
          className="flex items-center justify-center gap-2 text-sm font-bold mb-1"
          style={{ color: "#a0673a" }}
        >
          <SajuGlyph name="team" size={18} />
          이번 학기 팀플 운세
        </p>
        <h2 className="text-2xl font-black mb-4" style={{ color: "#3d1f08" }}>
          {name}님의 이번 학기는?
        </h2>

        {/* Score card */}
        <div
          className="inline-block px-8 py-4 rounded-2xl mb-1"
          style={{
            background: "rgba(255,255,255,0.8)",
            boxShadow: "0 4px 20px rgba(107,63,31,0.12)",
          }}
        >
          <p className="text-xs font-bold mb-2" style={{ color: "#a0673a" }}>
            팀플운
          </p>
          <ScoreSigils score={result.teamworkScore} />
          <p
            className="text-xs font-semibold mt-1"
            style={{ color: "#c09070" }}
          >
            {result.teamworkScore}점 / 5점
          </p>
        </div>
      </motion.div>

      {/* Cards */}
      <div className="px-5 flex flex-col gap-3 pb-4">
        <ResultCard
          icon="role"
          title="이번 학기 당신의 역할"
          content={result.todayRole}
          accent="linear-gradient(135deg, rgba(255,248,230,0.95) 0%, rgba(255,235,200,0.9) 100%)"
          delay={0.15}
        />
        <ResultCard
          icon="warning"
          title="주의해야 할 유형"
          content={result.warningType}
          accent="rgba(255,244,230,0.85)"
          delay={0.25}
        />
        <ResultCard
          icon="advice"
          title="이번 학기 팀플 조언"
          content={result.advice}
          delay={0.35}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.42,
            type: "spring",
            stiffness: 280,
            damping: 24,
          }}
          className="flex flex-col gap-2 rounded-2xl p-3"
          style={{
            background: "rgba(255,248,238,0.72)",
            boxShadow: "0 2px 12px rgba(107,63,31,0.06)",
          }}
        >
          <div className="mb-1 flex items-center gap-2 px-1">
            <GlyphBadge name="luck" size={18} className="rounded-xl p-1" />
            <p className="text-xs font-bold" style={{ color: "#a0673a" }}>
              왜 이렇게 나왔을까?
            </p>
          </div>
          <DetailToggle
            id="role"
            title="이번 학기 역할 해석"
            content={result.details.role}
            openId={openDetail}
            onToggle={handleDetailToggle}
          />
          <DetailToggle
            id="score"
            title="팀플운 점수 해석"
            content={result.details.score}
            openId={openDetail}
            onToggle={handleDetailToggle}
          />
          <DetailToggle
            id="warning"
            title="주의 유형 해석"
            content={result.details.warning}
            openId={openDetail}
            onToggle={handleDetailToggle}
          />
          <DetailToggle
            id="advice"
            title="조언 해석"
            content={result.details.advice}
            openId={openDetail}
            onToggle={handleDetailToggle}
          />
        </motion.div>

        {/* Lucky quote — special style */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.45,
            type: "spring",
            stiffness: 280,
            damping: 24,
          }}
          className="rounded-2xl p-5 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #e8833a 0%, #c9601f 100%)",
            boxShadow: "0 6px 20px rgba(180,80,30,0.3)",
          }}
        >
          <p className="mb-2 flex items-center justify-center gap-2 text-xs font-bold text-orange-100">
            <SajuGlyph name="luck" size={18} />
            행운의 한마디
          </p>
          <p className="text-xl font-black text-white leading-snug">
            "{result.luckyPhrase}"
          </p>
          {/* Decoration */}
          <SajuGlyph
            name="cookie"
            size={74}
            className="absolute -top-5 -right-4 opacity-20"
          />
        </motion.div>
      </div>

      {/* Closing message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="text-center text-sm font-bold px-5 py-2"
        style={{ color: "#a0673a" }}
      >
        이번 학기 팀플도 가볍게 넘겨보세요.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-5 pt-2 pb-3"
      >
        <button
          onClick={onRestart}
          className="group flex w-full items-center justify-center gap-2 py-4 rounded-2xl text-base font-black text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #e8833a 0%, #c9601f 100%)",
            boxShadow: "0 4px 16px rgba(180,80,30,0.3)",
          }}
        >
          <GlyphBadge
            name="restart"
            size={20}
            className="bg-white/18 ring-white/20 transition-transform duration-500 group-hover:rotate-[-8deg]"
          />
          다른 사람 운세 보기
        </button>
      </motion.div>

      {/* Club promo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mx-5 mb-5 rounded-2xl p-4 text-center"
        style={{
          background: "rgba(255,255,255,0.5)",
          border: "1.5px dashed #f0d4b0",
        }}
      >
        <p className="text-xs font-semibold mb-1" style={{ color: "#b08060" }}>
          이런 서비스를 직접 만들어보고 싶다면?
        </p>
        <p className="text-sm font-black" style={{ color: "#d4763b" }}>
          OOO 웹개발 동아리
        </p>
        <p className="text-xs mt-1" style={{ color: "#c09070" }}>
          Made by OOO 웹개발 동아리
        </p>
      </motion.div>
    </div>
  )
}
