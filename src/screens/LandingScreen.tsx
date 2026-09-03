import { useState } from "react"
import { motion } from "framer-motion"
import type { UserInfo } from "../types/fortune"
import BirthDateTimePicker from "../components/BirthDateTimePicker"
import { GlyphBadge, SajuGlyph } from "../components/SajuGlyphs"

interface Props {
  onSubmit: (info: UserInfo) => void
  isSubmitting?: boolean
}

export default function LandingScreen({ onSubmit, isSubmitting = false }: Props) {
  const [name, setName] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [birthtime, setBirthtime] = useState("")
  const [unknownTime, setUnknownTime] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = "이름을 입력해주세요."
    if (!birthdate) e.birthdate = "생년월일을 선택해주세요."
    if (!unknownTime && !birthtime)
      e.birthtime = "태어난 시간을 선택하거나 '시간을 몰라요'를 선택해주세요."
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSubmit({ name: name.trim(), birthdate, birthtime, unknownTime })
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-10 pb-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-[1.75rem] bg-white/65 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_14px_34px_rgba(122,66,27,0.12)] ring-1 ring-[#efcfac]/80"
        >
          <SajuGlyph name="cookie" size={58} />
        </motion.div>
        <motion.h1
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-black tracking-tight"
          style={{ color: "#6b3f1f" }}
        >
          팀플 사주
        </motion.h1>
        <motion.p
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="mt-3 text-xl font-bold leading-snug"
          style={{ color: "#4a2c0f" }}
        >
          이번 학기 팀플에서
          <br />
          어떤 사람이 될까?
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="mt-2 text-sm font-medium"
          style={{ color: "#a0673a" }}
        >
          생년월일을 입력하고 이번 학기 팀플 운세를 확인해보세요.
        </motion.p>
      </div>

      {/* Form card */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 22 }}
        className="mx-5 rounded-3xl p-5 flex flex-col gap-4 flex-1"
        style={{
          background: "rgba(255,255,255,0.72)",
          boxShadow: "0 4px 24px rgba(107,63,31,0.10)",
        }}
      >
        {/* Name */}
        <div>
          <label
            className="text-xs font-bold mb-1.5 block"
            style={{ color: "#a0673a" }}
          >
            이름
          </label>
          <input
            type="text"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setErrors((p) => ({ ...p, name: "" }))
            }}
            className="w-full rounded-2xl px-4 py-3 text-base font-semibold outline-none transition-all"
            style={{
              background: errors.name ? "#fff0f0" : "#fdf6ec",
              border: `2px solid ${
                errors.name ? "#f87171" : name ? "#d4763b" : "#f0d4b0"
              }`,
              color: "#3d1f08",
            }}
          />
          {errors.name && (
            <p
              className="text-xs font-semibold mt-1"
              style={{ color: "#ef4444" }}
            >
              {errors.name}
            </p>
          )}
        </div>

        <BirthDateTimePicker
          birthdate={birthdate}
          birthtime={birthtime}
          unknownTime={unknownTime}
          birthdateError={errors.birthdate}
          birthtimeError={errors.birthtime}
          onBirthdateChange={setBirthdate}
          onBirthtimeChange={setBirthtime}
          onClearBirthdateError={() => setErrors((p) => ({ ...p, birthdate: "" }))}
          onClearBirthtimeError={() => setErrors((p) => ({ ...p, birthtime: "" }))}
        />

        <div>
          <button
            type="button"
            onClick={() => {
              setUnknownTime((v) => !v)
              setErrors((p) => ({ ...p, birthtime: "" }))
            }}
            className="mt-2 flex items-center gap-2 text-sm font-semibold transition-all"
            style={{ color: unknownTime ? "#d4763b" : "#b08060" }}
          >
            <span
              className="w-4 h-4 rounded-md border-2 flex items-center justify-center"
              style={{
                borderColor: unknownTime ? "#d4763b" : "#c0906a",
                background: unknownTime ? "#d4763b" : "transparent",
              }}
            >
              {unknownTime && (
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 4.1 3.7 6.8 9 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            태어난 시간을 몰라요
          </button>
          {errors.birthtime && (
            <p
              className="text-xs font-semibold mt-1"
              style={{ color: "#ef4444" }}
            >
              {errors.birthtime}
            </p>
          )}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.42 }}
        className="px-5 pt-4 pb-3"
      >
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="group flex w-full items-center justify-center gap-2 py-4 rounded-2xl text-lg font-black tracking-wide text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-65"
          style={{
            background: "linear-gradient(135deg, #e8833a 0%, #c9601f 100%)",
            boxShadow: "0 6px 20px rgba(180,80,30,0.38)",
          }}
        >
          <GlyphBadge
            name="cookie"
            size={20}
            className="bg-white/18 ring-white/20 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
          {isSubmitting ? "운세 불러오는 중" : "이번 학기 팀플 운세 보기"}
        </button>
      </motion.div>

    </div>
  )
}
