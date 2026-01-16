'use client'

import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/mock-data'
import type { Game } from '@/types/lottery'
import { useEffect, useState } from 'react'

interface GameCardProps {
    game: Game
    className?: string
}

export function GameCard({ game, className }: GameCardProps) {
    const t = useTranslations('home')
    const locale = useLocale()
    const router = useRouter()

    // Calculate countdown
    const [countdown, setCountdown] = useState('')

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date()
            const drawTime = new Date(game.nextDrawTime)
            const diff = drawTime.getTime() - now.getTime()

            if (diff <= 0) {
                setCountdown('00:00:00')
                return
            }

            const hours = Math.floor(diff / (1000 * 60 * 60))
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((diff % (1000 * 60)) / 1000)

            setCountdown(
                `${hours.toString().padStart(2, '0')}:${minutes
                    .toString()
                    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            )
        }

        updateCountdown()
        const interval = setInterval(updateCountdown, 1000)
        return () => clearInterval(interval)
    }, [game.nextDrawTime])

    const handlePlayNow = () => {
        router.push(`/${locale}/game/${game.slug}`)
    }

    return (
        <Card
            className={cn(
                'gap-0 overflow-hidden border-none bg-gradient-to-br from-amber-50 to-orange-50 py-0 shadow-md',
                className
            )}
        >
            <CardContent className='p-0'>
                {/* Status badge */}
                <div className='flex items-start justify-between p-4 pb-0'>
                    <Badge className='bg-primary text-primary-foreground'>{t('drawToday')}</Badge>
                    <div className='text-muted-foreground text-right text-xs'>
                        <p>{t('draw')} #01295</p>
                        <p>{new Date(game.nextDrawTime).toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Game info */}
                <div className='flex items-center gap-4 p-4'>
                    {/* Logo placeholder */}
                    <div className='flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500'>
                        <span className='text-lg font-bold text-white'>{game.name.split(' ')[0]}</span>
                    </div>

                    <div className='flex-1'>
                        <h3 className='text-muted-foreground text-sm'>{t('jackpotValue')}</h3>
                        <p className='text-primary text-xl font-bold'>{formatCurrency(game.jackpot)}</p>
                        <div className='text-muted-foreground mt-1 flex items-center gap-2 text-sm'>
                            <Clock className='size-4' />
                            <span>{countdown}</span>
                        </div>
                    </div>

                    <Button onClick={handlePlayNow} className='shrink-0'>
                        {t('playNow')}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
