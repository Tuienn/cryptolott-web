'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { locales } from '@/i18n/config'

const localeNames: Record<string, string> = {
    en: 'English',
    vi: 'Tiếng Việt'
}

export function LanguageSwitcher() {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    const switchLocale = (newLocale: string) => {
        // Replace current locale in pathname with new locale
        const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)
        router.push(newPathname)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='text-primary-foreground hover:bg-primary-foreground/10'>
                    <Globe className='h-5 w-5' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                {locales.map((loc) => (
                    <DropdownMenuItem
                        key={loc}
                        onClick={() => switchLocale(loc)}
                        className={locale === loc ? 'bg-accent' : ''}
                    >
                        {localeNames[loc]}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
