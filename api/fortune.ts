import { createFortune } from "./lib/openai.js"
import { calculateSaju, calculateTodaySaju } from "./lib/saju.js"

interface FortuneRequest {
  name?: unknown
  birthDate?: unknown
  birthTime?: unknown
}

interface VercelRequest {
  method?: string
  body?: FortuneRequest | string
}

interface VercelResponse {
  status: (statusCode: number) => VercelResponse
  json: (body: unknown) => void
  setHeader: (name: string, value: string) => void
  end: () => void
}

function getKoreaToday() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date())

  const year = parts.find((part) => part.type === "year")?.value
  const month = parts.find((part) => part.type === "month")?.value
  const day = parts.find((part) => part.type === "day")?.value

  if (!year || !month || !day) {
    throw new Error("Failed to resolve Asia/Seoul date")
  }

  return `${year}-${month}-${day}`
}

function parseBody(body: FortuneRequest | string | undefined): FortuneRequest {
  if (!body) return {}
  if (typeof body === "string") {
    const parsed: unknown = JSON.parse(body)
    return parsed && typeof parsed === "object" ? (parsed as FortuneRequest) : {}
  }
  return body
}

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(date.getTime()) && value === date.toISOString().slice(0, 10)
}

function isValidTime(value: string) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value)
}

function validateRequest(body: FortuneRequest) {
  const name = typeof body.name === "string" ? body.name.trim() : ""
  const birthDate = typeof body.birthDate === "string" ? body.birthDate : ""
  const birthTime =
    body.birthTime === null
      ? null
      : typeof body.birthTime === "string"
        ? body.birthTime
        : undefined

  if (!name || name.length > 30) return null
  if (!isValidDate(birthDate)) return null
  if (birthTime !== null && (!birthTime || !isValidTime(birthTime))) return null

  return {
    name,
    birthDate,
    birthTime,
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store")

  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" })
    return
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("Fortune API configuration error")
    res.status(500).json({ error: "fortune_unavailable" })
    return
  }

  let request
  try {
    request = validateRequest(parseBody(req.body))
  } catch {
    res.status(400).json({ error: "invalid_request" })
    return
  }

  if (!request) {
    res.status(400).json({ error: "invalid_request" })
    return
  }

  try {
    const today = getKoreaToday()
    const result = await createFortune({
      ...request,
      today,
      saju: {
        ...calculateSaju(request.birthDate, request.birthTime),
        ...calculateTodaySaju(today),
      },
    })

    res.status(200).json(result)
  } catch (error) {
    console.error("Fortune generation failed", error instanceof Error ? error.message : error)
    res.status(500).json({ error: "fortune_unavailable" })
  }
}
