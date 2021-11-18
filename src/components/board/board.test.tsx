import { render, screen } from '@testing-library/react';

import Board from '.';

test('display correct number of squares', async () => {
  render(<Board />);
  const buttons = await screen.findAllByRole('button');
  expect(buttons).toHaveLength(9);
});
