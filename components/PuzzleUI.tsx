'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import MoveSelector from './MoveSelector'
import { Chess } from 'chess.js'

const ChessBoard = dynamic(() => import('./ChessBoard'), { ssr: false })

interface PuzzleUIProps {
  puzzle: {
    id: string
    fen: string
    solution: string[]
    opening: string
    hiro_tip: string | null
    difficulty: number
    opening_day?: number | null
  }
  onSolved?: (attempts: number) => void
  onFailed?: () => void
}

function getAlgebraicMoves(fen: string): string[] {
  try {
    const chess = new Chess(fen)
    return chess.moves()
  } catch {
    return ['Nf3', 'Bf4', 'd4', 'c4', 'e4', 'g3', 'h3', 'b3']
  }
}

function uciToAlgebraic(fen: string, uci: string): string {
  try {
    const chess = new Chess(fen)
    const move = chess.move(uci)
    return move?.san || uci
  } catch {
    return uci
  }
}

function getDistractors(fen: string, correctUci: string): string[] {
  try {
    const chess = new Chess(fen)
    const correctSan = chess.move(correctUci)?.san || correctUci

    const chess2 = new Chess(fen)
    const allMoves = chess2.moves()
    const distractors = allMoves.filter((m) => m !== correctSan).slice(0, 3)

    while (distractors.length < 3) {
      distractors.push(['Nf3', 'Bf4', 'c4', 'h3'].find((m) => !distractors.includes(m)) || 'e4')
    }

    return distractors
  } catch {
    return ['Nf3', 'Bf4', 'c4']
  }
}

export default function PuzzleUI({ puzzle, onSolved, onFailed }: PuzzleUIProps) {
  const [solved, setSolved] = useState(false)
  const [failed, setFailed] = useState(false)
  const [currentFen, setCurrentFen] = useState(puzzle.fen)
  const [highlightedSquares, setHighlightedSquares] = useState<Record<string, React.CSSProperties>>({})
  const [moveOptions, setMoveOptions] = useState<string[]>([])
  const [correctSan, setCorrectSan] = useState('')

  useEffect(() => {
    const correctUci = puzzle.solution[0]
    const chess = new Chess(puzzle.fen)
    let san = correctUci
    try {
      const m = chess.move(correctUci)
      san = m?.san || correctUci
    } catch {}

    const distractors = getDistractors(puzzle.fen, correctUci)
    const options = [san, ...distractors].sort(() => Math.random() - 0.5)
    setMoveOptions(options)
    setCorrectSan(san)
  }, [puzzle])

  function handleCorrect() {
    const correctUci = puzzle.solution[0]
    try {
      const chess = new Chess(puzzle.fen)
      const move = chess.move(correctUci)
      if (move) {
        const from = move.from
        const to = move.to
        setHighlightedSquares({
          [from]: { backgroundColor: 'rgba(29, 158, 117, 0.5)' },
          [to]: { backgroundColor: 'rgba(29, 158, 117, 0.8)' }
        })
        setCurrentFen(chess.fen())
      }
    } catch {}

    setSolved(true)
    onSolved?.(1)
  }

  function handleWrong(attempts: number) {
    if (attempts >= 3) {
      setFailed(true)
      onFailed?.()
    }
  }

  const sideToMove = puzzle.fen.split(' ')[1] === 'w' ? 'White' : 'Black'

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="w-full max-w-sm">
        <div className="text-[#888888] text-xs uppercase tracking-wider mb-1">
          {puzzle.opening}{puzzle.opening_day ? ` — move ${puzzle.opening_day}` : ''}
        </div>
        <div className="text-[#e0e0e0] text-sm">{sideToMove} to play</div>
      </div>

      <div className="w-full max-w-sm">
        <ChessBoard
          fen={currentFen}
          boardWidth={400}
          arePiecesDraggable={false}
          highlightedSquares={highlightedSquares}
        />
      </div>

      <div className="w-full max-w-sm">
        {moveOptions.length > 0 && (
          <MoveSelector
            moves={moveOptions}
            correctMove={correctSan}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            disabled={solved || failed}
          />
        )}
      </div>

      {solved && puzzle.hiro_tip && (
        <div className="w-full max-w-sm bg-[#1a2e22] border border-[#1d9e75]/30 rounded-lg p-4 animate-fade-in">
          <div className="text-[#1d9e75] text-xs font-semibold uppercase tracking-wider mb-2">
            Hiro's tip
          </div>
          <p className="text-[#e0e0e0] text-sm leading-relaxed">{puzzle.hiro_tip}</p>
        </div>
      )}

      {solved && (
        <div className="text-center">
          <div className="text-[#1d9e75] font-semibold">Correct! ✓</div>
        </div>
      )}
    </div>
  )
}
