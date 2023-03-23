import React, { ReactElement, useState } from 'react';
import { throttle, getBreedNameFromURL } from '../util';

import ThrottledFetchButton from '../components/ThrottledFetchButton';
import LikableImage from '../components/LikableImage';

import type { LikableImageProps } from '../components/LikableImage';

import useRandomDog from '../hooks/useRandomDog';

let timerObject = {id: null};
const fetchDelay = 3000 // ms

export function RandomDogImage(): ReactElement {
  const [imageLink, setImageLink] = useState<string>('');
  const [breedName, setBreedName] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  
  const { getDog } = useRandomDog();

  function fetchImage() {
    throttle(async () => {
      try {
        const link = await getDog();
        setIsDisabled(true);
        setImageLink(link);
        setBreedName(getBreedNameFromURL(new URL(link)));
      } catch(error) {
        setImageLink('');
        setBreedName('');
      }
    }, fetchDelay, timerObject, () => { setIsDisabled(false) });
  };

  const likableImageProps: LikableImageProps = {
    imageProps: {
      href: imageLink,
      className: 'random-dog-image',
      altText: 'Dog'
    },
    className: 'likable-image-container'
  }

  return (
    <>
      <h1> Random Dog Image </h1>
      <p> <ThrottledFetchButton text="Fetch" isDisabled={isDisabled} onClick={fetchImage} /> a new image </p>
      {imageLink.trim() !== '' &&
        <div className='random-image-container'> 
          <LikableImage {...likableImageProps} />
          <h2> Breed: {breedName} </h2>
        </div>
      }
    </>
  );
}
