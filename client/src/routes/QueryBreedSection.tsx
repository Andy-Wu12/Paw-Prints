import React, { useState } from 'react';

import type { ReactElement, SetStateAction } from 'react';

import { queryOptionsToHTML, generateOptionRange, throttle } from '../util';
import ThrottledFetchButton from '../components/ThrottledFetchButton';
import { ImageList } from '../components/ImageList';

// Material UI
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useDogQuery from '../hooks/useDogQuery';

let timerObject = {id: null};
let fetchDelay = 3000;

interface DogFormProps {
  breeds: any,
  minImages: number,
  maxImages: number,
  getDogs: (e: React.SyntheticEvent) => Promise<string[]>
  setImageLinks: React.Dispatch<SetStateAction<string[]>>,
  setHasFetched: React.Dispatch<SetStateAction<boolean>>
}

export function DogQueryForm(props: DogFormProps): ReactElement {
  const [isDisabled, setDisabled] = useState(false);

  const {
    breeds,
    minImages,
    maxImages,
    getDogs,
    setImageLinks,
    setHasFetched
  } = props;

  const breedOptions = queryOptionsToHTML(breeds);
  // Config number of images to pull from API
  const imageCountOptions = generateOptionRange(minImages, maxImages);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    throttle(async () => {
      try {
          setHasFetched(true);
          const imageLinks = await getDogs(e);
          setDisabled(true);
          setImageLinks(imageLinks);
      } catch(error) {
        setImageLinks([]);
      }
      
    }, fetchDelay, timerObject, () => { setDisabled(false) });
  }

  return (
    <div className='query-form'>
      <form onSubmit={handleSubmit} className="breedQueryForm">
        <div>
          See
          <FormControl>
            <InputLabel id="imageCount-select-label"> # images </InputLabel>
            <Select data-testid="imageCount"
            name="imageCount" labelId="imageCount-select-label" id="imageCount" defaultValue={minImages.toString()}>
              {imageCountOptions}
            </Select>
          </FormControl>
          random photos of your favorite dogs
        </div>
        <br/>

        <FormControl>
          <InputLabel id="breeds-select-label">Breed</InputLabel>
          <Select data-testid="breedName"
          name="breeds" labelId="breeds-select-label" id="breedSelector" label="Breed" defaultValue={''}>
            {breedOptions}
          </Select>
        </FormControl>

        <br/><br/>
        <ThrottledFetchButton type="submit" text="Fetch" isDisabled={isDisabled} />
      </form>
      <br/>

    </div>
  );
}

export default function QueryBreedSection(): ReactElement {
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [imageLinks, setImageLinks] = useState<string[]>([]);

  const { 
    breeds, 
    getDogs,
    minImages, 
    maxImages 
  } = useDogQuery();

  let imageSectionHTML = <p> Select a name and click 'Fetch' to get started! </p>;

  if(hasFetched) {
    if(imageLinks.length > 0) {
      imageSectionHTML = <ImageList images={imageLinks} desiredLength={imageLinks.length} />;
    }
    else {
      imageSectionHTML = <p> Invalid breed name! </p>;
    }
  }

  const formProps: DogFormProps = {
      breeds: breeds,
      minImages: minImages,
      maxImages: maxImages,
      getDogs: getDogs,
      setImageLinks: setImageLinks,
      setHasFetched: setHasFetched
  }

  return (
    <section id='QueryBreedSection'>
      <h1>Lots of dogs! 🐕</h1>
      <DogQueryForm {...formProps} />

      {imageSectionHTML}
    </section>
  );
}
