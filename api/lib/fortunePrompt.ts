import type { SajuData } from "./saju.js"

export interface FortuneContext {
  name: string
  birthDate: string
  birthTime: string | null
  today: string
  saju?: SajuData
}

export const fortuneResultSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "teamworkScore",
    "todayRole",
    "warningType",
    "advice",
    "luckyPhrase",
    "details",
  ],
  properties: {
    teamworkScore: {
      type: "integer",
      minimum: 1,
      maximum: 5,
      description: "이번 학기 팀플운 점수. 1은 매우 험난함, 5는 매우 좋음.",
    },
    todayRole: {
      type: "string",
      description: "이번 학기 팀플에서 맡게 될 짧고 재미있는 대학생 팀플 캐릭터. 약 10~30자.",
    },
    warningType: {
      type: "string",
      description: "주의해야 할 일반적인 팀플 유형 또는 상황. 특정 개인이나 집단을 비난하지 않음.",
    },
    advice: {
      type: "string",
      description: "이번 학기 실제 팀플에 도움이 될 수 있는 한 문장 조언.",
    },
    luckyPhrase: {
      type: "string",
      description: "이번 학기 팀플 회의에서 사용할 수 있을 법한 최대 40자 정도의 짧은 대사.",
    },
    details: {
      type: "object",
      additionalProperties: false,
      required: ["score", "role", "warning", "advice"],
      properties: {
        score: {
          type: "string",
          description:
            "이번 학기 팀플운 점수가 나온 이유를 대학생이 이해하기 쉬운 상황 예측과 조언으로 설명. 2~3문장.",
        },
        role: {
          type: "string",
          description:
            "이번 학기의 역할이 나온 이유를 팀플에서 벌어질 법한 장면 중심으로 설명. 2~3문장.",
        },
        warning: {
          type: "string",
          description:
            "주의해야 할 유형이 왜 오늘 신경 쓰이는지 가벼운 예언처럼 설명. 2~3문장.",
        },
        advice: {
          type: "string",
          description:
            "이번 학기 조언이 실제 팀플에 왜 도움이 되는지 구체적인 행동 중심으로 설명. 2~3문장.",
        },
      },
    },
  },
} as const

const ROLE_DIRECTIONS = [
  "회의를 열고 역할을 나누는 진행형 캐릭터",
  "자료를 빠르게 모으고 핵심만 추리는 조사형 캐릭터",
  "PPT 흐름과 디자인을 정리하는 시각형 캐릭터",
  "발표 멘트를 살리고 분위기를 끌어올리는 발표형 캐릭터",
  "단톡방을 정리하고 마감 리마인드를 보내는 조율형 캐릭터",
  "조용히 있다가 결정적인 아이디어를 내는 반전형 캐릭터",
  "교수님 요구사항을 현실적인 체크리스트로 바꾸는 분석형 캐릭터",
  "초안을 먼저 던져 팀을 움직이게 하는 추진형 캐릭터",
  "팀원들의 빈칸을 발견하고 마무리하는 수습형 캐릭터",
  "분위기가 늘어질 때 농담과 현실감을 섞어 다시 모으는 분위기형 캐릭터",
  "제출 직전 파일명과 형식을 확인하는 마감관리형 캐릭터",
  "의견 충돌을 적당히 눌러 합의점을 만드는 중재형 캐릭터",
]

const WARNING_DIRECTIONS = [
  "말로만 정하고 아무도 기록하지 않는 상황",
  "자료조사의 범위가 제각각이라 내용이 겹치는 상황",
  "PPT 톤이 페이지마다 달라지는 상황",
  "발표자와 제작자가 서로 다른 내용을 이해하는 상황",
  "단톡방 확인이 늦어 결정이 밀리는 상황",
  "역할은 나눴지만 마감 시간이 애매한 상황",
  "교수님 조건 하나를 놓치고 다시 고치는 상황",
  "초안 없이 회의만 길어지는 상황",
  "한 사람이 너무 많이 떠안는 상황",
  "좋은 아이디어가 나왔는데 아무도 맡지 않는 상황",
  "제출 파일 버전이 여러 개로 갈라지는 상황",
  "팀 분위기를 맞추려다 해야 할 말을 미루는 상황",
]

