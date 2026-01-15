"use client"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/mock-data"

interface PriceFooterProps {
  totalPrice: number
  buttonLabel: string
  onButtonClick: () => void
  disabled?: boolean
  className?: string
}

export function PriceFooter({ totalPrice, buttonLabel, onButtonClick, disabled = false, className }: PriceFooterProps) {
  const t = useTranslations("game")

  return (
    <div className={cn("fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background px-4 py-3", className)}>
      <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{t("estimatedPrice")}</p>
          <p className="text-xl font-bold text-primary">{formatCurrency(totalPrice)}</p>
        </div>
        <Button size="lg" className="flex-1 max-w-[200px]" onClick={onButtonClick} disabled={disabled}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  )
}
