import { render, screen } from "@testing-library/react";
import { ImageList } from "../../components/ImageList";


const mockImagesList = [
  "/test-image-1",
  "/test-image-2",
  "/test-image-3",
  "/test-image-4"
];

test('should contain images.length # of images if desiredLength is larger', () => {
  const length = 200;

  render(<ImageList images={mockImagesList} desiredLength={length} />);

  const images = screen.getAllByRole('img');
  expect(images).toHaveLength(mockImagesList.length);
})

test('should contain desiredLength # of images if desiredLength is smaller', () => {
  const length = 2;

  render(<ImageList images={mockImagesList} desiredLength={length} />);

  const images = screen.getAllByRole('img');
  expect(images).toHaveLength(length);
})