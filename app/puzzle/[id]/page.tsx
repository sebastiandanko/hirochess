'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import PuzzleUI from '@/components/PuzzleUI'
import Paywall from '@/components/Paywall'

export default function PuzzlePage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession()
  const [puzzle, setPuzzle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [solved, setSolved] = useState(false)
  const dbUser = (session as any)?.dbUser
  const isMember =
    dbUser?.plan === 'member' ||
    dbUser?.plan === 'pro' ||
    dbUser?.plan === 'knight' ||
    dbUser?.plan === 'king'

  useEffect(() => {
    fetch(`/api/puzzles?id=${params.id}`)
      .then(async () => {
        const r = await fetch('/api/puzzle/daily')
        const data = await r.json()
        setPuzzle(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.id])

  if (status === 'loading' || loading) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 gap-3">
        <div className="font-mono text-[10px] text-[#555] uppercase tracking-widest">Loading puzzle...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4">
        <div className="text-5xl opacity-40">♟</div>
        <h2 className="font-display font-black text-white text-2xl">SOLVE PUZZLE</h2>
        <p className="text-[#555] text-sm font-body max-w-xs">
          Sign in with Discord to solve puzzles and track your progress.
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
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-[#00BFA5] text-xs font-mono uppercase tracking-wider hover:text-[#007A6E] transition-colors"
        >
          ← BACK
        </Link>
        <Paywall />
      </div>
    )
  }

  if (!puzzle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <p className="text-[#555] text-sm font-body">Puzzle not found.</p>
        <Link href="/dashboard" className="text-[#00BFA5] text-sm font-mono">
          ← Back to dashboard
        </Link>
      </div>
    )
  }

  const sideToMove = puzzle.fen?.split(' ')[1] === 'w' ? 'White' : 'Black'

  async function handleSolved(attempts: number) {
    setSolved(true)
    if (session && puzzle) {
      await fetch('/api/puzzle/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ puzzle_id: puzzle.id, solved: true, attempts }),
      })
    }
  }

  async function handleFailed() {
    if (session && puzzle) {
      await fetch('/api/puzzle/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ puzzle_id: puzzle.id, solved: false, attempts: 3 }),
      })
    }
  }

  return (
    <div className="flex flex-col gap-5 pt-4">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-[#00BFA5] text-xs font-mono uppercase tracking-wider hover:text-[#007A6E] transition-colors w-fit"
      >
        ← BACK
      </Link>

      {/* Puzzle header */}
      <div className="flex flex-col gap-1">
        <p className="font-mono text-[10px] text-[#555] uppercase tracking-widest">
          {puzzle.opening}{puzzle.opening_day ? ` — Move ${puzzle.opening_day}` : ''}
        </p>
        <div className="flex items-center gap-2">
          <span
            className={`inline-block w-3 h-3 rounded-sm border ${
              sideToMove === 'White'
                ? 'bg-white border-[#888]'
                : 'bg-[#333] border-[#555]'
            }`}
          />
          <span className="text-[#888] text-sm font-body">{sideToMove} to play</span>
        </div>
      </div>

      {/* Puzzle UI */}
      <PuzzleUI puzzle={puzzle} onSolved={handleSolved} onFailed={handleFailed} />

      {/* Solved state */}
      {solved && (
        <div className="flex flex-col items-center gap-4 pt-2 animate-fadeUp">
          <div className="text-center">
            <div
              className="font-display font-black text-5xl teal-glow tracking-tight"
            >
              CORRECT.
            </div>
          </div>
          <Link
            href="/dashboard"
            className="btn-primary text-sm px-6 py-3"
          >
            BACK TO DASHBOARD →
          </Link>
        </div>
      )}
    </div>
  )
}
