// Run: node scripts/setup-db.mjs
// Pushes schema + seed to Supabase using the Management API

const PROJECT_REF = 'bvdakvkkyhrenmslloiq'
const MGMT_TOKEN = 'sb_secret_H-dgIC2TMkN8nhWAgaQPHw_1aECNeP2'

async function runSQL(sql, label) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${MGMT_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sql })
  })
  const data = await res.json()
  if (!res.ok) {
    console.error(`❌ ${label}:`, JSON.stringify(data))
    return false
  }
  console.log(`✓ ${label}`)
  return true
}

const schema = [
  {
    label: 'Create users table',
    sql: `create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  discord_id text unique,
  discord_username text,
  plan text default 'free',
  plan_expires_at timestamptz,
  created_at timestamptz default now()
)`
  },
  {
    label: 'Create puzzles table',
    sql: `create table if not exists puzzles (
  id uuid primary key default gen_random_uuid(),
  fen text not null,
  solution text[] not null,
  opening text not null,
  opening_day int,
  difficulty int default 3,
  hiro_tip text,
  is_daily boolean default false,
  daily_date date,
  created_at timestamptz default now()
)`
  },
  {
    label: 'Create user_progress table',
    sql: `create table if not exists user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  puzzle_id uuid references puzzles(id),
  solved boolean not null,
  attempts int default 1,
  solved_at timestamptz default now()
)`
  },
  {
    label: 'Create streaks table',
    sql: `create table if not exists streaks (
  user_id uuid primary key references users(id) on delete cascade,
  current_streak int default 0,
  longest_streak int default 0,
  last_solved_date date
)`
  },
  {
    label: 'Create ratings table',
    sql: `create table if not exists ratings (
  user_id uuid primary key references users(id) on delete cascade,
  rating int default 800,
  puzzles_solved int default 0,
  puzzles_attempted int default 0
)`
  },
  {
    label: 'Create weekly_scores table',
    sql: `create table if not exists weekly_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  week_start date not null,
  puzzles_solved int default 0,
  unique(user_id, week_start)
)`
  }
]

const today = new Date().toISOString().split('T')[0]

const seed = `
insert into puzzles (fen, solution, opening, opening_day, difficulty, hiro_tip, is_daily, daily_date)
select * from (values
  (
    'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
    array['d7d5'],
    'London System',
    1,
    1,
    'In the London System, 1.d4 controls the center. Black should respond symmetrically with 1...d5 to contest it.',
    true,
    '${today}'::date
  ),
  (
    'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2',
    array['g1f3'],
    'London System',
    2,
    1,
    'Nf3 is the signature London move. It develops the knight toward the center while avoiding the more aggressive lines.',
    false,
    null
  ),
  (
    'rnbqkbnr/ppp1pppp/8/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 1 2',
    array['g8f6'],
    'London System',
    3,
    2,
    'Nf6 mirrors White''s development. Black fights for central control and prepares to castle kingside.',
    false,
    null
  ),
  (
    'rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 3',
    array['c1f4'],
    'London System',
    4,
    2,
    'Bf4 is the London''s defining move. The bishop heads to f4 before closing the pawn chain. This is the key idea!',
    false,
    null
  ),
  (
    'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 3 3',
    array['e7e6'],
    'London System',
    5,
    3,
    'e6 solidifies Black''s center and prepares to develop the dark-squared bishop. The Bf4 is now locked out of key squares.',
    false,
    null
  )
) as v(fen, solution, opening, opening_day, difficulty, hiro_tip, is_daily, daily_date)
where not exists (select 1 from puzzles limit 1)
`

console.log('Setting up hiro.chess database...\n')

for (const { label, sql } of schema) {
  const ok = await runSQL(sql, label)
  if (!ok) process.exit(1)
}

console.log('\nSeeding puzzles...')
await runSQL(seed, 'Seed London System puzzles (5)')

console.log('\nDone! Database is ready.')
