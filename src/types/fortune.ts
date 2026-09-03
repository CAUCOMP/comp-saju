export interface FortuneRequest {
  name: string
  birthDate: string
  birthTime: string | null
}

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

export interface UserInfo {
  name: string
  birthdate: string
  birthtime: string
  unknownTime: boolean
}
