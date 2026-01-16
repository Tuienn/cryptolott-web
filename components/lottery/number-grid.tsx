import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { LotteryBall } from './lottery-ball'

interface NumberGridProps {
    maxNumber: number
    selectedNumbers: number[]
    maxSelection: number
    onNumberSelect: (number: number) => void
    disabled?: boolean
    className?: string
}

export function NumberGrid({
    maxNumber,
    selectedNumbers,
    maxSelection,
    onNumberSelect,
    disabled = false,
    className
}: NumberGridProps) {
    const t = useTranslations('game')
    const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1)
    const canSelectMore = selectedNumbers.length < maxSelection

    const handleSelect = (num: number) => {
        if (disabled) return

        const isSelected = selectedNumbers.includes(num)
        if (isSelected || canSelectMore) {
            onNumberSelect(num)
        }
    }

    return (
        <div className={cn('w-full', className)}>
            <div className='text-muted-foreground mb-3 text-center text-sm'>
                {t('chooseNumbers', {
                    count: maxSelection,
                    max: maxNumber.toString().padStart(2, '0')
                })}
            </div>
            <div className='grid grid-cols-8 gap-2'>
                {numbers.map((num) => {
                    const isSelected = selectedNumbers.includes(num)
                    return (
                        <button
                            key={num}
                            onClick={() => handleSelect(num)}
                            disabled={disabled || (!isSelected && !canSelectMore)}
                            className='focus-visible:ring-primary rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed'
                        >
                            <LotteryBall
                                number={num}
                                variant={isSelected ? 'outlineSelected' : 'outline'}
                                size='default'
                                className={cn(
                                    'cursor-pointer transition-transform hover:scale-110',
                                    disabled && 'cursor-not-allowed opacity-50 hover:scale-100'
                                )}
                            />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
