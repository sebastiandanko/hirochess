export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

function getWeekStart(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now.setDate(diff))
  return monday.toISOString().split('T')[0]
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const weekStart = getWeekStart()

  const { data: scores, error } = await supabaseAdmin
    .from('weekly_scores')
    .select(`
      puzzles_solved,
      user_id,
      users (
        discord_username,
        plan
      )
    `)
    .eq('week_start', weekStart)
    .order('puzzles_solved', { ascending: false })
    .limit(20)

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 })
  }

  const leaderboard = (scores || []).map((entry: any, index: number) => ({
    rank: index + 1,
    user_id: entry.user_id,
    discord_username: entry.users?.discord_username || 'Anonymous',
    puzzles_solved: entry.puzzles_solved
  }))

  // Get current user's rank if logged in
  let currentUserEntry = null
  if (session?.user?.email) {
    const { data: dbUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', session.user.email)
      .single()

    if (dbUser) {
      const userInTop20 = leaderboard.find((e: any) => e.user_id === dbUser.id)
      if (!userInTop20) {
        const { data: userScore } = await supabaseAdmin
          .from('weekly_scores')
          .select('puzzles_solved')
          .eq('user_id', dbUser.id)
          .eq('week_start', weekStart)
          .single()

        if (userScore) {
          const { count } = await supabaseAdmin
            .from('weekly_scores')
            .select('*', { count: 'exact', head: true })
            .eq('week_start', weekStart)
            .gt('puzzles_solved', userScore.puzzles_solved)

          currentUserEntry = {
            rank: (count || 0) + 1,
            user_id: dbUser.id,
            discord_username: session.user.name || 'You',
            puzzles_solved: userScore.puzzles_solved,
            isCurrentUser: true
          }
        }
      }
    }
  }

  return NextResponse.json({ leaderboard, currentUserEntry })
}
