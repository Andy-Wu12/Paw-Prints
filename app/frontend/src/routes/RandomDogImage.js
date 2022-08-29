import React, { useState } from 'react';


export function RandomDogImage() {
  const [posted, setPosted] = useState(null);
  const [imageLink, setImageLink] = useState('');

  function fetchImage() {
    fetch('http://localhost:3011/dog/get-random')
    .then(response => response.json())
    .then(data => {
      setImageLink(data['message']);
      setPosted(true);
    })
    .catch(error => {
      setImageLink('');
      setPosted(false);
    });
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