const SCORE_DIRECTIONS = [
  "1점: 이번 학기에는 단톡방이 조용해지고, 역할 분담표가 자꾸 흐려지는 험난한 팀플운입니다. 상세 설명에는 '기록 없이 사라지는 빌런', '제출 직전 파일을 못 찾는 빌런'처럼 일반적인 팀플 빌런 상황을 예언적으로 넣으세요.",
  "2점: 이번 학기에는 진행은 되지만 중간중간 답답한 구간이 많은 팀플운입니다. 상세 설명에는 '내일까지 할게요 빌런', '회의 끝나고 의견 내는 빌런'처럼 가벼운 경고를 넣으세요.",
  "3점: 이번 학기에는 평범하지만 방심하면 꼬이고, 정리하면 무난히 지나가는 팀플운입니다. 상세 설명에는 빌런과 에이스가 섞여 나타나는 느낌으로 쓰세요.",
  "4점: 이번 학기에는 꽤 괜찮은 팀원을 만나고, 역할만 잘 나누면 결과물이 살아나는 팀플운입니다. 상세 설명에는 '초안 먼저 던지는 에이스', 'PPT 톤 맞춰주는 에이스'처럼 긍정적인 예언을 넣으세요.",
  "5점: 이번 학기에는 팀플 복권에 가까운 좋은 흐름입니다. 상세 설명에는 '말하기 전에 자료 찾아오는 에이스', '발표 리허설까지 챙기는 에이스'처럼 보기 드문 팀플 행운을 예언적으로 넣으세요.",
]

function getStableVariant(context: FortuneContext) {
  const source = `${context.name}|${context.birthDate}|${context.birthTime ?? "unknown"}|${context.today}`
  let hash = 0

  for (const char of source) {
    hash = (hash * 31 + char.charCodeAt(0)) % 1000003
  }

  return hash
}

