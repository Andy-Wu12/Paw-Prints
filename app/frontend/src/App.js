import './App.css';
import React, { useEffect, useState } from 'react';

import './styles/style.css';

function App() {
  return (
    <div className="App">
      <section id='QueryBreedSection'>
        <DogQueryForm />
      </section>
      <section id='RandomImage'>
        {/* <RandomDogImage /> */}
      </section>
    </div>
  );
}

function DogQueryForm() {
  const [posted, setPosted] = useState(false);
  const [imageLinks, setImageLinks] = useState([]);
  // Config number of images to pull from API
  const imageCount = 25;
  
  let breedOptions = breedOptionsToHTML();

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
      });
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
          {console.log(breedOptions)}
        </select>
        <button type="submit">Fetch</button>
      </form>
      <br/>
      {imageSectionHTML}
    </div>
  );
}

// Get random dog image
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
    imageList.push(img);

  }
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

function breedOptionsToHTML() {
  let options = [];

  const url = 'http://localhost:3011/breeds';
  fetch(url)
  .then(response => response.json())
  .then(data => {
    // ES6 - valid syntax
    for(const [key, value] of Object.entries(data['message'])) {
      const breed = key;
      const subBreeds = value;
      
      for(const subBreed of subBreeds) {
        const breedStr = `${subBreed} ${breed}`;
        const optionHTML = <option value={breedStr}> {breedStr} </option>;
        console.log(optionHTML.props);
        options.push(optionHTML.props);
      }

    }
  })
  .catch(error => {
    options = [];
  });

  return options;

}

export default App;
