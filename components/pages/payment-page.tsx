"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { ChevronDown, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { PaymentMethodCard, AddPaymentButton, DrawPeriodCard, PriceFooter } from "@/components/lottery"
import { mockPaymentMethods, mockDrawPeriods, formatCurrency, mockGame } from "@/lib/mock-data"

export function PaymentPage() {
  const t = useTranslations("payment")
  const locale = useLocale()
  const router = useRouter()

  const [selectedMethodId, setSelectedMethodId] = React.useState(mockPaymentMethods[0].id)
  const [selectedPeriodId, setSelectedPeriodId] = React.useState(mockDrawPeriods[0].id)
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false)

  // Mock ticket data - in real app this would come from state/context
  const ticketLinesCount = 5
  const totalPrice = ticketLinesCount * mockGame.pricePerLine
  const contributionAmount = 3000

  const handleAddPaymentMethod = () => {
    // In real app, open payment method add modal
    console.log("Add payment method")
  }

  const handleSubmitPayment = () => {
    // In real app, process payment
    alert("Payment submitted successfully!")
    router.push(`/${locale}`)
  }

  return (
    <div className="flex flex-col pb-32">
      {/* Select Payment Method Section */}
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t("selectMethod")}</h2>
          <AddPaymentButton onClick={handleAddPaymentMethod} />
        </div>

        <div className="flex flex-col gap-3">
          {mockPaymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              isSelected={selectedMethodId === method.id}
              onSelect={() => setSelectedMethodId(method.id)}
            />
          ))}
        </div>
      </div>

      {/* Select Draw Period Section */}
      <div className="p-4 pt-0">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-lg font-semibold">{t("selectPeriod")}</h2>
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            {t("newBadge")}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {mockDrawPeriods.map((period, index) => (
            <DrawPeriodCard
              key={period.id}
              period={period}
              isSelected={selectedPeriodId === period.id}
              onSelect={() => setSelectedPeriodId(period.id)}
              isNew={index === 0}
            />
          ))}
        </div>
      </div>

      {/* Ticket Details Collapsible */}
      <div className="px-4">
        <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between rounded-lg border border-border bg-white px-4">
              <span className="flex items-center gap-2 text-sm">
                <MessageSquare className="size-4 text-amber-500" />
                {t("ticketDetails")}
              </span>
              <ChevronDown className={`size-4 transition-transform ${isDetailsOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 rounded-lg border border-border bg-white p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Game:</span>
                <span className="font-medium">{mockGame.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lines:</span>
                <span className="font-medium">{ticketLinesCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price per line:</span>
                <span className="font-medium">{formatCurrency(mockGame.pricePerLine)}</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Total and Contribution */}
      <div className="mt-4 px-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{t("total")}</span>
          <span className="text-xl font-bold text-primary">{formatCurrency(totalPrice)}</span>
        </div>

        {/* Contribution message */}
        <div className="mt-3 flex items-start gap-3 rounded-lg bg-amber-50 p-3">
          <div className="shrink-0 text-2xl">🎉</div>
          <p className="text-sm text-muted-foreground">
            <span className="text-primary">With every {formatCurrency(10000)}</span> ticket purchase, you contribute{" "}
            <span className="font-medium text-foreground">{formatCurrency(contributionAmount)}</span> to the community
            fund
          </p>
        </div>
      </div>

      {/* Fixed Footer */}
      <PriceFooter totalPrice={totalPrice} buttonLabel={t("smsBooking")} onButtonClick={handleSubmitPayment} />
    </div>
  )
}
