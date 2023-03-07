import { ClickableImage } from "./ClickableImage";
import LikableImage, { LikableImageProps } from "./LikableImage";

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

    const likableImageProps: LikableImageProps = {
      imageProps: {
        href: imgSrc,
        className: 'list-dog-image',
        altText: 'Dog'
      },
      buttonProps: {
        isLiked: false,
        onClick: () => {}
      },
      className: 'likable-image-container'
    }

    const img = <LikableImage key={`images${i}`} {...likableImageProps} />
    imageList.push(img);
  }

  return (
    <div className='dog-images'>
      {imageList}
    </div>
  );
}