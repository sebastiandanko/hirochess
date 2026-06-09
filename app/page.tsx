import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function LandingPage() {
  let session = null
  try {
    session = await getServerSession(authOptions)
  } catch {
    session = null
  }

  const isLoggedIn = !!session

  const tickerItems = [
    '♟ DAILY CHALLENGE',
    '♞ OPENING LAB',
    '♛ THE BOARD',
    '♔ KING TIER',
    '◈ HIROCHESS RATING',
    '♟ STREAK TRACKING',
    '♞ LONDON SYSTEM',
    '♛ WEEKLY LEADERBOARD',
    '♔ DISCORD ACCESS',
    '◈ INSTANT RESULTS',
  ]

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-body">
      {/* ── MARKETING NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#111] bg-[#0A0A0A]/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link href="/" className="font-display font-black text-xl tracking-tight">
            <span className="text-white">HIRO</span>
            <span className="text-[#00BFA5]">CHESS</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-[#888] hover:text-[#F0F0F0] text-sm font-medium transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-[#888] hover:text-[#F0F0F0] text-sm font-medium transition-colors">
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Link href="/dashboard" className="btn-primary text-sm px-5 py-2.5">
                ENTER PORTAL →
              </Link>
            ) : (
              <>
                <Link
                  href="/api/auth/signin"
                  className="hidden md:inline-flex text-sm text-[#555] hover:text-[#F0F0F0] transition-colors font-body"
                >
                  Sign in
                </Link>
                <Link
                  href="/api/auth/signin"
                  className="btn-primary text-sm px-5 py-2.5 font-display font-bold tracking-wider"
                >
                  ENTER PORTAL →
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center hero-spotlight chess-grid-bg overflow-hidden pt-16">
        {/* Floating chess pieces */}
        <span
          className="absolute text-[120px] text-white/[0.025] select-none pointer-events-none"
          style={{ top: '15%', left: '5%', animation: 'float 8s ease-in-out infinite' }}
        >
          ♔
        </span>
        <span
          className="absolute text-[90px] text-white/[0.03] select-none pointer-events-none"
          style={{ top: '60%', left: '2%', animation: 'float-2 10s ease-in-out infinite' }}
        >
          ♕
        </span>
        <span
          className="absolute text-[100px] text-white/[0.02] select-none pointer-events-none"
          style={{ top: '20%', right: '4%', animation: 'float-3 12s ease-in-out infinite' }}
        >
          ♖
        </span>
        <span
          className="absolute text-[80px] text-white/[0.035] select-none pointer-events-none"
          style={{ top: '70%', right: '8%', animation: 'float 9s ease-in-out infinite 2s' }}
        >
          ♗
        </span>
        <span
          className="absolute text-[110px] text-white/[0.025] select-none pointer-events-none"
          style={{ top: '40%', left: '42%', animation: 'float-2 7s ease-in-out infinite 1s' }}
        >
          ♘
        </span>
        <span
          className="absolute text-[70px] text-white/[0.04] select-none pointer-events-none"
          style={{ bottom: '20%', left: '25%', animation: 'float-3 11s ease-in-out infinite 3s' }}
        >
          ♙
        </span>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Pill label */}
          <div className="inline-flex items-center gap-2.5 border border-[#222] bg-[#111]/80 rounded-full px-4 py-2 mb-10">
            <span
              className="w-2 h-2 rounded-full bg-[#00BFA5]"
              style={{ animation: 'pulseGlow 2s ease-in-out infinite' }}
            />
            <span className="font-mono text-xs text-[#888] tracking-widest uppercase">
              24K Players Training Daily
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="font-display font-black leading-none tracking-tighter mb-6"
            style={{ fontSize: 'clamp(56px, 10vw, 112px)' }}
          >
            <span className="block text-white">TRAIN WITH</span>
            <span className="block teal-glow">PURPOSE.</span>
          </h1>

          <p className="text-[#888] text-xl font-body mb-10 max-w-lg mx-auto leading-relaxed">
            Daily chess puzzles built around opening mastery.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href={isLoggedIn ? '/dashboard' : '/api/auth/signin'}
              className="btn-primary text-base px-10 py-4 font-display font-black tracking-widest"
            >
              ENTER PORTAL →
            </Link>
            <a href="#pricing" className="btn-secondary text-base px-10 py-4">
              VIEW PLANS
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { value: '24K+', label: 'Instagram' },
              { value: 'Daily', label: 'Opening Puzzles' },
              { value: '3 Tiers', label: 'Pawn → King' },
              { value: '7-Day', label: 'Opening Lab' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="font-display font-black text-white text-2xl">{value}</span>
                <span className="font-mono text-[10px] text-[#555] uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#00BFA5]/40" />
          <span className="font-mono text-[10px] text-[#333] uppercase tracking-[0.3em]">SCROLL</span>
        </div>
      </section>

      {/* ── TICKER BAR ── */}
      <div className="overflow-hidden border-y border-[#111] py-3 bg-[#0A0A0A]">
        <div className="stat-ticker">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span className="font-mono text-xs text-[#444] uppercase tracking-widest whitespace-nowrap px-6">
                {item}
              </span>
              <span className="text-[#00BFA5] text-xs">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs text-[#00BFA5] uppercase tracking-[0.3em] mb-4">
            WHAT&apos;S INSIDE
          </p>
          <h2
            className="font-display font-black text-white leading-none tracking-tighter"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          >
            BUILT FOR IMPROVEMENT.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: '♟',
              badge: 'Knight',
              badgeColor: 'text-[#00BFA5] border-[#00BFA5]/30 bg-[#00BFA5]/10',
              title: 'Daily Challenge',
              desc: 'A fresh opening puzzle every day. Master the ideas that matter and track your progress over time.',
              borderColor: 'border-l-[#00BFA5]',
            },
            {
              icon: '♞',
              badge: 'Members',
              badgeColor: 'text-[#00BFA5] border-[#00BFA5]/30 bg-[#00BFA5]/10',
              title: 'Opening Lab',
              desc: '7-day structured deep dives into specific openings. Build real muscle memory through repetition.',
              borderColor: 'border-l-[#00BFA5]',
            },
            {
              icon: '♛',
              badge: 'Weekly',
              badgeColor: 'text-[#888] border-[#333] bg-[#1a1a1a]',
              title: 'The Board',
              desc: 'Weekly leaderboard that resets every Sunday. Compete with the community, claim your rank.',
              borderColor: 'border-l-[#444]',
            },
            {
              icon: '♔',
              badge: 'Gold',
              badgeColor: 'text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/10',
              title: 'HiroRating',
              desc: 'A dedicated rating that reflects your opening knowledge. Not Elo — your improvement on this platform.',
              borderColor: 'border-l-[#D4AF37]',
            },
          ].map(({ icon, badge, badgeColor, title, desc, borderColor }) => (
            <div
              key={title}
              className={`bg-[#111111] border-l-2 ${borderColor} border border-[#1a1a1a] rounded-xl p-6 transition-all duration-300 hover:border-[#00BFA5]/20 hover:bg-[#141414]`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{icon}</span>
                <span className={`text-[10px] font-mono uppercase tracking-widest border rounded-full px-2.5 py-1 ${badgeColor}`}>
                  {badge}
                </span>
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-2 tracking-tight">{title}</h3>
              <p className="text-[#666] text-sm font-body leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-4 bg-[#080808] border-y border-[#111]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-xs text-[#00BFA5] uppercase tracking-[0.3em] mb-4">
              GET STARTED
            </p>
            <h2
              className="font-display font-black text-white leading-none tracking-tighter"
              style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
            >
              THREE STEPS.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Join with Discord',
                desc: 'One-click signup via Discord. Your account is instantly linked to the HiroChess community server.',
              },
              {
                num: '02',
                title: 'Solve the Daily',
                desc: 'Each day a new opening puzzle drops. Solve it to keep your streak alive and climb the leaderboard.',
              },
              {
                num: '03',
                title: 'Track Your Growth',
                desc: 'Watch your HiroRating rise, your streak compound, and your opening knowledge actually stick.',
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="relative flex flex-col gap-4">
                <div className="font-display font-black text-[#111] text-8xl leading-none select-none">
                  {num}
                </div>
                <div className="w-8 h-px bg-[#00BFA5]" />
                <h3 className="font-display font-bold text-white text-xl tracking-tight">{title}</h3>
                <p className="text-[#555] text-sm font-body leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs text-[#00BFA5] uppercase tracking-[0.3em] mb-4">
            MEMBERSHIP
          </p>
          <h2
            className="font-display font-black text-white leading-none tracking-tighter"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          >
            PICK YOUR TIER.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pawn */}
          <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6 flex flex-col">
            <div className="text-4xl mb-3">♟</div>
            <div className="font-mono text-xs text-[#555] uppercase tracking-widest mb-2">Free</div>
            <div className="font-display font-black text-white text-3xl mb-1">Pawn</div>
            <div className="font-body text-[#555] text-sm mb-6">$0/month</div>
            <ul className="flex flex-col gap-2.5 mb-8 flex-1">
              {['3 puzzles/week', 'Basic leaderboard view', 'Discord community'].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-[#666] font-body">
                  <span className="text-[#333] text-xs">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/api/auth/signin"
              className="btn-secondary text-sm py-3 text-center"
            >
              START FREE
            </Link>
          </div>

          {/* Knight */}
          <div className="bg-[#0d1f1c] border border-[#00BFA5]/40 rounded-xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="font-mono text-[10px] text-[#00BFA5] border border-[#00BFA5]/30 bg-[#00BFA5]/10 rounded-full px-2.5 py-1 uppercase tracking-wider">
                Most Popular
              </span>
            </div>
            <div className="text-4xl mb-3">♞</div>
            <div className="font-mono text-xs text-[#00BFA5] uppercase tracking-widest mb-2">Knight</div>
            <div className="font-display font-black text-white text-3xl mb-1">Knight</div>
            <div className="font-body text-[#00BFA5] text-sm mb-6">$4/month</div>
            <ul className="flex flex-col gap-2.5 mb-8 flex-1">
              {[
                'Daily opening puzzles',
                'Streak tracking',
                'Opening Lab (7-day courses)',
                'Full leaderboard + rank',
                'HiroRating',
                'Discord Knight role',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-[#888] font-body">
                  <span className="text-[#00BFA5] text-xs">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="https://ko-fi.com/hirochess/membership"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-3 text-center"
            >
              JOIN AS KNIGHT →
            </a>
          </div>

          {/* King */}
          <div className="bg-[#1a1600] border border-[#D4AF37]/40 rounded-xl p-6 flex flex-col">
            <div className="text-4xl mb-3">♔</div>
            <div className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest mb-2">King</div>
            <div className="font-display font-black text-white text-3xl mb-1">King</div>
            <div className="font-body text-[#D4AF37] text-sm mb-6">$9/month</div>
            <ul className="flex flex-col gap-2.5 mb-8 flex-1">
              {[
                'Everything in Knight',
                'Monthly tournaments',
                "King's Hour coaching session",
                'Early feature access',
                'Discord King role (gold)',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-[#888] font-body">
                  <span className="text-[#D4AF37] text-xs">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="https://ko-fi.com/hirochess/membership"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm py-3 text-center border border-[#D4AF37]/40 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/10 transition-colors font-semibold"
            >
              JOIN AS KING
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-4 bg-[#080808] border-t border-[#111]">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-display font-black leading-none tracking-tighter mb-8"
            style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}
          >
            <span className="block text-white">STOP BLUNDERING.</span>
            <span className="block teal-glow">START TRAINING.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://ko-fi.com/hirochess/membership"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-10 py-4 font-display font-black tracking-widest"
            >
              JOIN NOW — $4/MONTH →
            </a>
            <Link
              href={isLoggedIn ? '/dashboard' : '/api/auth/signin'}
              className="btn-secondary text-base px-10 py-4 font-display font-bold tracking-wider"
            >
              ENTER PORTAL →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#111] py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" className="font-display font-black text-xl tracking-tight">
            <span className="text-white">HIRO</span>
            <span className="text-[#00BFA5]">CHESS</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="#features" className="text-[#444] hover:text-[#888] text-sm transition-colors font-body">
              Features
            </Link>
            <Link href="#pricing" className="text-[#444] hover:text-[#888] text-sm transition-colors font-body">
              Pricing
            </Link>
            <Link href="/api/auth/signin" className="text-[#444] hover:text-[#888] text-sm transition-colors font-body">
              Sign In
            </Link>
          </div>
          <p className="text-[#333] text-xs font-mono">
            © 2026 HiroChess. Train With Purpose.
          </p>
        </div>
      </footer>
    </div>
  )
}
