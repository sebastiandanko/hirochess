import Link from 'next/link'

export const metadata = {
  title: 'Pricing — HiroChess',
  description: 'Choose your HiroChess tier. Start free as a Pawn, upgrade to Knight for $4/mo, or go King for $9/mo.',
}

const tiers = [
  {
    icon: '♟',
    tier: 'Pawn',
    price: '$0',
    period: '/month',
    color: 'text-[#888]',
    borderColor: 'border-[#1a1a1a]',
    bgColor: 'bg-[#111111]',
    accentColor: 'text-[#555]',
    checkColor: 'text-[#333]',
    features: [
      '3 puzzles per week',
      'Basic leaderboard view',
      'Discord community access',
      'Public profile',
    ],
    cta: 'START FREE',
    ctaHref: '/api/auth/signin',
    ctaClass: 'btn-secondary',
    badge: null,
  },
  {
    icon: '♞',
    tier: 'Knight',
    price: '$4',
    period: '/month',
    color: 'text-[#00BFA5]',
    borderColor: 'border-[#00BFA5]/40',
    bgColor: 'bg-[#0d1f1c]',
    accentColor: 'text-[#00BFA5]',
    checkColor: 'text-[#00BFA5]',
    features: [
      'Unlimited daily puzzles',
      'Streak tracking',
      'Opening Lab (7-day courses)',
      'Full leaderboard + rank badge',
      'HiroRating system',
      'Discord Knight role',
      'Early feature access',
    ],
    cta: 'JOIN AS KNIGHT →',
    ctaHref: 'https://ko-fi.com/hirochess/membership',
    ctaClass: 'btn-primary',
    badge: 'Most Popular',
  },
  {
    icon: '♔',
    tier: 'King',
    price: '$9',
    period: '/month',
    color: 'text-[#D4AF37]',
    borderColor: 'border-[#D4AF37]/40',
    bgColor: 'bg-[#1a1600]',
    accentColor: 'text-[#D4AF37]',
    checkColor: 'text-[#D4AF37]',
    features: [
      'Everything in Knight',
      'Monthly tournament access',
      "King's Hour coaching session",
      'Exclusive King Discord channel',
      'Discord King role (gold)',
      'Priority support',
    ],
    cta: 'JOIN AS KING',
    ctaHref: 'https://ko-fi.com/hirochess/membership',
    ctaClass: null,
    badge: null,
  },
]

const faqs = [
  {
    q: 'How does payment work?',
    a: 'Membership is handled through Ko-fi. After subscribing, you\'ll get instant access to the Knight or King Discord role, which automatically unlocks premium features on HiroChess.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel your Ko-fi subscription at any time. Your access continues until the end of the billing period. No questions asked.',
  },
  {
    q: "What's the difference between Knight and King?",
    a: "Knight gives you full access to daily puzzles, streaks, Opening Lab, and the leaderboard. King adds monthly tournaments, a private coaching session (King's Hour), and the gold Discord role.",
  },
  {
    q: 'Do I need a Discord account?',
    a: 'Yes — HiroChess uses Discord for authentication. You sign in with Discord and your membership tier is verified through your Discord roles.',
  },
  {
    q: 'What openings are in the Opening Lab?',
    a: 'The London System is live. More openings are being added monthly. Knight+ members get access to all openings as they launch.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Free accounts get 3 puzzles per week and can view the leaderboard. This gives you a taste of the platform before upgrading.',
  },
]

