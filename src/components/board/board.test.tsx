import { render, screen } from '@testing-library/react';

import Board from '.';

test('display correct number of squares', async () => {
  const notImportantHere = () => null;

  render(<Board selectedSquare={notImportantHere} squares={[]} />);
  const buttons = await screen.findAllByRole('button', { name: 'square' });
  expect(buttons).toHaveLength(9);
});

test('fill the whole playboard', async () => {
  const textContent = 'X';
  const notImportantHere = () => null;

  render(
    <Board
      selectedSquare={notImportantHere}
      squares={Array(9).fill(textContent)}
    />
  );
  const buttons = await screen.findAllByRole('button', { name: 'square' });

  for (const button of buttons) {
    expect(button).toHaveTextContent(textContent);
  }
});
