"use client"
import { Heart, Trash2, Pencil, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LotteryBall } from "./lottery-ball"
import type { NumberLine } from "@/types/lottery"

interface TicketLineProps {
  line: NumberLine
  selectCount: number
  onEdit?: () => void
  onDelete?: () => void
  onToggleFavorite?: () => void
  onQuickPick?: () => void
  showActions?: boolean
  className?: string
}

export function TicketLine({
  line,
  selectCount,
  onEdit,
  onDelete,
  onToggleFavorite,
  onQuickPick,
  showActions = true,
  className,
}: TicketLineProps) {
  const isEmpty = line.numbers.length === 0
  const isComplete = line.numbers.length === selectCount

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-white p-3",
        isComplete && "border-solid border-border",
        className,
      )}
    >
      {/* Label */}
      <div className="flex items-center gap-1 text-muted-foreground">
        <span className="font-medium">{line.label}</span>
        {showActions && onEdit && (
          <Button variant="ghost" size="icon" className="size-6" onClick={onEdit}>
            <Pencil className="size-3" />
          </Button>
        )}
      </div>

      {/* Numbers */}
      <div className="flex flex-1 items-center gap-1.5">
        {Array.from({ length: selectCount }).map((_, idx) => {
          const number = line.numbers[idx]
          const hasNumber = number !== undefined

          return (
            <LotteryBall
              key={idx}
              number={hasNumber ? number : ""}
              variant={line.isQuickPick && hasNumber ? "quickPick" : hasNumber ? "gold" : "empty"}
              size="sm"
              showDecorator={hasNumber}
            />
          )
        })}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="flex items-center gap-1">
          {onToggleFavorite && isComplete && (
            <Button variant="ghost" size="icon" className="size-8" onClick={onToggleFavorite}>
              <Heart className={cn("size-4", line.isFavorite && "fill-red-500 text-red-500")} />
            </Button>
          )}
          {isEmpty && onQuickPick && (
            <Button variant="ghost" size="icon" className="size-8 text-primary" onClick={onQuickPick}>
              <RefreshCw className="size-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-destructive"
              onClick={onDelete}
            >
              <Trash2 className="size-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
