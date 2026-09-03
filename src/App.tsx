import { useState } from "react"
import LandingScreen from "./screens/LandingScreen"
import LoadingScreen from "./screens/LoadingScreen"
import CookieScreen from "./screens/CookieScreen"
import ResultScreen from "./screens/ResultScreen"
import ErrorScreen from "./screens/ErrorScreen"
import { generateFortune } from "./api/fortune"
import type { FortuneResult, UserInfo } from "./types/fortune"

export type Screen = "landing" | "loading" | "cookie" | "result" | "error"

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing")
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [result, setResult] = useState<FortuneResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (info: UserInfo) => {
    if (isSubmitting) return

    setUserInfo(info)
    setScreen("loading")
    setIsSubmitting(true)

    try {
      const fortune = await generateFortune({
        name: info.name,
        birthDate: info.birthdate,
        birthTime: info.unknownTime ? null : info.birthtime,
      })

      setResult(fortune)
      setScreen("cookie")
    } catch (error) {
      console.error("Failed to generate fortune", error)
      setScreen("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCookieOpen = () => {
    if (result) setScreen("result")
  }

  const handleRestart = () => {
    setUserInfo(null)
    setResult(null)
    setIsSubmitting(false)
    setScreen("landing")
  }

  const handleRetry = () => {
    if (!userInfo) {
      handleRestart()
      return
    }

    void handleSubmit(userInfo)
  }

  return (
    <div
      className="min-h-full flex items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #fdf0e0 0%, #f5dfc0 100%)",
      }}
    >
      {/* iPhone 13 viewport container */}
      <div
        className="relative overflow-hidden flex flex-col"
        style={{
          width: "min(390px, 100vw)",
          height: "min(844px, 100dvh)",
          background: "linear-gradient(170deg, #fdf6ec 0%, #fdebd5 100%)",
          boxShadow: "0 32px 80px rgba(107, 63, 31, 0.18)",
          borderRadius: "clamp(0px, calc((100vw - 390px) / 2), 40px)",
        }}
      >
        {screen === "landing" && (
          <LandingScreen onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        )}
        {screen === "loading" && <LoadingScreen name={userInfo?.name ?? ""} />}
        {screen === "cookie" && result && (
          <CookieScreen
            name={userInfo?.name ?? ""}
            role={result.todayRole}
            onOpen={handleCookieOpen}
          />
        )}
        {screen === "result" && result && (
          <ResultScreen
            name={userInfo?.name ?? ""}
            result={result}
            onRestart={handleRestart}
          />
        )}
        {screen === "error" && (
          <ErrorScreen
            onRetry={handleRetry}
            onBack={handleRestart}
          />
        )}
      </div>
    </div>
  )
}
