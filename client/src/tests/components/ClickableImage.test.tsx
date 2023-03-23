import { render, screen, within } from '@testing-library/react';
import { ClickableImage } from '../../components/ClickableImage'

const imageSrc = "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_6408.jpg";

test('img should exist as child of anchor tag to make it clickable', () => {
  render(<ClickableImage href={imageSrc} altText="image" />);

  const anchor = document.getElementsByTagName('a')[0];
  const img = within(anchor).getByAltText(/image/);
  expect(img).toHaveProperty('src', imageSrc);
})

test('anchor should have target as _blank', () => {
  render(<ClickableImage href={imageSrc} altText="image" />);

  const link = screen.getByRole('link');
  expect(link).toHaveProperty('target', '_blank');
})

test('anchor should not provide referrer information', () => {
  render(<ClickableImage href={imageSrc} altText="image" />);

  const link = screen.getByRole('link');
  expect(link).toHaveProperty('rel', 'noreferrer');
})

