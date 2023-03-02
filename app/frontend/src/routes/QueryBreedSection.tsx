import React, { ReactElement, useState } from 'react';

import { ImageList, queryOptionsToHTML, generateOptionRange, DataFetcher, throttle } from '../util';
import ThrottledFetchButton from '../components/ThrottledFetchButton';

// Material UI
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';

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
  const [imageCount, setImageCount] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);

  const breedOptions = queryOptionsToHTML(queryOptions);
  // Config number of images to pull from API
  const maxImageCount = 50;
  const minImageCount = 1;
  const imageCountOptions = generateOptionRange(minImageCount, maxImageCount);

  function handleSubmit(e: any) {
    e.preventDefault();
    throttle(async () => {
      try {
        setPosted(true);
        let newCount: number = parseInt(e.target.imageCount.value);
        // In case user decides to edit options in inspector
        if(isNaN(newCount) || newCount < 0) {
          newCount = 1;
        }
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
          setIsDisabled(true);
        }
      } catch(error) {
        setImageLinks([]);
      }
      
    }, fetchDelay, timerObject, () => { setIsDisabled(false) });
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
      {/* <TestSelect /> */}
      <form onSubmit={handleSubmit} className="breedQueryForm">
        <div>
          See 
          <Select name='imageCount' id='imageCount' defaultValue={minImageCount.toString()}>
            {imageCountOptions}
          </Select>
          random photos of your favorite dogs
        </div>
        <br/>
        
        <FormControl>
          <InputLabel id="breeds-select-label">Breed</InputLabel>
          <Select name="breeds" labelId="breeds-select-label" id="breedSelector" 
          label="Breed" defaultValue={''}>
            {breedOptions}
          </Select>
        </FormControl>
        <br/><br/>
        <ThrottledFetchButton type="submit" text="Fetch" isDisabled={isDisabled} />
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
