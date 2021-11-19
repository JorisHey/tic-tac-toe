import { render, screen } from '@testing-library/react';

import Board from '.';

test('display correct numbers of squares', async () => {
  render(<Board squares={[]} />);
  const buttons = await screen.findAllByRole('button');
  expect(buttons).toHaveLength(9);
});

test('fill the whole playboard', async () => {
  const textContent = 'X';
  render(<Board squares={Array(9).fill(textContent)} />);
  const buttons = await screen.findAllByRole('button');

  for (const button of buttons) {
    expect(button).toHaveTextContent(textContent);
  }
});
