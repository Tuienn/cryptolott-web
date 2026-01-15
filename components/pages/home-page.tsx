"use client"

import { useTranslations, useLocale } from "next-intl"
import { GameCard } from "@/components/lottery"
import { mockGame } from "@/lib/mock-data"

export function HomePage() {
  const t = useTranslations("home")
  const locale = useLocale()

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* Banner Section */}
      <div className="relative aspect-[2/1] w-full overflow-hidden bg-gradient-to-br from-primary via-red-500 to-orange-500">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-4xl font-bold md:text-5xl">2026</p>
            <p className="mt-2 text-xl font-bold md:text-2xl">HAPPY NEW YEAR</p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-2">
        <div className="size-2 rounded-full bg-muted-foreground" />
        <div className="size-2 rounded-full bg-muted" />
      </div>

      {/* Game List Section */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4">
          {/* Power 6/55 Game Card */}
          <GameCard game={mockGame} />
        </div>
      </div>
    </div>
  )
}
