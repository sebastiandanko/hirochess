'use client'

import { useState } from 'react'

interface MoveSelectorProps {
  moves: string[]
  correctMove: string
  onCorrect: () => void
  onWrong: (attempts: number) => void
  disabled?: boolean
  maxAttempts?: number
}

export default function MoveSelector({
  moves,
  correctMove,
  onCorrect,
  onWrong,
  disabled = false,
  maxAttempts = 3
}: MoveSelectorProps) {
  const [attempts, setAttempts] = useState(0)
  const [wrongMove, setWrongMove] = useState<string | null>(null)
  const [solved, setSolved] = useState(false)
  const [revealed, setRevealed] = useState(false)

  function handleSelect(move: string) {
    if (disabled || solved || revealed) return

    if (move === correctMove) {
      setSolved(true)
      onCorrect()
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setWrongMove(move)
      setTimeout(() => setWrongMove(null), 600)
      onWrong(newAttempts)

      if (newAttempts >= maxAttempts) {
        setRevealed(true)
      }
    }
  }

  function getButtonStyle(move: string): string {
    const base =
      'w-full py-3.5 px-4 rounded-lg text-sm font-mono font-medium transition-all duration-200 border tracking-wide '

    if (solved && move === correctMove) {
      return base + 'bg-[#00BFA5] border-[#00BFA5] text-[#0A0A0A] shadow-[0_0_20px_rgba(0,191,165,0.4)]'
    }
    if (revealed && move === correctMove) {
      return base + 'bg-[#00BFA5]/20 border-[#00BFA5] text-[#00BFA5]'
    }
    if (wrongMove === move) {
      return base + 'bg-red-950 border-red-700 text-red-300 shadow-[0_0_12px_rgba(220,38,38,0.3)]'
    }
    if (disabled || solved || revealed) {
      return base + 'bg-[#111] border-[#222] text-[#444] cursor-not-allowed'
    }
    return base + 'bg-[#111111] border-[#222] text-[#F0F0F0] hover:border-[#00BFA5]/60 hover:text-[#00BFA5] hover:bg-[#1a1a1a] cursor-pointer'
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-2.5">
        {moves.map((move) => (
          <button
            key={move}
            onClick={() => handleSelect(move)}
            disabled={disabled || solved || revealed}
            className={getButtonStyle(move)}
          >
            {solved && move === correctMove ? (
              <span className="flex items-center justify-center gap-2">
                {move} <span className="text-xs">CORRECT ✓</span>
              </span>
            ) : (
              move
            )}
          </button>
        ))}
      </div>
      {revealed && !solved && (
        <p className="text-[#555] text-sm text-center mt-4 font-body">
          The correct move was{' '}
          <span className="text-[#00BFA5] font-mono font-medium">{correctMove}</span>
        </p>
      )}
    </div>
  )
}
