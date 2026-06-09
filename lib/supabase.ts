import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null
let _supabaseAdmin: SupabaseClient | null = null

function getClient() {
  if (!_supabase) {
    _supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
  }
  return _supabase
}

function getAdminClient() {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  }
  return _supabaseAdmin
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getClient() as any)[prop]
  }
})

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getAdminClient() as any)[prop]
  }
})

export type User = {
  id: string
  email: string
  discord_id: string | null
  discord_username: string | null
  plan: 'free' | 'member' | 'pro'
  plan_expires_at: string | null
  created_at: string
}

export type Puzzle = {
  id: string
  fen: string
  solution: string[]
  opening: string
  opening_day: number | null
  difficulty: number
  hiro_tip: string | null
  is_daily: boolean
  daily_date: string | null
  created_at: string
}

export type UserProgress = {
  id: string
  user_id: string
  puzzle_id: string
  solved: boolean
  attempts: number
  solved_at: string
}

export type Streak = {
  user_id: string
  current_streak: number
  longest_streak: number
  last_solved_date: string | null
}

export type Rating = {
  user_id: string
  rating: number
  puzzles_solved: number
  puzzles_attempted: number
}

export type WeeklyScore = {
  id: string
  user_id: string
  week_start: string
  puzzles_solved: number
}
