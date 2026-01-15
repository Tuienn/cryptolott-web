"use client"

import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { ChevronLeft, User, Wallet, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "./language-switcher"
import { mockUser } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/mock-data"

interface HeaderProps {
  showBackButton?: boolean
  title?: string
}

export function Header({ showBackButton, title }: HeaderProps) {
  const t = useTranslations()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-primary">
      <div className="container mx-auto">
        {/* Top bar with user info */}
        <div className="flex items-center justify-between px-4 py-3">
          {showBackButton ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-primary font-bold">
                {mockUser.name.charAt(0)}
              </div>
              <div className="text-primary-foreground">
                <p className="font-medium">{mockUser.name}</p>
                <p className="text-sm opacity-90">{formatCurrency(mockUser.balance)}</p>
              </div>
            </div>
          )}

          {title ? (
            <h1 className="text-lg font-semibold text-primary-foreground">{title}</h1>
          ) : (
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <User className="h-5 w-5" />
              </Button>
            </div>
          )}

          {showBackButton && <div className="w-10" />}
        </div>

        {/* Action buttons - only show on home */}
        {!showBackButton && (
          <div className="flex items-center justify-center gap-3 px-4 pb-3">
            <Button
              variant="outline"
              className="flex-1 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {t("header.withdraw")}
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {t("header.deposit")}
            </Button>
            <Button
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <QrCode className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
