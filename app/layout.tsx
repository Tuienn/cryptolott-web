import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Cryptolott - Power 6/55 Lottery',
    description: 'Play Power 6/55 lottery online. Choose your lucky numbers and win big jackpot prizes!',
    keywords: ['lottery', 'power 6/55', 'jackpot', 'lucky numbers', 'cryptolott'],
    icons: {
        icon: [
            {
                url: '/icon-light-32x32.png',
                media: '(prefers-color-scheme: light)'
            },
            {
                url: '/icon-dark-32x32.png',
                media: '(prefers-color-scheme: dark)'
            },
            {
                url: '/icon.svg',
                type: 'image/svg+xml'
            }
        ],
        apple: '/apple-icon.png'
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body className={`font-sans antialiased`}>{children}</body>
        </html>
    )
}
