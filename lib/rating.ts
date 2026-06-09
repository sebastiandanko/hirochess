import { supabaseAdmin } from './supabase'

export async function updateRating(userId: string, solved: boolean, attempts: number): Promise<void> {
  const { data: rating } = await supabaseAdmin
    .from('ratings')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (!rating) {
    const initialRating = solved ? (attempts === 1 ? 820 : 810) : 790
    await supabaseAdmin.from('ratings').insert({
      user_id: userId,
      rating: initialRating,
      puzzles_solved: solved ? 1 : 0,
      puzzles_attempted: 1
    })
    return
  }

  let delta = 0
  if (solved) {
    delta = attempts === 1 ? 20 : 10
  } else {
    delta = -10
  }

  await supabaseAdmin
    .from('ratings')
    .update({
      rating: Math.max(400, rating.rating + delta),
      puzzles_solved: solved ? rating.puzzles_solved + 1 : rating.puzzles_solved,
      puzzles_attempted: rating.puzzles_attempted + 1
    })
    .eq('user_id', userId)
}

export async function getRating(userId: string) {
  const { data } = await supabaseAdmin
    .from('ratings')
    .select('*')
    .eq('user_id', userId)
    .single()
  return data
}
