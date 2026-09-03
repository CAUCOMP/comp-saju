import { motion } from "framer-motion"
import { GlyphBadge, SajuGlyph } from "../components/SajuGlyphs"

interface Props {
  onRetry: () => void
  onBack: () => void
}

export default function ErrorScreen({ onRetry, onBack }: Props) {
  return (
    <div className="flex flex-col h-full items-center justify-center px-8 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="mb-6 grid h-28 w-28 place-items-center rounded-[2rem] bg-white/65 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_18px_42px_rgba(122,66,27,0.13)] ring-1 ring-[#efcfac]/80"
      >
        <SajuGlyph name="error" size={82} />
      </motion.div>

      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-2xl font-black mb-3"
        style={{ color: "#4a2c0f" }}
      >
        운세 쿠키가 잠시
        <br />
        깨졌어요.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-base font-semibold mb-10"
        style={{ color: "#a0673a" }}
      >
        다시 한 번 시도해주세요.
      </motion.p>

      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="w-full flex flex-col gap-3"
      >
        <button
          onClick={onRetry}
          className="group flex w-full items-center justify-center gap-2 py-4 rounded-2xl text-base font-black text-white active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
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
          다시 시도하기
        </button>
        <button
          onClick={onBack}
          className="w-full py-3 rounded-2xl text-sm font-bold active:scale-95 transition-all"
          style={{
            background: "rgba(255,255,255,0.6)",
            color: "#a0673a",
            border: "1.5px solid #f0d4b0",
          }}
        >
          처음으로 돌아가기
        </button>
      </motion.div>
    </div>
  )
}
