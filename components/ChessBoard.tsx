'use client'

import { Chessboard } from 'react-chessboard'

interface ChessBoardProps {
  fen: string
  boardWidth?: number
  arePiecesDraggable?: boolean
  highlightedSquares?: Record<string, React.CSSProperties>
}

export default function ChessBoard({
  fen,
  boardWidth = 400,
  arePiecesDraggable = false,
  highlightedSquares = {}
}: ChessBoardProps) {
  return (
    <div style={{ width: '100%', maxWidth: boardWidth }}>
      <Chessboard
        options={{
          position: fen,
          allowDragging: arePiecesDraggable,
          squareStyles: highlightedSquares,
          darkSquareStyle: { backgroundColor: '#2d4a3e' },
          lightSquareStyle: { backgroundColor: '#c8d5b9' }
        }}
      />
    </div>
  )
}
