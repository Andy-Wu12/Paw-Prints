import React, { useState } from 'react';

import { ImageList, queryOptionsToHTML, DataFetcher } from '../util';

function DogQueryForm({queryOptions}) {
  const [posted, setPosted] = useState(false);
  const [imageLinks, setImageLinks] = useState([]);

  const breedOptions = queryOptionsToHTML(queryOptions);
  // Config number of images to pull from API
  const imageCount = 27;

  // TODO: Find way to stop user from spamming fetches
  function handleSubmit(e) {
    e.preventDefault();
    setPosted(true);
    const breed = e.target.breeds.value.trim().toLowerCase();

    if(breed !== undefined && breed.length > 0) {
      fetch(`http://localhost:3011/dog/${breed}/get-images/${imageCount}`)
      .then(response => response.json())
      .then(data => setImageLinks(data['message']))
      .catch(error => {
        setImageLinks([]);
      })
    }
  }

  let imageSectionHTML = <p> Select a name and click 'Fetch' to get started! </p>;
  if(posted) {
    if(imageLinks.length > 0) {
      imageSectionHTML = <ImageList images={imageLinks} desiredLength={imageCount} />;
    }
    else {
      imageSectionHTML = <p> Invalid breed name! </p>;
    }
  }

  return (
    <div className='query-form'>
      <h1>Lots of dogs! 🐕</h1>
      <p>See {imageCount} random photos of your favorite dogs</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="breeds"> Select a breed: </label>
        <select name="breeds" id="breeds">
          {breedOptions}
        </select>
        <button className="fetch" type="submit">Fetch</button>
      </form>
      <br/>
      {imageSectionHTML}
    </div>
  );
}

export function QueryBreedSection() {
  return (
  <>
    <section id='QueryBreedSection'>
      <DataFetcher url='http://localhost:3011/breeds' 
      ComponentToRender={DogQueryForm} />
    </section>
  </>
  );
}
