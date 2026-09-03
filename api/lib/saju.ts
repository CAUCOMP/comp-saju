export interface SajuData {
  yearPillar: string
  monthPillar: string
  dayPillar: string
  hourPillar: string | null
  elements: string[]
  todayYearPillar?: string
  todayMonthPillar?: string
  todayDayPillar?: string
  todayElements?: string[]
}

const STEMS = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"]
const BRANCHES = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"]
const STEM_ELEMENTS = ["목", "목", "화", "화", "토", "토", "금", "금", "수", "수"]
const BRANCH_ELEMENTS = ["수", "토", "목", "목", "토", "화", "화", "토", "금", "금", "토", "수"]
const HOUR_BRANCHES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const MONTH_BOUNDARIES = [
  { month: 2, day: 4, branchIndex: 2 },
  { month: 3, day: 6, branchIndex: 3 },
  { month: 4, day: 5, branchIndex: 4 },
  { month: 5, day: 6, branchIndex: 5 },
  { month: 6, day: 6, branchIndex: 6 },
  { month: 7, day: 7, branchIndex: 7 },
  { month: 8, day: 8, branchIndex: 8 },
  { month: 9, day: 8, branchIndex: 9 },
  { month: 10, day: 8, branchIndex: 10 },
  { month: 11, day: 7, branchIndex: 11 },
  { month: 12, day: 7, branchIndex: 0 },
  { month: 1, day: 6, branchIndex: 1 },
]

function getPillar(index: number) {
  const normalized = ((index % 60) + 60) % 60
  return {
    label: `${STEMS[normalized % 10]}${BRANCHES[normalized % 12]}`,
    stemIndex: normalized % 10,
    branchIndex: normalized % 12,
  }
}

function getJulianDay(year: number, month: number, day: number) {
  const a = Math.floor((14 - month) / 12)
  const y = year + 4800 - a
  const m = month + 12 * a - 3

  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  )
}

function parseDate(dateText: string) {
  const [year, month, day] = dateText.split("-").map(Number)
  return { year, month, day }
}

function getSajuYear(dateText: string) {
  const { year, month, day } = parseDate(dateText)
  const sajuYear = month < 2 || (month === 2 && day < 4) ? year - 1 : year
  return getPillar(sajuYear - 4)
}

function getSajuMonth(dateText: string, yearStemIndex: number) {
  const { month, day } = parseDate(dateText)
  let branchIndex = month === 1 || (month === 2 && day < 4) ? 1 : 0

  for (const boundary of MONTH_BOUNDARIES) {
    const reached =
      month > boundary.month || (month === boundary.month && day >= boundary.day)
    if (reached) branchIndex = boundary.branchIndex
  }

  if (month === 1 && day < 6) branchIndex = 0

  const firstMonthStemByYearStem = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0]
  const monthOrderFromTiger = (branchIndex - 2 + 12) % 12
  const stemIndex =
    (firstMonthStemByYearStem[yearStemIndex] + monthOrderFromTiger) % 10

  return {
    label: `${STEMS[stemIndex]}${BRANCHES[branchIndex]}`,
    stemIndex,
    branchIndex,
  }
}

function getSajuDay(dateText: string) {
  const { year, month, day } = parseDate(dateText)
  const julianDay = getJulianDay(year, month, day)
  return getPillar(julianDay + 11)
}

function getSajuHour(birthTime: string | null, dayStemIndex: number) {
  if (!birthTime) return null

  const [hour] = birthTime.split(":").map(Number)
  const branchSlot = Math.floor(((hour + 1) % 24) / 2)
  const branchIndex = HOUR_BRANCHES[branchSlot]
  const firstHourStemByDayStem = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8]
  const stemIndex = (firstHourStemByDayStem[dayStemIndex] + branchIndex) % 10

  return {
    label: `${STEMS[stemIndex]}${BRANCHES[branchIndex]}`,
    stemIndex,
    branchIndex,
  }
}

function collectElements(
  pillars: Array<{ stemIndex: number; branchIndex: number } | null>,
) {
  const counts = new Map<string, number>()

  for (const pillar of pillars) {
    if (!pillar) continue
    for (const element of [
      STEM_ELEMENTS[pillar.stemIndex],
      BRANCH_ELEMENTS[pillar.branchIndex],
    ]) {
      counts.set(element, (counts.get(element) ?? 0) + 1)
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([element, count]) => `${element}${count}`)
}

export function calculateSaju(birthDate: string, birthTime: string | null): SajuData {
  const yearPillar = getSajuYear(birthDate)
  const monthPillar = getSajuMonth(birthDate, yearPillar.stemIndex)
  const dayPillar = getSajuDay(birthDate)
  const hourPillar = getSajuHour(birthTime, dayPillar.stemIndex)

  return {
    yearPillar: yearPillar.label,
    monthPillar: monthPillar.label,
    dayPillar: dayPillar.label,
    hourPillar: hourPillar?.label ?? null,
    elements: collectElements([yearPillar, monthPillar, dayPillar, hourPillar]),
  }
}

export function calculateTodaySaju(today: string) {
  const yearPillar = getSajuYear(today)
  const monthPillar = getSajuMonth(today, yearPillar.stemIndex)
  const dayPillar = getSajuDay(today)

  return {
    todayYearPillar: yearPillar.label,
    todayMonthPillar: monthPillar.label,
    todayDayPillar: dayPillar.label,
    todayElements: collectElements([yearPillar, monthPillar, dayPillar]),
  }
}
