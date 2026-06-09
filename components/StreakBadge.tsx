interface StreakBadgeProps {
  streak: number
  nextResetHours?: number
}

export default function StreakBadge({ streak, nextResetHours }: StreakBadgeProps) {
  const hours = nextResetHours !== undefined ? nextResetHours : 24 - new Date().getUTCHours()

  return (
    <div className="flex items-center gap-4 bg-[#111111] border border-[#D4AF37]/30 rounded-xl px-5 py-4 streak-active">
      <div className="flex flex-col items-center">
        <span className="font-display font-black text-4xl text-[#D4AF37] gold-glow leading-none">
          {streak}
        </span>
        <span className="text-[10px] font-body text-[#888] tracking-widest uppercase mt-0.5">
          day streak
        </span>
      </div>
      <div className="w-px h-10 bg-[#D4AF37]/20" />
      <div className="flex flex-col gap-1">
        <div className="text-2xl">🔥</div>
        <div className="text-[#555] text-xs font-mono">
          Next reset in {hours}h
        </div>
      </div>
    </div>
  )
}
