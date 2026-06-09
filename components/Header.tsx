'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

function PlanBadge({ plan }: { plan: string }) {
  if (plan === 'pro' || plan === 'king') {
    return (
      <span className="inline-flex items-center gap-1 text-xs border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] px-2.5 py-1 rounded-full font-body font-medium">
        ♔ King
      </span>
    )
  }
  if (plan === 'member' || plan === 'knight') {
    return (
      <span className="inline-flex items-center gap-1 text-xs border border-[#00BFA5]/40 bg-[#00BFA5]/10 text-[#00BFA5] px-2.5 py-1 rounded-full font-body font-medium">
        ♞ Knight
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs border border-[#444] bg-[#1a1a1a] text-[#888] px-2.5 py-1 rounded-full font-body font-medium">
      ♟ Pawn
    </span>
  )
}

export default function Header() {
  const { data: session, status } = useSession()
  const dbUser = (session as any)?.dbUser

  return (
    <header className="sticky top-0 z-40 border-b border-[#111] bg-[#0A0A0A]/95 backdrop-blur-sm">
      <div className="flex items-center justify-between max-w-lg mx-auto px-4 py-3">
        <Link href="/dashboard" className="font-display font-black text-lg tracking-tight">
          <span className="text-white">HIRO</span>
          <span className="text-[#00BFA5]">CHESS</span>
        </Link>

        <div className="flex items-center gap-3">
          {status === 'loading' ? null : session ? (
            <>
              <PlanBadge plan={dbUser?.plan || 'free'} />
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-[#555] text-xs hover:text-[#F0F0F0] transition-colors font-body"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/api/auth/signin"
              className="text-sm bg-[#00BFA5] text-[#0A0A0A] px-3 py-1.5 rounded-lg font-semibold hover:bg-[#007A6E] hover:text-white transition-colors font-body"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