export function buildFortunePrompt(context: FortuneContext) {
  const variant = getStableVariant(context)
  const roleDirection = ROLE_DIRECTIONS[variant % ROLE_DIRECTIONS.length]
  const warningDirection =
    WARNING_DIRECTIONS[Math.floor(variant / ROLE_DIRECTIONS.length) % WARNING_DIRECTIONS.length]
  const score = ((variant % 5) + (Math.floor(variant / 13) % 5)) % 5 + 1
  const scoreDirection = SCORE_DIRECTIONS[score - 1]
  const sajuText = context.saju
    ? [
        `년주: ${context.saju.yearPillar ?? "없음"}`,
        `월주: ${context.saju.monthPillar ?? "없음"}`,
        `일주: ${context.saju.dayPillar ?? "없음"}`,
        `시주: ${context.saju.hourPillar ?? "알 수 없음"}`,
        `오행 분포: ${context.saju.elements.join(", ")}`,
        `오늘 년주: ${context.saju.todayYearPillar ?? "없음"}`,
        `오늘 월주: ${context.saju.todayMonthPillar ?? "없음"}`,
        `오늘 일주: ${context.saju.todayDayPillar ?? "없음"}`,
        `오늘 오행 분포: ${context.saju.todayElements?.join(", ") ?? "없음"}`,
      ].join("\n")
    : "아직 만세력 데이터가 없습니다. 생년월일과 태어난 시간만 참고해 재미 목적의 결과를 만드세요."

  return [
    "당신은 대학생을 위한 재미있는 '이번 학기 팀플 운세'를 만들어주는 AI입니다.",
    "",
    "서버에서 계산한 간이 만세력의 년주, 월주, 일주, 시주, 오행 분포와 오늘 날짜를 내부 참고자료로 사용합니다.",
    "계산 기준은 오늘 날짜이지만, 사용자에게 보이는 결과 표현은 반드시 '이번 학기 팀플' 관점으로 작성합니다.",
    "사용자에게 보이는 결과는 어려운 계산 설명이 아니라 이번 학기 팀플에서 일어날 법한 상황을 유머러스하게 예측하는 콘텐츠여야 합니다.",
    "결과는 오락 목적이며 실제 미래를 확정적으로 예언하지 않습니다. 다만 운세 서비스처럼 '이번 학기에 이런 일이 있을지도'라는 가벼운 예언 톤은 허용됩니다.",
    "대학생이 읽었을 때 공감하거나 친구에게 보여주고 싶을 정도로 짧고 재미있어야 합니다.",
    "회사 직장인 표현보다 대학생 팀플에서 실제로 자주 사용하는 상황을 우선합니다.",
    "",
    "자주 사용할 수 있는 소재:",
    "자료조사, PPT, 발표, 단톡방, 카톡, 역할 분담, 회의, 과제 마감, 교수님, 조별과제, 무임승차, 잠수, 제출",
    "",
    "사용자 정보:",
    `이름: ${context.name}`,
    `생년월일: ${context.birthDate}`,
    `태어난 시간: ${context.birthTime ?? "알 수 없음"}`,
    `오늘 날짜: ${context.today}`,
    `입력 기반 변주 번호: ${variant}`,
    `이번 학기 추천 점수: ${score}`,
    `이번 학기 점수 방향: ${scoreDirection}`,
    `이번 학기 역할 방향: ${roleDirection}`,
    `이번 학기 주의 방향: ${warningDirection}`,
    "",
    "만세력 확장 데이터:",
    sajuText,
    "",
    "생성 규칙:",
    "- teamworkScore는 1~5 사이의 integer입니다. 1=매우 험난함, 2=조금 험난함, 3=평범함, 4=좋음, 5=매우 좋음.",
    "- teamworkScore는 반드시 '이번 학기 추천 점수'와 같은 숫자로 반환하세요.",
    "- 별 문자열은 만들지 마세요. 점수 숫자만 반환하세요.",
    "- todayRole은 약 10~30자로 짧고 재미있는 팀플 캐릭터를 쓰세요.",
    "- todayRole은 반드시 '이번 학기 역할 방향'을 바탕으로 새로 창작하세요.",
    "- todayRole에 '마감 세 시간 전에 각성하는 사람'이라는 문장을 사용하지 마세요.",
    "- warningType은 특정 개인, 성별, 외모, 출신 지역, 학과를 부정적으로 표현하지 말고 일반적인 팀플 상황으로 쓰세요.",
    "- warningType은 반드시 '이번 학기 주의 방향'을 바탕으로 새로 창작하세요.",
    "- advice는 실제로 도움이 되는 한 문장으로 쓰세요.",
    "- luckyPhrase는 따옴표 없이, 실제 회의에서 말할 수 있는 최대 40자 정도의 짧은 대사로 쓰세요.",
    "- details.score, details.role, details.warning, details.advice는 각각 2~3문장으로 작성하세요.",
    "- details.score는 반드시 '이번 학기 점수 방향'을 반영하세요.",
    "- 점수가 1~2점이면 이번 학기에 만날 수 있는 팀플 빌런 유형을 재치 있게 예언하세요. 단, 특정 개인을 모욕하지 말고 흔한 상황으로 표현하세요.",
    "- 점수가 3점이면 빌런과 에이스가 섞여 나타날 가능성을 균형 있게 예언하세요.",
    "- 점수가 4~5점이면 이번 학기에 만날 수 있는 팀플 에이스 유형과 좋은 흐름을 재치 있게 예언하세요.",
    "- details에는 음양오행, 년주, 월주, 일주, 시주, 만세력, 오행 같은 계산 용어를 직접 쓰지 마세요.",
    "- details는 이번 학기 대학생 팀플 상황극처럼 보여야 합니다. 단톡방, 회의, 발표 준비, PPT, 자료조사, 마감, 교수님 피드백 같은 장면을 넣으세요.",
    "- details는 어느 정도 미래 예언처럼 쓰되, 단정적 공포나 불안 조장은 피하고 가볍고 재미있게 쓰세요.",
    "- details는 왜 그런 결과가 나왔는지 납득되게 설명하면서도 실제로 써먹을 수 있는 조언을 섞으세요.",
    "- 상세 설명은 친구에게 보여줘도 웃기고 납득될 만큼 구체적으로 쓰세요.",
    "- 같은 사람, 같은 날짜, 같은 입력이면 톤과 캐릭터가 너무 크게 뒤집히지 않게 하세요.",
    "- 생년월일, 태어난 시간, 오늘 날짜를 표현 다양성의 기준으로 삼되, 사용자에게는 이번 학기 운세처럼 보이게 쓰세요.",
    "",
    "표현 다양성 규칙:",
    "- 위 규칙의 소재와 방향만 참고하고 예시 문장을 그대로 반복하지 마세요.",
    "- 이번 학기 역할, 주의 유형, 행운의 한마디는 서로 다른 장면을 가리켜야 합니다.",
    "- 결과마다 조사, PPT, 발표, 단톡방, 마감, 교수님 피드백, 파일 제출, 회의 분위기 중 초점이 달라지게 하세요.",
  ].join("\n")
}
