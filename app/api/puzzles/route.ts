export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const opening = searchParams.get('opening')
  const openingDay = searchParams.get('opening_day')

  let query = supabaseAdmin.from('puzzles').select('*')

  if (opening) query = query.eq('opening', opening)
  if (openingDay) query = query.eq('opening_day', parseInt(openingDay))

  const { data, error } = await query.order('opening_day', { ascending: true })

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch puzzles' }, { status: 500 })
  }

  return NextResponse.json(data || [])
}
