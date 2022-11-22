import React, { ReactElement, useEffect, useState } from 'react';

// Functional helpers
export function getRandomIntInRange(rangeEnd: number): number {
    return Math.floor(Math.random() * rangeEnd);
}
  
// Convert select-option data into HTML
export function queryOptionsToHTML(data: any): JSX.Element[] {
    let options: JSX.Element[] = [];

    // ES6 - valid syntax
    for(const [key, value] of Object.entries(data.message)) {
        const breed = key;
        const subBreeds: any = value;
        
        if(subBreeds.length > 0) {
            for(let i = 0; i < subBreeds.length; i++) {
                const subBreed = subBreeds[i];
                const breedStr = `${subBreed} ${breed}`;
                const breedValue = `${breed}/${subBreed}`;
                const optionHTML = <option key={`${breed}option${i}`} value={breedValue}> {breedStr} </option>;
                // console.log(optionHTML);
                options.push(optionHTML);
            }
        }
        else {
          const optionHTML = <option key={`${breed}option`} value={breed}> {breed} </option>;
          options.push(optionHTML);
        }

    }
    return options;

}

export function generateOptionRange(start: number, end: number) {
	let options = [];
	for(let i = start; i <= end; i++) {
		const option = <option key={`${i}-images`} value={i}> {i} </option>;
		// const option = document.createElement('option');
		// option.value = i;
		// option.key = `${i}-images`;
		options.push(option);
	}

	return options;
}

// Component helpers

// Used as parent of components that need to render data after fetching
// but difficult to manage own state or need to render using fetched data
// 
// Since fetch is async, guaranteeing data received before render function is
// called is impossible in the same function, 
// so this component handles state of said data and
// conditionally renders 'ComponentToRender' only when that data is received.
interface DataFetcherProps {
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

interface ImageProps {
  images: any,
  desiredLength: number
}

export function ImageList({images, desiredLength}: ImageProps): ReactElement {
  const srcListLength = images.length;
  const renderLength = Math.min(desiredLength, srcListLength);
  const imageList = [];

  // Track chosen indices to prevent duplicate images from being picked
  const availableIdx = [...Array(srcListLength).keys()]; 

  for(let i = 0; i < renderLength; i++) {
    const randomIndex = getRandomIntInRange(availableIdx.length);
    const imageIndex = availableIdx[randomIndex];

    // Swap last element with chosen element and pop to prevent duplicate copies
    availableIdx[randomIndex] = availableIdx[availableIdx.length - 1]
    availableIdx.pop();

    const imgSrc = images[imageIndex];
    const img = <img key={`image${i}`} className='list-dog-image' src={imgSrc} alt='Dog' />;
    imageList.push(img);

  }

  // console.log(imageList);
  return (
    <div className='dog-images'>
      {imageList}
    </div>
  );
}

export function throttle(func: () => {}, msDelay: number, timeObj: {id: null | ReturnType<typeof setTimeout>}): void {
  if(timeObj.id) {
    return;
  }

  func();
  timeObj.id = setTimeout(function() {
    timeObj.id = null;
  }, msDelay);
};