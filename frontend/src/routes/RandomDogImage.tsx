import React, { ReactElement, useState } from 'react';
import { throttle, getBreedNameFromURL } from '../util';

import ThrottledFetchButton from '../components/ThrottledFetchButton';
import LikableImage from '../components/LikableImage';

import type { LikableImageProps } from '../components/LikableImage';

let timerObject = {id: null};
let fetchDelay = 3000 // ms

export function RandomDogImage(): ReactElement {
  const [posted, setPosted] = useState(false);
  const [imageLink, setImageLink] = useState('');
  const [breedName, setBreedName] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  
  function fetchImage() {
    throttle(async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/dog/get-random`);
        const data = await response.json();
        if(data.status === "success") {
          setIsDisabled(true);
          setImageLink(data['message']);
          setBreedName(getBreedNameFromURL(new URL(data['message'])))
          setPosted(true);
        }

      } catch(error) {
        setImageLink('');
        setBreedName('');
        setPosted(false);
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
      {posted &&
        <div className='random-image-container'> 
          <LikableImage {...likableImageProps} />
          <h2> Breed: {breedName} </h2>
        </div>
      }
    </>
  );
}
