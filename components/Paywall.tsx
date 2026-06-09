interface PaywallProps {
  kofiUrl?: string
}

export default function Paywall({ kofiUrl = 'https://ko-fi.com/hirochess/membership' }: PaywallProps) {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0A0A]/92 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-5xl mb-4 opacity-80">♟</div>
        <h3 className="font-display font-black text-white text-xl mb-3 tracking-tight">
          You&apos;ve used your 3 free puzzles this week
        </h3>
        <p className="text-[#666] text-sm mb-6 max-w-xs font-body leading-relaxed">
          Join as a Knight to unlock daily puzzles, streak tracking, the Opening Lab, and full leaderboard access.
        </p>
        <a
          href={kofiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-base px-8 py-3"
        >
          JOIN FOR $4/MONTH →
        </a>
        <p className="text-[#444] text-xs mt-4 font-mono tracking-wide">
          Cancel anytime. Instant Discord access.
        </p>
      </div>
      <div className="h-56 bg-[#111111]" />
    </div>
  )
}
