import { GameCard } from '../lottery/game-card'
import { mockGame } from '@/lib/mock-data'

export function HomePage() {
    return (
        <div className='flex flex-col gap-6 pb-6'>
            {/* Banner Section */}
            <div className='from-primary relative aspect-[2/1] w-full overflow-hidden bg-gradient-to-br via-red-300 to-orange-300'>
                <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='text-center text-white'>
                        <p className='text-4xl font-bold md:text-5xl'>2026</p>
                        <p className='mt-2 text-xl font-bold md:text-2xl'>HAPPY NEW YEAR</p>
                    </div>
                </div>
                {/* Decorative elements */}
                <div className='from-background absolute right-0 bottom-0 left-0 h-8 bg-gradient-to-t to-transparent' />
            </div>

            {/* Pagination dots */}
            <div className='flex items-center justify-center gap-2'>
                <div className='bg-muted-foreground size-2 rounded-full' />
                <div className='bg-muted size-2 rounded-full' />
            </div>

            {/* Game List Section */}
            <div className='container mx-auto px-4'>
                <div className='flex flex-col gap-4'>
                    {/* Power 6/55 Game Card */}
                    <GameCard game={mockGame} />
                </div>
            </div>
        </div>
    )
}
