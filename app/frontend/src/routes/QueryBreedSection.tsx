import React, { ReactElement, useState } from 'react';

import { ImageList, queryOptionsToHTML, generateOptionRange, DataFetcher, throttle } from '../util';

let timerObject = {id: null};
let fetchDelay = 3000;

interface DogFormProps {
  queryOptions: 
    {
      message: Object,
      status: string
    }
}

function DogQueryForm({queryOptions}: DogFormProps): ReactElement {
  const [posted, setPosted] = useState(false);
  const [imageLinks, setImageLinks] = useState([]);
  const [imageCount, setImageCount] = useState(9);

  const breedOptions = queryOptionsToHTML(queryOptions);
  // Config number of images to pull from API
  const maxImageCount = 50;
  const imageCountOptions = generateOptionRange(1, 50);

  function handleSubmit(e: any) {
    e.preventDefault();
    throttle(async () => {
      try {
        setPosted(true);
        let newCount: number = e.target.imageCount.value;
        // In case user decides to edit options in inspector
        if(newCount > maxImageCount) {
          newCount = 50;
        }
        setImageCount(newCount);

        const breed: string = e.target.breeds.value.trim().toLowerCase();

        if(breed !== undefined && breed.length > 0) {
          const response = await fetch(`http://localhost:3011/dog/${breed}/get-images/${newCount}`);
          const data = await response.json();
          if(data.status === "success") setImageLinks(data['message']);
          else setImageLinks([]);
        }
      } catch(error) {
        setImageLinks([]);
      }
      
    }, fetchDelay, timerObject);
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
      <form onSubmit={handleSubmit}>
        <p>
          See 
          <select name='imageCount' id='imageCount'> 
            {imageCountOptions}
          </select> 
          random photos of your favorite dogs
        </p>
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

export function QueryBreedSection(): ReactElement {
  return (
  <>
    <section id='QueryBreedSection'>
      <DataFetcher url='http://localhost:3011/breeds' 
      ComponentToRender={DogQueryForm} />
    </section>
  </>
  );
}
