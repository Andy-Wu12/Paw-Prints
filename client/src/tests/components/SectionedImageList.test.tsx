import { getByRole, render, screen } from '@testing-library/react';
import SectionedImageList from '../../components/SectionedImageList';

const mockImagesList = [
  "/test-image-1",
  "/test-image-2",
  "/test-image-3",
  "/test-image-4"
];

test('should have a header describing image section if sectionName is not empty', () => {
  render(<SectionedImageList sectionName='test images' imageURLs={mockImagesList}/>);

  const h2Elem = screen.getByRole('heading', { level: 2 });
  expect(h2Elem).toHaveTextContent(/test images/);
})

test('should have # of images equal to imageURLs array length', () => {
  render(<SectionedImageList sectionName='' imageURLs={mockImagesList} />);

  const images = screen.getAllByRole('img');
  expect(images).toHaveLength(mockImagesList.length);
})

test('images should all have an alt and correct src attribute ', () => {
  render(<SectionedImageList sectionName='test section' imageURLs={mockImagesList} />);

  const images = screen.getAllByRole('img');
  images.forEach((image, i) => {
    expect(image).toHaveAttribute('src', mockImagesList[i]);
    expect(image).toHaveAttribute('alt');
  })
})