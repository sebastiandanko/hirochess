import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import StreakBadge from '@/components/StreakBadge'
import { supabaseAdmin } from '@/lib/supabase'

async function getDailyPuzzle() {
  try {
    const today = new Date().toISOString().split('T')[0]
    const { data } = await supabaseAdmin
      .from('puzzles')
      .select('*')
      .eq('is_daily', true)
      .eq('daily_date', today)
      .single()

    if (!data) {
      const { data: fallback } = await supabaseAdmin
        .from('puzzles')
        .select('*')
        .eq('is_daily', true)
        .limit(1)
        .single()
      return fallback
    }
    return data
  } catch {
    return null
  }
}

async function getUserInfo(session: any) {
  if (!session?.user?.email) return null
  try {
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('id, plan')
      .eq('email', session.user.email)
      .single()
    if (!user) return null

    const { data: streak } = await supabaseAdmin
      .from('streaks')
      .select('*')
      .eq('user_id', user.id)
      .single()

    return { streak, plan: user.plan }
  } catch {
    return null
  }
}

export default async function DashboardPage() {
  let session = null
  try {
    session = await getServerSession(authOptions)
  } catch {
    session = null
  }

  const [puzzle, userInfo] = await Promise.all([
    getDailyPuzzle(),
    getUserInfo(session),
  ])

  const isMember = userInfo?.plan === 'member' || userInfo?.plan === 'pro' || userInfo?.plan === 'knight' || userInfo?.plan === 'king'
  const streak = userInfo?.streak
  const sideToMove = puzzle?.fen?.split(' ')[1] === 'w' ? 'White' : 'Black'

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex flex-col gap-6 pt-4">
      {/* Date header */}
      <div>
        <p className="font-mono text-[10px] text-[#00BFA5] uppercase tracking-[0.3em] mb-1">
          TODAY
        </p>
        <h1 className="font-display font-black text-white text-3xl tracking-tight">
          DAILY CHALLENGE
        </h1>
        <p className="text-[#555] text-xs font-body mt-1">{today}</p>
      </div>

      {/* Streak badge */}
      {isMember && streak && streak.current_streak > 0 && (
        <StreakBadge streak={streak.current_streak} />
      )}

      {/* Puzzle card */}
      {puzzle ? (
        <div className="bg-[#111111] border-l-2 border-l-[#00BFA5] border border-[#1a1a1a] rounded-xl overflow-hidden">
          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              {/* Chess piece preview */}
              <div className="w-20 h-20 bg-[#0A0A0A] rounded-lg flex items-center justify-center text-5xl border border-[#1a1a1a] shrink-0">
                {sideToMove === 'White' ? '♙' : '♟'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] text-[#555] uppercase tracking-widest mb-1">
                  {puzzle.opening_day ? `Move ${puzzle.opening_day}` : 'Opening Puzzle'}
                </p>
                <h2 className="font-display font-bold text-white text-lg leading-tight mb-2 tracking-tight">
                  {puzzle.opening}
                </h2>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${sideToMove === 'White' ? 'bg-white' : 'bg-[#444]'}`}
                  />
                  <span className="text-[#888] text-xs font-body">{sideToMove} to play</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#00BFA5] text-xs font-mono">
              <span className="w-1 h-1 rounded-full bg-[#00BFA5]" />
              Find the key idea
            </div>

            {isMember ? (
              <Link
                href={`/puzzle/${puzzle.id}`}
                className="btn-primary text-sm py-3.5 text-center"
              >
                SOLVE PUZZLE →
              </Link>
            ) : (
              <a
                href="https://ko-fi.com/hirochess/membership"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm py-3.5 text-center"
              >
                JOIN TO SOLVE — $4/MONTH
              </a>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-8 text-center">
          <p className="text-[#555] text-sm font-body">No puzzle today — check back soon!</p>
        </div>
      )}

      {/* Quick links for members */}
      {isMember && (
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/trainer"
            className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-4 flex flex-col gap-2 hover:border-[#00BFA5]/30 transition-colors"
          >
            <span className="text-2xl">♞</span>
            <span className="font-display font-bold text-white text-sm">Opening Lab</span>
            <span className="text-[#555] text-xs font-body">7-day training courses</span>
          </Link>
          <Link
            href="/leaderboard"
            className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-4 flex flex-col gap-2 hover:border-[#00BFA5]/30 transition-colors"
          >
            <span className="text-2xl">♛</span>
            <span className="font-display font-bold text-white text-sm">The Board</span>
            <span className="text-[#555] text-xs font-body">Weekly leaderboard</span>
          </Link>
        </div>
      )}

      {/* Sign in CTA */}
      {!session && (
        <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6 text-center">
          <p className="font-mono text-[10px] text-[#555] uppercase tracking-widest mb-3">
            TRACK YOUR PROGRESS
          </p>
          <h3 className="font-display font-bold text-white text-lg mb-2">
            Sign in to get started
          </h3>
          <p className="text-[#555] text-sm font-body mb-5 max-w-xs mx-auto">
            Connect with Discord to track your streak, compete on the leaderboard, and access daily puzzles.
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
