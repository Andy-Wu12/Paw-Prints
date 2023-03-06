import React from 'react';

import video404 from '../assets/404_Video.mp4';

export default function NotFound() {
  return (
    <div>
      <h1> W-What are you doing here? (404) </h1>
      <video width="90%" style={{maxHeight: "80vh"}} controls>
        <source src={video404} type="video/mp4" />
        Your browser does not support videos!
      </video>

    </div>
  )
}