import type { NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { supabaseAdmin } from './supabase'

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== 'discord') return false

      const discordProfile = profile as any
      const email = user.email || `${discordProfile.id}@discord.temp`

      const { data: existingUser } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('discord_id', discordProfile.id)
        .single()

      if (existingUser) {
        await supabaseAdmin
          .from('users')
          .update({ discord_username: discordProfile.username })
          .eq('id', existingUser.id)
      } else {
        await supabaseAdmin.from('users').insert({
          email,
          discord_id: discordProfile.id,
          discord_username: discordProfile.username,
          plan: 'free'
        })
      }

      return true
    },
    async session({ session, token }) {
      if (session.user?.email) {
        const { data: dbUser } = await supabaseAdmin
          .from('users')
          .select('*')
          .eq('email', session.user.email)
          .single()

        if (dbUser) {
          ;(session as any).dbUser = dbUser
        }
      }
      return session
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === 'discord' && profile) {
        const discordProfile = profile as any
        token.discordId = discordProfile.id
        token.discordUsername = discordProfile.username
      }
      return token
    }
  }
}
