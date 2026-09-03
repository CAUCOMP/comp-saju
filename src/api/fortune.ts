import type { FortuneRequest, FortuneResult } from "../types/fortune"

function isFortuneResult(value: unknown): value is FortuneResult {
  if (!value || typeof value !== "object") return false
  const result = value as Record<string, unknown>
  const score = result.teamworkScore
  const details = result.details as Record<string, unknown> | undefined

  return (
    Number.isInteger(score) &&
    typeof score === "number" &&
    typeof result.todayRole === "string" &&
    typeof result.warningType === "string" &&
    typeof result.advice === "string" &&
    typeof result.luckyPhrase === "string" &&
    !!details &&
    typeof details.score === "string" &&
    typeof details.role === "string" &&
    typeof details.warning === "string" &&
    typeof details.advice === "string" &&
    score >= 1 &&
    score <= 5
  )
}

export async function generateFortune(
  request: FortuneRequest,
): Promise<FortuneResult> {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), 22000)

  try {
    const response = await fetch("/api/fortune", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Fortune API failed with status ${response.status}`)
    }

    const data: unknown = await response.json()
    if (!isFortuneResult(data)) {
      throw new Error("Fortune API returned an invalid response shape")
    }

    return data
  } finally {
    window.clearTimeout(timeoutId)
  }
}
