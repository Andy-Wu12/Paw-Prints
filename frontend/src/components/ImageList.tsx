import { ClickableImage } from "./ClickableImage";

type ImageListProps = {
  images: string[],
  desiredLength: number
}

export function ImageList({images, desiredLength}: ImageListProps): React.ReactElement {
  const srcListLength = images.length;
  const renderLength = Math.min(desiredLength, srcListLength);
  const imageList = [];

  // Track chosen indices to prevent duplicate images from being picked
  // const availableIdx = [...Array(srcListLength).keys()]; 

  for(let i = 0; i < renderLength; i++) {
    // const randomIndex = getRandomIntInRange(availableIdx.length);
    // const imageIndex = availableIdx[randomIndex];

    // // Swap last element with chosen element and pop to prevent duplicate copies
    // availableIdx[randomIndex] = availableIdx[availableIdx.length - 1]
    // availableIdx.pop();

    const imgSrc = images[i];
    const img = <ClickableImage key={`image${i}`} href={imgSrc} className='list-dog-image' altText='Dog' />
    imageList.push(img);
  }

  return (
    <div className='dog-images'>
      {imageList}
    </div>
  );
}