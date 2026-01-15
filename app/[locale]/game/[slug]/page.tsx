import { MainLayout } from "@/components/layout/main-layout"
import { GameDetailPage } from "@/components/pages/game-detail-page"

interface GamePageProps {
  params: Promise<{ slug: string }>
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params

  return (
    <MainLayout showBackButton title="Power 6/55">
      <GameDetailPage slug={slug} />
    </MainLayout>
  )
}
