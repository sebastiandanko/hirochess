'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Home', icon: '⌂' },
  { href: '/trainer', label: 'Lab', icon: '♞' },
  { href: '/leaderboard', label: 'Board', icon: '♛' },
  { href: '/profile', label: 'Stats', icon: '◈' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#111] bg-[#0A0A0A]/95 backdrop-blur-sm">
      <div className="flex max-w-lg mx-auto">
        {links.map(({ href, label, icon }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-colors ${
                isActive
                  ? 'text-[#00BFA5]'
                  : 'text-[#333] hover:text-[#888]'
              }`}
            >
              <span className="text-lg leading-none">{icon}</span>
              <span className="text-[10px] font-body font-medium tracking-wide">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
