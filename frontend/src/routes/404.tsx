import React, { useEffect } from 'react';

import video404 from '../assets/404_Video.mp4';

export default function NotFound() {
  
  useEffect(() => {
    document.title = "Not Found";
  }, [])

  return (
    <div>
      <h1> W-What are you doing here? (ERROR 404) </h1>
      <h2> The URL you entered does not exist </h2>
      <video width="90%" style={{maxHeight: "80vh"}} autoPlay loop muted>
        <source src={video404} type="video/mp4" />
        Your browser does not support videos!
      </video>

    </div>
  )
}