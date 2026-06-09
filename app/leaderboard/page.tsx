'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface LeaderboardEntry {
  rank: number
  user_id: string
  discord_username: string
  puzzles_solved: number
  isCurrentUser?: boolean
}

function RankDisplay({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="flex items-center gap-1">
        <span className="font-display font-black text-[#D4AF37] text-lg gold-glow">1</span>
        <span className="text-sm">👑</span>
      </div>
    )
  }
  if (rank === 2) {
    return <span className="font-display font-black text-[#C0C0C0] text-lg">2</span>
  }
  if (rank === 3) {
    return <span className="font-display font-black text-[#CD7F32] text-lg">3</span>
  }
  return <span className="font-mono text-[#555] text-sm">{rank}</span>
}

function LeaderboardRow({
  entry,
  currentUserId,
}: {
  entry: LeaderboardEntry
  currentUserId?: string
}) {
  const isMe = entry.user_id === currentUserId || entry.isCurrentUser
  const isTop3 = entry.rank <= 3

  return (
    <div
      className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors ${
        isMe
          ? 'bg-[#1a2e22] border-l-2 border-l-[#00BFA5] border border-[#00BFA5]/20'
          : isTop3
          ? 'bg-[#111111] border border-[#1a1a1a]'
          : 'border-b border-[#111] last:border-0'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-8 text-center">
          <RankDisplay rank={entry.rank} />
        </div>
        <span
          className={`text-sm font-body font-medium ${
            isMe
              ? 'text-[#00BFA5]'
              : isTop3
              ? 'text-white'
              : 'text-[#888]'
          }`}
        >
          {entry.discord_username}
          {isMe && (
            <span className="ml-1.5 font-mono text-[10px] text-[#00BFA5]/60 uppercase tracking-wider">
              (you)
            </span>
          )}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className={`font-mono text-sm font-medium ${isMe ? 'text-[#00BFA5]' : isTop3 ? 'text-white' : 'text-[#555]'}`}>
          {entry.puzzles_solved}
        </span>
        <span className="text-[#333] text-xs font-mono">solved</span>
      </div>
    </div>
  )
}

export default function LeaderboardPage() {
  const { data: session } = useSession()
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [currentUserEntry, setCurrentUserEntry] = useState<LeaderboardEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const dbUser = (session as any)?.dbUser

  useEffect(() => {
    fetch('/api/leaderboard')
      .then((r) => r.json())
      .then((data) => {
        setLeaderboard(data.leaderboard || [])
        setCurrentUserEntry(data.currentUserEntry || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 gap-3">
        <div className="font-mono text-[10px] text-[#555] uppercase tracking-widest">Loading...</div>
      </div>
    )
  }

  const top3 = leaderboard.slice(0, 3)
  const rest = leaderboard.slice(3)
  const currentUserId = dbUser?.id

  return (
    <div className="flex flex-col gap-6 pt-4">
      {/* Header */}
      <div>
        <p className="font-mono text-[10px] text-[#00BFA5] uppercase tracking-[0.3em] mb-1">
          WEEKLY
        </p>
        <h1 className="font-display font-black text-white text-3xl tracking-tight">
          THE BOARD
        </h1>
        <p className="text-[#555] text-xs font-body mt-1">Resets every Sunday</p>
      </div>

      {leaderboard.length === 0 ? (
        <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-10 text-center">
          <p className="text-[#555] text-sm font-body">No scores yet this week. Be the first!</p>
        </div>
      ) : (
        <>
          {/* Top 3 podium */}
          {top3.length > 0 && (
            <div className="flex flex-col gap-2">
              {top3.map((entry) => (
                <LeaderboardRow
                  key={entry.user_id}
                  entry={entry}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          )}

          {/* Divider */}
          {rest.length > 0 && (
            <>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#111]" />
                <span className="text-[#333] text-xs font-mono uppercase tracking-widest">Ranks 4+</span>
                <div className="flex-1 h-px bg-[#111]" />
              </div>

              {/* Rest of leaderboard */}
              <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl overflow-hidden">
                {rest.map((entry) => (
                  <LeaderboardRow
                    key={entry.user_id}
                    entry={entry}
                    currentUserId={currentUserId}
                  />
                ))}
              </div>
            </>
          )}

          {/* Current user if not in top 10 */}
          {currentUserEntry && !leaderboard.some((e) => e.user_id === currentUserId || e.isCurrentUser) && (
            <>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#111]" />
                <span className="text-[#333] text-xs font-mono uppercase tracking-widest">Your rank</span>
                <div className="flex-1 h-px bg-[#111]" />
              </div>
              <LeaderboardRow entry={currentUserEntry} currentUserId={currentUserId} />
            </>
          )}
        </>
      )}

      {/* Sign in CTA */}
      {!session && (
        <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6 text-center mt-2">
          <p className="font-mono text-[10px] text-[#555] uppercase tracking-widest mb-2">
            JOIN THE BOARD
          </p>
          <h3 className="font-display font-bold text-white text-lg mb-2">
            Sign in to compete
          </h3>
          <p className="text-[#555] text-sm font-body mb-5">
            Sign in with Discord to appear on the leaderboard and track your rank.
          </p>
          <Link
            href="/api/auth/signin"
            className="btn-primary text-sm px-6 py-3"
          >
            Sign in with Discord
          </Link>
        </div>
      )}
    </div>
  )
}
