export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { updateStreak } from '@/lib/streak'
import { updateRating } from '@/lib/rating'

function getWeekStart(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now.setDate(diff))
  return monday.toISOString().split('T')[0]
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { puzzle_id, solved, attempts } = await req.json()

  const { data: dbUser } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('email', session.user.email)
    .single()

  if (!dbUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Insert progress
  await supabaseAdmin.from('user_progress').insert({
    user_id: dbUser.id,
    puzzle_id,
    solved,
    attempts
  })

  if (solved) {
    // Update streak
    await updateStreak(dbUser.id)

    // Update weekly score
    const weekStart = getWeekStart()
    const { data: existing } = await supabaseAdmin
      .from('weekly_scores')
      .select('*')
      .eq('user_id', dbUser.id)
      .eq('week_start', weekStart)
      .single()

    if (existing) {
      await supabaseAdmin
        .from('weekly_scores')
        .update({ puzzles_solved: existing.puzzles_solved + 1 })
        .eq('id', existing.id)
    } else {
      await supabaseAdmin.from('weekly_scores').insert({
        user_id: dbUser.id,
        week_start: weekStart,
        puzzles_solved: 1
      })
    }
  }

  // Update rating regardless
  await updateRating(dbUser.id, solved, attempts)

  return NextResponse.json({ success: true })
}
