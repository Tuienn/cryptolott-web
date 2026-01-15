import { MainLayout } from "@/components/layout/main-layout"
import { NumberSelectPage } from "@/components/pages/number-select-page"

interface SelectPageProps {
  params: Promise<{ slug: string }>
}

export default async function SelectPage({ params }: SelectPageProps) {
  const { slug } = await params

  return (
    <MainLayout showBackButton title="Select Numbers Power 6/55">
      <NumberSelectPage slug={slug} />
    </MainLayout>
  )
}
