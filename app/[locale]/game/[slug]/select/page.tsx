import { MainLayout } from '@/components/layout/main-layout'
import { NumberSelectPage } from '@/components/pages/number-select-page'
import { getTranslations } from 'next-intl/server'

interface SelectPageProps {
    params: Promise<{ slug: string }>
}

export default async function SelectPage({ params }: SelectPageProps) {
    const { slug } = await params
    const t = await getTranslations('game')

    return (
        <MainLayout showBackButton title={t('selectNumbersTitle', { gameName: t('power655') })}>
            <NumberSelectPage slug={slug} />
        </MainLayout>
    )
}
