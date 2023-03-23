import React, { ReactElement, useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';

// Functional helpers
export function getRandomIntInRange(rangeEnd: number): number {
    return Math.floor(Math.random() * rangeEnd);
}

export function getBreedNameFromURL(url: URL): string {
/*
  Example: https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg
  Only part that matters is "poodle-medium" where "medium" is sub-breed
  Link above should return "medium poodle"
*/
  const urlComponents = url.pathname.split('/');
  let breedStrs = urlComponents[2].split('-');

  if(breedStrs.length === 1) {
    return breedStrs[0];
  }

  return `${breedStrs[1]} ${breedStrs[0]}`;
}

// Convert select-option data into HTML
export function queryOptionsToHTML(data: any): JSX.Element[] {
    let options: JSX.Element[] = [];

    // ES6 - valid syntax
    for(const [key, value] of Object.entries(data)) {
        const breed = key;
        const subBreeds: any = value;
        
        if(subBreeds.length > 0) {
            for(let i = 0; i < subBreeds.length; i++) {
                const subBreed = subBreeds[i];
                const breedStr = `${subBreed} ${breed}`;
                const breedValue = `${breed}/${subBreed}`;
                const optionHTML = <MenuItem key={`${breed}option${i}`} value={breedValue}> {breedStr} </MenuItem>;
                options.push(optionHTML);
            }
        }
        else {
          const optionHTML = <MenuItem key={`${breed}option`} value={breed}> {breed} </MenuItem>;
          options.push(optionHTML);
        }

    }
    return options;

}

export function generateOptionRange(start: number, end: number) {
	let options = [];
	for(let i = start; i <= end; i++) {
		const option = <MenuItem key={`${i}-images`} value={i}> {i} </MenuItem>;
		// const option = document.createElement('option');
		// option.value = i;
		// option.key = `${i}-images`;
		options.push(option);
	}

	return options;
}

export function throttle(func: () => {}, msDelay: number, timeObj: {id: null | ReturnType<typeof setTimeout>}, cleanUp: () => void): void {
  if(timeObj.id) {
    return;
  }

  func();
  timeObj.id = setTimeout(function() {
    timeObj.id = null;
    cleanUp();
  }, msDelay);
};

// Component helpers

// Used as parent of components that need to render data after fetching
// but difficult to manage own state or need to render using fetched data
// 
// Since fetch is async, guaranteeing data received before render function is
// called is impossible in the same function, 
// so this component handles state of said data and
// conditionally renders 'ComponentToRender' only when that data is received.
type DataFetcherProps = {
  url: string,
  ComponentToRender: any
}

export function DataFetcher({url, ComponentToRender}: DataFetcherProps): ReactElement {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    }

    fetchData();

  }, [url]);

  if(!data) { 
    return (
      <>
        <h1> Fetching page data </h1>
        <p> If this page doesn't load by itself, there may be an issue with the server </p> 
      </>
    )
  }
  return <ComponentToRender queryOptions={data} />
}
