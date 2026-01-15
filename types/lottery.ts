// Types cho toàn bộ ứng dụng Cryptolott

export interface User {
  id: string
  name: string
  balance: number
  avatar?: string
}

export interface Game {
  id: string
  name: string
  slug: string
  description: string
  maxNumbers: number
  selectCount: number
  pricePerLine: number
  jackpot: number
  nextDrawTime: string
  drawFrequency: string
  imageUrl?: string
}

export interface NumberLine {
  id: string
  label: string
  numbers: number[]
  isQuickPick: boolean
  isFavorite: boolean
}

export interface Ticket {
  id: string
  gameId: string
  lines: NumberLine[]
  drawDate: string
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled"
}

export interface PaymentMethod {
  id: string
  name: string
  type: "balance" | "bank" | "ewallet"
  balance?: number
  isDefault: boolean
  icon?: string
}

export interface DrawPeriod {
  id: string
  name: string
  description: string
  drawTime: string
  type: "current" | "multi" | "custom"
  icon?: string
}
