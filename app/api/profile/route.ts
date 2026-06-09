export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: user } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('email', session.user.email)
    .single()

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const [{ data: rating }, { data: streak }] = await Promise.all([
    supabaseAdmin.from('ratings').select('*').eq('user_id', user.id).single(),
    supabaseAdmin.from('streaks').select('*').eq('user_id', user.id).single()
  ])

  return NextResponse.json({
    rating: rating?.rating ?? 800,
    puzzles_solved: rating?.puzzles_solved ?? 0,
    puzzles_attempted: rating?.puzzles_attempted ?? 0,
    current_streak: streak?.current_streak ?? 0,
    longest_streak: streak?.longest_streak ?? 0
  })
}
