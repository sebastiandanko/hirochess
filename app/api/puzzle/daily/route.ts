export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const today = new Date().toISOString().split('T')[0]

  const { data: puzzle, error } = await supabaseAdmin
    .from('puzzles')
    .select('*')
    .eq('is_daily', true)
    .eq('daily_date', today)
    .single()

  if (error || !puzzle) {
    // Fallback: return any puzzle with is_daily=true
    const { data: fallback } = await supabaseAdmin
      .from('puzzles')
      .select('*')
      .eq('is_daily', true)
      .limit(1)
      .single()

    if (!fallback) {
      return NextResponse.json({ error: 'No daily puzzle found' }, { status: 404 })
    }

    return NextResponse.json(fallback)
  }

  return NextResponse.json(puzzle)
}
