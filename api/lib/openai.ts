import OpenAI from "openai"
import {
  buildFortunePrompt,
  fortuneResultSchema,
  type FortuneContext,
} from "./fortunePrompt.js"

export interface FortuneResult {
  teamworkScore: number
  todayRole: string
  warningType: string
  advice: string
  luckyPhrase: string
  details: {
    score: string
    role: string
    warning: string
    advice: string
  }
}

function isFortuneResult(value: unknown): value is FortuneResult {
  if (!value || typeof value !== "object") return false
  const result = value as Record<string, unknown>
  const score = result.teamworkScore
  const details = result.details as Record<string, unknown> | undefined

  return (
    Number.isInteger(score) &&
    typeof score === "number" &&
    score >= 1 &&
    score <= 5 &&
    typeof result.todayRole === "string" &&
    typeof result.warningType === "string" &&
    typeof result.advice === "string" &&
    typeof result.luckyPhrase === "string" &&
    !!details &&
    typeof details.score === "string" &&
    typeof details.role === "string" &&
    typeof details.warning === "string" &&
    typeof details.advice === "string"
  )
}

export async function createFortune(context: FortuneContext): Promise<FortuneResult> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured")
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const response = await client.responses.parse(
    {
      model: process.env.OPENAI_MODEL || "gpt-5-mini",
      instructions:
        "당신은 안전하고 재치 있는 한국어 오락 콘텐츠 생성기입니다. 실제 미래를 확정적으로 예언하지 말고, 반드시 요청된 JSON Schema만 반환하세요.",
      input: buildFortunePrompt(context),
      text: {
        format: {
          type: "json_schema",
          name: "team_fortune_result",
          strict: true,
          schema: fortuneResultSchema,
        },
        verbosity: "low",
      },
      reasoning: {
        effort: "minimal",
      },
      max_output_tokens: 2200,
    },
    {
      signal: AbortSignal.timeout(18000),
    },
  )

  if (response.output_parsed) {
    if (!isFortuneResult(response.output_parsed)) {
      throw new Error("OpenAI parsed response did not match FortuneResult")
    }

    return response.output_parsed
  }

  if (response.output_text) {
    const parsed: unknown = JSON.parse(response.output_text)
    if (!isFortuneResult(parsed)) {
      throw new Error("OpenAI text response did not match FortuneResult")
    }

    return parsed
  }

  console.error("OpenAI response missing parsed output", {
    status: response.status,
    incompleteDetails: response.incomplete_details,
    outputTypes: response.output.map((item) => item.type),
  })
  throw new Error("OpenAI response did not include structured output")
}
