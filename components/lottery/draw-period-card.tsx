"use client"
import { Calendar, CalendarRange, CalendarCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DrawPeriod } from "@/types/lottery"

interface DrawPeriodCardProps {
  period: DrawPeriod
  isSelected: boolean
  onSelect: () => void
  isNew?: boolean
  className?: string
}

export function DrawPeriodCard({ period, isSelected, onSelect, isNew = false, className }: DrawPeriodCardProps) {
  const IconMap = {
    calendar: Calendar,
    "calendar-range": CalendarRange,
    "calendar-check": CalendarCheck,
  }
  const Icon = IconMap[period.icon as keyof typeof IconMap] || Calendar

  return (
    <Card
      className={cn("cursor-pointer transition-all py-3 gap-0", isSelected && "ring-2 ring-primary", className)}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-amber-100">
            <Icon className="size-5 text-amber-600" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{period.name}</span>
              {isNew && <Badge className="bg-primary text-primary-foreground text-xs">New</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">{period.description}</p>
          </div>

          <div
            className={cn(
              "size-5 rounded-full border-2",
              isSelected ? "border-primary bg-primary" : "border-gray-300 bg-white",
            )}
          >
            {isSelected && (
              <div className="flex h-full items-center justify-center">
                <div className="size-2 rounded-full bg-white" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
