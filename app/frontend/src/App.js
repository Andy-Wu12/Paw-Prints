import './App.css';
import React, { useEffect, useState } from 'react';

import './styles/style.css';

function App() {

  return (
    <div className="App">
      {/* React fires useEffect() twice, which causes NS_BINDING_ABORTED error 
      in Firefox for every image rendered on first fetch after page load */}
      <section id='QueryBreedSection'>
        <DataFetcher url='http://localhost:3011/breeds' 
        ComponentToRender={DogQueryForm} />
      </section>
      {/* <section id='RandomImage'>
        <RandomDogImage />
      </section> */}
    </div>
  );
}


// Used as parent of components that need to render data after fetching
// but difficult to manage own state or need to render using fetched data
// 
// Since fetch is async, guaranteeing data received before render function is
// called is impossible in the same function, 
// so this component handles state of said data and
// conditionally renders 'ComponentToRender' only when that data is received.
function DataFetcher({url, ComponentToRender}) {
  const [data, setData] = useState();
  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      const response = await fetch(url);
      if(!ignore) {
        const json = await response.json();
        setData(json);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return data && <ComponentToRender queryOptions={data} />
}

function DogQueryForm({queryOptions}) {
  const [breed, setBreed] = useState('');
  const [posted, setPosted] = useState(false);
  const [imageLinks, setImageLinks] = useState([]);

  const breedOptions = queryOptionsToHTML(queryOptions);
  // Config number of images to pull from API
  const imageCount = 25;
  
  useEffect(() => {
    let ignore = false;
    if(breed !== undefined && breed.length > 0) {
      fetch(`http://localhost:3011/dog/${breed}/get-images/${imageCount}`)
      .then(response => response.json())
      .then(data => setImageLinks(data['message']))
      .catch(error => {
        setImageLinks([]);
      });
    }
    
  }, [breed]);

  function handleSubmit(e) {
    e.preventDefault();
    setPosted(true);
    setBreed(e.target.breeds.value.trim().toLowerCase());
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
        <button type="submit">Fetch</button>
      </form>
      <br/>
      {imageSectionHTML}
    </div>
  );
}

function RandomDogImage() {
  const [imageLink, setImageLink] = useState('');

  useEffect(() => {
    fetch('http://localhost:3011/dog/get-random')
    .then(response => response.json())
    .then(data => setImageLink(data['message']));

  }, []);

  return (
    <div className='random-image-container'>
      <h1> Random Dog Image </h1>
      <p> See a new photo every time you reload the page! </p>
      <img className='dog-image' src={imageLink} alt='Dog' />
    </div>
  );
}

function ImageList(props) {
  const srcListLength = props.images.length;
  const renderLength = Math.min(props.desiredLength, srcListLength);
  const imageList = [];

  // Track chosen indices to prevent duplicate images from being picked
  const availableIdx = [...Array(srcListLength).keys()]; 

  for(let i = 0; i < renderLength; i++) {
    const randomIndex = getRandomIntInRange(availableIdx.length);
    const imageIndex = availableIdx[randomIndex];

    // Swap last element with chosen element and pop to prevent duplicate copies
    availableIdx[randomIndex] = availableIdx[availableIdx.length - 1]
    availableIdx.pop();

    const imgSrc = props.images[imageIndex];
    const img = <img key={`image${i}`} className='dog-image' src={imgSrc} alt='Dog' />;
    // console.log(img);
    imageList.push(img);

  }

  console.log(imageList);
  return (
    <div className='dog-images'>
      {imageList}
    </div>
  );
}

// Helper
function getRandomIntInRange(rangeEnd) {
  return Math.floor(Math.random() * rangeEnd);
}

// Convert select-option data into HTML
function queryOptionsToHTML(data) {
  let options = [];

  // ES6 - valid syntax
  for(const [key, value] of Object.entries(data['message'])) {
    const breed = key;
    const subBreeds = value;
    
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
      // console.log(optionHTML);
      options.push(optionHTML);
    }

  }
  // console.log(options);
  return options;

}

export default App;
