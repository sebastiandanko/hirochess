import Link from 'next/link'

export const metadata = {
  title: 'Features — HiroChess',
  description: 'Daily puzzles, Opening Lab, leaderboards, and HiroRating. Everything built around opening mastery.',
}

const features = [
  {
    icon: '♟',
    badge: 'Daily',
    badgeColor: 'text-[#00BFA5] border-[#00BFA5]/30 bg-[#00BFA5]/10',
    title: 'Daily Challenge',
    headline: 'A new puzzle. Every day.',
    desc: 'Each morning a fresh opening puzzle drops on HiroChess. Tied to a real opening line — London System, Sicilian, King\'s Indian — the daily puzzle challenges you to find the key idea. Solve it, keep your streak alive, climb the board.',
    details: [
      'Hand-crafted opening positions',
      'Multiple choice format with real distractors',
      "Hiro's Tip reveals after you solve",
      'Streak tracking + leaderboard points',
    ],
    borderColor: 'border-l-[#00BFA5]',
  },
  {
    icon: '♞',
    badge: 'Members',
    badgeColor: 'text-[#00BFA5] border-[#00BFA5]/30 bg-[#00BFA5]/10',
    title: 'Opening Lab',
    headline: '7-day opening deep dives.',
    desc: 'The Opening Lab walks you through an entire opening over 7 days — one key move per day. Starting with the London System and expanding to more openings. By day 7, the ideas are locked in.',
    details: [
      'Structured 7-day format per opening',
      'London System + more coming',
      'Day progress tracker',
      'Completion unlocks next opening',
    ],
    borderColor: 'border-l-[#00BFA5]',
  },
  {
    icon: '♛',
    badge: 'Weekly',
    badgeColor: 'text-[#888] border-[#333] bg-[#1a1a1a]',
    title: 'The Board',
    headline: 'Compete with the community.',
    desc: 'The Board is a weekly leaderboard that resets every Sunday. Every puzzle you solve earns you points. Your rank is visible to the whole community. Top 3 get a gold/silver/bronze crown.',
    details: [
      'Weekly reset every Sunday',
      'Real-time rank updates',
      'Top 3 gold/silver/bronze crowns',
      'Personal rank tracking even if outside top 10',
    ],
    borderColor: 'border-l-[#444]',
  },
  {
    icon: '♔',
    badge: 'Gold',
    badgeColor: 'text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/10',
    title: 'HiroRating',
    headline: 'Your opening knowledge score.',
    desc: 'HiroRating is a dedicated score that reflects how well you know chess openings — not your overall chess skill. Solve more puzzles correctly on the first try to grow your rating.',
    details: [
      'Increases with correct first-attempt solves',
      'Decreases with missed puzzles',
      'Visible on your profile',
      'Separate from chess Elo',
    ],
    borderColor: 'border-l-[#D4AF37]',
  },
  {
    icon: '🔥',
    badge: 'Members',
    badgeColor: 'text-[#00BFA5] border-[#00BFA5]/30 bg-[#00BFA5]/10',
    title: 'Streak System',
    headline: 'Don\'t break the chain.',
    desc: "Solve the daily puzzle to keep your streak alive. Miss a day and it resets. The streak counter is front and center on your dashboard — a daily nudge to show up and train.",
    details: [
      'Daily streak counter',
      'Gold glow styling for active streaks',
      'Next reset countdown',
      'Streak visible on leaderboard',
    ],
    borderColor: 'border-l-[#00BFA5]',
  },
  {
    icon: '♙',
    badge: 'King',
    badgeColor: 'text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/10',
    title: "King's Hour",
    headline: 'Monthly coaching session.',
    desc: 'King tier members get access to monthly group coaching sessions with the HiroChess community. Go deeper on openings, get your games reviewed, and level up faster.',
    details: [
      'Monthly group session',
      'Game review + Q&A',
      'King-tier Discord channel',
      'Early access to new openings',
    ],
    borderColor: 'border-l-[#D4AF37]',
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] font-body">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#111] bg-[#0A0A0A]/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link href="/" className="font-display font-black text-xl tracking-tight">
            <span className="text-white">HIRO</span>
            <span className="text-[#00BFA5]">CHESS</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-[#888] hover:text-[#F0F0F0] text-sm font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/api/auth/signin" className="btn-primary text-sm px-4 py-2">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 text-center hero-spotlight">
        <p className="font-mono text-xs text-[#00BFA5] uppercase tracking-[0.3em] mb-4">
          THE PLATFORM
        </p>
        <h1
          className="font-display font-black text-white leading-none tracking-tighter mb-6"
          style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}
        >
          BUILT FOR<br />
          <span className="teal-glow">IMPROVEMENT.</span>
        </h1>
        <p className="text-[#666] text-lg font-body max-w-xl mx-auto">
          Every feature on HiroChess serves one goal: making your opening play sharper, faster, and more instinctive.
        </p>
      </section>

      {/* Features list */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="flex flex-col gap-8">
          {features.map(({ icon, badge, badgeColor, title, headline, desc, details, borderColor }, idx) => (
            <div
              key={title}
              className={`bg-[#111111] border-l-2 ${borderColor} border border-[#1a1a1a] rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-[#00BFA5]/20 hover:bg-[#141414]`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="shrink-0">
                  <span className="text-5xl">{icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-[10px] font-mono uppercase tracking-widest border rounded-full px-2.5 py-1 ${badgeColor}`}>
                      {badge}
                    </span>
                    <span className="text-[#333] text-xs font-mono">#{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <h2 className="font-display font-bold text-white text-2xl mb-1 tracking-tight">{title}</h2>
                  <p className="font-mono text-sm text-[#00BFA5] mb-3">{headline}</p>
                  <p className="text-[#666] text-sm font-body leading-relaxed mb-5">{desc}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-xs text-[#555] font-body">
                        <span className="text-[#00BFA5]">→</span> {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[#080808] border-t border-[#111]">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-display font-black text-white leading-none tracking-tighter mb-6"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
          >
            READY TO TRAIN?
          </h2>
          <p className="text-[#555] font-body mb-8">
            All features are available with the Knight tier — $4/month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="btn-primary text-base px-8 py-4">
              SEE PRICING →
            </Link>
            <Link href="/api/auth/signin" className="btn-secondary text-base px-8 py-4">
              START FREE
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#111] py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-display font-black text-lg tracking-tight">
            <span className="text-white">HIRO</span>
            <span className="text-[#00BFA5]">CHESS</span>
          </Link>
          <p className="text-[#333] text-xs font-mono">© 2024 HiroChess. Train With Purpose.</p>
        </div>
      </footer>
    </div>
  )
}
