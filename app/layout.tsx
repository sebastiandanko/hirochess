import type { Metadata } from 'next'
import { Montserrat, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import LayoutWrapper from '@/components/LayoutWrapper'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HiroChess — Train With Purpose.',
  description:
    'Daily chess puzzles built around opening mastery. Track your streak, climb the board, and unlock your potential with HiroChess.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#0A0A0A] text-[#F0F0F0] min-h-screen font-body">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}
