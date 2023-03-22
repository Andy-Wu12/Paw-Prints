import { render, screen, fireEvent } from '@testing-library/react'
import ThrottledFetchButton from '../../components/ThrottledFetchButton'

test('should exist as a button', () => {
  render(<ThrottledFetchButton text='' isDisabled={false}/>);
  
  expect(screen.getByRole('button')).toBeInTheDocument();
})

test('should have the desired text label', () => {
  render(<ThrottledFetchButton text='button text' isDisabled={false}/>);

  expect(screen.getByRole('button', { name: 'button text' }));
})

test('should be disabled if isDisabled is true', () => {
  render(<ThrottledFetchButton text='text' isDisabled={true}/>)

  expect(screen.getByRole('button', { name: 'text' })).toBeDisabled();
})

test('should not trigger onClick if disabled', () => {
  let counter = 0;
  const mockOnClick = () => {counter += 1}

  render(<ThrottledFetchButton onClick={mockOnClick} text='text' isDisabled={true}/>);

  const buttonElement = screen.getByText('text');
  fireEvent.click(buttonElement);

  expect(counter).toEqual(0);
})

test('should trigger onClick if enabled', () => {
  let counter = 0;
  const mockOnClick = () => {counter += 1}

  render(<ThrottledFetchButton onClick={mockOnClick} text='text' isDisabled={false}/>);

  const buttonElement = screen.getByText('text');
  fireEvent.click(buttonElement);

  expect(counter).toEqual(1);
})