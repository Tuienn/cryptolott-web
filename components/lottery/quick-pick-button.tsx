import type * as React from 'react'
import { Sparkles, Plus, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface QuickActionButtonProps {
    variant: 'lucky' | 'add' | 'favorite' | 'custom'
    label: string
    onClick: () => void
    icon?: React.ReactNode
    className?: string
}

export function QuickActionButton({ variant, label, onClick, icon, className }: QuickActionButtonProps) {
    const defaultIcons = {
        lucky: <Sparkles className='size-4' />,
        add: <Plus className='size-4' />,
        favorite: <Heart className='size-4' />,
        custom: null
    }

    const variantStyles = {
        lucky: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 border-none',
        add: 'border-gray-300 text-foreground hover:bg-gray-50',
        favorite: 'bg-gray-100 text-foreground hover:bg-gray-200 border-none',
        custom: 'bg-gray-100 text-foreground hover:bg-gray-200 border-none'
    }

    return (
        <Button
            variant='outline'
            className={cn('h-auto flex-col gap-1 px-4 py-2', variantStyles[variant], className)}
            onClick={onClick}
        >
            <span className='flex items-center gap-1.5'>
                {icon || defaultIcons[variant]}
                <span className='text-sm font-medium'>{label}</span>
            </span>
        </Button>
    )
}
