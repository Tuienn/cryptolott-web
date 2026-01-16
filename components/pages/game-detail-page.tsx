'use client'

import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { ChevronDown, Heart, Sparkles, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { mockGame, generateQuickPick } from '@/lib/mock-data'
import type { NumberLine } from '@/types/lottery'
import { useState } from 'react'
import { TicketLine } from '../lottery/ticket-line'
import { QuickActionButton } from '../lottery/quick-pick-button'
import { PriceFooter } from '../lottery/price-footer'

interface GameDetailPageProps {
    slug: string
}

// Generate initial lines with some pre-filled data
function generateInitialLines(): NumberLine[] {
    return [
        {
            id: 'A',
            label: 'A',
            numbers: [10, 11, 12, 28, 39, 50],
            isQuickPick: false,
            isFavorite: false
        },
        {
            id: 'B',
            label: 'B',
            numbers: [7, 18, 28, 31, 39, 43],
            isQuickPick: false,
            isFavorite: false
        },
        { id: 'C', label: 'C', numbers: [], isQuickPick: true, isFavorite: false }, // TC = Quick Pick placeholder
        {
            id: 'D',
            label: 'D',
            numbers: [7, 18, 19, 23, 30, 34],
            isQuickPick: false,
            isFavorite: false
        },
        {
            id: 'E',
            label: 'E',
            numbers: [7, 20, 27, 30, 31, 47],
            isQuickPick: false,
            isFavorite: false
        },
        { id: 'F', label: 'F', numbers: [], isQuickPick: false, isFavorite: false }
    ]
}

export function GameDetailPage({ slug }: GameDetailPageProps) {
    const t = useTranslations('game')
    const locale = useLocale()
    const router = useRouter()

    const [lines, setLines] = useState<NumberLine[]>(generateInitialLines)

    // Calculate total price based on completed lines
    const completedLines = lines.filter((line) => line.numbers.length === mockGame.selectCount)
    const totalPrice = completedLines.length * mockGame.pricePerLine

    // Handle edit line - navigate to number select page
    const handleEditLine = (lineId: string) => {
        router.push(`/${locale}/game/${slug}/select?line=${lineId}`)
    }

    // Handle delete line
    const handleDeleteLine = (lineId: string) => {
        setLines((prev) =>
            prev.map((line) => (line.id === lineId ? { ...line, numbers: [], isQuickPick: false } : line))
        )
    }

    // Handle toggle favorite
    const handleToggleFavorite = (lineId: string) => {
        setLines((prev) => prev.map((line) => (line.id === lineId ? { ...line, isFavorite: !line.isFavorite } : line)))
    }

    // Handle quick pick for a line
    const handleQuickPickLine = (lineId: string) => {
        const quickNumbers = generateQuickPick(mockGame.maxNumbers, mockGame.selectCount)
        setLines((prev) =>
            prev.map((line) => (line.id === lineId ? { ...line, numbers: quickNumbers, isQuickPick: true } : line))
        )
    }

    // Handle add new line
    const handleAddLine = () => {
        const nextLabel = String.fromCharCode(65 + lines.length) // A, B, C...
        if (lines.length < 100) {
            setLines((prev) => [
                ...prev,
                {
                    id: nextLabel,
                    label: nextLabel,
                    numbers: [],
                    isQuickPick: false,
                    isFavorite: false
                }
            ])
        }
    }

    // Handle lucky pick - fill all empty lines with quick pick
    const handleLuckyPick = () => {
        setLines((prev) =>
            prev.map((line) => {
                if (line.numbers.length === 0) {
                    return {
                        ...line,
                        numbers: generateQuickPick(mockGame.maxNumbers, mockGame.selectCount),
                        isQuickPick: true
                    }
                }
                return line
            })
        )
    }

    // Handle buy ticket
    const handleBuyTicket = () => {
        router.push(`/${locale}/payment`)
    }

    return (
        <div className='flex flex-col pb-24'>
            {/* Play Mode & Draw Date Selectors */}
            <div className='border-border flex border-b'>
                <div className='flex flex-1 items-center justify-between px-4 py-3 text-sm'>
                    <span className='text-muted-foreground'>{t('playMode')}:</span>
                    <span className='text-primary flex items-center gap-1 font-medium'>
                        {t('basic')}
                        <ChevronDown className='size-4' />
                    </span>
                </div>
                <div className='bg-border w-px' />
                <div className='flex flex-1 items-center justify-between px-4 py-3 text-sm'>
                    <span className='text-muted-foreground'>{t('drawDate')}:</span>
                    <span className='text-primary flex items-center gap-1 font-medium'>
                        15/01/2026
                        <ChevronDown className='size-4' />
                    </span>
                </div>
            </div>

            {/* Scrolling Announcement Banner */}
            <div className='bg-primary/5 overflow-hidden py-2'>
                <div className='animate-marquee text-primary text-sm whitespace-nowrap'>
                    <span className='mx-4'>
                        Draw #01294 has 52,794 winners with total prize value of 1 billion VND! Congratulations!
                    </span>
                    <span className='mx-4'>
                        Draw #01294 has 52,794 winners with total prize value of 1 billion VND! Congratulations!
                    </span>
                </div>
            </div>

            {/* Ticket Lines */}
            <div className='flex flex-col gap-2 p-4'>
                {lines.map((line) => (
                    <TicketLine
                        key={line.id}
                        line={line}
                        selectCount={mockGame.selectCount}
                        onEdit={() => handleEditLine(line.id)}
                        onDelete={() => handleDeleteLine(line.id)}
                        onToggleFavorite={() => handleToggleFavorite(line.id)}
                        onQuickPick={() => handleQuickPickLine(line.id)}
                    />
                ))}
            </div>

            {/* Lucky Pick Banner */}
            <div className='px-4'>
                <Button
                    onClick={handleLuckyPick}
                    size='lg'
                    className='from-primary w-full rounded-full bg-linear-to-r to-red-500 text-white shadow-lg transition-transform'
                >
                    <Sparkles />
                    {t('luckyMessage')}
                </Button>
            </div>

            {/* Add Line Button */}
            <div className='px-4 pt-3'>
                <Button
                    variant='outline'
                    size='lg'
                    className='text-primary border-primary hover:bg-primary/10 w-full rounded-full border-dashed bg-transparent'
                    onClick={handleAddLine}
                    disabled={lines.length >= 100}
                >
                    <Plus />
                    {t('addLine')}
                </Button>
            </div>

            {/* Quick Action Buttons */}
            <div className='flex items-center justify-center gap-3 px-4 pt-4'>
                <QuickActionButton
                    variant='favorite'
                    label={t('favorites')}
                    onClick={() => {}}
                    icon={<Heart className='size-4 text-red-400' />}
                />
                <QuickActionButton
                    variant='custom'
                    label={t('customPick')}
                    onClick={() => {}}
                    icon={<span className='text-sm'>🎯</span>}
                />
                <QuickActionButton
                    variant='custom'
                    label={t('luckyPick')}
                    onClick={handleLuckyPick}
                    icon={<span className='text-sm'>🧧</span>}
                />
            </div>

            {/* Price Footer */}
            <PriceFooter
                totalPrice={totalPrice}
                buttonLabel={t('buyTicket')}
                onButtonClick={handleBuyTicket}
                disabled={completedLines.length === 0}
            />
        </div>
    )
}
