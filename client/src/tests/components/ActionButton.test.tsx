import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActionButton from '../../components/generic/ActionButton';

test('should trigger provided onClick if not disabled', () => {
  const mockOnClick = jest.fn();

  render(<ActionButton onClick={mockOnClick} isDisabled={false} />);

  const buttonElem = screen.getByRole('button');
  userEvent.click(buttonElem);

  expect(mockOnClick).toHaveBeenCalled();
})

test('should not be disabled if isDisabled is true', () => {
  const mockOnClick = jest.fn();

  render(<ActionButton onClick={mockOnClick} isDisabled={true} />);

  const buttonElem = screen.getByRole('button');

  expect(buttonElem).toBeDisabled();
})