export default function PricingPage() {
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
            <Link href="/features" className="text-[#888] hover:text-[#F0F0F0] text-sm font-medium transition-colors">
              Features
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
          MEMBERSHIP
        </p>
        <h1
          className="font-display font-black text-white leading-none tracking-tighter mb-6"
          style={{ fontSize: 'clamp(40px, 7vw, 88px)' }}
        >
          PICK YOUR<br />
          <span className="teal-glow">TIER.</span>
        </h1>
        <p className="text-[#666] text-lg font-body max-w-xl mx-auto">
          Start free. Upgrade when you're ready to train seriously.
        </p>
      </section>

      {/* Tier cards */}
      <section className="py-8 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map(({ icon, tier, price, period, color, borderColor, bgColor, accentColor, checkColor, features, cta, ctaHref, ctaClass, badge }) => (
            <div
              key={tier}
              className={`${bgColor} border ${borderColor} rounded-xl p-7 flex flex-col relative overflow-hidden`}
            >
              {badge && (
                <div className="absolute top-4 right-4">
                  <span className="font-mono text-[10px] text-[#00BFA5] border border-[#00BFA5]/30 bg-[#00BFA5]/10 rounded-full px-2.5 py-1 uppercase tracking-wider">
                    {badge}
                  </span>
                </div>
              )}

              <div className="text-4xl mb-4">{icon}</div>
              <div className={`font-mono text-xs uppercase tracking-widest mb-2 ${accentColor}`}>{tier}</div>
              <div className="flex items-baseline gap-0.5 mb-6">
                <span className="font-display font-black text-white text-4xl">{price}</span>
                <span className="text-[#555] text-sm font-body">{period}</span>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#888] font-body">
                    <span className={`${checkColor} text-xs mt-0.5 shrink-0`}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {ctaClass === 'btn-primary' ? (
                <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-3.5 text-center">
                  {cta}
                </a>
              ) : ctaClass === 'btn-secondary' ? (
                <Link href={ctaHref} className="btn-secondary text-sm py-3.5 text-center">
                  {cta}
                </Link>
              ) : (
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm py-3.5 text-center border ${borderColor} ${color} rounded-lg hover:bg-[#D4AF37]/10 transition-colors font-semibold`}
                >
                  {cta}
                </a>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-[#333] text-xs font-mono mt-6 tracking-wide">
          Payments handled securely via Ko-fi · Cancel anytime
        </p>
      </section>

      {/* Comparison table */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="font-display font-black text-white text-2xl tracking-tight mb-8 text-center">
          COMPARE TIERS
        </h2>
        <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 border-b border-[#1a1a1a]">
            <div className="p-4 text-[#555] text-xs font-mono uppercase tracking-wider col-span-1">Feature</div>
            <div className="p-4 text-center text-[#555] text-xs font-mono uppercase tracking-wider">Pawn</div>
            <div className="p-4 text-center text-[#00BFA5] text-xs font-mono uppercase tracking-wider">Knight</div>
            <div className="p-4 text-center text-[#D4AF37] text-xs font-mono uppercase tracking-wider">King</div>
          </div>
          {[
            { feature: 'Daily Puzzles', pawn: '3/week', knight: '✓', king: '✓' },
            { feature: 'Streak Tracking', pawn: '—', knight: '✓', king: '✓' },
            { feature: 'Opening Lab', pawn: '—', knight: '✓', king: '✓' },
            { feature: 'Leaderboard', pawn: 'View only', knight: '✓', king: '✓' },
            { feature: 'HiroRating', pawn: '—', knight: '✓', king: '✓' },
            { feature: 'Tournaments', pawn: '—', knight: '—', king: '✓' },
            { feature: "King's Hour", pawn: '—', knight: '—', king: '✓' },
            { feature: 'Discord Role', pawn: 'Pawn', knight: 'Knight', king: 'King (gold)' },
          ].map(({ feature, pawn, knight, king }) => (
            <div key={feature} className="grid grid-cols-4 border-b border-[#111] last:border-0">
              <div className="p-4 text-[#888] text-sm font-body">{feature}</div>
              <div className="p-4 text-center text-[#444] text-sm font-body">{pawn}</div>
              <div className="p-4 text-center text-[#00BFA5] text-sm font-mono">{knight}</div>
              <div className="p-4 text-center text-[#D4AF37] text-sm font-mono">{king}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="font-display font-black text-white text-2xl tracking-tight mb-10 text-center">
          FREQUENTLY ASKED
        </h2>
        <div className="flex flex-col gap-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-5">
              <h3 className="font-display font-bold text-white text-base mb-2">{q}</h3>
              <p className="text-[#666] text-sm font-body leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-[#080808] border-t border-[#111]">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-display font-black text-white leading-none tracking-tighter mb-6"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
          >
            STOP BLUNDERING.<br />
            <span className="teal-glow">START TRAINING.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://ko-fi.com/hirochess/membership"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
            >
              JOIN NOW — $4/MONTH →
            </a>
            <Link href="/api/auth/signin" className="btn-secondary text-base px-8 py-4">
              SIGN IN FREE
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
