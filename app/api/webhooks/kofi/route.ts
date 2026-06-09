export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { assignMemberRole, removeMemberRole } from '@/lib/discord'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const dataStr = formData.get('data') as string

  if (!dataStr) {
    return NextResponse.json({ error: 'No data' }, { status: 400 })
  }

  let payload: any
  try {
    payload = JSON.parse(dataStr)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Verify Ko-fi token
  if (payload.verification_token !== process.env.KOFI_WEBHOOK_TOKEN) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  const email = payload.email?.toLowerCase()
  if (!email) {
    return NextResponse.json({ error: 'No email' }, { status: 400 })
  }

  const isCancellation = payload.type === 'Subscription' && payload.is_subscription_payment === false

  if (isCancellation) {
    // Downgrade to free
    const { data: user } = await supabaseAdmin
      .from('users')
      .update({ plan: 'free', plan_expires_at: null })
      .eq('email', email)
      .select()
      .single()

    if (user?.discord_id) {
      try {
        await removeMemberRole(user.discord_id)
      } catch (e) {
        console.error('Failed to remove Discord role:', e)
      }
    }
  } else if (payload.type === 'Subscription' || payload.type === 'Shop Order') {
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 31)

    // Find or create user
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (existingUser) {
      await supabaseAdmin
        .from('users')
        .update({ plan: 'member', plan_expires_at: expiresAt.toISOString() })
        .eq('id', existingUser.id)

      if (existingUser.discord_id) {
        try {
          await assignMemberRole(existingUser.discord_id)
        } catch (e) {
          console.error('Failed to assign Discord role:', e)
        }
      }
    } else {
      await supabaseAdmin.from('users').insert({
        email,
        plan: 'member',
        plan_expires_at: expiresAt.toISOString()
      })
    }
  }

  return NextResponse.json({ success: true })
}
