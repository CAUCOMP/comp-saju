import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { FloatingSigils, SajuGlyph } from "../components/SajuGlyphs"

interface Props {
  name: string
  role: string
  onOpen: () => void
}

type Phase = "idle" | "hit" | "breaking"

function FortuneCookieArt({
  cracked = false,
  role,
}: {
  cracked?: boolean
  role?: string
}) {
  if (cracked) {
    return (
      <div className="relative h-48 w-72">
        <motion.svg
          className="absolute left-0 top-8 h-32 w-32"
          viewBox="0 0 120 120"
          fill="none"
          initial={{ x: 24, rotate: -2, opacity: 1 }}
          animate={{ x: -8, y: 8, rotate: -20, opacity: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 16 }}
          aria-hidden="true"
        >
          <path
            d="M93.2 20.3C53.6 17.7 23.5 40.7 12.6 78.8c20.4 10 43.1 13.4 66.1 6.6l14.7-30.7-21.1-12 20.9-22.4Z"
            fill="#f2b34f"
            stroke="#1f160e"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <path
            d="M37.6 78.2c18.9 6 34.5 1.3 46.7-14.1"
            stroke="#8d4d1e"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M36.2 41.8c13.5-10.4 29.4-14.3 47.7-11.8"
            stroke="#ffd685"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </motion.svg>

        <motion.svg
          className="absolute right-0 top-7 h-32 w-36"
          viewBox="0 0 136 120"
          fill="none"
          initial={{ x: -20, rotate: 2, opacity: 1 }}
          animate={{ x: 12, y: 5, rotate: 18, opacity: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 16 }}
          aria-hidden="true"
        >
          <path
            d="M27.1 22.8c37.8-6 75.1 11 94 43.7-11.8 23.2-37 35-66 27.9L42.6 62.1l19-14.8-34.5-24.5Z"
            fill="#f0ad43"
            stroke="#1f160e"
            strokeWidth="7"
            strokeLinejoin="round"
          />
          <path
            d="M78 35.2c16.5 3.4 29.4 12.5 38.6 27.2"
            stroke="#ffd685"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M58.4 84.3c18.7 6.3 36.1 2.3 52.3-11.8"
            stroke="#8d4d1e"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </motion.svg>

        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.88, rotate: -3 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: -2 }}
          transition={{ delay: 0.18, type: "spring", stiffness: 210, damping: 18 }}
          className="absolute left-1/2 top-8 z-10 flex h-24 w-52 -translate-x-1/2 items-center justify-center rounded-[1.2rem] bg-[#fffaf1] px-4 text-center shadow-[0_12px_28px_rgba(122,66,27,0.18)] ring-[3px] ring-[#1f160e]"
        >
          <div className="absolute -left-3 top-8 h-5 w-5 rounded-full bg-[#f6cf56] ring-[3px] ring-[#1f160e]" />
          <div className="absolute -right-3 bottom-6 h-5 w-5 rounded-full bg-[#e85f4f] ring-[3px] ring-[#1f160e]" />
          <p className="text-[18px] font-black leading-tight text-[#1f160e]">
            {role}
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <svg className="h-48 w-72 overflow-visible" viewBox="0 0 288 192" fill="none" aria-hidden="true">
      <motion.path
        d="M178.4 51.2c39.7-7.8 81.5 11.7 98.1 47.9-18.6 37-58.6 55.9-102 45.9-19.3-4.5-39.5-15.3-59.5-31.9 16.4-24 34.5-44.5 63.4-61.9Z"
        fill="#f1b24c"
        stroke="#1f160e"
        strokeWidth="8"
        strokeLinejoin="round"
        animate={{ rotate: [-1, 1.5, -1], y: [0, -2, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}
      />
      <motion.path
        d="M116.4 43.1C69.1 47.7 32.8 79 20.9 125.1c23.5 18.5 62.7 26.5 95.6 14.4 13.1-4.8 20.7-14.2 20.7-25.6V56.3c0-8.2-7.6-14-20.8-13.2Z"
        fill="#f4b94e"
        stroke="#1f160e"
        strokeWidth="8"
        strokeLinejoin="round"
        animate={{ rotate: [1, -1, 1], y: [0, 2, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}
      />
      <path
        d="M136.8 61.8c20.3-13 52.6-10 83.2 2.8 17.7 7.4 35.1 18 49.7 31"
        stroke="#ffdb8a"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M54.2 126.3c21.4 13 49 14 70.1 3.2"
        stroke="#8b4c1f"
        strokeWidth="5"
        strokeLinecap="round"
        opacity=".65"
      />
      <path
        d="M139.4 72.7c19.6 26.2 29.8 49.4 35.1 72.3"
        stroke="#1f160e"
        strokeWidth="6"
        strokeLinecap="round"
        opacity=".78"
      />
      <path
        d="M127.4 88.8 58.3 68.4c-8.6-2.5-17.1 4.1-16.7 13l1.4 31.5c.2 5 3.6 9.3 8.4 10.7l74.1 21.5c9 2.6 17.8-4.4 17.4-13.8l-1.3-25.3c-.4-8.2-5.8-14.7-14.2-17.2Z"
        fill="#fffaf1"
        stroke="#1f160e"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path
        d="M64.8 87.3 113 101.7M62.8 106.3l49.4 14.1"
        stroke="#d7a878"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="220" cy="113" r="5.5" fill="#1f160e" />
      <circle cx="244" cy="121" r="4.5" fill="#1f160e" />
      <path d="M221.9 137.2c9 6.6 18 7.4 27 .7" stroke="#1f160e" strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

export default function CookieScreen({ name, role, onOpen }: Props) {
  const requiredClicks = useMemo(() => 3 + Math.floor(Math.random() * 4), [])
  const [phase, setPhase] = useState<Phase>("idle")
  const [clickCount, setClickCount] = useState(0)

  const remainingClicks = Math.max(requiredClicks - clickCount, 0)

  const handleClick = () => {
    if (phase === "breaking") return

    setClickCount((current) => {
      const next = current + 1
      if (next >= requiredClicks) {
        setPhase("breaking")
        setTimeout(() => onOpen(), 2300)
      } else {
        setPhase("hit")
        setTimeout(() => {
          setPhase((currentPhase) => (currentPhase === "hit" ? "idle" : currentPhase))
        }, 240)
      }
      return next
    })
  }

  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden px-7">
      <motion.p
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2 flex items-center justify-center gap-2 text-center text-base font-bold"
        style={{ color: "#a0673a" }}
      >
        <SajuGlyph name="spark" size={18} />
        {name ? `${name}님의 운명이 도착했습니다.` : "이번 학기 팀플 운명이 도착했습니다."}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 text-center text-2xl font-black"
        style={{ color: "#4a2c0f" }}
      >
        쿠키를 두드려
        <br />
        역할을 꺼내보세요
      </motion.p>

      <AnimatePresence mode="wait">
        {phase === "breaking" ? (
          <motion.div
            key="break"
            initial={{ scale: 0.96, rotate: 0 }}
            animate={{ scale: [0.96, 1.08, 1], rotate: [0, -3, 2, 0] }}
            transition={{ duration: 0.58, ease: [0.32, 0.72, 0, 1] }}
            className="relative grid h-56 w-full place-items-center"
          >
            <FortuneCookieArt cracked role={role} />
          </motion.div>
        ) : (
          <motion.button
            key="cookie"
            type="button"
            onClick={handleClick}
            className="relative grid h-56 w-full place-items-center rounded-[2.2rem] bg-white/24 outline-none ring-1 ring-[#efcfac]/55 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            animate={
              phase === "hit"
                ? {
                    rotate: [0, -4, 5, -3, 0],
                    x: [0, -5, 5, -2, 0],
                  }
                : { rotate: 0, x: 0 }
            }
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          >
            <span className="absolute left-5 top-4 rounded-full bg-[#fff7eb] px-3 py-1 text-[11px] font-black text-[#a0673a] ring-1 ring-[#efcfac]/75">
              {clickCount}/{requiredClicks}
            </span>
            <FortuneCookieArt />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-8 text-center text-sm font-semibold"
        style={{ color: "#b08060" }}
      >
        {phase === "breaking"
          ? "운세 종이를 펼치는 중"
          : remainingClicks === 1
            ? "한 번만 더 두드리면 열려요"
            : `${remainingClicks}번 더 두드리면 열려요`}
      </motion.div>

      <FloatingSigils />
    </div>
  )
}
