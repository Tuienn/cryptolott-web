'use client'

import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { Plus, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TicketLine } from '../lottery/ticket-line'
import { NumberGrid } from '../lottery/number-grid'
import { PriceFooter } from '../lottery/price-footer'
import { mockGame, generateQuickPick } from '@/lib/mock-data'
import type { NumberLine } from '@/types/lottery'
import { useState } from 'react'

interface NumberSelectPageProps {
    slug: string
}

// Mock initial lines - in real app this would come from state management
function getInitialLines(): NumberLine[] {
    return [
        {
            id: 'B',
            label: 'B',
            numbers: [7, 18, 28, 31, 39, 43],
            isQuickPick: false,
            isFavorite: false
        },
        { id: 'C', label: 'C', numbers: [], isQuickPick: true, isFavorite: false },
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
        }
    ]
}

export function NumberSelectPage({ slug }: NumberSelectPageProps) {
    const t = useTranslations('game')
    const locale = useLocale()
    const router = useRouter()

    const [lines, setLines] = useState<NumberLine[]>(getInitialLines)
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])

    // Calculate total price
    const completedLines = lines.filter((line) => line.numbers.length === mockGame.selectCount)
    const currentLineComplete = selectedNumbers.length === mockGame.selectCount
    const totalCompletedCount = completedLines.length + (currentLineComplete ? 1 : 0)
    const totalPrice = totalCompletedCount * mockGame.pricePerLine

    // Handle number selection in grid
    const handleNumberSelect = (num: number) => {
        setSelectedNumbers((prev) => {
            if (prev.includes(num)) {
                return prev.filter((n) => n !== num)
            }
            if (prev.length < mockGame.selectCount) {
                return [...prev, num].sort((a, b) => a - b)
            }
            return prev
        })
    }

    // Handle delete line
    const handleDeleteLine = (lineId: string) => {
        setLines((prev) => prev.filter((line) => line.id !== lineId))
    }

    // Handle toggle favorite
    const handleToggleFavorite = (lineId: string) => {
        setLines((prev) => prev.map((line) => (line.id === lineId ? { ...line, isFavorite: !line.isFavorite } : line)))
    }

    // Handle add new line
    const handleAddLine = () => {
        if (selectedNumbers.length === mockGame.selectCount) {
            // Save current selection as a new line
            const nextLabel = String.fromCharCode(65 + lines.length)
            setLines((prev) => [
                ...prev,
                {
                    id: nextLabel,
                    label: nextLabel,
                    numbers: [...selectedNumbers],
                    isQuickPick: false,
                    isFavorite: false
                }
            ])
            setSelectedNumbers([])
        }
    }

    // Handle quick pick
    const handleQuickPick = () => {
        const quickNumbers = generateQuickPick(mockGame.maxNumbers, mockGame.selectCount)
        setSelectedNumbers(quickNumbers)
    }

    // Handle confirm
    const handleConfirm = () => {
        // Save current selection if complete
        if (selectedNumbers.length === mockGame.selectCount) {
            const nextLabel = String.fromCharCode(65 + lines.length)
            setLines((prev) => [
                ...prev,
                {
                    id: nextLabel,
                    label: nextLabel,
                    numbers: [...selectedNumbers],
                    isQuickPick: false,
                    isFavorite: false
                }
            ])
        }
        // Navigate back to game detail
        router.push(`/${locale}/game/${slug}`)
    }

    return (
        <div className='flex flex-col pb-24'>
            {/* Existing Lines Display */}
            <div className='border-border bg-muted/30 border-b border-dashed'>
                <div className='flex flex-col gap-2 p-4'>
                    {lines.map((line) => (
                        <TicketLine
                            key={line.id}
                            line={line}
                            selectCount={mockGame.selectCount}
                            onDelete={() => handleDeleteLine(line.id)}
                            onToggleFavorite={() => handleToggleFavorite(line.id)}
                            showActions={true}
                        />
                    ))}
                </div>

                {/* Action Buttons */}
                <div className='flex items-center gap-3 px-4 pb-4'>
                    <Button variant='outline' className='flex-1 gap-2 bg-white' onClick={handleAddLine}>
                        <Plus className='size-4' />
                        {t('addLine')}
                    </Button>
                    <Button variant='outline' className='flex-1 gap-2 bg-white' onClick={handleQuickPick}>
                        <Sparkles className='size-4' />
                        {t('luckyPick')}
                    </Button>
                </div>
            </div>

            {/* Number Grid Section */}
            <div className='p-4'>
                <NumberGrid
                    maxNumber={mockGame.maxNumbers}
                    selectedNumbers={selectedNumbers}
                    maxSelection={mockGame.selectCount}
                    onNumberSelect={handleNumberSelect}
                />
            </div>

            {/* Price Footer */}
            <PriceFooter totalPrice={totalPrice} buttonLabel={t('confirm')} onButtonClick={handleConfirm} />
        </div>
    )
}
