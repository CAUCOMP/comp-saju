import { motion } from "framer-motion"
import { SajuGlyph } from "../components/SajuGlyphs"

interface Props {
  name: string
}

const dots = ["cookie", "spark", "moon", "spark", "moon"] as const

export default function LoadingScreen({ name }: Props) {
  return (
    <div className="flex flex-col h-full items-center justify-center px-8">
      {/* Fortune cookie animation */}
      <motion.div
        animate={{ rotate: [0, -8, 8, -8, 8, 0], scale: [1, 1.05, 1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}
        className="mb-8 grid h-28 w-28 select-none place-items-center rounded-[2rem] bg-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_18px_42px_rgba(122,66,27,0.13)] ring-1 ring-[#efcfac]/80"
      >
        <SajuGlyph name="cookie" size={82} />
      </motion.div>

      {/* Orbiting dots */}
      <div className="flex gap-2 mb-8">
        {dots.map((glyph, i) => (
          <motion.span
            key={i}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/45 ring-1 ring-[#efcfac]/60"
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -6, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.18,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            <SajuGlyph name={glyph} size={17} />
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-black text-center leading-snug mb-2"
        style={{ color: "#4a2c0f" }}
      >
        {name}님의 팀플 기운을
        <br />
        분석하고 있어요.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm font-semibold text-center"
        style={{ color: "#a0673a" }}
      >
        만세력 데이터를 불러오는 중...
      </motion.p>

      {/* Progress bar */}
      <div
        className="mt-8 w-48 h-2 rounded-full overflow-hidden"
        style={{ background: "#f0d4b0" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #e8833a, #c9601f)" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.3, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}
