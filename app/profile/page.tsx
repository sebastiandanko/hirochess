'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface ProfileData {
  rating: number
  puzzles_solved: number
  puzzles_attempted: number
  current_streak: number
  longest_streak: number
}

function TierBadge({ plan }: { plan: string }) {
  if (plan === 'pro' || plan === 'king') {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-xs border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full">
        ♔ King
      </span>
    )
  }
  if (plan === 'member' || plan === 'knight') {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-xs border border-[#00BFA5]/40 bg-[#00BFA5]/10 text-[#00BFA5] px-3 py-1 rounded-full">
        ♞ Knight
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs border border-[#333] bg-[#1a1a1a] text-[#555] px-3 py-1 rounded-full">
      ♟ Pawn
    </span>
  )
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const dbUser = (session as any)?.dbUser

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      setLoading(false)
      return
    }

    fetch('/api/profile')
      .then((r) => r.json())
      .then((data) => {
        setProfileData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [session, status])

  if (status === 'loading' || loading) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 gap-3">
        <div className="font-mono text-[10px] text-[#555] uppercase tracking-widest">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4">
        <div className="text-5xl opacity-40">◈</div>
        <h2 className="font-display font-black text-white text-2xl">YOUR STATS</h2>
        <p className="text-[#555] text-sm font-body max-w-xs">
          Sign in with Discord to view your profile, stats, and HiroRating.
        </p>
        <Link href="/api/auth/signin" className="btn-primary text-sm px-6 py-3">
          Sign in with Discord
        </Link>
      </div>
    )
  }

  const initials = (dbUser?.discord_username || session.user?.name || 'U').slice(0, 2).toUpperCase()
  const isMember = dbUser?.plan === 'member' || dbUser?.plan === 'pro' || dbUser?.plan === 'knight' || dbUser?.plan === 'king'

  const memberSince = dbUser?.created_at
    ? new Date(dbUser.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Unknown'

  const accuracy =
    profileData && profileData.puzzles_attempted > 0
      ? Math.round((profileData.puzzles_solved / profileData.puzzles_attempted) * 100)
      : 0

  return (
    <div className="flex flex-col gap-6 pt-4">
      {/* Profile header */}
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-[#0A0A0A] border-2 border-[#00BFA5]/40 flex items-center justify-center text-[#00BFA5] text-2xl font-display font-black shrink-0 shadow-[0_0_24px_rgba(0,191,165,0.15)]">
          {initials}
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="font-display font-bold text-white text-xl tracking-tight">
            {dbUser?.discord_username || session.user?.name}
          </div>
          <TierBadge plan={dbUser?.plan || 'free'} />
          <div className="text-[#00BFA5] text-xs font-body">
            Member since {memberSince}
          </div>
        </div>
      </div>

      {/* Stats cards */}
      {profileData ? (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-4 text-center flex flex-col gap-1">
            <div className="font-display font-black text-[#00BFA5] text-3xl leading-none teal-glow">
              {profileData.rating.toLocaleString()}
            </div>
            <div className="text-[#444] text-[10px] font-mono uppercase tracking-wider">Rating</div>
          </div>
          <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-4 text-center flex flex-col gap-1">
            <div className="font-display font-black text-white text-3xl leading-none">
              {profileData.puzzles_solved}
            </div>
            <div className="text-[#444] text-[10px] font-mono uppercase tracking-wider">Solved</div>
          </div>
          <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-4 text-center flex flex-col gap-1">
            <div className="font-display font-black text-[#D4AF37] text-3xl leading-none gold-glow flex items-center justify-center gap-1">
              {profileData.current_streak}
              <span className="text-2xl">🔥</span>
            </div>
            <div className="text-[#444] text-[10px] font-mono uppercase tracking-wider">Streak</div>
          </div>
        </div>
      ) : (
        <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-8 text-center">
          <p className="text-[#555] text-sm font-body">No stats yet — solve your first puzzle!</p>
        </div>
      )}

      {/* Detailed stats */}
      {profileData && (
        <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1a1a1a]">
            <h3 className="font-display font-bold text-white text-sm tracking-tight">STATS DETAIL</h3>
          </div>
          <div className="px-5 py-4 flex flex-col gap-4">
            {/* Accuracy with progress bar */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#555] font-body">Accuracy</span>
                <span className="text-white font-mono font-medium">{accuracy}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00BFA5] rounded-full transition-all duration-700"
                  style={{ width: `${accuracy}%` }}
                />
              </div>
            </div>

            <div className="h-px bg-[#111]" />

            <div className="flex justify-between text-sm">
              <span className="text-[#555] font-body">Puzzles attempted</span>
              <span className="text-white font-mono">{profileData.puzzles_attempted}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[#555] font-body">Best streak</span>
              <span className="text-[#D4AF37] font-mono">{profileData.longest_streak} days</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[#555] font-body">HiroRating</span>
              <span className="text-[#00BFA5] font-mono">{profileData.rating.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade CTA for free users */}
      {!isMember && (
        <div className="bg-[#0d1f1c] border border-[#00BFA5]/20 rounded-xl p-5 text-center">
          <p className="font-mono text-[10px] text-[#00BFA5] uppercase tracking-widest mb-2">
            UNLOCK FULL STATS
          </p>
          <h3 className="font-display font-bold text-white text-lg mb-2">
            Upgrade to Knight
          </h3>
          <p className="text-[#555] text-sm font-body mb-5 max-w-xs mx-auto">
            Unlock streak tracking, full HiroRating history, and leaderboard ranking.
          </p>
          <a
            href="https://ko-fi.com/hirochess/membership"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-6 py-3"
          >
            Join for $4/month
          </a>
        </div>
      )}
    </div>
  )
}
