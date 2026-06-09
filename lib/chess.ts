import { Chess } from 'chess.js'

export function validateMove(fen: string, move: string): boolean {
  try {
    const chess = new Chess(fen)
    const result = chess.move(move)
    return result !== null
  } catch {
    return false
  }
}

export function isSolutionCorrect(fen: string, selectedMove: string, solution: string[]): boolean {
  return solution[0] === selectedMove
}

export function getMoveOptions(solution: string[], allMoves: string[]): string[] {
  const incorrect = allMoves.filter(m => m !== solution[0]).slice(0, 3)
  const options = [solution[0], ...incorrect]
  return options.sort(() => Math.random() - 0.5)
}

export function getLegalMoves(fen: string): string[] {
  try {
    const chess = new Chess(fen)
    return chess.moves({ verbose: false })
  } catch {
    return []
  }
}

export function applyMove(fen: string, move: string): string | null {
  try {
    const chess = new Chess(fen)
    chess.move(move)
    return chess.fen()
  } catch {
    return null
  }
}
