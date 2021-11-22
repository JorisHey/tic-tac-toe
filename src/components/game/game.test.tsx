/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-loop-func */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Game from '.';

beforeEach(() => {
  document.body.innerHTML = '';
});

test('clicking an odd square', async () => {
  let count = 0;

  render(<Game />);
  const squareButtons = await screen.findAllByRole('button', {
    name: 'square',
  });

  for (let i = 0; i < 8; i += 2) {
    const textContent = count % 2 === 0 ? 'X' : 'O';
    userEvent.click(squareButtons[i]);
    expect(squareButtons[i]).toHaveTextContent(textContent);
    count += 1;
  }
});

test('clicking an even square', async () => {
  let count = 0;

  render(<Game />);
  const squareButtons = await screen.findAllByRole('button', {
    name: 'square',
  });

  for (let i = 1; i < 8; i += 2) {
    const textContent = count % 2 === 0 ? 'X' : 'O';
    userEvent.click(squareButtons[i]);
    expect(squareButtons[i]).toHaveTextContent(textContent);
    count += 1;
  }
});

test('check who is playing', async () => {
  const click = 4;

  render(<Game />);
  const squareButtons = await screen.findAllByRole('button', {
    name: 'square',
  });
  const status = screen.getByLabelText('status');

  expect(status).toHaveTextContent(/Next player: X/i);
  userEvent.click(squareButtons[click]);
  expect(status).toHaveTextContent(/Next player: O/i);
});

test('checking the winner for "X"', async () => {
  const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  render(<Game />);
  const squareButtons = await screen.findAllByRole('button', {
    name: 'square',
  });
  const status = screen.getByLabelText('status');
  let clicked: number[] = [];
  let oClickIndex: number;

  const saveToClickOn = (forbiddenIndexes: number[]) =>
    [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((i) => !forbiddenIndexes.includes(i))[0];

  for (const winner of winners) {
    userEvent.click(screen.getByRole('button', { name: /restart/i }));
    clicked = [];

    for (let i = 0; i < winner.length; i += 1) {
      userEvent.click(squareButtons[winner[i]]);
      oClickIndex = saveToClickOn([...winner, ...clicked]);
      clicked.push(oClickIndex);
      userEvent.click(squareButtons[oClickIndex]);
    }
    expect(status).toHaveTextContent(/Winner is: X/i);
  }
});

test('checking the winner for "O"', async () => {
  const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  render(<Game />);
  const squareButtons = await screen.findAllByRole('button', {
    name: 'square',
  });
  const status = screen.getByLabelText('status');
  let clicked: number[] = [];
  let xClickIndex: number;

  const saveToClickOn = (forbiddenIndexes: number[]) =>
    [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((i) => !forbiddenIndexes.includes(i))[0];

  for (const winner of winners) {
    userEvent.click(screen.getByRole('button', { name: /restart/i }));
    clicked = [];

    for (let i = 0; i < winner.length; i += 1) {
      xClickIndex = saveToClickOn([...winner, ...clicked]);

      clicked.push(xClickIndex);

      // * "X" begins, so prevent "X" to be the winner
      if (
        winners.some(
          (r) =>
            r.length === clicked.length &&
            r.every((value, index) => clicked[index] === value)
        )
      ) {
        userEvent.click(squareButtons[saveToClickOn([...winner, ...clicked])]);
      } else {
        userEvent.click(squareButtons[xClickIndex]);
      }
      userEvent.click(squareButtons[winner[i]]);
    }
    expect(status).toHaveTextContent(/Winner is: O/i);
  }
});

test('checking the "restart" button', async () => {
  const twoRandomClicks = [
    Math.floor(Math.random() * 9),
    Math.floor(Math.random() * 9),
  ];

  render(<Game />);
  const squareButtons = await screen.findAllByRole('button', {
    name: 'square',
  });
  const restartButton = screen.getByRole('button', { name: /restart/i });
  const status = screen.getByLabelText('status');

  for (const click of twoRandomClicks) {
    userEvent.click(squareButtons[click]);
  }
  userEvent.click(restartButton);
  for (const square of squareButtons) {
    expect(square).toHaveTextContent('');
  }
  expect(status).toHaveTextContent(/Next player: X/i);
});
