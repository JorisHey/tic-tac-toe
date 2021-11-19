import { Square } from '../../types/square';
import style from './board.module.css';

type ChildProps = {
  squares: (Square | null)[];
  selectedSquare: (square: number) => void;
};

export default function Board({
  squares,
  selectedSquare,
}: ChildProps): JSX.Element {
  function renderSquare(i: number) {
    return (
      <button
        type="button"
        aria-label="square"
        onClick={() => selectedSquare(i)}
        className={`${style.square}`}
      >
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div className={`${style.boardRow}`}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={`${style.boardRow}`}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={`${style.boardRow}`}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
