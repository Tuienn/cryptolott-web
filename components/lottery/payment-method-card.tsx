import { Wallet, Building2, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/mock-data'
import type { PaymentMethod } from '@/types/lottery'

interface PaymentMethodCardProps {
    method: PaymentMethod
    isSelected: boolean
    onSelect: () => void
    className?: string
}

export function PaymentMethodCard({ method, isSelected, onSelect, className }: PaymentMethodCardProps) {
    const Icon = method.type === 'balance' ? Wallet : Building2

    return (
        <Card
            className={cn('cursor-pointer gap-0 py-3 transition-all', isSelected && 'ring-primary ring-2', className)}
            onClick={onSelect}
        >
            <CardContent className='p-4'>
                <div className='flex items-start gap-3'>
                    <div className='bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg'>
                        <Icon className='text-primary size-5' />
                    </div>

                    <div className='flex-1'>
                        <div className='flex items-center gap-2'>
                            {method.isDefault && (
                                <Badge variant='secondary' className='text-xs'>
                                    Default
                                </Badge>
                            )}
                            <span className='text-sm font-medium'>{method.name}</span>
                        </div>
                        {method.balance !== undefined && (
                            <p className='text-muted-foreground text-sm'>Balance: {formatCurrency(method.balance)}</p>
                        )}

                        {method.type === 'balance' && (
                            <div className='mt-2 flex gap-2'>
                                <Button size='sm' className='h-8'>
                                    Deposit
                                </Button>
                                <Button size='sm' variant='outline' className='h-8 bg-transparent'>
                                    Download QR
                                </Button>
                            </div>
                        )}
                    </div>

                    <div
                        className={cn(
                            'size-5 rounded-full border-2',
                            isSelected ? 'border-primary bg-primary' : 'border-gray-300 bg-white'
                        )}
                    >
                        {isSelected && (
                            <div className='flex h-full items-center justify-center'>
                                <div className='size-2 rounded-full bg-white' />
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

interface AddPaymentButtonProps {
    onClick: () => void
    className?: string
}

export function AddPaymentButton({ onClick, className }: AddPaymentButtonProps) {
    return (
        <Button variant='outline' size='icon' className={cn('size-8 rounded-full', className)} onClick={onClick}>
            <Plus className='size-4' />
        </Button>
    )
}
