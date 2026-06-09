const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID!
const DISCORD_MEMBER_ROLE_ID = process.env.DISCORD_MEMBER_ROLE_ID!

async function discordRequest(endpoint: string, method: string = 'GET', body?: object) {
  const res = await fetch(`https://discord.com/api/v10/${endpoint}`, {
    method,
    headers: {
      Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  })
  if (!res.ok && res.status !== 204) {
    const text = await res.text()
    throw new Error(`Discord API error ${res.status}: ${text}`)
  }
  return res
}

export async function assignMemberRole(discordId: string): Promise<void> {
  await discordRequest(
    `guilds/${DISCORD_GUILD_ID}/members/${discordId}/roles/${DISCORD_MEMBER_ROLE_ID}`,
    'PUT'
  )
}

export async function removeMemberRole(discordId: string): Promise<void> {
  await discordRequest(
    `guilds/${DISCORD_GUILD_ID}/members/${discordId}/roles/${DISCORD_MEMBER_ROLE_ID}`,
    'DELETE'
  )
}
