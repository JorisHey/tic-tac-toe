import { Square } from '../../types/square';

function calculateStatus(
  winner: Square | null,
  squares: (Square | null)[],
  nextValue: Square
): string {
  if (winner) {
    return `Winner is: ${winner}`;
  }
  if (squares.every(Boolean)) {
    return `No winner. It's a draw`;
  }
  return `Next player: ${nextValue}`;
}

function calculateNextValue(squares: (Square | null)[]): Square {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

function calculateWinner(squares: (Square | null)[]): Square | null {
  const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winners.length; i += 1) {
    const [a, b, c] = winners[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export { calculateStatus, calculateNextValue, calculateWinner };
