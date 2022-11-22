import React, { useState } from 'react';
import { throttle } from '../util';

let timerObject = {id: null};
let fetchDelay = 3000 // ms

export function RandomDogImage() {
  const [posted, setPosted] = useState(null);
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
      {posted === false && <p> Error fetching image from server! </p> }
      {posted && <img className='random-dog-image' src={imageLink} alt='Dog' />}
    </div>
  );
}
