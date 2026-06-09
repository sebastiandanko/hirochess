'use client'

import { usePathname } from 'next/navigation'
import AppHeader from './Header'
import AppNav from './Nav'

const MARKETING_PATHS = ['/', '/features', '/pricing']

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isMarketing = MARKETING_PATHS.includes(pathname)

  if (isMarketing) {
    return <>{children}</>
  }

  return (
    <>
      <AppHeader />
      <main className="max-w-lg mx-auto px-4 pb-24 pt-2">{children}</main>
      <AppNav />
    </>
  )
}
