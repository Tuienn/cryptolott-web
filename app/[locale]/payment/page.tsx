import { MainLayout } from "@/components/layout/main-layout"
import { PaymentPage } from "@/components/pages/payment-page"

export default function Payment() {
  return (
    <MainLayout showBackButton title="Payment">
      <PaymentPage />
    </MainLayout>
  )
}
