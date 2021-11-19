import { useCallback, useState } from 'react';
import Board from '../board';
import {
  calculateStatus,
  calculateNextValue,
  calculateWinner,
} from './game.helpers';
import { Square } from '../../types/square';
import style from './game.module.css';

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
    <div className={`${style.game}`}>
      <div className={`${style.container}`}>
        <Board squares={squares} selectedSquare={selectedSquare} />
        <div
          aria-label="status"
          className={
            status.substring(status.length - 1) === 'X'
              ? `${style.status} ${style.statusX}`
              : `${style.status} ${style.statusO}`
          }
        >
          {status}
        </div>
      </div>
      <button
        type="button"
        onClick={restart}
        className={`${style.btnRestart}`}
        disabled={squares.filter(Boolean).length === 0}
      >
        RESTART
      </button>
    </div>
  );
}
