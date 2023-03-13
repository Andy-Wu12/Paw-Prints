import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import NotFound from '../routes/404';


test('explicitly renders "ERROR 404" text', () => {
  render(<NotFound />);

  const textElement = screen.getByText(/ERROR 404/);
  expect(textElement).toBeInTheDocument();
})

test(`should set document title to Not Found`, async () => {
  render(<NotFound />);

  await waitFor(() => {
    expect(document.title).toEqual("Not Found")
  });
})

test('should provide a message mentioning url does not exist', () => {
  render(<NotFound />);

  const textElement = screen.getByText(/url.+(does not exist|not found)/i);
  expect(textElement).toBeInTheDocument();
})