import { useCallback, useState } from 'react';
import Board from '../board';
import {
  calculateStatus,
  calculateNextValue,
  calculateWinner,
} from './game.helpers';
import { Square } from '../../types/square';

export default function Game(): JSX.Element {
  const [squares, setSquares] = useState<(Square | null)[]>(
    Array(9).fill(null)
  );
  const winner = calculateWinner(squares);
  const nextValue = calculateNextValue(squares);
  const status = calculateStatus(winner, squares, nextValue);

  const selectedSquare = useCallback(
    (square: number) => {
      const squaresCopy = [...squares];

      if (winner || squares[square]) return;

      squaresCopy[square] = nextValue;
      setSquares(squaresCopy);
    },
    [nextValue, squares, winner]
  );

  function restart() {
    const squaresCopy = Array(9).fill(null);
    setSquares(squaresCopy);
  }

  return (
    <>
      <Board squares={squares} selectedSquare={selectedSquare} />
      <button type="button" onClick={restart}>
        restart
      </button>
      <div aria-label="status">{status}</div>
    </>
  );
}
