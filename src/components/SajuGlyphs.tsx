import { motion } from "framer-motion"
import type { ReactNode } from "react"

export type GlyphName = "cookie" | "cookieSplit" | "spark" | "moon" | "role" | "warning" | "advice" | "luck" | "restart" | "share" | "team" | "error"

interface GlyphProps {
  name: GlyphName
  className?: string
  size?: number
}

const colors = {
  ink: "#3d1f08",
  brown: "#7a421b",
  amber: "#d4763b",
  gold: "#f1b461",
  cream: "#fff4df",
  pale: "#f9dcc0",
  red: "#b94b32",
}

export function SajuGlyph({ name, className = "", size = 32 }: GlyphProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 64 64",
    fill: "none",
    className,
    "aria-hidden": true,
  }

  if (name === "cookie") {
    return (
      <svg {...common}>
        <path
          d="M35.5 15.2c8.4-2.2 17.2 2.6 20.5 11.1 4.4 11.4-4 25-18.3 29.3-13.4-2.4-24.1-9.8-27.9-19.4 7.5-4.5 14.4-10.4 20-17 1.5-1.8 3.4-3.2 5.7-4Z"
          fill="url(#cookie-shell-a)"
          stroke="#1f160e"
          strokeWidth="3.8"
          strokeLinejoin="round"
        />
        <path
          d="M9.8 36.2c8.3-5 16-11.8 21.8-19.4-10.4.1-19.8 6.5-23 16.2-.5 1.5-.1 2.5 1.2 3.2Z"
          fill="url(#cookie-shell-b)"
          stroke="#1f160e"
          strokeWidth="3.8"
          strokeLinejoin="round"
        />
        <path
          d="M28.3 30.6c4.4-3.5 8.7-4 13.2-1.5 2 1.1 4.1 1.4 6.3.8 2.3-.6 4.5-1.6 6.6-3"
          stroke="#8c4d1f"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M32.1 30.3c-1.8 5.4-1.6 13.2 5.6 25.3"
          stroke="#9b5522"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity=".65"
        />
        <path
          d="M31.7 20.4c6.2-.6 14.7 2.2 18.9 7.3"
          stroke="#ffe0a7"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity=".82"
        />
        <path
          d="M25.2 28.7 7.4 21.5c-1.7-.7-3.5.6-3.4 2.4l.7 12.2c.1 1.1.8 2 1.8 2.4l19.1 7.3c2 .8 4.1-.7 4.1-2.8l-.1-10.2c0-1.8-1.7-3.4-4.4-4.1Z"
          fill="#fff8e9"
          stroke="#1f160e"
          strokeWidth="3.4"
          strokeLinejoin="round"
        />
        <path
          d="M8.8 27.3 22.5 33M9.1 33.4l14.1 5.2"
          stroke="#e7ba85"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path d="M48.8 39.5c-4.8 7.1-12.2 10.7-22.3 10.8" stroke="#ba6929" strokeWidth="2.2" strokeLinecap="round" opacity=".45" />
        <circle cx="43.2" cy="42" r="2.1" fill={colors.brown} opacity=".32" />
        <circle cx="21.4" cy="40.8" r="1.8" fill={colors.brown} opacity=".28" />
        <circle cx="47.7" cy="23.7" r="1.6" fill={colors.brown} opacity=".25" />
        <defs>
          <radialGradient
            id="cookie-shell-a"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(36 19) rotate(66) scale(43 38)"
          >
            <stop stopColor="#ffe9b7" />
            <stop offset=".55" stopColor="#e9a64e" />
            <stop offset="1" stopColor="#b95f22" />
          </radialGradient>
          <linearGradient id="cookie-shell-b" x1="10" y1="20" x2="31" y2="37" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffd178" />
            <stop offset="1" stopColor="#c96b26" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  if (name === "cookieSplit") {
    return (
      <svg {...common}>
        <path
          d="M30.4 13.4c-9.8 1.1-18 7.9-21.8 17.9 5.9 2.2 12.4 3.6 19.3 4.2l5.6-8.4-5.8-4.2 2.7-9.5Z"
          fill="url(#split-left)"
          stroke="#1f160e"
          strokeWidth="3.6"
          strokeLinejoin="round"
        />
        <path
          d="M35.8 13.9c9.6.7 17.7 6.3 20.6 14.4 2.9 8-1.1 18.4-10.4 24.1l-11.8-17 7.5-7.2-6.5-4.9.6-9.4Z"
          fill="url(#split-right)"
          stroke="#1f160e"
          strokeWidth="3.6"
          strokeLinejoin="round"
        />
        <path
          d="M4.9 27.2 25 35.5c1.7.7 3.4-.5 3.4-2.3l-.1-4.1c0-1.1-.7-2.1-1.8-2.5L7.2 18.7c-1.7-.7-3.5.6-3.4 2.4l.2 3.3c.1 1.3.4 2.2.9 2.8Z"
          fill="#fff8e9"
          stroke="#1f160e"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <path
          d="M32.6 21.5 27.8 35.4l-5.1 15.2"
          stroke={colors.brown}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".6"
        />
        <path
          d="M36.4 22.8 42 28.2l-7.8 7.2 11.2 16.1"
          stroke={colors.brown}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".55"
        />
        <path d="M9.2 23.8 21.8 29M8.9 28.6l12.3 4.8" stroke="#e7ba85" strokeWidth="1.7" strokeLinecap="round" />
        <defs>
          <linearGradient
            id="split-left"
            x1="10"
            y1="12"
            x2="35"
            y2="56"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffe5ae" />
            <stop offset="1" stopColor={colors.amber} />
          </linearGradient>
          <linearGradient
            id="split-right"
            x1="54"
            y1="12"
            x2="30"
            y2="56"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffd48f" />
            <stop offset="1" stopColor="#c86425" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  if (name === "spark") {
    return (
      <svg {...common}>
        <path
          d="M32 5l5.9 18.6L57 32l-19.1 8.4L32 59l-5.9-18.6L7 32l19.1-8.4L32 5Z"
          fill={colors.gold}
        />
        <path
          d="M32 16l2.9 9.1L44 29l-9.1 4L32 42l-2.9-9L20 29l9.1-3.9L32 16Z"
          fill={colors.cream}
          opacity=".75"
        />
      </svg>
    )
  }

  if (name === "moon") {
    return (
      <svg {...common}>
        <path
          d="M43.8 52.6C28.5 52.2 16 39.4 16 24.1c0-5.2 1.4-10 4-14.1C11.3 14.4 6 23.4 6 33.2 6 47 17.2 58 31 58c5.4 0 10.4-1.7 14.4-4.7-.5-.4-1-.6-1.6-.7Z"
          fill={colors.gold}
        />
        <path
          d="M39.5 13.5l2.2 6.2 6.3 2.1-6.3 2.2-2.2 6.2-2.2-6.2-6.2-2.2 6.2-2.1 2.2-6.2Z"
          fill={colors.amber}
        />
      </svg>
    )
  }

  const iconMap: Record<Exclude<GlyphName, "cookie" | "cookieSplit" | "spark" | "moon">, ReactNode> =
    {
      role: (
        <>
          <rect
            x="13"
            y="15"
            width="38"
            height="34"
            rx="12"
            fill={colors.cream}
          />
          <path
            d="M22 28h20M22 37h13"
            stroke={colors.amber}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M47 18l4-6 4 6"
            stroke={colors.brown}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ),
      warning: (
        <>
          <path d="M32 9 58 54H6L32 9Z" fill="#ffe2bd" />
          <path
            d="M32 25v13"
            stroke={colors.red}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="32" cy="45" r="2.7" fill={colors.red} />
        </>
      ),
      advice: (
        <>
          <path
            d="M32 7c10 0 18 7.4 18 17.1 0 6.3-3.3 10.8-8.1 14.1l-1.5 8.1H23.6l-1.5-8.1C17.3 35 14 30.4 14 24.1 14 14.4 22 7 32 7Z"
            fill="#ffe0a3"
          />
          <path
            d="M25 53h14"
            stroke={colors.brown}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M26 25c4-4 8-4 12 0M27 34h10"
            stroke={colors.amber}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      ),
      luck: (
        <>
          <path
            d="M32 9c6 8.4 11.5 10.3 20 11.2C45.7 27 43.5 32 47 42.6 38 40.1 32.8 42.2 25 54c-1-10.8-4.3-16.1-13.3-20.7C22 28.7 27.4 22.7 32 9Z"
            fill={colors.gold}
          />
          <path
            d="M32 20v24M21 32h22"
            stroke={colors.cream}
            strokeWidth="3"
            strokeLinecap="round"
            opacity=".65"
          />
        </>
      ),
      restart: (
        <>
          <path
            d="M47 19a20 20 0 1 0 2 23"
            stroke={colors.amber}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M48 9v13H35"
            stroke={colors.brown}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ),
      share: (
        <>
          <circle cx="21" cy="33" r="7" fill={colors.gold} />
          <circle cx="44" cy="18" r="7" fill={colors.amber} />
          <circle cx="44" cy="48" r="7" fill={colors.amber} />
          <path
            d="m27 30 11-8M27 36l11 8"
            stroke={colors.brown}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      ),
      team: (
        <>
          <circle cx="23" cy="25" r="8" fill={colors.gold} />
          <circle cx="42" cy="23" r="7" fill={colors.amber} />
          <path
            d="M10 52c2.2-9.3 8.5-14.5 16-14.5S39.8 42.7 42 52"
            fill={colors.cream}
          />
          <path
            d="M33 51c1.4-7.3 6.4-11.6 12-11.6 4.3 0 8.1 2.5 10.4 7"
            stroke={colors.brown}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      ),
      error: (
        <>
          <path
            d="M15 37c6.5-9.3 17.4-13.7 34-13.1 2 11.7-3.4 22.6-14.5 29.2C24.1 51 18.4 45.8 15 37Z"
            fill="url(#error-cookie)"
          />
          <path
            d="M28 25 39 51"
            stroke={colors.brown}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M15 13l7 7M22 13l-7 7"
            stroke={colors.red}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="error-cookie"
              x1="16"
              y1="24"
              x2="43"
              y2="54"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ffe0a3" />
              <stop offset="1" stopColor={colors.amber} />
            </linearGradient>
          </defs>
        </>
      ),
    }

  return <svg {...common}>{iconMap[name]}</svg>
}

export function GlyphBadge({ name, className = "", size = 26 }: GlyphProps) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-2xl bg-white/70 p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.75),0_8px_18px_rgba(122,66,27,0.08)] ring-1 ring-[#efcfac]/70 ${className}`}
    >
      <SajuGlyph name={name} size={size} />
    </span>
  )
}

