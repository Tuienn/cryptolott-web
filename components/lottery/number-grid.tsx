"use client"
import { cn } from "@/lib/utils"
import { LotteryBall } from "./lottery-ball"

interface NumberGridProps {
  maxNumber: number
  selectedNumbers: number[]
  maxSelection: number
  onNumberSelect: (number: number) => void
  disabled?: boolean
  className?: string
}

export function NumberGrid({
  maxNumber,
  selectedNumbers,
  maxSelection,
  onNumberSelect,
  disabled = false,
  className,
}: NumberGridProps) {
  const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1)
  const canSelectMore = selectedNumbers.length < maxSelection

  const handleSelect = (num: number) => {
    if (disabled) return

    const isSelected = selectedNumbers.includes(num)
    if (isSelected || canSelectMore) {
      onNumberSelect(num)
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <span>Choose {maxSelection} numbers from</span>
        <span className="font-semibold text-primary">01 to {maxNumber.toString().padStart(2, "0")}</span>
      </div>
      <div className="grid grid-cols-8 gap-2">
        {numbers.map((num) => {
          const isSelected = selectedNumbers.includes(num)
          return (
            <button
              key={num}
              onClick={() => handleSelect(num)}
              disabled={disabled || (!isSelected && !canSelectMore)}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full disabled:cursor-not-allowed"
            >
              <LotteryBall
                number={num}
                variant={isSelected ? "outlineSelected" : "outline"}
                size="default"
                className={cn(
                  "cursor-pointer transition-transform hover:scale-110",
                  disabled && "opacity-50 cursor-not-allowed hover:scale-100",
                )}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
