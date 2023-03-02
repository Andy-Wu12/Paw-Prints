import React, { ReactElement, useState } from 'react';
import { ClickableImage, throttle } from '../util';
import ThrottledFetchButton from '../components/ThrottledFetchButton';

let timerObject = {id: null};
let fetchDelay = 3000 // ms

export function RandomDogImage(): ReactElement {
  const [posted, setPosted] = useState(false);
  const [imageLink, setImageLink] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  
  function fetchImage() {
    throttle(async () => {
      try {
        const response = await fetch('http://localhost:3011/dog/get-random');
        const data = await response.json();
        if(data.status === "success") {
          setIsDisabled(true);
          setImageLink(data['message']);
          setPosted(true);
        }

      } catch(error) {
        setImageLink('');
        setPosted(false);
      }
    }, fetchDelay, timerObject, () => { setIsDisabled(false) });
  };

  return (
    <div className='random-image-container'>
      <h1> Random Dog Image </h1>
      <p> <ThrottledFetchButton text="Fetch" isDisabled={isDisabled} onClick={fetchImage} /> a new image </p>
      {posted && <ClickableImage className='random-dog-image' href={imageLink} altText='Dog' />}
    </div>
  );
}
