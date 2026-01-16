import type * as React from 'react'
import { Sparkles, Plus, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface QuickActionButtonProps {
    variant: 'lucky' | 'add' | 'favorite' | 'custom'
    label: string
    onClick: () => void
    icon?: React.ReactNode
}

export function QuickActionButton({ variant, label, onClick, icon }: QuickActionButtonProps) {
    const defaultIcons = {
        lucky: <Sparkles />,
        add: <Plus />,
        favorite: <Heart />,
        custom: null
    }

    return (
        <Button variant='outline' onClick={onClick}>
            {icon || defaultIcons[variant]}
            <span className='text-sm font-medium'>{label}</span>
        </Button>
    )
}
