// Mock data cho testing

import type { User, Game, PaymentMethod, DrawPeriod } from "@/types/lottery"

export const mockUser: User = {
  id: "1",
  name: "John Doe",
  balance: 500000,
  avatar: undefined,
}

export const mockGame: Game = {
  id: "power655",
  name: "Power 6/55",
  slug: "power-6-55",
  description: "Choose 6 numbers from 1 to 55",
  maxNumbers: 55,
  selectCount: 6,
  pricePerLine: 10000,
  jackpot: 13698235800,
  nextDrawTime: "2026-01-16T18:00:00",
  drawFrequency: "Daily at 18:00",
  imageUrl: "/power-lottery-logo.jpg",
}

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    name: "Prize Balance",
    type: "balance",
    balance: 0,
    isDefault: true,
    icon: "wallet",
  },
  {
    id: "2",
    name: "Bank Transfer",
    type: "bank",
    isDefault: false,
    icon: "bank",
  },
]

export const mockDrawPeriods: DrawPeriod[] = [
  {
    id: "1",
    name: "Current Draw",
    description: "01/16/2026 - 18:00",
    drawTime: "2026-01-16T18:00:00",
    type: "current",
    icon: "calendar",
  },
  {
    id: "2",
    name: "Multi-draw",
    description: "Book for multiple consecutive draws",
    drawTime: "",
    type: "multi",
    icon: "calendar-range",
  },
  {
    id: "3",
    name: "Custom draws",
    description: "Select specific draw dates",
    drawTime: "",
    type: "custom",
    icon: "calendar-check",
  },
]

// Helper function to generate random numbers
export function generateQuickPick(max: number, count: number): number[] {
  const numbers: number[] = []
  while (numbers.length < count) {
    const num = Math.floor(Math.random() * max) + 1
    if (!numbers.includes(num)) {
      numbers.push(num)
    }
  }
  return numbers.sort((a, b) => a - b)
}

// Format currency
export function formatCurrency(amount: number, locale = "en-US"): string {
  return (
    new Intl.NumberFormat(locale, {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + "₫"
  )
}
