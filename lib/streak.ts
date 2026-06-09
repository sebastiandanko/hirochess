import { supabaseAdmin } from './supabase'

function getPreviousDay(dateStr: string): string {
  const date = new Date(dateStr)
  date.setDate(date.getDate() - 1)
  return date.toISOString().split('T')[0]
}

export async function updateStreak(userId: string): Promise<void> {
  const today = new Date().toISOString().split('T')[0]

  const { data: streak } = await supabaseAdmin
    .from('streaks')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (!streak) {
    await supabaseAdmin.from('streaks').insert({
      user_id: userId,
      current_streak: 1,
      longest_streak: 1,
      last_solved_date: today
    })
    return
  }

  if (streak.last_solved_date === today) return

  const yesterday = getPreviousDay(today)
  const isConsecutive = streak.last_solved_date === yesterday

  const newStreak = isConsecutive ? streak.current_streak + 1 : 1
  const newLongest = Math.max(newStreak, streak.longest_streak)

  await supabaseAdmin
    .from('streaks')
    .update({
      current_streak: newStreak,
      longest_streak: newLongest,
      last_solved_date: today
    })
    .eq('user_id', userId)
}

export async function getStreak(userId: string) {
  const { data } = await supabaseAdmin
    .from('streaks')
    .select('*')
    .eq('user_id', userId)
    .single()
  return data
}
