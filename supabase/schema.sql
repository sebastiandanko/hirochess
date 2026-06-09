-- Users
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  discord_id text unique,
  discord_username text,
  plan text default 'free',
  plan_expires_at timestamptz,
  created_at timestamptz default now()
);

-- Puzzles
create table if not exists puzzles (
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
);

-- User progress
create table if not exists user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  puzzle_id uuid references puzzles(id),
  solved boolean not null,
  attempts int default 1,
  solved_at timestamptz default now()
);

-- Streaks
create table if not exists streaks (
  user_id uuid primary key references users(id) on delete cascade,
  current_streak int default 0,
  longest_streak int default 0,
  last_solved_date date
);

-- Ratings
create table if not exists ratings (
  user_id uuid primary key references users(id) on delete cascade,
  rating int default 800,
  puzzles_solved int default 0,
  puzzles_attempted int default 0
);

-- Weekly scores
create table if not exists weekly_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  week_start date not null,
  puzzles_solved int default 0,
  unique(user_id, week_start)
);
