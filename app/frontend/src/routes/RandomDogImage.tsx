import React, { ReactElement, useState } from 'react';
import { ClickableImage, throttle } from '../util';

let timerObject = {id: null};
let fetchDelay = 3000 // ms

export function RandomDogImage(): ReactElement {
  const [posted, setPosted] = useState(false);
  const [imageLink, setImageLink] = useState('');

  function fetchImage() {
    throttle(async () => {
      try {
        const response = await fetch('http://localhost:3011/dog/get-random');
        const data = await response.json();
        if(data.status === "success") {
          setImageLink(data['message']);
          setPosted(true);
        }
      } catch(error) {
        setImageLink('');
        setPosted(false);
      }
    }, fetchDelay, timerObject);
  };

  return (
    <div className='random-image-container'>
      <h1> Random Dog Image </h1>
      <p> <button className='fetch' onClick={fetchImage}>Fetch</button> a new image </p>
      {posted && <ClickableImage className='random-dog-image' href={imageLink} altText='Dog' />}
    </div>
  );
}
