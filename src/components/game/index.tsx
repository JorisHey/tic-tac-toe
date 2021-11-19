import { useState } from 'react';
import { Square } from '../../types/square';
import Board from '../board';

export default function Game(): JSX.Element {
  const [squares, setSquares] = useState<(Square | null)[]>(
    Array(9).fill(null)
  );

  return <Board squares={squares} />;
}
