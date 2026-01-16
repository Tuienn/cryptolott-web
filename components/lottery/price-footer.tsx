'use client'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/mock-data'

interface PriceFooterProps {
    totalPrice: number
    buttonLabel: string
    onButtonClick: () => void
    disabled?: boolean
    className?: string
}

export function PriceFooter({ totalPrice, buttonLabel, onButtonClick, disabled = false, className }: PriceFooterProps) {
    const t = useTranslations('game')

    return (
        <div
            className={cn(
                'border-border bg-background fixed right-0 bottom-0 left-0 z-40 border-t px-4 py-3',
                className
            )}
        >
            <div className='mx-auto flex max-w-lg items-center justify-between gap-4'>
                <div>
                    <p className='text-muted-foreground text-sm'>{t('estimatedPrice')}</p>
                    <p className='text-primary text-xl font-bold'>{formatCurrency(totalPrice)}</p>
                </div>
                <Button size='lg' className='max-w-[200px] flex-1' onClick={onButtonClick} disabled={disabled}>
                    {buttonLabel}
                </Button>
            </div>
        </div>
    )
}
