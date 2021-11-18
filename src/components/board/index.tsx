import style from './board.module.css';

export default function Board(): JSX.Element {
  function renderSquare(i: number) {
    return (
      <button type="button" className={`${style.square}`}>
        {i % 2 === 0 ? 'X' : 'O'}
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
