import { render, screen, waitFor } from '@testing-library/react'

import { RandomDogImage } from '../routes/RandomDogImage'


test("should have a button to submit form", async () => {
  render(<RandomDogImage />);

  const buttonElem = await screen.findByRole('button', { name: /fetch/i });
  expect(buttonElem).toBeInTheDocument();
})
