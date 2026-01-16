import type React from 'react'

import { Header } from './header'

interface MainLayoutProps {
    children: React.ReactNode
    showBackButton?: boolean
    title?: string
}

export function MainLayout({ children, showBackButton, title }: MainLayoutProps) {
    return (
        <div className='flex min-h-screen flex-col'>
            <Header showBackButton={showBackButton} title={title} />
            <main className='flex-1'>{children}</main>
        </div>
    )
}
