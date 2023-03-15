import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { RandomDogImage } from '../routes/RandomDogImage'


test("should have a button to submit form", async () => {
  render(<RandomDogImage />);

  const buttonElem = await screen.findByRole('button', { name: /fetch/i });
  expect(buttonElem).toBeInTheDocument();
})

test("should render an image after button clicked", async () => {
  render(<RandomDogImage />);

  const buttonElem = await screen.findByRole('button', { name: /fetch/i });
  userEvent.click(buttonElem);

  await waitFor(async () => {
    expect(await screen.findByRole('img')).toBeInTheDocument();
  })
})