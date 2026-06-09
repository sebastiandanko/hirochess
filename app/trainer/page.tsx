'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import PuzzleUI from '@/components/PuzzleUI'
import Paywall from '@/components/Paywall'

const OPENINGS = ['London System']
const TOTAL_DAYS = 7

export default function TrainerPage() {
  const { data: session, status } = useSession()
  const [selectedOpening, setSelectedOpening] = useState('London System')
  const [puzzles, setPuzzles] = useState<any[]>([])
  const [currentDay, setCurrentDay] = useState(1)
  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [finished, setFinished] = useState(false)
  const dbUser = (session as any)?.dbUser
  const isMember =
    dbUser?.plan === 'member' ||
    dbUser?.plan === 'pro' ||
    dbUser?.plan === 'knight' ||
    dbUser?.plan === 'king'

  useEffect(() => {
    if (status === 'loading') return
    if (!isMember) {
      setLoading(false)
      return
    }

    fetch(`/api/puzzles?opening=${encodeURIComponent(selectedOpening)}`)
      .then((r) => r.json())
      .then((data) => {
        setPuzzles(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [selectedOpening, status, isMember])

  if (status === 'loading' || loading) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 gap-3">
        <div className="font-mono text-[10px] text-[#555] uppercase tracking-widest">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4">
        <div className="text-5xl opacity-40">♞</div>
        <h2 className="font-display font-black text-white text-2xl">OPENING LAB</h2>
        <p className="text-[#555] text-sm font-body max-w-xs">
          Sign in with Discord to access the Opening Lab and start mastering chess openings.
        </p>
        <Link href="/api/auth/signin" className="btn-primary text-sm px-6 py-3">
          Sign in with Discord
        </Link>
      </div>
    )
  }

  if (!isMember) {
    return (
      <div className="flex flex-col gap-5 pt-4">
        <div>
          <p className="font-mono text-[10px] text-[#00BFA5] uppercase tracking-[0.3em] mb-1">
            MEMBERS ONLY
          </p>
          <h1 className="font-display font-black text-white text-3xl tracking-tight">
            OPENING LAB
          </h1>
        </div>
        <Paywall />
      </div>
    )
  }

  const currentPuzzle = puzzles.find((p) => p.opening_day === currentDay)

  function handleSolved(attempts: number) {
    if (!completedDays.includes(currentDay)) {
      setCompletedDays((prev) => [...prev, currentDay])
    }
    if (session && currentPuzzle) {
      fetch('/api/puzzle/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ puzzle_id: currentPuzzle.id, solved: true, attempts }),
      })
    }
  }

  function handleNext() {
    const nextDay = currentDay + 1
    if (nextDay > TOTAL_DAYS || nextDay > puzzles.length) {
      setFinished(true)
    } else {
      setCurrentDay(nextDay)
    }
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
        <div className="text-6xl">🏆</div>
        <div>
          <p className="font-mono text-[10px] text-[#00BFA5] uppercase tracking-[0.3em] mb-2">
            COMPLETED
          </p>
          <h2 className="font-display font-black text-white text-3xl tracking-tight mb-3">
            CONGRATULATIONS.
          </h2>
          <p className="text-[#555] text-sm font-body max-w-xs mx-auto leading-relaxed">
            You&apos;ve completed all 7 days of the {selectedOpening} trainer. The opening is yours now.
          </p>
        </div>
        <Link href="/dashboard" className="btn-primary text-sm px-6 py-3">
          Try today&apos;s puzzle →
        </Link>
        <button
          onClick={() => {
            setCurrentDay(1)
            setCompletedDays([])
            setFinished(false)
          }}
          className="text-[#555] text-sm font-body hover:text-[#888] transition-colors"
        >
          Restart lab
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 pt-4">
      {/* Header */}
      <div>
        <p className="font-mono text-[10px] text-[#00BFA5] uppercase tracking-[0.3em] mb-1">
          TRAINING
        </p>
        <h1 className="font-display font-black text-white text-3xl tracking-tight">
          OPENING LAB
        </h1>
      </div>

      {/* Opening selector */}
      <select
        value={selectedOpening}
        onChange={(e) => {
          setSelectedOpening(e.target.value)
          setCurrentDay(1)
          setCompletedDays([])
          setFinished(false)
        }}
        className="bg-[#111111] border border-[#222] text-[#F0F0F0] rounded-lg px-4 py-3 text-sm font-body w-full appearance-none cursor-pointer focus:border-[#00BFA5] focus:outline-none transition-colors"
      >
        {OPENINGS.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      {/* Day progress row */}
      <div className="flex gap-1.5">
        {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map((day) => {
          const isDone = completedDays.includes(day)
          const isCurrent = day === currentDay
          const isAvailable = day <= puzzles.length

          return (
            <button
              key={day}
              onClick={() => isAvailable && setCurrentDay(day)}
              disabled={!isAvailable}
              className={`flex-1 h-10 rounded-lg flex items-center justify-center text-xs font-mono font-medium transition-all duration-200 ${
                isDone
                  ? 'bg-[#00BFA5] text-[#0A0A0A] font-bold'
                  : isCurrent
                  ? 'bg-[#1a2e22] border border-[#00BFA5] text-[#00BFA5]'
                  : isAvailable
                  ? 'bg-[#111111] border border-[#1a1a1a] text-[#555] hover:border-[#333] hover:text-[#888] cursor-pointer'
                  : 'bg-[#0A0A0A] border border-[#111] text-[#222] cursor-not-allowed'
              }`}
            >
              {isDone ? '✓' : day}
            </button>
          )
        })}
      </div>

      {/* Puzzle context */}
      <div className="bg-[#111111] border border-[#1a1a1a] rounded-lg px-4 py-3 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-[#555]">Day {currentDay} of {TOTAL_DAYS}</span>
          <span className="text-[#333] mx-2 font-mono text-xs">·</span>
          <span className="font-mono text-xs text-[#888]">{selectedOpening}</span>
        </div>
        <span className="text-[#00BFA5] text-xs font-mono">
          {completedDays.length}/{TOTAL_DAYS} done
        </span>
      </div>

      {/* Puzzle */}
      {currentPuzzle ? (
        <>
          <PuzzleUI puzzle={currentPuzzle} onSolved={handleSolved} onFailed={() => {}} />
          {completedDays.includes(currentDay) && (
            <button
              onClick={handleNext}
              className="btn-primary w-full py-4 text-sm"
            >
              {currentDay < TOTAL_DAYS && currentDay < puzzles.length
                ? 'NEXT DAY →'
                : 'FINISH TRAINER'}
            </button>
          )}
        </>
      ) : (
        <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-10 text-center">
          <p className="text-[#555] text-sm font-body">No puzzle for Day {currentDay} yet.</p>
        </div>
      )}
    </div>
  )
}