export function ScoreSigils({ score }: { score: number }) {
  return (
    <div className="flex items-center justify-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.svg
          key={i}
          width="34"
          height="34"
          viewBox="0 0 64 64"
          initial={{ scale: 0.45, y: 8, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, y: 0, opacity: 1, rotate: i <= score ? 0 : -4 }}
          transition={{
            delay: i * 0.06,
            type: "spring",
            stiffness: 420,
            damping: 16,
          }}
          className="drop-shadow-[0_5px_7px_rgba(180,80,30,0.18)]"
          aria-hidden="true"
        >
          <path
            d="M32 5.8 39.1 23l18.5 1.5-14.1 12.1 4.3 18.1L32 45.1 16.2 54.7l4.3-18.1L6.4 24.5 24.9 23 32 5.8Z"
            fill={i <= score ? "url(#score-star-fill)" : "#fff5e6"}
            stroke={i <= score ? "#8f4b18" : "#dfb886"}
            strokeWidth={i <= score ? "3.6" : "2.8"}
            strokeLinejoin="round"
          />
          {i <= score && (
            <path
              d="M26.2 24.2 32 10.6l5.8 13.6 14.5 1.2-11.1 9.5 3.4 14.3L32 41.6l-12.6 7.6 3.4-14.3-11.1-9.5 14.5-1.2Z"
              fill="url(#score-star-shine)"
              opacity=".62"
            />
          )}
          {i === 1 && (
            <defs>
              <linearGradient
                id="score-star-fill"
                x1="18"
                y1="7"
                x2="45"
                y2="56"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ffe29a" />
                <stop offset=".48" stopColor="#f4ad42" />
                <stop offset="1" stopColor="#d46724" />
              </linearGradient>
              <linearGradient
                id="score-star-shine"
                x1="22"
                y1="8"
                x2="39"
                y2="43"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fff8dc" />
                <stop offset="1" stopColor="#fff8dc" stopOpacity="0" />
              </linearGradient>
            </defs>
          )}
        </motion.svg>
      ))}
    </div>
  )
}

export function FloatingSigils() {
  const items: Array<{
    name: GlyphName
    left: string
    top: string
    delay: number
    size: number
  }> = [
    { name: "spark", left: "12%", top: "18%", delay: 0, size: 16 },
    { name: "moon", left: "76%", top: "14%", delay: 0.2, size: 18 },
    { name: "spark", left: "86%", top: "54%", delay: 0.4, size: 14 },
    { name: "spark", left: "9%", top: "66%", delay: 0.6, size: 18 },
    { name: "moon", left: "62%", top: "81%", delay: 0.8, size: 15 },
    { name: "spark", left: "38%", top: "88%", delay: 1, size: 13 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((item, i) => (
        <motion.span
          key={`${item.name}-${i}`}
          className="absolute opacity-45"
          style={{ left: item.left, top: item.top }}
          animate={{
            opacity: [0.18, 0.5, 0.18],
            scale: [0.85, 1.12, 0.85],
            y: [0, -4, 0],
          }}
          transition={{
            duration: 2.6 + i * 0.25,
            repeat: Infinity,
            delay: item.delay,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          <SajuGlyph name={item.name} size={item.size} />
        </motion.span>
      ))}
    </div>
  )
}
