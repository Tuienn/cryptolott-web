import type React from 'react'
import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'
import '../globals.css'

export const metadata: Metadata = {
    title: 'Cryptolott - Power 6/55 Lottery',
    description: 'Play Power 6/55 lottery online. Choose your lucky numbers and win big jackpot prizes!',
    keywords: ['lottery', 'power 6/55', 'jackpot', 'lucky numbers', 'cryptolott']
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#DC2626'
}

interface LocaleLayoutProps {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
    const { locale } = await params

    // Validate locale
    if (!locales.includes(locale as Locale)) {
        notFound()
    }

    const messages = await getMessages()

    return (
        <main lang={locale}>
            <section className='font-sans antialiased'>
                <NextIntlClientProvider messages={messages}>
                    <div className='bg-background min-h-screen'>{children}</div>
                </NextIntlClientProvider>
            </section>
        </main>
    )
}
