import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import Routing from '../../components/Routing';

test('should catch unknown routes and return error 404 message', async () => {
  render(
    <MemoryRouter initialEntries={["/randomInvalidPath"]}>
      <Routing />
    </MemoryRouter>
  );

  const errorTextElem = screen.getByText(/404/);
  expect(errorTextElem).toBeInTheDocument();
})