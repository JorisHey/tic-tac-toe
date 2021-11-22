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
  const [step, setStep] = useState(0);
  const [squares, setSquares] = useState<(Square | null)[]>(
    Array(9).fill(null)
  );
  const [history, setHistory] = useState<(Square | null)[][]>([
    Array(9).fill(null),
  ]);
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

  function goBack(stepIndex: number) {
    setStep(stepIndex);
  }

  const moves = history.map((_, stepIndex: number) => (
    <li key={stepIndex}>
      <button
        type="button"
        disabled={stepIndex === step}
        onClick={() => goBack(stepIndex)}
      >
        {stepIndex === 0 ? 'Go to "Start Game"' : `Go to step: ${stepIndex}`}
        {stepIndex === step ? '(current)' : ''}
      </button>
    </li>
  ));

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
        <ol>RENDER MOVES</ol>
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
