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
  const [history, setHistory] = useState<(Square | null)[][]>([
    Array(9).fill(null),
  ]);

  const currentStep: (Square | null)[] = history[step];
  const winner = calculateWinner(currentStep);
  const nextValue = calculateNextValue(currentStep);
  const status = calculateStatus(winner, currentStep, nextValue);

  const selectedSquare = useCallback(
    (square: number) => {
      const squaresCopy = [...currentStep];
      const historyCopy = history.slice(0, step + 1);

      if (winner || currentStep[square]) return;

      squaresCopy[square] = nextValue;
      historyCopy.push(squaresCopy);

      setHistory(historyCopy);
      setStep(historyCopy.length - 1);
    },
    [currentStep, history, nextValue, step, winner]
  );

  function restart() {
    setStep(0);
    setHistory([Array(9).fill(null)]);
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
        <Board squares={currentStep} selectedSquare={selectedSquare} />
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
        <ol>{moves}</ol>
      </div>
      <button
        type="button"
        onClick={restart}
        className={`${style.btnRestart}`}
        disabled={currentStep.filter(Boolean).length === 0}
      >
        RESTART
      </button>
    </div>
  );
}
